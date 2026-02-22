// Import Firebase modules (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration (UPDATED ✅)
const firebaseConfig = {
  apiKey: "AIzaSyAu5CPL7FOvdPmeYYpvDVbnUIJs_n6F9nI",
  authDomain: "my-portfolio-c75b2.firebaseapp.com",
  databaseURL: "https://my-portfolio-c75b2-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-c75b2",
  storageBucket: "my-portfolio-c75b2.firebasestorage.app",
  messagingSenderId: "696445528714",
  appId: "1:696445528714:web:e4d2c5ddb0fab0e3379b73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Handle form submit → SAVE to Firebase
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  push(ref(database, "messages"), {
    name: name,
    email: email,
    message: message
  })
  .then(() => {
    alert("Message sent successfully!");
    document.getElementById("contactForm").reset();
  })
  .catch((error) => {
    alert("Error: " + error.message);
  });
});
