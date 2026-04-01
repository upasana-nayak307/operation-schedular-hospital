const Patient=require("../models/patientModel");

exports.addPatient=async (req,res) => {
    console.log(req.body);
    const {name,age,gender,contact,disease}=req.body;
    if(!name || !age || !gender || !contact || !disease){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    if(!name){
        return res.status(400).json({
            success:false,
            message:"Please enter the patient name"
        })
    }
    if(!age){
        return res.status(400).json({
            success:false,
            message:"Please enter the age"
        })
    }
    if(!gender){
        return res.status(400).json({
            success:false,
            message:"Please select the gender"
        })
    }
    if(!contact){
        return res.status(400).json({
            success:false,
            message:"please enter the contact number"
        })
    }else if(contact.length < 10){
        return res.status(400).json({
            success:false,
            message:"Contact number must be atleast 10 characters"
        })
    }
    if(!disease){
        return res.status(400).json({
            success:false,
            message:"Please write the disease"
        })
    }
    try {
        const newPatient=await Patient.create({
            name,
            age,
            gender,
            contact,
            disease
        });
        res.status(201).json({
            success:true,
            message:"New patient added successfully",
            patient:newPatient
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in adding a patient"
        })
    }
}

// get all the doctors
exports.getPatients=async (req,res) => {
    try {
        const patientList=await Patient.find();
        console.log(patientList);
        res.status(201).json({
            success:true,
            message:"Rendered successfully",
            patients:patientList
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in rendering a patient"
        })
    }
}

// edit the patient details
exports.updatePatient=async (req,res) => {
    try {
        const id=req.params.id;
        const {name,age,gender,contact,disease}=req.body;
        const editPatient=await Patient.findByIdAndUpdate(id,{
            name,age,gender,contact,disease
        },{ new: true, runValidators: true });
        if(!editPatient){
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Patient details updated successfully",
            patient:editPatient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Update failed",
            error: error.message
        });
    }
}

// remove a patient details from patientList
exports.deletePatient=async (req,res) => {
    try {
        const id=req.params.id;
        const removePatient=await Patient.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Patient deleted successfully from doctor list",
            rpatient: removePatient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to delete",
            error: error.message
        });
    }
}