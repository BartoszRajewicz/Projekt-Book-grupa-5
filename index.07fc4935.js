function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,n={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r),(0,r.register)("ifJdc",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>n,set:e=>n=e,enumerable:!0,configurable:!0});var n,o=new Map;n=function(e,t){for(var n=0;n<t.length-1;n+=2)o.set(t[n],{baseUrl:e,path:t[n+1]})}}),r("ifJdc").register(new URL("",import.meta.url).toString(),JSON.parse('["eFRlh","index.07fc4935.js","1XyF0","trash.8b6984e1.svg","i6YUf","amazon.02f34ca7.png","k8uf5","baren-nobel.44eb7cdb.png","d4IiO","save_children.38f3a8d9.png","1th6u","hope.a1466b08.png","cuxBx","internationalmed.f76859a4.png","foSAI","razom.6bbb25a9.png","2KzEI","actionsagainst.750424dd.png","ejw6S","charityfound.fc53556b.png","pRJtG","medecins.d532430b.png","bGD64","worldvision.ec9c433c.png","e1TMR","united.43bceef3.png"]'));var i={};i=new URL("trash.8b6984e1.svg",import.meta.url).toString();var a={};a=new URL("amazon.02f34ca7.png",import.meta.url).toString();var l={};l=new URL("baren-nobel.44eb7cdb.png",import.meta.url).toString();const{shoppingList:s,emptyList:c}={shoppingList:document.querySelector(".shopping-list"),emptyList:document.querySelector(".empty-list")},d={Amazon:`<img src= "${e(a)}" alt="logo Amazon" width="32" height="11">`,"Barnes and Noble":`<img src="${e(l)}" alt="logo Barnes and Noble" width="16" height="16">`};let p=[];function g(e,t){c.style.display=e,s.style.display=t}0!==(p=function(){for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);if("theme"!==t){let e=JSON.parse(localStorage.getItem(t));p.push(e)}}return p}()||[]).length?(g("none","flex"),function(t){let n=t.map(({id:t,bookName:n,author:o,img:r,description:a,title:l,shops:s})=>{let c=s.map(({name:e,url:t})=>{let n=e in d?d[e]:"";return`<li class="shop-item"><a href="${t}" target="_blank" class="shop-link-image">${n}</a></li>`}).join("\n");return""!==r&&r||(r=`${noImage}`),`<li class="shoplist-item" data-idcard="${t}">
        <button type="button" class="delate-btn" data-id="${t}">
          <svg class="delate-svg" width="16" height="16">
            ${e(i)}
          </svg>
        </button>
        <img class="img-shoplist-card" src="${r}" alt="${l}" width="100" height="142" />
        <div class="card-shoplist">
          <h2 class="card-title-shoplist">${l}</h2>
          <p class="card-category-shoplist">${n}</p>
          <p class="card-description-shoplist">${a}</p>
          <div class="wrapper-card-shoplist-footer">
            <p class="card-author-shoplist">${o}</p>
            <ul class="shops-list">${c}</ul>
          </div>
        </div>
      </li>`});s.innerHTML=n.join("")}(p)):g("block","none");var u={};u=new URL("save_children.38f3a8d9.png",import.meta.url).toString();var m={};m=new URL("hope.a1466b08.png",import.meta.url).toString();var h={};h=new URL("internationalmed.f76859a4.png",import.meta.url).toString();var f={};f=new URL("razom.6bbb25a9.png",import.meta.url).toString();var y={};y=new URL("actionsagainst.750424dd.png",import.meta.url).toString();var _={};_=new URL("charityfound.fc53556b.png",import.meta.url).toString();var b={};b=new URL("medecins.d532430b.png",import.meta.url).toString();var S={};S=new URL("worldvision.ec9c433c.png",import.meta.url).toString();var v={};v=new URL("united.43bceef3.png",import.meta.url).toString();const E=[{title:"Save the Children",url:"https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis",img:e(u)},{title:"Project HOPE",url:"https://www.projecthope.org/country/ukraine/",img:e(m)},{title:"International Medical Corps",url:"https://internationalmedicalcorps.org/country/ukraine/",img:e(h)},{title:"RAZOM",url:"https://www.razomforukraine.org/",img:e(f)},{title:"Action against hunger",url:"https://www.actionagainsthunger.org/location/europe/ukraine/",img:e(y)},{title:"Serhiy Prytula Charity Foundation",url:"https://prytulafoundation.org/en",img:e(_)},{title:"Medicins Sans Frontieres",url:"https://www.msf.org/ukraine",img:e(b)},{title:"World vision",url:"https://www.wvi.org/emergencies/ukraine",img:e(S)},{title:"UNITED24",url:"https://u24.gov.ua/uk",img:e(v)}];document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("charity-container");E.forEach((t,n)=>{let o=document.createElement("div"),r=document.createElement("img"),i=(n+1).toString().padStart(2,"0");r.src=t.img,r.alt=i,r.title=t.title,r.onclick=()=>{var e;return e=t.url,void window.open(e,"_blank")},o.className="charity-item",o.innerText=i,o.appendChild(r),e.appendChild(o)}),function(){let e=document.querySelector(".arrow"),t=document.querySelectorAll(".charity-item").length;e.classList.toggle("up",0>=t-5)}()}),document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("all-categories-header"),t=document.getElementById("categories"),n=document.getElementById("popular-categories-container"),o=document.getElementById("books-container");function r(e,t){document.querySelectorAll(".category-item").forEach(e=>{e.classList.remove("active")}),t.classList.add("active"),o.innerHTML="",fetch(`https://books-backend.p.goit.global/books/category?category=${e}`).then(e=>e.json()).then(e=>{e&&0!==e.length?e.forEach(e=>{let t=document.createElement("div");t.classList.add("book-card"),t.innerHTML=`
                    <img src="${e.book_image}" alt="${e.title}">
                    <div class="book-details">
                        <h3>${e.title}</h3>
                        <p>${e.author}</p>
                    </div>`,o.appendChild(t)}):alert("No books found for the selected category.")}).catch(e=>console.error("Error fetching books:",e)),o.style.display="grid",n.style.display="none"}fetch("https://books-backend.p.goit.global/books/category-list").then(e=>e.json()).then(e=>{e.forEach(e=>{let n=document.createElement("div");n.classList.add("category-item"),n.textContent=e.list_name,n.addEventListener("click",()=>r(e.list_name,n)),t.appendChild(n)}),e.length>0&&r(e[0].list_name,t.children[0])}).catch(e=>console.error("Error fetching categories:",e)),e.addEventListener("click",()=>{o.style.display="none"===o.style.display||""===o.style.display?"grid":"none",n.style.display="none"===n.style.display||""===n.style.display?"block":"none"})}),document.addEventListener("DOMContentLoaded",function(){H.addEventListener("click",()=>{w.style.display="block"}),R.addEventListener("click",()=>{w.style.display="none"}),document.addEventListener("keydown",e=>{"Escape"===e.key&&(w.style.display="none")}),window.addEventListener("click",e=>{e.target==w&&(w.style.display="none")})});const H=document.querySelector(".book-card"),w=document.querySelector(".popup"),R=document.querySelector(".popup__close");document.querySelector(".book");
//# sourceMappingURL=index.07fc4935.js.map