const mongoose=require("mongoose");
const scheduleSchema=mongoose.Schema({
    surgeryDate:{
        type:Date,
        required:true
    },
    otNumber:{
        type:String,
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    assistantSurgeon:{
        type:String,
        required:true
    },
    anesthesiologist:String,
    nurses:[String],
    surgeryType:{
        type:String,
        required:true
    },
    drugs:String,
    reportUrl:String,
    remarks:String,
    status:{
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled"
    }
},{timestamps:true})

const Schedule=mongoose.model("Schedule",scheduleSchema);
module.exports=Schedule;