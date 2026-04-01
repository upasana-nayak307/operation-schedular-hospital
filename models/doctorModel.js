const mongoose=require("mongoose");

// Schema
const doctorSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
},{timestamps:true});

// model
const Doctor=mongoose.model("Doctor",doctorSchema);

module.exports=Doctor;