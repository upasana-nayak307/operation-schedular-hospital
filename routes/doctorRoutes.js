const express=require("express");
const router=express.Router();
const {doctors}=require("../controllers/doctorController");
const {doctorList}=require("../controllers/doctorController");
const {editDoctorList}=require("../controllers/doctorController");
const {authorizeRole}=require("../controllers/authController");
const {removeDoctor}=require("../controllers/doctorController");
const {authenticateJWT}=require("../middleware/authMiddleware");

router.post('/managedoctors',authenticateJWT,authorizeRole(['admin']),doctors);
router.get('/doctorList',authenticateJWT,authorizeRole(['admin']),doctorList);
router.put('/edit-doctorList/:id',authenticateJWT,authorizeRole(['admin']),editDoctorList);
router.delete('/delete/:id',authenticateJWT,authorizeRole(['admin']),removeDoctor);

module.exports=router;