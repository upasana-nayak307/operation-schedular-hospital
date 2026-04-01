const mongoose=require("mongoose");

// schema
const patientSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","others"],
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    disease:{
        type:String,
        required:true
    },
},{timestamps:true});

// model
const Patient=mongoose.model("Patient",patientSchema);

module.exports=Patient;