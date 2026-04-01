const express=require("express");
const router=express.Router();

const {addPatient}=require("../controllers/patientController");
const {getPatients}=require("../controllers/patientController");
const {updatePatient}=require("../controllers/patientController");
const {deletePatient}=require("../controllers/patientController");
const {authenticateJWT}=require("../middleware/authMiddleware");
const {authorizeRole}=require("../controllers/authController");

router.post('/addPatients',authenticateJWT,authorizeRole(['admin']),addPatient);
router.get('/getPatients',authenticateJWT,authorizeRole(['admin']),getPatients);
router.put('/edit-patient/:id',authenticateJWT,authorizeRole(['admin']),updatePatient);
router.delete('/delete-patient/:id',authenticateJWT,authorizeRole(['admin']),deletePatient);

module.exports=router;