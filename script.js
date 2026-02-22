import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAu5CPL7FOvdPmeYYpvDVbnUIJs_n6F9nI",
  authDomain: "my-portfolio-c75b2.firebaseapp.com",
  databaseURL: "https://my-portfolio-c75b2-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-c75b2",
  storageBucket: "my-portfolio-c75b2.firebasestorage.app",
  messagingSenderId: "696445528714",
  appId: "1:696445528714:web:e4d2c5ddb0fab0e3379b73"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

emailjs.init("eWa714lv4ljgn3oX2");

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("statusMessage");

  if(localStorage.getItem("lastSubmit")){
    const last = parseInt(localStorage.getItem("lastSubmit"));
    if(Date.now() - last < 30000){
      status.innerText = "Please wait 30 seconds before sending again.";
      status.style.color = "orange";
      return;
    }
  }

  try{
    await push(ref(database, "messages"), {
      name, email, message,
      timestamp: new Date().toISOString()
    });

    await emailjs.send("service_57bk3es","template_2l73uxb",{
      from_name: name,
      from_email: email,
      message: message
    });

    localStorage.setItem("lastSubmit", Date.now());

    status.innerText = "Message Sent Successfully ✔";
    status.style.color = "#00f5ff";
    form.reset();

  }catch(error){
    status.innerText = "Error: " + error.message;
    status.style.color = "red";
  }
});
