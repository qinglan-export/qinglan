/* ============ Lueur 商品数据（前台/集合页共用，改这里即可全站生效） ============ */
const CATS=[
 {id:"pearl",label:"Pearls"},
 {id:"waterproof",label:"Waterproof Gold"},
 {id:"silver",label:"Miao & 925 Silver"},
 {id:"gemstone",label:"Birthstones"},
 {id:"gift",label:"Gifts & Under $25"},
 {id:"all",label:"Shop All"}
];
/* price in USD; compare = 划线价; from=true → "From $x"
   imgs: 放 assets/img/ 下；多张即成可滑动图库；缺失显示占位块 */
const PRODUCTS=[
/* ---- Pearls ---- */
 {id:"p1",cat:"pearl",t:"Layered Pearl & Coin Necklace",tag:"Freshwater pearls on a pre-layered double chain — one clasp, no tangles",price:34,compare:49,imgs:["assets/img/pearl-flatlay.jpg"],badges:["BESTSELLER"]},
 {id:"p4",cat:"pearl",t:"Baroque Pearl Pendant Necklace",tag:"One irregular baroque pearl on a fine gold chain",price:27,imgs:["assets/img/baroque-layered.jpg"],badges:["NEW"]},
 {id:"p9",cat:"pearl",t:"Pearl Drop Earrings",tag:"Gold-accented freshwater pearls, weightless on the ear",price:19,imgs:["assets/img/earrings-lifestyle.jpg"]},
 {id:"p10",cat:"pearl",t:"Pearl & Gold Huggie Hoops",tag:"Tiny hoops with a freshwater pearl — stack them, sleep in them",price:17,imgs:["assets/img/gold-hoops.jpg"]},

/* ---- Waterproof gold steel ---- */
 {id:"w1",cat:"waterproof",t:"Waterproof Cuban Chain Necklace",tag:"316L steel core, 18k gold plating — shower, gym, pool, repeat",price:28,imgs:["assets/img/hero.jpg"],badges:["WATERPROOF"]},
 {id:"w2",cat:"waterproof",t:"Paperclip Chain Necklace",tag:"The minimalist layering chain that never loses its colour",price:24,imgs:["assets/img/silver-necklace.jpg"],badges:["WATERPROOF"]},
 {id:"w3",cat:"waterproof",t:"Sun & Moon Celestial Necklace",tag:"Sun, moon and star — the celestial search that never cools",price:26,imgs:["assets/img/charm-bracelet.jpg"],badges:["WATERPROOF","TRENDING"]},
 {id:"w5",cat:"waterproof",t:"Waterproof Gift Set — 3 Pieces",tag:"Necklace + bracelet + ring in one gift box",price:46,compare:72,imgs:["assets/img/gold-bangles.jpg"],badges:["WATERPROOF","SET"]},
 {id:"w6",cat:"waterproof",t:"CZ Pave Stacking Rings — Set of 3",tag:"Stacked sparkle without the stacked price",price:29,imgs:["assets/img/rings-hands.jpg"],badges:["WATERPROOF"]},
 {id:"w8",cat:"waterproof",t:"Gunmetal Steel Chain",tag:"Black-tone steel — the low-competition alternative finish",price:24,imgs:["assets/img/seashell-necklace.jpg"],badges:["WATERPROOF"]},
 {id:"w9",cat:"waterproof",t:"Botanical Leaf Pendant",tag:"Nature-inspired pendant on a tarnish-free steel chain",price:22,imgs:["assets/img/pearl-tassel.jpg"],badges:["WATERPROOF"]},

/* ---- Miao & 925 silver ---- */
 {id:"m1",cat:"silver",t:"Miao Filigree Butterfly Earrings — 925",tag:"Hand-pierced filigree wings in the Miao silversmith tradition",price:32,imgs:["assets/img/mop-earrings.jpg"],badges:["HANDMADE","NEW"]},
 {id:"m2",cat:"silver",t:"Miao Silver Bell Tassel Earrings — 925",tag:"Tiny bells and sterling tassels — a soft chime with every step",price:29,imgs:["assets/img/gold-earring.jpg"],badges:["HANDMADE"]},
 {id:"m3",cat:"silver",t:"Miao Silver Filigree Bangle — 925",tag:"Open-work filigree cuff, polished bright — heritage craft, daily weight",price:42,imgs:["assets/img/hands-jewelry.jpg"],badges:["HANDMADE"]},
 {id:"m4",cat:"silver",t:"Miao Silver Twist Torque Necklace — 925",tag:"Twisted torque collar with silver loop ends — the statement piece",price:46,imgs:["assets/img/pearl-pendant.jpg"],badges:["HANDMADE"]},
 {id:"m6",cat:"silver",t:"Turquoise Medallion Necklace — 925",tag:"Boho coin medallion set with turquoise on a sterling chain",price:36,imgs:["assets/img/pearl-dish.jpg"],badges:["925 SILVER"]},

/* ---- Lab-grown gemstones ---- */
 {id:"g1",cat:"gemstone",t:"Birthstone Pendant Necklace",tag:"Lab-grown stone for your month — collect all twelve",price:39,from:true,imgs:["assets/img/baroque-choker.jpg"],badges:["LAB-GROWN"]},
 {id:"g2",cat:"gemstone",t:"Lab-Grown Emerald Halo Ring — 925",tag:"Halo-set green stone with a disclosure card in every box",price:55,imgs:["assets/img/gold-rings.jpg"],badges:["LAB-GROWN"]},

/* ---- Gifts & personalized ---- */
 {id:"c1",cat:"gift",t:"Custom Name Necklace",tag:"Her name in delicate script — Etsy's #1 jewelry format",price:32,from:true,imgs:["assets/img/pearl-necklace.jpg"],badges:["CUSTOM","BESTSELLER"]},
 {id:"c2",cat:"gift",t:"Initial Letter Necklace",tag:"Your letter, 26 ways — the evergreen personalized gift",price:26,imgs:["assets/img/hoops-portrait.jpg"]}
];
const FREE_SHIP=49;

