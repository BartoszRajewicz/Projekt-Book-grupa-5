var e=globalThis,t={},s={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in s){var i=s[e];delete s[e];var r={id:e,exports:{}};return t[e]=r,i.call(r.exports,r,r.exports),r.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){s[e]=t},e.parcelRequired7c6=i),i.register;var r=i("fT1ds");const l={shoppingList:document.querySelector(".shopping-list"),emptyList:document.querySelector(".empty-list"),shoppingListBtn:document.querySelector(".shopping-list-btn")},{shoppingList:o,emptyList:a}=l,n={Amazon:`<img src="${r.amazon}" alt="logo Amazon" width="32" height="11">`,"Barnes and Noble":`<img src="${r.baren}" alt="logo Barnes and Noble" width="16" height="16">`};let c=JSON.parse(localStorage.getItem("shoppingList"))||[];function p(e,t){a.style.display=e,o.style.display=t}0!==c.length?(p("none","flex"),function(e){let t=e.map(({id:e,bookName:t,author:s,img:i,description:l,title:o,shops:a})=>{let c=Array.isArray(a)?a.map(({name:e,url:t})=>{let s=n[e]||"";return`<li class="shop-item"><a href="${t}" target="_blank" class="shop-link-image">${s}</a></li>`}).join("\n"):"";return""===i&&(i=`${noImage}`),`<li class="shoplist-item" data-idcard="${e}">
        <button type="button" class="delate-btn" data-id="${e}">
          <svg class="delate-svg" width="16" height="16">
            ${r.trashSvg}
          </svg>
        </button>
        <img class="img-shoplist-card" src="${i}" alt="${o}" width="100" height="142" />
        <div class="card-shoplist">
          <h2 class="card-title-shoplist">${o}</h2>
          <p class="card-category-shoplist">${t}</p>
          <p class="card-description-shoplist">${l}</p>
          <div class="wrapper-card-shoplist-footer">
            <p class="card-author-shoplist">${s}</p>
            <ul class="shops-list">${c}</ul>
          </div>
        </div>
      </li>`});o.innerHTML=t.join("")}(c)):p("block","none"),i("7l8RX"),i("cGyb6"),i("fT1ds"),i("ef67P");const{shoppingList:d}=l;function h(e){let t=e.currentTarget.dataset.id;localStorage.removeItem(t),firebase_deleteItem(t),e.currentTarget.parentNode.remove(),""===d.innerHTML?p("block","none"):p("none","flex")}document.querySelectorAll(".delate-btn").forEach(e=>{e.addEventListener("click",h)});
//# sourceMappingURL=shopping.a82ae1a4.js.map
