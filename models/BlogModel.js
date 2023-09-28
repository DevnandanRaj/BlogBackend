
const mongoose=require("mongoose");
const blogSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    content:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    likes:{
        type:Number,
        require:true,
    },
    comments:{
        type:Array,
        require:true,
    },
    date:{
        type:Date
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
const blogModel=mongoose.model("Blog",blogSchema);
module.exports=blogModel;