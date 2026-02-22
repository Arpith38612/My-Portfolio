// ================= FIREBASE IMPORT =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "YOUR_NEW_REGENERATED_KEY_HERE",
  authDomain: "my-portfolio-c75b2.firebaseapp.com",
  databaseURL: "https://my-portfolio-c75b2-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-c75b2",
  storageBucket: "my-portfolio-c75b2.firebasestorage.app",
  messagingSenderId: "696445528714",
  appId: "1:696445528714:web:e4d2c5ddb0fab0e3379b73"
};

// ================= INITIALIZE =================
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ================= LOADER REMOVE =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if(loader){
    loader.style.display = "none";
  }
});

// ================= THEME TOGGLE =================
const toggle = document.getElementById("themeToggle");

if(toggle){
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
}

// ================= EMAILJS INIT =================
(function(){
  if(window.emailjs){
    emailjs.init("YOUR_PUBLIC_KEY"); // replace from emailjs dashboard
  }
})();

// ================= FORM SUBMIT =================
const form = document.getElementById("contactForm");

if(form){
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const status = document.getElementById("statusMessage");

    // Save to Firebase
    push(ref(database, "messages"), {
      name: name,
      email: email,
      message: message,
      timestamp: new Date().toISOString()
    })
    .then(() => {

      // Send Email (optional)
      if(window.emailjs){
        emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
          from_name: name,
          from_email: email,
          message: message
        });
      }

      if(status){
        status.innerText = "Message Sent Successfully ✔";
        status.style.color = "#00f5ff";
      }

      form.reset();
    })
    .catch((error) => {
      if(status){
        status.innerText = "Error: " + error.message;
        status.style.color = "red";
      }
    });
  });
}
