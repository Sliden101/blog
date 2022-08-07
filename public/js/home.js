import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
const firebaseConfig = {
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);

const blogSection = document.querySelector('.blogs-section');

const querySnapshot = await getDocs(collection(db, "blogs"));


querySnapshot.forEach((doc) => {
    let data = doc.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${doc.id}" class="btn dark">read</a>
    </div>
    `;
  });

