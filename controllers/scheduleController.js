const Schedule=require("../models/scheduleModel");

exports.postSchedule=async (req,res) => {
    try {
        console.log(req.body);
        const {surgeryDate,otNumber,doctor,patient,assistantSurgeon,
        anesthesiologist,nurses, drugs,surgeryType,remarks}=req.body;
        const opSchedule=await Schedule.create({
            surgeryDate,otNumber,doctor,patient,assistantSurgeon,
        anesthesiologist,nurses, drugs,surgeryType,remarks
        });
        if(!surgeryDate || !otNumber || !doctor || !patient || 
            !assistantSurgeon || !anesthesiologist || !nurses || !drugs || !surgeryType
            || !remarks
        ){
            return res.status(400).json({
                success:false,
                message:"All the fields are required"
            })
        }
        res.status(201).json({
            success:true,
            message:"Schedule created successfully",
            schedule:opSchedule
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// get all the schedules
exports.getSchedules=async (req,res) => {
    try {
        const allSchedules=await Schedule.find().populate("doctor", "name")   // 👈 get doctor name
            .populate("patient", "name");
        if(!allSchedules){
            return res.status(400).json({
                success:false,
                message:"Not found any schedule"
            })
        }
        res.status(201).json({
            success:true,
            message:"Schdules fetched successfully",
            schedules:allSchedules
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// update Schedule
exports.updateSchedule=async (req,res) => {
    try {
        const id=req.params.id;
        const {surgeryDate,otNumber,doctor,patient,assistantSurgeon,
        anesthesiologist,nurses, drugs,surgeryType,remarks}=req.body;
        const editSchedule=await Schedule.findByIdAndUpdate(id,{
            surgeryDate,otNumber,doctor,patient,assistantSurgeon,
        anesthesiologist,nurses, drugs,surgeryType,remarks
        },{new:true,runValidators:true});
        if(!editSchedule){
            return res.status(404).json({
                success: false,
                message: "Schedule not found"
            });
        }
        res.status(201).json({
            success:true,
            message:"Schdules updated successfully",
            modifedSchedule:editSchedule
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// delete a schedule
exports.removeSchedule=async (req,res) => {
    try {
        const id=req.params.id;
        const delSchedule=await Schedule.findByIdAndDelete(id);
        if(!delSchedule){
            return res.status(404).json({
                success: false,
                message: "Schedule not found to delete"
            });
        }
        res.status(201).json({
            success:true,
            message:"Schdules deleted successfully",
            deletedSchedule:delSchedule
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}