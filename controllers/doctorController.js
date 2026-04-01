const Doctor=require('../models/doctorModel');

exports.doctors=async (req,res) => {
    try {
        console.log(req.body);
        const {name,specialization,contact,email}=req.body;
        if(!name || !specialization || !contact || !email){
            return res.json({
                success:false,
                message:"All fields are required"
            });
        }
        const existingDoctor=await Doctor.findOne({email});
        if(existingDoctor){
            return res.status(400).json({
                success:false,
                message:"Doctor with this email already exists"
            })
        }
        const newdoctor=await Doctor.create({
            name,specialization,contact,email
        });
        res.status(201).json({
            success:true,
            message:"Doctor added successfully",
            doctor:newdoctor
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Registration failed",
            error:error.message
        })
    }
}

// for getting all the doctor list
exports.doctorList=async (req,res) => {
    try {
        const doctorList=await Doctor.find();
        res.status(200).json({
            success: true,
            count: doctorList.length,
            doctorList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch doctors",
            error: error.message
        });
    }
}

// edit the doctor row
exports.editDoctorList=async (req,res) => {
    try {
        const id=req.params.id;
        const {name,specialization,contact,email}=req.body;
        const updateDoctor=await Doctor.findByIdAndUpdate(id,{
            name,specialization,contact,email
        },{ new: true, runValidators: true });
        if(!updateDoctor){
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            doctor: updateDoctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Update failed",
            error: error.message
        });
    }
}

// remove the doctor from doctorList
exports.removeDoctor=async (req,res) => {
    try {
        const id=req.params.id;
        const deleteDoctor=await Doctor.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully from doctor list",
            rdoctor: deleteDoctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to delete",
            error: error.message
        });
    }
}