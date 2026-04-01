const express=require("express");
const database=require("./config/database.js");
const app=express();
const cors=require("cors");

// connecting database
database();

app.use(cors({
    origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes=require("./routes/authRoutes.js")
app.use("/api/auth",authRoutes);

const doctorRoutes=require("./routes/doctorRoutes.js");
app.use("/api/doctor",doctorRoutes);

const patientRoutes=require("./routes/patientRoutes.js");
app.use("/api/patients",patientRoutes);

const scheduleRoutes=require("./routes/opScheduleRoutes.js");
app.use("/api/opSchedule",scheduleRoutes);

let port=8080;
app.listen(port,()=>{
    console.log("app is listening at the port:",port)
})