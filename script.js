/* script.js - adds products, offers, and minimal cart interactivity */
const products = [
  {id:1, title:'Aurora Midi Dress', price:79, category:'Dresses', color:'Lilac', description:'Flowy midi dress with breathable fabric, perfect for daytime events.'},
  {id:2, title:'Urban Denim Jacket', price:99, category:'Outerwear', color:'Indigo', description:'Classic denim with a modern cropped cut and reinforced stitching.'},
  {id:3, title:'Flex Run Sneakers', price:89, category:'Sneakers', color:'White', description:'Lightweight running sneakers with responsive foam.'},
  {id:4, title:'Tailored Blazer', price:129, category:'Workwear', color:'Charcoal', description:'Structured blazer for a sharp, professional look.'},
  {id:5, title:'Cosmo Silk Scarf', price:39, category:'Accessories', color:'Printed', description:'Silky scarf to elevate any outfit.'},
  {id:6, title:'Everyday Tee (Pack)', price:29, category:'Basics', color:'Black', description:'Soft cotton tee — wardrobe essential.'}
];

const offers = [
  {name:'Autumn Launch', start:'2025-10-05', end:'2025-10-12', discount:'20% off sitewide', notes:'Extra 5% for newsletter subscribers.'},
  {name:'Black Friday Early', start:'2025-11-20', end:'2025-11-28', discount:'Up to 50% selected items', notes:'Doorbuster deals limited to first 200 orders.'},
  {name:'Holiday Gift Flash', start:'2025-12-15', end:'2025-12-26', discount:'Buy 2 get 1 free on accessories', notes:'Mix & match accessories.'}
];

// Render products
const grid = document.getElementById('product-grid');
products.forEach(p => {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <div class="thumb" style="background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));">
      <div style="text-align:center;width:100%">
        <div style="font-size:28px;margin-bottom:6px">🧥</div>
        <div class="meta">${p.category} • ${p.color}</div>
      </div>
    </div>
    <h3>${p.title}</h3>
    <div class="price">$${p.price.toFixed(2)}</div>
    <div class="meta">${p.description}</div>
    <div class="card-actions">
      <button class="btn-ghost" data-id="${p.id}">Quick view</button>
      <button class="btn-primary" data-buy="${p.id}">Add to cart</button>
    </div>
  `;
  grid.appendChild(card);
});

// Render offers table
const offersBody = document.getElementById('offers-body');
offers.forEach(o => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${o.name}</td>
    <td>${o.start}</td>
    <td>${o.end}</td>
    <td>${o.discount}</td>
    <td>${o.notes}</td>
  `;
  offersBody.appendChild(row);
});

// Modal and cart logic
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const cartBtn = document.getElementById('cart-btn');
const cartCountEl = document.getElementById('cart-count');
let cart = [];

document.addEventListener('click', e => {
  const qv = e.target.closest('[data-id]');
  const add = e.target.closest('[data-buy]');
  if(qv){
    const id = Number(qv.getAttribute('data-id'));
    openQuickView(id);
  } else if(add){
    const id = Number(add.getAttribute('data-buy'));
    addToCart(id);
  }
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

function openQuickView(id){
  const p = products.find(x=>x.id===id);
  modal.setAttribute('aria-hidden','false');
  modalBody.innerHTML = `
    <div style="display:flex;gap:18px;flex-wrap:wrap">
      <div style="flex:1;min-width:220px">
        <div style="height:320px;border-radius:12px;background:linear-gradient(135deg,#7a5cff,#00e0b6);display:flex;align-items:center;justify-content:center;font-size:42px">🛍️</div>
      </div>
      <div style="flex:1.4;min-width:260px">
        <h2 id="modal-title">${p.title}</h2>
        <p class="meta">${p.category} • ${p.color}</p>
        <p style="margin-top:8px">${p.description}</p>
        <p style="font-weight:800;font-size:20px;margin-top:12px">$${p.price.toFixed(2)}</p>
        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn-primary" onclick="addToCart(${p.id})">Add to cart</button>
          <button class="btn-ghost" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `;
  // focus trap shortcut
  modal.querySelector('.btn-primary')?.focus();
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalBody.innerHTML='';
}

function addToCart(id){
  const p = products.find(x=>x.id===id);
  cart.push(p);
  cartCountEl.textContent = cart.length;
  // Show small success modal briefly
  modal.setAttribute('aria-hidden','false');
  modalBody.innerHTML = `
    <div style="padding:24px;text-align:center">
      <h3>Added to cart</h3>
      <p style="margin-top:8px">${p.title} — $${p.price.toFixed(2)}</p>
      <div style="margin-top:12px;display:flex;gap:8px;justify-content:center">
        <button class="btn-primary" onclick="viewCart()">View Cart</button>
        <button class="btn-ghost" onclick="closeModal()">Keep Shopping</button>
      </div>
    </div>
  `;
}

function viewCart(){
  const lines = cart.map((it, idx) => `<li style="margin:6px 0">${idx+1}. ${it.title} — $${it.price.toFixed(2)}</li>`).join('');
  const total = cart.reduce((s,x)=>s+x.price,0);
  modalBody.innerHTML = `
    <div>
      <h2>Shopping Cart</h2>
      <ul style="margin-top:10px;padding-left:18px">${lines}</ul>
      <p style="font-weight:800;margin-top:10px">Total: $${total.toFixed(2)}</p>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn-primary" onclick="checkout()">Checkout</button>
        <button class="btn-ghost" onclick="closeModal()">Continue Shopping</button>
      </div>
    </div>
  `;
}

function checkout(){
  modalBody.innerHTML = `
    <div style="text-align:center;padding:16px">
      <h3>Checkout (demo)</h3>
      <p class="muted">This demo does not process payments. To implement checkout integrate Stripe, PayPal, or another provider.</p>
      <button class="btn-primary" onclick="completeOrder()">Complete order</button>
    </div>
  `;
}

function completeOrder(){
  cart = [];
  cartCountEl.textContent = 0;
  modalBody.innerHTML = `<div style="padding:22px;text-align:center"><h3>Order placed</h3><p class="muted">Thank you! An email receipt would normally be sent.</p><button class="btn-ghost" onclick="closeModal()">Close</button></div>`;
}

// Small initialization bits
document.getElementById('year').textContent = new Date().getFullYear();

// Accessibility: allow Esc to close modal
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });