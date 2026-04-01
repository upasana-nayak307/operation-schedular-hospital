const dateError=document.getElementById("dateError");
const otError=document.getElementById("otError");
const doctorError=document.getElementById("doctorError");
const patientError=document.getElementById("patientError");
const assistantError=document.getElementById("assistantError");
const surgeryTypeError=document.getElementById("surgeryTypeError");
const drugsError=document.getElementById("drugsError");
const remarksError=document.getElementById("remarksError");
// clear the form
function clearForm(){
    document.getElementById("surgeryForm").reset();
}
async function postSchedule(event){
    event.preventDefault();
    if (window.currentScheduleId) {
        await updateSchedule();
        return;
    }
    const surgeryDate=document.getElementById("surgeryDate").value;
    const otNumber=document.getElementById("otNumber").value;
    const doctor=document.getElementById("doctorName").value;
    const patient=document.getElementById("patientName").value;
    const assistantSurgeon=document.getElementById("assistantSurgeon").value;
    const anesthesiologist=document.getElementById("anesthesiologist").value;
    const nurses=document.getElementById("nurses").value.split(",");
    const drugs=document.getElementById("drugsInstruments").value;
    const surgeryType=document.getElementById("surgeryType").value;
    const remarks=document.getElementById("doctorRemarks").value;

    let isValid=true;
    if (!surgeryDate){
        dateError.innerText="Please select the time and date";
        isValid=false;
    }
    if(!otNumber){
        otError.innerText="Please assign OT room";
        isValid=false;
    }
    if(!doctor){
        doctorError.innerText="Please assign a doctor";
        isValid=false;
    }
    if(!patient){
        patientError.innerText="Please enter the patient name";
        isValid=false;
    }
    if(!assistantSurgeon){
        assistantError.innerText="Assign assistant surgeon";
        isValid=false;
    }
    if(!surgeryType){
        surgeryTypeError.innerText="Please enter the surgery type";
        isValid=false;
    }
    if(!drugs){
        drugsError.innerText="Please enter the requirements";
        isValid=false;
    }
    if(!remarks){
        remarksError.innerText="Remark it";
        isValid=false;
    }
    if(!isValid) return;
    try {
        const res=await axios.post("http://localhost:8080/api/opSchedule/operationSchedule",{
            surgeryDate,otNumber,doctor,patient,assistantSurgeon,anesthesiologist,
            nurses,drugs,surgeryType,remarks
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        clearForm();
        showSchedules();
        console.log(res.data);
    } catch (error) {
        console.log(error.response?.data);
    }
}

const isAdminPage = document.getElementById("surgeryForm") !== null;
const isUserPage = document.querySelector(".table-container") !== null;
// fetching schedules from DB
let scheduleList=[];
async function showSchedules() {
    if (!isAdminPage) return;
    const surgeryCount=document.getElementById("surgeryCount");
    try {
        const res=await axios.get("http://localhost:8080/api/opSchedule/allSchedules",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        scheduleList=res.data.schedules;
        console.log(res.data);
        surgeryCount.innerText=`${scheduleList.length} Surgeries`
        const surgeriesBody=document.getElementById("surgeriesBody");
        surgeriesBody.innerHTML = "";
        scheduleList.forEach(element => {
            const tr=document.createElement("tr");
            const dateObj = new Date(element.surgeryDate);
            const formattedDate = dateObj.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

            const formattedTime = dateObj.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });
            tr.innerHTML=`
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>${element.otNumber}</td>
            <td>${element.doctor?.name}</td>
            <td>${element.patient?.name}</td>
            <td>${element.surgeryType}</td>
            <td>
                <i class="fa-solid fa-pen-to-square edit-icon" onclick="editSchedule('${element._id}')"></i>
                <i class="fa-solid fa-trash delete-icon" onclick="removeSchedule('${element._id}')"></i>
            </td>
            `
            surgeriesBody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
}
showSchedules();

// showing surgery list to the user
async function showUser() {
     if (!isUserPage) return;
    try {
        const res=await axios.get("http://localhost:8080/api/opSchedule/allSchedules",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log(res.data);
        const surgeriesBody=document.getElementById("surgeriesBody");
        if (!surgeriesBody) {
            console.log("❌ surgeriesBody NOT FOUND");
            return;
        }
        surgeriesBody.innerHTML = "";
        const schedules=res.data.schedules;
        schedules.forEach((element)=>{
            const tr=document.createElement("tr");
            const dateObj = new Date(element.surgeryDate);
            const formattedDate = dateObj.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

            const formattedTime = dateObj.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });
            tr.classList.add("table-row");
            tr.innerHTML=`
                <td class="date-cell">${formattedDate}</td>
                <td><span class="ot-number">${element.otNumber}</span></td>
                <td class="doctor-name">${element.doctor?.name}</td>
                <td class="assistant-name">${element.assistantSurgeon}</td>
                <td class="remarks-text">${element.remarks}</td>
            `
            surgeriesBody.appendChild(tr);
        })
    } catch (error) {
        console.log(error);
    }
}
showUser();

// editing the data
let isEditMode=false;
function editSchedule(id){
    const schedule=scheduleList.find((s)=>s._id === id)
    document.getElementById("surgeryDate").value=new Date(schedule.surgeryDate).toISOString().slice(0,16);
    document.getElementById("otNumber").value=schedule.otNumber;
    document.getElementById("doctorName").value=schedule.doctor?._id;
    document.getElementById("patientName").value=schedule.patient?._id;
    document.getElementById("assistantSurgeon").value=schedule.assistantSurgeon;
    document.getElementById("anesthesiologist").value=schedule.anesthesiologist;
    document.getElementById("nurses").value=schedule.nurses?.join(",");
    document.getElementById("drugsInstruments").value=schedule.drugs;
    document.getElementById("surgeryType").value=schedule.surgeryType;
    document.getElementById("doctorRemarks").value=schedule.remarks;

    window.currentScheduleId=schedule._id;
    isEditMode=true;
    document.getElementById("submitBtn").innerText = "Update Schedule";

}
async function updateSchedule() {
    const id=window.currentScheduleId;
    const surgeryDate=document.getElementById("surgeryDate").value;
    const otNumber=document.getElementById("otNumber").value;
    const doctor=document.getElementById("doctorName").value;
    const patient=document.getElementById("patientName").value;
    const assistantSurgeon=document.getElementById("assistantSurgeon").value;
    const anesthesiologist=document.getElementById("anesthesiologist").value;
    const nurses=document.getElementById("nurses").value.split(",");
    const drugs=document.getElementById("drugsInstruments").value;
    const surgeryType=document.getElementById("surgeryType").value;
    const remarks=document.getElementById("doctorRemarks").value;
    try {
        const res=await axios.put(`http://localhost:8080/api/opSchedule/updateSchedule/${id}`,{
            surgeryDate,otNumber,doctor,patient,assistantSurgeon,anesthesiologist,
            nurses,drugs,surgeryType,remarks
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        clearForm();
        showSchedules();
        isEditMode=false;
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

// deleteing schedule
function removeSchedule(id) {
    const confirmOverlay=document.getElementById("confirmOverlay");
    confirmOverlay.style.display="flex";
    const delBtn=document.getElementById("confirmDelBtn");
    delBtn.addEventListener("click",async ()=>{
        const res=await axios.delete(`http://localhost:8080/api/opSchedule/deleteSchedule/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        confirmOverlay.style.display="none";
        showSchedules();
        console.log(res.data);
    });
    const confirmCancelBtn=document.getElementById("confirmCancelBtn");
    confirmCancelBtn.addEventListener("click",()=>{
        confirmOverlay.style.display="none";
        showSchedules();
    })
}

// fetching doctors from doctor DB
let doctors=[];
async function fetchDoctors() {
    if (!isAdminPage) return;
    try {
        const res=await axios.get("http://localhost:8080/api/doctor/doctorList",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        doctors=res.data.doctorList;
        const doctorDropdown = document.getElementById("doctorName");
        doctors.forEach(element => {
            const option = document.createElement("option");
            option.value=element._id;
            option.textContent=element.name;
            doctorDropdown.appendChild(option);
        });
    } catch (error) {
        console.log(error);
    }
}
fetchDoctors();

// fetching patients from patient DB
let patientList=[];
async function loadPatients() {
    if (!isAdminPage) return;
    try {
        const res = await axios.get("http://localhost:8080/api/patients/getPatients", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        patientList = res.data.patients;
        const patientDropdown = document.getElementById("patientName");

        patientList.forEach(pat => {
            const option = document.createElement("option");
            option.value = pat._id;         
            option.textContent = pat.name;  
            patientDropdown.appendChild(option);
        });

    } catch (error) {
        console.log("Error loading patients", error);
    }
}
loadPatients();
