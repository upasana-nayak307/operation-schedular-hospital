
// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    });
});

// Scroll-triggered animations using IntersectionObserver
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
    }
    });
}, observerOptions);

document.querySelectorAll('#features .card-hover, #about .grid > div').forEach(el => {
    observer.observe(el);
});

// Init Lucide icons
lucide.createIcons();

function handleDashboardIcon(){
    const role=localStorage.getItem("role");
    const dashboard=document.getElementById("dashboard");
    if(role === "admin"){
        dashboard.style.display="flex";
    }else{
        dashboard.style.display="none";
    }
}

function updateNavbar() {
    const token = localStorage.getItem("token");

    const loginBtn = document.getElementById("nav-login");
    const registerBtn = document.getElementById("nav-register");
    const logoutBtn = document.getElementById("nav-logout");
    const dashboardIcon = document.getElementById("dashboard");

    if (token) {
        // ✅ Logged in
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        if (dashboardIcon) dashboardIcon.style.display = "inline-block"; 
    } else {
        // ❌ Not logged in
        loginBtn.style.display = "inline-block";
        registerBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        if (dashboardIcon) dashboardIcon.style.display = "none";
    }
}

window.onload = updateNavbar;

function logout() {
    localStorage.removeItem("token");
    updateNavbar();

    // optional redirect
    window.location.href = "/login.html";
}