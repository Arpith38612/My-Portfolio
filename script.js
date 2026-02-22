// ================= FIREBASE IMPORT =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyAu5CPL7FOvdPmeYYpvDVbnUIJs_n6F9nI",
  authDomain: "my-portfolio-c75b2.firebaseapp.com",
  databaseURL: "https://my-portfolio-c75b2-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-c75b2",
  storageBucket: "my-portfolio-c75b2.firebasestorage.app",
  messagingSenderId: "696445528714",
  appId: "1:696445528714:web:e4d2c5ddb0fab0e3379b73"
};

// ================= INITIALIZE FIREBASE =================
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ================= REMOVE LOADER =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// ================= THEME TOGGLE =================
const toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
}

// ================= EMAILJS INIT =================
if (window.emailjs) {
  emailjs.init("eWa714lv4ljgn3oX2");
}

// ================= FORM SUBMIT =================
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("statusMessage");

    // ================= RATE LIMITING =================
    if (localStorage.getItem("lastSubmit")) {
      const last = parseInt(localStorage.getItem("lastSubmit"));
      if (Date.now() - last < 30000) {
        if (status) {
          status.innerText = "Please wait 30 seconds before sending again.";
          status.style.color = "orange";
        }
        return;
      }
    }

    try {

      // 🔹 Save to Firebase
      await push(ref(database, "messages"), {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
      });

      // 🔹 Send Email via EmailJS
      if (window.emailjs) {
        await emailjs.send(
          "service_57bk3es",
          "template_2l73uxb",
          {
            from_name: name,
            from_email: email,
            message: message
          }
        );
      }

      // Save timestamp AFTER successful submission
      localStorage.setItem("lastSubmit", Date.now());

      if (status) {
        status.innerText = "Message Sent Successfully ✔";
        status.style.color = "#00f5ff";
      }

      form.reset();

    } catch (error) {
      if (status) {
        status.innerText = "Error: " + error.message;
        status.style.color = "red";
      }
      console.error(error);
    }
  });
}
