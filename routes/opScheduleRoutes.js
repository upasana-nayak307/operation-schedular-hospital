const express=require("express");
const router=express.Router();

const {postSchedule, getSchedules , updateSchedule, removeSchedule}=require("../controllers/scheduleController");
const {authorizeRole}=require("../controllers/authController");
const {authenticateJWT}=require("../middleware/authMiddleware");

router.post('/operationSchedule',authenticateJWT,authorizeRole(['admin']),postSchedule);
router.get('/allSchedules',authenticateJWT,authorizeRole(['admin']),getSchedules);
router.put('/updateSchedule/:id',authenticateJWT,authorizeRole(['admin']),updateSchedule);
router.delete('/deleteSchedule/:id',authenticateJWT,authorizeRole(['admin']),removeSchedule);

module.exports=router;