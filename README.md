### 🏥 Operation Scheduler – Hospital Management System

A full-stack hospital management system designed to streamline operation scheduling, doctor management, patient management, and user authentication.
This system supports Admin and User (Doctors/Patients) roles with clear modular separation across controllers, routes, models, middleware, and views.

---

### 📌 Table of Contents
- About the Project
- Features
- Tech Stack
- Project Folder Structure
- System Workflow
- Installation & Setup
- Available Routes
- Views Overview
- Logging
- Future Enhancements
- Author

---

### 📖 About the Project
Operation Scheduler is built to help hospitals manage:<br>
✔ Doctors<br>
✔ Patients<br>
✔ Surgery/Operation Scheduling<br>
✔ Role-based dashboard<br>
✔ Secure login/register system<br>

Admins can manage doctors, patients, and surgery schedules.<br>
Users (doctors) can view surgical schedules assigned to them.

The project follows MVC Architecture and clean modular coding standards.

---

### 🚀 Features
👨‍⚕️ Admin Features<br>
    - Admin login<br>
    - Add / Manage Doctors<br>
    - Add / Manage Patients<br>
    - Create surgery/operation schedules<br>
    - View all schedules<br>
    - Dashboard overview<br>
👩‍⚕️ User (Doctor) Features<br>
    - Doctor login<br>
    - View surgery schedule<br>
    - View assigned patients<br>
🔐 Security<br>
    - Authentication with middleware<br>
    - Password encryption<br>
    - Role-based access<br>

---

### 🗂 Structured Project
Modular MVC pattern<br>
Controllers, Models, Routes separated<br>
Clean folder organization

---

### 🛠 Tech Stack
Frontend:<br>
    - HTML<br>
    - CSS<br>
    - JavaScript<br>
Backend:<br>
    - Node.js<br>
    - Express.js<br>
Database:<br>
    - MongoDB (Mongoose ORM)<br>
Tools:<br>
    - Nodemon<br>
    - JWT Authentication<br>
    - bcrypt.js<br>

---

### 📂 Project Folder Structure
```
operation-schedular-hospital/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   ├── doctorController.js
│   ├── patientController.js
│   └── scheduleController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── doctorModel.js
│   ├── patientModel.js
│   ├── scheduleModel.js
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── doctorRoutes.js
│   ├── opScheduleRoutes.js
│   └── patientRoutes.js
│
├── views/
│   ├── admin/
│   │   ├── dashboard.html
│   │   ├── manageDoctors.html
│   │   ├── operationSchedule.html
│   │   └── patients.html
│   └── users/
│       ├── doctors.html
│       └── surgerySchedule.html
│
├── html/
│   ├── index.html
│   ├── login.html
│   └── register.html
│
├── css/
│   ├── admin.css
│   ├── doctor.css
│   ├── index.css
│   ├── login.css
│   ├── operation.css
│   ├── patient.css
│   ├── register.css
│   ├── userDoctor.css
│   └── userSurgery.css
│
├── javascript/
│   ├── doctor.js
│   ├── index.js
│   ├── patient.js
│   ├── register.js
│   └── schedule.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

### 🔄 System Workflow
➤ 1. User Authentication
    Register → Login → Role-based redirect<br>
    Uses JWT tokens + middleware<br>
➤ 2. Admin Panel<br>
    Manage Doctors<br>
    Manage Patients<br>
    Schedule Operations<br>
    View complete details<br>
➤ 3. Doctor Panel<br>
    Login as doctor<br>
    View surgery schedule<br>
    View assigned patients<br>
➤ 4. Database Operations<br>

Every module has:

Models → Controllers → Routes → Views → Frontend JS


---


### 🧩 API Routes Overview

**Authentication Routes :**

| Method | Route          | Description    |
|--------|----------------|----------------|
| POST   | /auth/register | Register user  |
| POST   | /auth/login    | Login user     |

**Doctor Routes :**

| Method | Route                       | Description          |
|--------|-----------------------------|----------------------|
| POST   | /doctor/managedoctors       | Add doctor details   |
| GET    | /doctor/doctorList          | Get all doctors      |
| PUT    | /doctor/edit-doctorList/:id | Update doctor details|
| DELETE | /doctor/delete/:id          | Delete doctor details|

**Patient Routes :**

| Method | Route                        | Description              |
|--------|------------------------------|--------------------------|
| POST   | /patients/addpatients        | Add patients             |
| GET    | /patients/getpatients        | Get all patients         |
| PUT    | /patients/edit-patient/:id   | Update patient details   |
| DELETE | /patients/delete-patient/:id | Delete a patient detail  |

**Operation Schedule Routes**

| Method | Route                                  | Description           |
|--------|----------------------------------------|-----------------------|
| POST   | /opSchedule/operationSchedule          | Add operation Schedule|
| GET    | /opSchedule/allSchedules               | Get all opSchedules   |
| PUT    | /opSchedule/updateSchedules/:id        | Update a Schedule     |
| DELETE | /opSchedule/deleteSchedule/:id         | Delete a Schedule     |

---


### 🖼 Views Overview
Admin Views :
    Dashboard<br>
    Manage Doctors<br>
    Manage Patients<br>
    Operation Scheduler<br>
User Views (Doctors) :<br>
    Doctor Home<br>
    Surgery Schedule<br>


---

### 📥 Installation & Setup
1️⃣ Clone the repository
```Bash
git clone https://github.com/upasana-nayak307/operation-schedular-hospital.git
```
2️⃣ Install dependencies
npm install
3️⃣ Create .env file
JWT_SECRET=your_secret_key
4️⃣ Start the server
nodemon server.js


---

### 📝 Logging
Every important action (login, create doctor, schedule operation, etc.) can be logged using a logging utility (winston or console-based logs).
Helps in debugging & auditing.

---

### 🔮 Future Enhancements
Add nurse/staff role<br>
Add email notifications for scheduled operations<br>
Real-time operation updates with Socket.io<br>
Admin analytics dashboard<br>

---

### 👩🏻‍💻Author
**Upasana Nayak**<br>
Full-Stack Developer