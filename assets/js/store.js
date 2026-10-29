/* ============ Lueur 购物车 + 结账（首页/集合页共用） ============ */
let cart={};
try{cart=JSON.parse(localStorage.getItem("ql_cart")||"{}");}catch(e){cart={};}
function saveCart(){localStorage.setItem("ql_cart",JSON.stringify(cart));renderCart();}
function addToCart(id){cart[id]=(cart[id]||0)+1;saveCart();}
function changeQty(id,d){if(!cart[id])return;cart[id]+=d;if(cart[id]<=0)delete cart[id];saveCart();}
function cartCount(){return Object.values(cart).reduce((a,b)=>a+b,0);}
function renderCart(){
  const box=document.querySelector("[data-cart-items]");
  if(!box)return;
  const ids=Object.keys(cart);
  if(!ids.length){box.innerHTML=`<div class="drawer-empty">Your cart is empty — the pearls are waiting.</div>`;}
  else{
    box.innerHTML=ids.map(id=>{
      const p=PRODUCTS.find(x=>x.id===id);if(!p)return"";
      return `<div class="d-item"><div class="thumb">💎</div><div><b>${p.t}</b><small>${fmt(p.price)}</small></div>
      <div class="qty"><button data-dec="${id}">−</button><span>${cart[id]}</span><button data-inc="${id}">+</button></div></div>`;
    }).join("");
  }
  const sub=ids.reduce((s,id)=>{const p=PRODUCTS.find(x=>x.id===id);return s+(p?p.price*cart[id]:0);},0);
  const ship=sub===0?0:(sub>=FREE_SHIP?0:5.9);
  document.querySelector("[data-sum-subtotal]").textContent=fmt(sub);
  document.querySelector("[data-sum-ship]").textContent=sub===0?"—":(ship===0?"FREE":fmt(ship));
  document.querySelector("[data-sum-total]").textContent=fmt(sub+ship);
  document.querySelector("[data-cart-count]").textContent=cartCount();
  const hint=document.querySelector("[data-ship-hint]");
  if(sub===0)hint.textContent=`Free shipping on orders over $${FREE_SHIP}.`;
  else if(sub<FREE_SHIP)hint.textContent=`You're ${fmt(FREE_SHIP-sub)} away from free shipping — add one more piece.`;
  else hint.textContent=`🎉 You've unlocked free shipping.`;
}
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");if(add){addToCart(add.dataset.add);return;}
  const inc=e.target.closest("[data-inc]");if(inc){changeQty(inc.dataset.inc,1);return;}
  const dec=e.target.closest("[data-dec]");if(dec){changeQty(dec.dataset.dec,-1);return;}
  if(e.target.closest("[data-open-cart]")){document.querySelector(".drawer").classList.add("open");document.querySelector(".drawer-mask").classList.add("open");}
  if(e.target.closest("[data-close-cart]")){document.querySelector(".drawer").classList.remove("open");document.querySelector(".drawer-mask").classList.remove("open");}
});
/* ============ CHECKOUT ============ */
const money2=n=>n.toFixed(2);
let paypalRendered=false;
function loadPayPalSdk(cb){
  const cfg=window.QL_PAYMENTS||{};
  if(document.getElementById("paypal-sdk")){cb();return;}
  const s=document.createElement("script");
  s.id="paypal-sdk";
  s.src="https://www.paypal.com/sdk/js?client-id="+encodeURIComponent(cfg.paypalClientId)+"&currency="+(cfg.paypalCurrency||"USD");
  s.onload=cb;
  document.body.appendChild(s);
}
function renderPayPal(){
  const cfg=window.QL_PAYMENTS||{};
  const box=document.getElementById("paypal-buttons");
  if(!cfg.paypalClientId){box.style.display="none";return;}
  const ids=Object.keys(cart);
  if(!ids.length){box.innerHTML="";return;}
  if(paypalRendered){return;}
  loadPayPalSdk(()=>{
    paypal.Buttons({
      createOrder:(data,actions)=>{
        const lines=Object.keys(cart);
        const sub=lines.reduce((s,id)=>{const p=PRODUCTS.find(x=>x.id===id);return s+(p?p.price*cart[id]:0);},0);
        const ship=sub>=FREE_SHIP?0:((window.QL_PAYMENTS&&window.QL_PAYMENTS.flatShipping)||5.90);
        const cur=(window.QL_PAYMENTS&&window.QL_PAYMENTS.paypalCurrency)||"USD";
        return actions.order.create({
          purchase_units:[{
            amount:{value:money2(sub+ship),breakdown:{item_total:{value:money2(sub)},shipping:{value:money2(ship)}}},
            items:lines.map(id=>{const p=PRODUCTS.find(x=>x.id===id);return{
              name:p.t.slice(0,126),
              unit_amount:{currency_code:cur,value:money2(p.price)},
              quantity:String(cart[id]),
              category:"PHYSICAL_GOODS"};})
          }]
        });
      },
      onApprove:(data,actions)=>{
        return actions.order.capture().then(det=>{
          /* TODO(上线后)：把订单信息发到你邮箱/表格（可接 Make.com 或后端 webhook） */
          cart={};saveCart();
          document.querySelector(".drawer").classList.remove("open");
          document.querySelector(".drawer-mask").classList.remove("open");
          alert("Payment completed — thank you! Order ref: "+(det.id||"").slice(-8)+"\nA confirmation email will follow.");
        });
      }
    }).render("#paypal-buttons");
    paypalRendered=true;
  });
}
document.querySelector("[data-checkout]").addEventListener("click",()=>{
  const cfg=window.QL_PAYMENTS||{};
  const ids=Object.keys(cart);
  if(!ids.length){alert("Your cart is empty.");return;}
  const links=cfg.stripeLinks||{};
  if(ids.length===1&&links[ids[0]]){
    const base=links[ids[0]];
    window.location.href=base+(base.includes("?")?"&":"?")+"quantity="+cart[ids[0]];
    return;
  }
  if(cfg.paypalClientId){
    renderPayPal();
    setTimeout(()=>document.getElementById("paypal-buttons").scrollIntoView({behavior:"smooth",block:"center"}),300);
    return;
  }
  alert("Payments are not configured yet.\n\nStore owner: open assets/js/payments.js and add your Stripe Payment Links or PayPal Client ID (see 支付接入清单).");
});
renderCart();
