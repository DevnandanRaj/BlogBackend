const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const userModel=require("../models/UserModel");
const userRouter=express.Router();

userRouter.post("/register", async(req,res)=>{
    try {
        const {username,avatar,email,password}=req.body;
    const userExists=await userModel.findOne({email});
    if(userExists){
        return res.status(401).json({msg:"User exists please login"})
    }
    else{
        bcrypt.hash(password,5,async function (error,hash){
            if(error){
                return res.status(404).json({msg:"Something went wrong"})
            }
            const user= new userModel({
                username,
                avatar,
                email,
                password:hash
            });
            await user.save();
            res.status(200).json({msg:"User registered"})
        })
    }
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg:"Something went wrong"})
    }
});

userRouter.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body;
    const userExists=await userModel.findOne({email});
    if(!userExists){
        return res.status(401).json({msg:"User exists please register"})
    }
    else{
        const isMatch=await bcrypt.compare(password,userExists.password);
        if(!isMatch){
            return res.status(401).json({msg:"Incorrect password"})
        }
        const token=jwt.sign({userId:userExists._id},process.env.key,{expiresIn:"7d"});
        return res.status(200).json({msg:"Login successfull", token})
    }
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg:"Something went wrong"})
    }


});
module.exports=userRouter;