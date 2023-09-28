const express=require("express");
const blogModel=require("../models/BlogModel");
const authMiddleware = require("../middleware/authMiddleware");

const blogRouter=express.Router();

blogRouter.post("/blogs",authMiddleware,async  (req,res)=>{
    try {
        const date= new Date();
        const newBlog= new blogModel(req.body);
        await newBlog.save();
        res.status(200).json({msg:"Blog created"})
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg:"Something went wrong"})
    }
});

blogRouter.get("/blogs",async (req,res)=>{
    try {
        const title=req.query.title;
        const category=req.query.category;
        const order=req.query.order=="dsc"?-1:1;
        const query={}
        if(title){
            query.title={ $regex: title, $options:"i"}
        }
        if(category){
            query.category=category;
        }
        console.log(query)
        const data= await blogModel.find(query).sort({date:order});
        return res.status(200).json({blog:data})
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg:"Something went wrong"})
    }
});

blogRouter.delete("/blogs/:id",authMiddleware, async (req,res)=>{
    try {
        const {id}= req.params;
        const deleteBlog=await blogModel.findByIdAndDelete({_id:id});
        res.status(200).json({msg:"Blog Deleted"})
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg:"Something went wrong"})
    }
});
blogRouter.patch("/blogs/:id",authMiddleware,async (req,res)=>{
    try {
        const {id}= req.params;
        const updateBlog=await blogModel.findByIdAndUpdate(id,req.body);
        res.status(200).json({msg:"Blog Updated"})
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg:"Something went wrong"})
    }
});
blogRouter.patch("/blogs/:id/like",async (req,res)=>{
    try {
        const {id}= req.params;
        const updateBlog=await blogModel.findByIdAndUpdate(id,req.body);
        res.status(200).json({msg:"like Updated"})
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg:"Something went wrong"})
    }
});
blogRouter.patch("/blogs/:id/comment",async (req,res)=>{
    try {
        const {id}= req.params;
        const updateBlog=await blogModel.findByIdAndUpdate(id,req.body);
        res.status(200).json({msg:"comments Updated"})
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg:"Something went wrong"})
    }
});
module.exports=blogRouter;