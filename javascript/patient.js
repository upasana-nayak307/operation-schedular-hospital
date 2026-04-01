const nameError=document.getElementById("nameError");
const ageError=document.getElementById("ageError");
const contactError=document.getElementById("contactError");
const genderError=document.getElementById("genderError");
const diseaseError=document.getElementById("diseaseError");
async function addPatient(event) {
    event.preventDefault();
    if (window.currentPatientId) {
        await updatePatient();
        return;
    }
    const name=document.getElementById("patientName").value;
    const age=document.getElementById("age").value;
    const gender=document.getElementById("gender").value;
    const contact=document.getElementById("contact").value;
    const disease=document.getElementById("disease").value;
    let isValid=true;
    if(!name){
        nameError.innerText="Enter the patient name";
        isValid=false;
    }
    if(!age){
        ageError.innerText="Enter the age";
        isValid=false;
    }
    if(!gender){
        genderError.innerText="Please select the gender";
        isValid=false;
    }
    if(!contact){
        contactError.innerText="Enter the contact number";
        isValid=false;
    }else if(contact.length<10){
        contactError.innerText="Contact number must be atleast 10 characters"
        isValid=false;
    }
    if(!disease){
        diseaseError.innerText="Write the disease";
        isValid=false;
    }
    if (!isValid) return;
    try {
        const res=await axios.post("http://localhost:8080/api/patients/addPatients",{
            name,age,gender,contact,disease
        },{
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        clear();
        getPatients();
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

function clear() {
    document.getElementById("patientForm").reset();
}

// get all the patients
let patientList=[];
async function getPatients() {
    try {
        const res=await axios.get("http://localhost:8080/api/patients/getPatients",{
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        const patientBody=document.getElementById("patientsBody");
        const patientCount=document.getElementById("patientCount");
        patientBody.innerHTML="";
        patientList=res.data.patients;
        patientCount.innerText=`${patientList.length} patients`
        patientList.forEach(element => {
            const tr=document.createElement("tr");
            tr.innerHTML=`
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>${element.gender}</td>
            <td>${element.disease}</td>
            <td>${element.contact}</td>
            <td class="actions">
                <i class="fa-solid fa-pen-to-square edit-icon" onclick="editPatient('${element._id}')"></i>
                <i class="fa-solid fa-trash delete-icon" onclick="removePatient('${element._id}')"></i>
            </td>
            `
            patientBody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
}
getPatients();


// edit the patient
function editPatient(id){
    const patient=patientList.find((d)=> d._id === id);
    document.getElementById("patientName").value=patient.name;
    document.getElementById("age").value=patient.age;
    document.getElementById("gender").value=patient.gender;
    document.getElementById("contact").value=patient.contact;
    document.getElementById("disease").value=patient.disease;
    window.currentPatientId=patient._id;
    document.getElementById("submitBtn").innerText = "Update Patient";
}
async function updatePatient() {
    try {
        const id=window.currentPatientId;
        const name=document.getElementById("patientName").value;
        const age=document.getElementById("age").value;
        const gender=document.getElementById("gender").value;
        const contact=document.getElementById("contact").value;
        const disease=document.getElementById("disease").value;
        const res=await axios.put(`http://localhost:8080/api/patients/edit-patient/${id}`,{
            name,age,gender,contact,disease
        },{
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        clear();
        window.currentPatientId = null; // ✅ RESET
        document.getElementById("submitBtn").innerText = "Add Patient";
        getPatients();
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

// delete a patient detail
async function removePatient(id) {
    const confirmOverlay=document.getElementById("confirmOverlay");
    confirmOverlay.style.display="flex";
    const delBtn=document.getElementById("confirmDelBtn");
    delBtn.addEventListener('click',async ()=>{
        const res=await axios.delete(`http://localhost:8080/api/patients/delete-patient/${id}`,{
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        confirmOverlay.style.display="none";
        getPatients();
        console.log(res.data);
    })
    const confirmCancelBtn=document.getElementById("confirmCancelBtn");
    confirmCancelBtn.addEventListener("click",()=>{
        confirmOverlay.style.display="none";
        getPatients();
    })
}