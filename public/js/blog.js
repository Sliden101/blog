import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
const firebaseConfig = {
};
// Initialize Firebase
const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;
            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }
            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }
        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);

let blogId = decodeURI(location.pathname.split("/").pop());
let docRef = doc(db, "blogs", blogId);
let docSnap = await getDoc(docRef)
let data = docSnap.data();
let banner = document.querySelector('.banner');
let blogTitle = document.querySelector('.title');
let titleTag = document.querySelector('title');
let publish = document.querySelector('.published');

banner.style.backgroundImage = `url(${data.bannerImage})`;

titleTag.innerHTML += blogTitle.innerHTML = data.title;
publish.innerHTML += data.publishedAt;

let article = document.querySelector('.article');
addArticle(article, data.article)

//console.log(data)
