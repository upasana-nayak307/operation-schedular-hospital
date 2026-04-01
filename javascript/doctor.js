const nameError=document.getElementById("nameError");
const specError=document.getElementById("specError");
const contactError=document.getElementById("contactError");
const emailError=document.getElementById("emailError");

function validation(inputId,errorId,message){
    const input=document.getElementById(inputId)
    if(!input)return;
    input.addEventListener('input',(e)=>{
        const value = e.target.value.trim();
        const error = document.getElementById(errorId);

        if (!value) {
            error.innerText = message;
        } else {
            error.innerText = "";
        }
    })
}
validation("doctorName", "nameError", "Enter the name");
validation("specialization", "specError", "Please fill the field");
validation("contact", "contactError", "Enter the contact number");
validation("email", "emailError", "Enter the mail");
function clear() {
    document.getElementById("doctorForm").reset();
}
async function handleDoctors(event){
    event.preventDefault();
    const name=document.getElementById("doctorName").value;
    const specialization=document.getElementById("specialization").value;
    const contact=document.getElementById("contact").value;
    const email=document.getElementById("email").value;
    let isValid=true;
    if(!name){
        nameError.innerText="Enter the name";
        isValid=false;
    }
    if(!specialization){
        specError.innerText="Enter the specialization";
        isValid=false;
    }
    if(!contact){
        contactError.innerText="Enter the contact number";
        isValid=false;
    }else if(contact.length<10){
        contactError.innerText="Contact number must be 10 characters";
        isValid=false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
        emailError.innerText="Enter the mail";
        isValid=false;
    }else if(!emailRegex.test(email)){
        emailError.innerText="Invalid mail";
        isValid=false;
    }
    if(!isValid) return;
    try {
        const res=await axios.post("http://localhost:8080/api/doctor/managedoctors",{
            name,specialization,contact,email
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
        clear();
        getdoctors();
        
       console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}
let doctors=[];
async function getdoctors() {

    const doctorsBody=document.getElementById("doctorsBody");
    const doctorCount=document.getElementById("doctorCount");
    try {
        const res=await axios.get("http://localhost:8080/api/doctor/doctorList",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        doctors=res.data.doctorList;
        const count=res.data.count;
        if(doctorsBody && doctorCount){
            doctorCount.innerText=`${count} doctors`;
            doctorsBody.innerHTML="";
            doctors.forEach(element => {
                const tr=document.createElement('tr');
                tr.innerHTML=`
                <td>${element.name}</td>
                <td>${element.specialization}</td>
                <td>${element.contact}</td>
                <td>${element.email}</td>
                <td class="actions">
                <i class="fa-solid fa-pen-to-square edit-icon" onclick="editDoctor('${element._id}')"></i>
                <i class="fa-solid fa-trash delete-icon" onclick="deleteDoctor('${element._id}')"></i>
                </td>
                `;
            doctorsBody.appendChild(tr);
            });
        }
    } catch (error) {
        console.log(error);
    }
}
getdoctors();

// showing above data to the user
const specializationIcons = {
    Cardiology: "❤️",
    Neurology: "🧠",
    Pediatrics: "👶",
    Orthopedics: "🦴",
    Dermatology: "🩹",
    General: "🩺",
    Dentistry: "🦷",
    Ophthalmology: "👁️",
    Eye:"👁️"
};
async function showUser(){
    const doctorsGrid = document.getElementById("doctorsGrid");
    const emptyState=document.getElementById("emptyState");
    doctorsGrid.innerHTML = "Loading doctors...";
    try {
        const res=await axios.get("http://localhost:8080/api/doctor/doctorList",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        const doctors=res.data.doctorList;
        doctorsGrid.innerHTML="";
        if(doctors.length===0){
            emptyState.style.display="flex";
            return;
        }
        doctors.forEach(element => {
            const card=document.createElement("div");
            card.className="doctor-card";
            const icon = specializationIcons[element.specialization] || "💘";
            card.innerHTML=`
            <div class="doctor-card-content">
                <div class="doctor-avatar">${icon}</div>
                <h3 class="doctor-name">${element.name}</h3>
                <p class="doctor-specialization">${element.specialization}</p>
                <div class="doctor-divider"></div>
                <div class="contact-info">
                <div class="contact-item">
                    <div class="contact-icon">📞</div>
                    <div>
                    <span class="contact-label">Phone</span>
                    <div class="contact-value">${element.contact}</div>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">✉️</div>
                    <div>
                    <span class="contact-label">Email</span>
                    <div class="email-value">${element.email}</div>
                    </div>
                </div>
                </div>
            </div>
            `
            doctorsGrid.appendChild(card);
        });
    } catch (error){
        console.log(error);
        doctorsGrid.innerHTML = "<p>Error loading doctors.</p>";
    }
}
document.addEventListener("DOMContentLoaded", showUser);

// update the doctor details
function editDoctor(id) {
    const doctor=doctors.find((d)=> d._id === id);
        document.getElementById("doctorName").value = doctor.name;
        document.getElementById("specialization").value = doctor.specialization;
        document.getElementById("contact").value = doctor.contact;
        document.getElementById("email").value = doctor.email;
        window.currentDoctorId=doctor._id;
    document.getElementById("submitBtn").innerText = "Update Doctor";
}
async function updateDoctor() {
    const id=window.currentDoctorId;
    const name=document.getElementById("doctorName").value;
    const specialization=document.getElementById("specialization").value;
    const contact=document.getElementById("contact").value;
    const email=document.getElementById("email").value;
    try {
        const res=await axios.put(`http://localhost:8080/api/doctor/edit-doctorList/${id}`,{
            name,specialization,contact,email
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        clear();
        getdoctors();
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

// deleteing some information in doctor table
function deleteDoctor(id){
    const confirmOverlay=document.getElementById("confirmOverlay");
    confirmOverlay.style.display="flex";
    const delBtn=document.getElementById("confirmDelBtn");
    delBtn.addEventListener('click',async ()=>{
        const res=await axios.delete(`http://localhost:8080/api/doctor/delete/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        confirmOverlay.style.display="none";
        getdoctors();
    });
    const confirmCancelBtn=document.getElementById("confirmCancelBtn");
    confirmCancelBtn.addEventListener("click",()=>{
        confirmOverlay.style.display="none";
        getdoctors();
    })
}