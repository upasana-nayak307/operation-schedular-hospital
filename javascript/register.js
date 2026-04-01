function showError(id, message) {
    const errorDiv = document.getElementById(id);
    errorDiv.querySelector("span").innerText = message;
    errorDiv.classList.add("visible");
}

function clearError(id) {
    const errorDiv = document.getElementById(id);
    errorDiv.querySelector("span").innerText = "";
    errorDiv.classList.remove("visible"); 
}

function clearAllErrors() {
    document.getElementById("fullName").addEventListener("input", () => {
    clearError("fullNameError");
});

document.getElementById("email").addEventListener("input", () => {
    clearError("emailError");
});

document.getElementById("password").addEventListener("input", () => {
    clearError("passwordError");
});

document.getElementById("confirmPassword").addEventListener("input", () => {
    clearError("confirmPasswordError");
});
}

function clearAllErrors2(){
    document.getElementById("email").addEventListener("input", () => {
    clearError("emailError");
});

document.getElementById("password").addEventListener("input", () => {
    clearError("passwordError");
});
}
async function handleSubmit(event){
    event.preventDefault();

    const name=document.querySelector("#fullName").value;
    const email=document.querySelector("#email").value;
    const password=document.querySelector("#password").value;
    const confirmPassword=document.querySelector("#confirmPassword").value;
    const role=document.querySelector('input[name="role"]:checked').value;
    clearAllErrors();
    let isValid=true;
    if (!name || name.trim().length < 3) {
        showError("fullNameError","Name must be at least 3 characters");
        isValid=false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("emailError","Invalid email");
        isValid=false;
    }

    // Password
    if (password.length < 8) {
        showError("passwordError","Password must be at least 8 characters");
        isValid=false;
    }

    // Confirm Password
    if (!confirmPassword) {
        showError("confirmPasswordError", "Please re-enter password");
        isValid = false;
    }
    else if (password !== confirmPassword) {
        showError("confirmPasswordError", "Passwords do not match");
        isValid = false;
    }
    if(!isValid) return;
    try {
        const res = await axios.post(
            "http://localhost:8080/api/auth/register",
            {
                name,email,password,confirmPassword
            },
        );

        // ✅ SUCCESS
        if (res.status === 201) {
            const overlay = document.getElementById("successOverlay");
            // SHOW overlay
            overlay.classList.add("show");
            setTimeout(() => {
                window.location.href = "http://127.0.0.1:5500/html/index.html";
            }, 2000);
        }

        

    } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    clearAllErrors2();
    let isValid = true;

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("emailError", "Invalid email");
        isValid = false;
    }

    // ✅ Password validation
    if (!password) {
        showError("passwordError", "Password is required");
        isValid = false;
    }

    // ❌ Stop if invalid
    if (!isValid) return;

    try {
        const res = await axios.post(
            "http://localhost:8080/api/auth/login",
            { email, password }
        );

        console.log(res.data);
        console.log(res.data.registeredUser);
        console.log(res.data.registeredUser.role);

        if (res.status === 200) {
            document.getElementById("successOverlay").classList.add("show");

            localStorage.setItem("role", res.data.registeredUser.role);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));

            setTimeout(() => {
                window.location.href = "http://127.0.0.1:5500/html/index.html";
            }, 1500);
        }

    } catch (error) {
        showError("passwordError", error.response?.data?.message || "Login failed");
    }
}