/* ============ 渲染工具（两个页面共用） ============ */
const fmt=n=>"$"+n.toFixed(2);
function imgFallback(el,label){
  const d=document.createElement("div");d.className="imgph";
  d.textContent=label||"Product photo coming soon";
  el.replaceWith(d);
}
window.imgFallback=imgFallback;
function badgeHtml(p,extra){const bs=[...(p.badges||[])];if(p.compare)bs.unshift("SALE");if(extra)bs.unshift(extra);return bs.length?`<div class="badges">${bs.map(b=>`<span class="badge ${b==="NEW"?"b-new":b==="WATERPROOF"?"b-water":"b-sale"}">${b}</span>`).join("")}</div>`:"";}
function priceHtml(p){
  const reg=`<span class="price-label">Regular price${p.from?" From":""} ${fmt(p.compare||p.price)} USD</span>`;
  if(p.compare)return `<div class="price-row"><span class="compare">${reg}</span><span class="price-label">Sale price${p.from?" From":""}</span><span class="price">${fmt(p.price)} USD</span></div>`;
  return `<div class="price-row"><span class="price-label">Regular price${p.from?" From":""}</span><span class="price">${fmt(p.price)} USD</span></div>`;
}
function starsHtml(){return `<div class="stars-row"><span class="st">★★★★★</span><span>No reviews yet</span></div>`;}
function galleryHtml(p){
  const shots=(p.imgs&&p.imgs.length)?p.imgs:[];
  if(!shots.length)return `<div class="card-img">${badgeHtml(p)}<div class="imgph">Product photo coming soon</div></div>`;
  const slides=shots.map(src=>`<img src="${src}" alt="${p.t}" loading="lazy" onerror="imgFallback(this)">`).join("");
  const dots=shots.length>1?`<div class="gal-dots">${shots.map((_,i)=>`<i class="${i===0?"on":""}"></i>`).join("")}</div>`:"";
  return `<div class="card-img">${badgeHtml(p)}<div class="gal" data-gal>${slides}</div>${dots}</div>`;
}
function cardHtml(p){return `<div class="card-p" data-id="${p.id}">
  ${galleryHtml(p)}
  <div class="card-body">
    <span class="card-title">${p.t}</span>
    <span class="card-tag">${p.tag}</span>
    ${starsHtml()}
    ${priceHtml(p)}
    <button class="add" data-add="${p.id}">Add to cart</button>
  </div></div>`;}
