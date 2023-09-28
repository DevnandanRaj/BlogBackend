const jwt= require("jsonwebtoken");
require("dotenv").config();
const authMiddleware= async (req,res,next)=>{
    try {
        const token= req.header("Autherization");
        if(!token){
            return res.status(404).json({msg:"token not found, please login"})
        }
        const decode=jwt.verify(token,process.env.key);
        req.user=decode.userId;
        next();
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg:"Something went wrong"})
    }
}
module.exports=authMiddleware;