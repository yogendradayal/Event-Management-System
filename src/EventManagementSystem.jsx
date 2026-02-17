import { useState, useEffect, createContext, useContext } from "react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES  (injected once)
═══════════════════════════════════════════════════════════ */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --bg:#0a0f1e;
  --surface:#111827;
  --surface2:#1a2235;
  --border:#1f2d45;
  --accent:#e8b86d;
  --accent2:#5b8dee;
  --accent3:#4fd1a5;
  --danger:#f87171;
  --text:#e8edf5;
  --muted:#6b7a99;
  --gold:linear-gradient(135deg,#e8b86d,#f5d08a,#c9963c);
  --blue:linear-gradient(135deg,#5b8dee,#3a6fd4);
  --green:linear-gradient(135deg,#4fd1a5,#34b88e);
  --font-display:'Playfair Display',serif;
  --font-body:'DM Sans',sans-serif;
  --radius:14px;
  --shadow:0 8px 32px rgba(0,0,0,.5);
  --transition:.22s cubic-bezier(.4,0,.2,1);
}

body{background:var(--bg);color:var(--text);font-family:var(--font-body);min-height:100vh;
  background-image:radial-gradient(ellipse 80% 60% at 50% -10%,rgba(91,141,238,.12),transparent),
                   radial-gradient(ellipse 40% 40% at 90% 90%,rgba(79,209,165,.07),transparent);}

/* scrollbar */
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}

/* ── Layout ── */
.page{min-height:100vh;display:flex;flex-direction:column}
.container{max-width:1100px;margin:0 auto;padding:0 24px;width:100%}

/* ── Navbar ── */
.navbar{background:rgba(10,15,30,.85);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);
  padding:14px 0;position:sticky;top:0;z-index:100}
.navbar-inner{display:flex;align-items:center;justify-content:space-between}
.navbar-brand{font-family:var(--font-display);font-size:1.4rem;color:var(--accent);letter-spacing:.02em;cursor:pointer}
.navbar-nav{display:flex;gap:8px;align-items:center}
.nav-btn{background:none;border:1px solid var(--border);color:var(--muted);padding:7px 16px;border-radius:50px;
  font-family:var(--font-body);font-size:.82rem;cursor:pointer;transition:var(--transition)}
.nav-btn:hover{border-color:var(--accent);color:var(--accent)}
.nav-btn.active{background:var(--gold);border-color:transparent;color:#1a1200;font-weight:600}
.nav-btn.danger{border-color:var(--danger);color:var(--danger)}
.nav-btn.danger:hover{background:var(--danger);color:#fff}

/* ── Hero ── */
.hero{text-align:center;padding:80px 24px 60px}
.hero-tag{display:inline-block;background:rgba(232,184,109,.12);border:1px solid rgba(232,184,109,.3);
  color:var(--accent);padding:5px 16px;border-radius:50px;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:20px}
.hero h1{font-family:var(--font-display);font-size:clamp(2.4rem,6vw,4rem);line-height:1.1;
  background:var(--gold);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:14px}
.hero p{color:var(--muted);font-size:1.05rem;max-width:480px;margin:0 auto 36px;line-height:1.7}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

/* ── Buttons ── */
.btn{padding:12px 28px;border-radius:50px;font-family:var(--font-body);font-size:.9rem;font-weight:600;
  cursor:pointer;border:none;transition:var(--transition);display:inline-flex;align-items:center;gap:8px}
.btn-gold{background:var(--gold);color:#1a1200}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(232,184,109,.35)}
.btn-outline{background:transparent;border:1px solid var(--border);color:var(--muted)}
.btn-outline:hover{border-color:var(--accent2);color:var(--accent2)}
.btn-blue{background:var(--blue);color:#fff}
.btn-blue:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(91,141,238,.35)}
.btn-green{background:var(--green);color:#0a2018}
.btn-green:hover{transform:translateY(-2px)}
.btn-danger{background:none;border:1px solid var(--danger);color:var(--danger)}
.btn-danger:hover{background:var(--danger);color:#fff}
.btn-sm{padding:7px 18px;font-size:.8rem}
.btn-full{width:100%;justify-content:center}
.btn:disabled{opacity:.45;cursor:not-allowed;transform:none!important}

/* ── Cards ── */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px;
  transition:var(--transition)}
.card:hover{border-color:rgba(232,184,109,.25);box-shadow:0 4px 24px rgba(232,184,109,.08)}
.card-grid{display:grid;gap:20px}
.card-grid-2{grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
.card-grid-3{grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}
.card-grid-4{grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}

/* ── Forms ── */
.form-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;
  padding:40px;max-width:460px;margin:0 auto;width:100%}
.form-card.wide{max-width:620px}
.form-title{font-family:var(--font-display);font-size:1.8rem;margin-bottom:6px;color:var(--text)}
.form-sub{color:var(--muted);font-size:.88rem;margin-bottom:28px}
.field{margin-bottom:18px}
.field label{display:block;color:var(--muted);font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;margin-bottom:7px}
.field input,.field select{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:10px;
  padding:12px 16px;color:var(--text);font-family:var(--font-body);font-size:.95rem;transition:var(--transition);outline:none}
.field input:focus,.field select:focus{border-color:var(--accent2);box-shadow:0 0 0 3px rgba(91,141,238,.15)}
.field input::placeholder{color:var(--muted)}
.field select option{background:var(--surface2)}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.form-actions{display:flex;gap:12px;margin-top:24px}
.error-msg{color:var(--danger);font-size:.83rem;margin-top:5px}

/* ── Table ── */
.table-wrap{overflow-x:auto;border-radius:var(--radius);border:1px solid var(--border)}
table{width:100%;border-collapse:collapse}
thead{background:var(--surface2)}
th{padding:13px 16px;text-align:left;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--border)}
td{padding:13px 16px;border-bottom:1px solid rgba(31,45,69,.5);font-size:.9rem;vertical-align:middle}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(91,141,238,.04)}

/* ── Badge ── */
.badge{display:inline-flex;align-items:center;padding:3px 11px;border-radius:50px;font-size:.76rem;font-weight:600}
.badge-green{background:rgba(79,209,165,.15);color:var(--accent3)}
.badge-blue{background:rgba(91,141,238,.15);color:var(--accent2)}
.badge-amber{background:rgba(232,184,109,.15);color:var(--accent)}
.badge-red{background:rgba(248,113,113,.15);color:var(--danger)}

/* ── Page Header ── */
.page-header{padding:36px 0 24px}
.page-header h2{font-family:var(--font-display);font-size:2rem;color:var(--text)}
.page-header p{color:var(--muted);margin-top:6px}

/* ── Divider ── */
.divider{height:1px;background:var(--border);margin:24px 0}

/* ── Vendor Card ── */
.vendor-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  overflow:hidden;transition:var(--transition);cursor:pointer}
.vendor-card:hover{border-color:rgba(91,141,238,.4);transform:translateY(-3px);box-shadow:0 12px 40px rgba(91,141,238,.12)}
.vendor-card-img{height:120px;display:flex;align-items:center;justify-content:center;font-size:2.8rem;
  background:var(--surface2)}
.vendor-card-body{padding:18px}
.vendor-card-body h3{font-size:1rem;font-weight:600;margin-bottom:4px}
.vendor-card-body p{color:var(--muted);font-size:.82rem;line-height:1.5;margin-bottom:14px}

/* ── Product Card ── */
.product-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  overflow:hidden;transition:var(--transition)}
.product-card:hover{border-color:rgba(232,184,109,.3);transform:translateY(-2px)}
.product-card-img{height:140px;background:var(--surface2);display:flex;align-items:center;justify-content:center;
  font-size:3rem}
.product-card-body{padding:16px}
.product-card-body h3{font-size:.95rem;font-weight:600;margin-bottom:4px}
.product-card-price{font-family:var(--font-display);color:var(--accent);font-size:1.1rem;margin-bottom:14px}

/* ── Cart ── */
.cart-item{display:flex;gap:16px;align-items:center;padding:16px 0;border-bottom:1px solid var(--border)}
.cart-item-img{width:60px;height:60px;background:var(--surface2);border-radius:10px;
  display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0}
.cart-item-info{flex:1}
.cart-item-info h4{font-size:.95rem;margin-bottom:2px}
.cart-item-info p{color:var(--muted);font-size:.82rem}
.cart-total-box{background:var(--surface2);border-radius:var(--radius);padding:20px;margin-top:20px}
.qty-control{display:flex;align-items:center;gap:8px}
.qty-btn{width:28px;height:28px;border-radius:50%;border:1px solid var(--border);background:none;
  color:var(--text);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:var(--transition)}
.qty-btn:hover{border-color:var(--accent);color:var(--accent)}

/* ── Modal / Popup ── */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(6px);
  display:flex;align-items:center;justify-content:center;z-index:200;padding:20px}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:20px;
  padding:36px;max-width:500px;width:100%;animation:modalIn .25s ease}
@keyframes modalIn{from{transform:scale(.94);opacity:0}to{transform:scale(1);opacity:1}}
.modal h2{font-family:var(--font-display);font-size:1.6rem;margin-bottom:20px;color:var(--accent)}

/* ── Radio ── */
.radio-group{display:flex;flex-direction:column;gap:10px;margin:12px 0}
.radio-item{display:flex;align-items:center;gap:10px;padding:12px 16px;background:var(--surface2);
  border:1px solid var(--border);border-radius:10px;cursor:pointer;transition:var(--transition)}
.radio-item:hover{border-color:var(--accent2)}
.radio-item.selected{border-color:var(--accent2);background:rgba(91,141,238,.08)}
.radio-item input{accent-color:var(--accent2)}

/* ── Stat Cards ── */
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  padding:22px;display:flex;align-items:center;gap:16px}
.stat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem}
.stat-icon.gold{background:rgba(232,184,109,.15)}
.stat-icon.blue{background:rgba(91,141,238,.15)}
.stat-icon.green{background:rgba(79,209,165,.15)}
.stat-icon.red{background:rgba(248,113,113,.15)}
.stat-info h3{font-size:1.5rem;font-weight:700;font-family:var(--font-display)}
.stat-info p{color:var(--muted);font-size:.82rem;margin-top:2px}

/* ── Tab ── */
.tabs{display:flex;gap:4px;background:var(--surface2);border-radius:50px;padding:4px;
  border:1px solid var(--border);width:fit-content;margin-bottom:24px}
.tab{padding:8px 20px;border-radius:50px;cursor:pointer;font-size:.85rem;transition:var(--transition);border:none;
  background:none;color:var(--muted);font-family:var(--font-body)}
.tab.active{background:var(--accent2);color:#fff;font-weight:600}

/* ── Toast ── */
.toast{position:fixed;bottom:28px;right:28px;background:var(--surface);border:1px solid var(--accent3);
  color:var(--text);padding:14px 22px;border-radius:12px;font-size:.9rem;z-index:300;
  animation:toastIn .3s ease;box-shadow:0 8px 32px rgba(0,0,0,.4);display:flex;align-items:center;gap:10px}
@keyframes toastIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}

/* ── Auth layout ── */
.auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px;
  background:var(--bg);
  background-image:radial-gradient(ellipse 60% 50% at 30% 20%,rgba(91,141,238,.1),transparent),
                   radial-gradient(ellipse 50% 40% at 80% 80%,rgba(79,209,165,.07),transparent)}
.auth-logo{font-family:var(--font-display);font-size:1.1rem;color:var(--accent);text-align:center;
  margin-bottom:28px;letter-spacing:.04em}

/* ── Section heading ── */
.section-label{font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:12px}

/* ── Checkout steps ── */
.step-indicator{display:flex;gap:0;margin-bottom:32px}
.step{flex:1;text-align:center;position:relative}
.step::after{content:'';position:absolute;top:16px;left:50%;width:100%;height:2px;background:var(--border)}
.step:last-child::after{display:none}
.step-dot{width:32px;height:32px;border-radius:50%;background:var(--surface2);border:2px solid var(--border);
  display:flex;align-items:center;justify-content:center;margin:0 auto 8px;font-size:.8rem;position:relative;z-index:1;transition:var(--transition)}
.step.active .step-dot{background:var(--accent2);border-color:var(--accent2);color:#fff}
.step.done .step-dot{background:var(--accent3);border-color:var(--accent3);color:#0a2018}
.step-label{font-size:.72rem;color:var(--muted)}
.step.active .step-label{color:var(--accent2)}

/* ── Empty state ── */
.empty-state{text-align:center;padding:60px 20px;color:var(--muted)}
.empty-state .icon{font-size:3rem;margin-bottom:14px;opacity:.4}
.empty-state p{font-size:.95rem}

/* ── Success ── */
.success-ring{width:80px;height:80px;border-radius:50%;background:rgba(79,209,165,.15);
  border:3px solid var(--accent3);display:flex;align-items:center;justify-content:center;
  font-size:2rem;margin:0 auto 20px}

/* ── Breadcrumb ── */
.breadcrumb{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:.83rem;margin-bottom:16px}
.breadcrumb span{cursor:pointer;transition:var(--transition)}
.breadcrumb span:hover{color:var(--accent)}
.breadcrumb .sep{opacity:.4}

/* ── Responsive ── */
@media(max-width:640px){
  .form-row{grid-template-columns:1fr}
  .hero{padding:50px 16px 40px}
  .card-grid-4{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}
  .form-card{padding:28px 20px}
}
`;

/* ═══════════════════════════════════════════════════════════
   CONTEXT & STORE
═══════════════════════════════════════════════════════════ */
const AppCtx = createContext(null);

const INITIAL = {
  users: [{ id: 1, name: "Alice", email: "user@ems.com", password: "user123", role: "user" }],
  vendors: [
    { id: 1, name: "Golden Fork Catering", email: "vendor@ems.com", password: "vendor123",
      category: "Catering", contact: "+91 9876543210", desc: "Premium catering for all events",
      products: [
        { id: 1, name: "Veg Thali", price: 350, emoji: "🍱" },
        { id: 2, name: "BBQ Platter", price: 650, emoji: "🍖" },
        { id: 3, name: "Dessert Buffet", price: 450, emoji: "🍰" },
        { id: 4, name: "Welcome Drinks", price: 200, emoji: "🥤" },
      ]},
    { id: 2, name: "Bloom Florists", email: "bloom@ems.com", password: "bloom123",
      category: "Florist", contact: "+91 9988776655", desc: "Exquisite floral arrangements",
      products: [
        { id: 5, name: "Rose Centrepiece", price: 1200, emoji: "🌹" },
        { id: 6, name: "Stage Arch", price: 4500, emoji: "🌸" },
        { id: 7, name: "Table Bouquet", price: 800, emoji: "💐" },
        { id: 8, name: "Entry Garland", price: 2200, emoji: "🌺" },
      ]},
    { id: 3, name: "Glitter Decorations", email: "glitter@ems.com", password: "glitter123",
      category: "Decoration", contact: "+91 9123456789", desc: "Stunning event décor & themes",
      products: [
        { id: 9, name: "Balloon Wall", price: 3500, emoji: "🎈" },
        { id: 10, name: "LED Backdrop", price: 8000, emoji: "✨" },
        { id: 11, name: "Chair Covers", price: 60, emoji: "🪑" },
        { id: 12, name: "Themed Setup", price: 15000, emoji: "🎪" },
      ]},
    { id: 4, name: "Luminary Lighting", email: "lumi@ems.com", password: "lumi123",
      category: "Lighting", contact: "+91 9001122334", desc: "Professional lighting solutions",
      products: [
        { id: 13, name: "Fairy Lights", price: 1500, emoji: "💡" },
        { id: 14, name: "Laser Show", price: 12000, emoji: "🔦" },
        { id: 15, name: "Wash Lights", price: 5000, emoji: "🌟" },
        { id: 16, name: "Candle Setup", price: 2800, emoji: "🕯️" },
      ]},
  ],
  admins: [{ id: 1, email: "admin@ems.com", password: "admin123" }],
  cart: [],
  orders: [],
  memberships: [],
  requests: [],
  session: null,
};

function useStore() {
  const [state, setState] = useState(INITIAL);
  const set = (fn) => setState(s => ({ ...s, ...fn(s) }));

  return {
    state,
    login(role, email, password) {
      if (role === "admin") {
        const a = state.admins.find(a => a.email === email && a.password === password);
        if (a) { set(() => ({ session: { role: "admin", id: a.id, name: "Admin" } })); return true; }
      } else if (role === "vendor") {
        const v = state.vendors.find(v => v.email === email && v.password === password);
        if (v) { set(() => ({ session: { role: "vendor", id: v.id, name: v.name } })); return true; }
      } else {
        const u = state.users.find(u => u.email === email && u.password === password);
        if (u) { set(() => ({ session: { role: "user", id: u.id, name: u.name } })); return true; }
      }
      return false;
    },
    logout() { set(() => ({ session: null, cart: [] })); },
    signupUser(name, email, password) {
      const exists = state.users.find(u => u.email === email);
      if (exists) return false;
      const id = Date.now();
      set(s => ({ users: [...s.users, { id, name, email, password, role: "user" }] }));
      set(() => ({ session: { role: "user", id, name } }));
      return true;
    },
    signupVendor(name, email, password, category) {
      const exists = state.vendors.find(v => v.email === email);
      if (exists) return false;
      const id = Date.now();
      set(s => ({
        vendors: [...s.vendors, { id, name, email, password, category,
          contact: "", desc: `${category} services`, products: [] }]
      }));
      set(() => ({ session: { role: "vendor", id, name } }));
      return true;
    },
    addToCart(product, vendorId) {
      set(s => {
        const existing = s.cart.find(c => c.productId === product.id);
        if (existing) return { cart: s.cart.map(c => c.productId === product.id ? { ...c, qty: c.qty + 1 } : c) };
        return { cart: [...s.cart, { productId: product.id, vendorId, name: product.name,
          price: product.price, emoji: product.emoji, qty: 1 }] };
      });
    },
    removeFromCart(productId) { set(s => ({ cart: s.cart.filter(c => c.productId !== productId) })); },
    updateQty(productId, qty) {
      if (qty < 1) { set(s => ({ cart: s.cart.filter(c => c.productId !== productId) })); return; }
      set(s => ({ cart: s.cart.map(c => c.productId === productId ? { ...c, qty } : c) }));
    },
    clearCart() { set(() => ({ cart: [] })); },
    placeOrder(details) {
      const orderId = `ORD-${Date.now()}`;
      const total = state.cart.reduce((s, c) => s + c.price * c.qty, 0);
      const order = { id: orderId, ...details, items: state.cart, total, status: "Received",
        createdAt: new Date().toLocaleDateString() };
      set(s => ({ orders: [...s.orders, order], cart: [] }));
      return orderId;
    },
    updateOrderStatus(orderId, status) {
      set(s => ({ orders: s.orders.map(o => o.id === orderId ? { ...o, status } : o) }));
    },
    addProduct(vendorId, product) {
      set(s => ({
        vendors: s.vendors.map(v => v.id === vendorId
          ? { ...v, products: [...v.products, { ...product, id: Date.now() }] } : v)
      }));
    },
    deleteProduct(vendorId, productId) {
      set(s => ({
        vendors: s.vendors.map(v => v.id === vendorId
          ? { ...v, products: v.products.filter(p => p.id !== productId) } : v)
      }));
    },
    updateProduct(vendorId, product) {
      set(s => ({
        vendors: s.vendors.map(v => v.id === vendorId
          ? { ...v, products: v.products.map(p => p.id === product.id ? product : p) } : v)
      }));
    },
    addMembership(m) { set(s => ({ memberships: [...s.memberships, { ...m, id: Date.now() }] })); },
    addRequest(req) { set(s => ({ requests: [...s.requests, { ...req, id: Date.now() }] })); },
    deleteUser(id) { set(s => ({ users: s.users.filter(u => u.id !== id) })); },
    deleteVendor(id) { set(s => ({ vendors: s.vendors.filter(v => v.id !== id) })); },
    getVendor(id) { return state.vendors.find(v => v.id === id); },
    getSession() { return state.session; },
  };
}

/* ═══════════════════════════════════════════════════════════
   SMALL SHARED COMPONENTS
═══════════════════════════════════════════════════════════ */
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return <div className="toast">✅ {msg}</div>;
}

function Navbar({ page, setPage, store }) {
  const session = store.getSession();
  const cartCount = store.state.cart.reduce((s, c) => s + c.qty, 0);

  if (!session) return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <span className="navbar-brand" onClick={() => setPage("home")}>✦ EventCraft</span>
        <div className="navbar-nav">
          <button className="nav-btn" onClick={() => setPage("adminLogin")}>Admin</button>
          <button className="nav-btn" onClick={() => setPage("vendorLogin")}>Vendor</button>
          <button className="nav-btn active" onClick={() => setPage("userLogin")}>Sign In</button>
        </div>
      </div>
    </nav>
  );

  const role = session.role;
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <span className="navbar-brand" onClick={() => setPage(role === "admin" ? "adminDash" : role === "vendor" ? "vendorHome" : "userPortal")}>
          ✦ EventCraft
        </span>
        <div className="navbar-nav">
          {role === "user" && <>
            <button className="nav-btn" onClick={() => setPage("vendorBrowse")}>Vendors</button>
            <button className="nav-btn" onClick={() => setPage("cart")}>
              Cart {cartCount > 0 && <span className="badge badge-amber">{cartCount}</span>}
            </button>
            <button className="nav-btn" onClick={() => setPage("guestList")}>Guests</button>
            <button className="nav-btn" onClick={() => setPage("orderStatus")}>Orders</button>
          </>}
          {role === "vendor" && <>
            <button className="nav-btn" onClick={() => setPage("yourItems")}>My Items</button>
            <button className="nav-btn" onClick={() => setPage("addItem")}>Add Item</button>
            <button className="nav-btn" onClick={() => setPage("transactions")}>Transactions</button>
            <button className="nav-btn" onClick={() => setPage("requestItem")}>Requests</button>
          </>}
          {role === "admin" && <>
            <button className="nav-btn" onClick={() => setPage("maintainUser")}>Users</button>
            <button className="nav-btn" onClick={() => setPage("maintainVendor")}>Vendors</button>
          </>}
          <button className="nav-btn danger" onClick={() => { store.logout(); setPage("home"); }}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════════════════ */

/* ── HOME ── */
function HomePage({ setPage }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-tag">Event Management System</div>
        <h1>Craft Extraordinary<br />Events</h1>
        <p>Connect with premium vendors, manage your guest list, and create unforgettable experiences.</p>
        <div className="hero-btns">
          <button className="btn btn-gold" onClick={() => setPage("userLogin")}>Get Started</button>
          <button className="btn btn-outline" onClick={() => setPage("userSignup")}>Create Account</button>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="card-grid card-grid-3">
          {[
            { icon: "🎪", title: "4 Vendor Categories", desc: "Catering, Florist, Decoration & Lighting" },
            { icon: "🛒", title: "Easy Booking", desc: "Browse, add to cart, and checkout instantly" },
            { icon: "📦", title: "Live Order Tracking", desc: "Track every order from received to delivery" },
          ].map(c => (
            <div className="card" key={c.title}>
              <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 6 }}>{c.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── AUTH HELPER ── */
function AuthPage({ title, sub, children }) {
  return (
    <div className="auth-page">
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div className="auth-logo">✦ EventCraft</div>
        <div className="form-card">
          <div className="form-title">{title}</div>
          <div className="form-sub">{sub}</div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── ADMIN LOGIN ── */
function AdminLogin({ setPage, store, toast }) {
  const [f, setF] = useState({ email: "admin@ems.com", password: "admin123" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (store.login("admin", f.email, f.password)) { toast("Welcome Admin!"); setPage("adminDash"); }
    else setErr("Invalid credentials");
  };
  return (
    <AuthPage title="Admin Login" sub="Access the maintenance dashboard">
      <div className="field"><label>Email</label><input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="field"><label>Password</label><input type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      {err && <div className="error-msg">{err}</div>}
      <div className="form-actions">
        <button className="btn btn-outline" onClick={() => setPage("home")}>Cancel</button>
        <button className="btn btn-gold btn-full" onClick={submit}>Login</button>
      </div>
      <div style={{ textAlign: "center", marginTop: 16, color: "var(--muted)", fontSize: ".82rem" }}>
        Vendor? <span style={{ color: "var(--accent2)", cursor: "pointer" }} onClick={() => setPage("vendorLogin")}>Login here</span>
      </div>
    </AuthPage>
  );
}

/* ── VENDOR LOGIN ── */
function VendorLogin({ setPage, store, toast }) {
  const [f, setF] = useState({ email: "vendor@ems.com", password: "vendor123" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (store.login("vendor", f.email, f.password)) { toast("Welcome back!"); setPage("vendorHome"); }
    else setErr("Invalid credentials");
  };
  return (
    <AuthPage title="Vendor Login" sub="Manage your products and orders">
      <div className="field"><label>Email</label><input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="field"><label>Password</label><input type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      {err && <div className="error-msg">{err}</div>}
      <div className="form-actions">
        <button className="btn btn-outline" onClick={() => setPage("home")}>Cancel</button>
        <button className="btn btn-blue btn-full" onClick={submit}>Login</button>
      </div>
      <div style={{ textAlign: "center", marginTop: 16, color: "var(--muted)", fontSize: ".82rem" }}>
        New vendor? <span style={{ color: "var(--accent2)", cursor: "pointer" }} onClick={() => setPage("vendorSignup")}>Sign up</span>
      </div>
    </AuthPage>
  );
}

/* ── VENDOR SIGNUP ── */
function VendorSignup({ setPage, store, toast }) {
  const [f, setF] = useState({ name: "", email: "", password: "", category: "Catering" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.name || !f.email || !f.password) { setErr("All fields are required"); return; }
    if (store.signupVendor(f.name, f.email, f.password, f.category)) {
      toast("Account created!"); setPage("vendorHome");
    } else setErr("Email already registered");
  };
  return (
    <AuthPage title="Vendor Sign Up" sub="Join EventCraft as a service provider">
      <div className="field"><label>Business Name</label><input placeholder="Your business name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
      <div className="field"><label>Email</label><input placeholder="business@email.com" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="field"><label>Password</label><input type="password" placeholder="Create password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      <div className="field"><label>Category</label>
        <select value={f.category} onChange={e => setF({ ...f, category: e.target.value })}>
          {["Catering", "Florist", "Decoration", "Lighting"].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      {err && <div className="error-msg">{err}</div>}
      <div className="form-actions">
        <button className="btn btn-outline" onClick={() => setPage("vendorLogin")}>Back</button>
        <button className="btn btn-blue btn-full" onClick={submit}>Sign Up</button>
      </div>
    </AuthPage>
  );
}

/* ── USER LOGIN ── */
function UserLogin({ setPage, store, toast }) {
  const [f, setF] = useState({ email: "user@ems.com", password: "user123" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (store.login("user", f.email, f.password)) { toast("Welcome back!"); setPage("userPortal"); }
    else setErr("Invalid credentials");
  };
  return (
    <AuthPage title="User Login" sub="Book vendors for your perfect event">
      <div className="field"><label>Email</label><input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="field"><label>Password</label><input type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      {err && <div className="error-msg">{err}</div>}
      <div className="form-actions">
        <button className="btn btn-outline" onClick={() => setPage("home")}>Cancel</button>
        <button className="btn btn-gold btn-full" onClick={submit}>Login</button>
      </div>
      <div style={{ textAlign: "center", marginTop: 16, color: "var(--muted)", fontSize: ".82rem" }}>
        New here? <span style={{ color: "var(--accent2)", cursor: "pointer" }} onClick={() => setPage("userSignup")}>Create account</span>
      </div>
    </AuthPage>
  );
}

/* ── USER SIGNUP ── */
function UserSignup({ setPage, store, toast }) {
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const submit = () => {
    if (!f.name || !f.email || !f.password) { setErr("All fields are required"); return; }
    if (store.signupUser(f.name, f.email, f.password)) {
      toast("Account created!"); setPage("userPortal");
    } else setErr("Email already registered");
  };
  return (
    <AuthPage title="Create Account" sub="Start planning your dream event today">
      <div className="field"><label>Full Name</label><input placeholder="Your name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
      <div className="field"><label>Email</label><input placeholder="you@email.com" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
      <div className="field"><label>Password</label><input type="password" placeholder="Create password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
      {err && <div className="error-msg">{err}</div>}
      <div className="form-actions">
        <button className="btn btn-outline" onClick={() => setPage("userLogin")}>Back</button>
        <button className="btn btn-gold btn-full" onClick={submit}>Sign Up</button>
      </div>
    </AuthPage>
  );
}

/* ── USER PORTAL ── */
function UserPortal({ setPage, store }) {
  const session = store.getSession();
  const stats = [
    { icon: "🛒", label: "Cart Items", val: store.state.cart.length, color: "gold" },
    { icon: "📦", label: "Orders", val: store.state.orders.filter(o => o.userId === session?.id).length, color: "blue" },
    { icon: "👥", label: "Vendors", val: store.state.vendors.length, color: "green" },
  ];
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div className="hero-tag" style={{ marginBottom: 10 }}>Welcome back</div>
          <h2>{session?.name}</h2>
          <p style={{ color: "var(--muted)" }}>What would you like to do today?</p>
        </div>
        <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", marginBottom: 32 }}>
          {stats.map(s => (
            <div className="stat-card" key={s.label}>
              <div className={`stat-icon ${s.color}`}>{s.icon}</div>
              <div className="stat-info"><h3>{s.val}</h3><p>{s.label}</p></div>
            </div>
          ))}
        </div>
        <div className="card-grid card-grid-2">
          {[
            { label: "Browse Vendors", icon: "🏪", desc: "Discover catering, florists, décor & lighting", page: "vendorBrowse", cta: "Explore" },
            { label: "My Cart", icon: "🛒", desc: `${store.state.cart.reduce((s,c)=>s+c.qty,0)} items ready to checkout`, page: "cart", cta: "View Cart" },
            { label: "Guest List", icon: "👥", desc: "Manage your event guest list", page: "guestList", cta: "Manage" },
            { label: "Order Status", icon: "📦", desc: "Track your active orders", page: "orderStatus", cta: "Track" },
          ].map(c => (
            <div className="card" key={c.label} style={{ cursor: "pointer" }} onClick={() => setPage(c.page)}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 6 }}>{c.label}</h3>
              <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 16 }}>{c.desc}</p>
              <button className="btn btn-outline btn-sm">{c.cta} →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── VENDOR BROWSE ── */
function VendorBrowse({ setPage, store, setSelectedVendor }) {
  const [tab, setTab] = useState("All");
  const cats = ["All", "Catering", "Florist", "Decoration", "Lighting"];
  const vendors = store.state.vendors.filter(v => tab === "All" || v.category === tab);
  const emojis = { Catering: "🍽️", Florist: "🌸", Decoration: "🎪", Lighting: "💡" };
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h2>Our Vendors</h2>
          <p style={{ color: "var(--muted)" }}>Choose from our curated service providers</p>
        </div>
        <div className="tabs">
          {cats.map(c => <button key={c} className={`tab ${tab === c ? "active" : ""}`} onClick={() => setTab(c)}>{c}</button>)}
        </div>
        <div className="card-grid card-grid-2">
          {vendors.map(v => (
            <div className="vendor-card" key={v.id} onClick={() => { setSelectedVendor(v.id); setPage("products"); }}>
              <div className="vendor-card-img">{emojis[v.category] || "🏪"}</div>
              <div className="vendor-card-body">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <h3>{v.name}</h3>
                  <span className="badge badge-blue" style={{ fontSize: ".7rem" }}>{v.category}</span>
                </div>
                <p>{v.desc}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-blue btn-sm">Shop Items</button>
                  <span style={{ color: "var(--muted)", fontSize: ".8rem", alignSelf: "center" }}>📞 {v.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PRODUCTS ── */
function Products({ setPage, store, selectedVendor, toast }) {
  const vendor = store.getVendor(selectedVendor);
  if (!vendor) return null;
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <div className="breadcrumb">
            <span onClick={() => setPage("vendorBrowse")}>Vendors</span>
            <span className="sep">›</span>
            <span>{vendor.name}</span>
          </div>
          <h2>{vendor.name}</h2>
          <p style={{ color: "var(--muted)" }}>{vendor.desc} · {vendor.contact}</p>
        </div>
        {vendor.products.length === 0
          ? <div className="empty-state"><div className="icon">📦</div><p>No products yet</p></div>
          : <div className="card-grid card-grid-4">
              {vendor.products.map(p => (
                <div className="product-card" key={p.id}>
                  <div className="product-card-img">{p.emoji || "📦"}</div>
                  <div className="product-card-body">
                    <h3>{p.name}</h3>
                    <div className="product-card-price">₹{p.price.toLocaleString()}</div>
                    <button className="btn btn-gold btn-sm btn-full" onClick={() => {
                      store.addToCart(p, vendor.id);
                      toast(`${p.name} added to cart!`);
                    }}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
        }
        <div style={{ marginTop: 24 }}>
          <button className="btn btn-outline" onClick={() => setPage("vendorBrowse")}>← Back to Vendors</button>
          {store.state.cart.length > 0 &&
            <button className="btn btn-gold" style={{ marginLeft: 12 }} onClick={() => setPage("cart")}>View Cart ({store.state.cart.reduce((s,c)=>s+c.qty,0)})</button>}
        </div>
      </div>
    </div>
  );
}

/* ── CART ── */
function Cart({ setPage, store, toast }) {
  const { cart } = store.state;
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  if (cart.length === 0) return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Your Cart</h2></div>
      <div className="empty-state"><div className="icon">🛒</div><p>Your cart is empty</p>
        <button className="btn btn-gold" style={{ marginTop: 20 }} onClick={() => setPage("vendorBrowse")}>Browse Vendors</button>
      </div>
    </div></div>
  );
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Your Cart</h2><p style={{ color: "var(--muted)" }}>{cart.length} item(s)</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.productId}>
              <div className="cart-item-img">{item.emoji}</div>
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>₹{item.price.toLocaleString()} each</p>
              </div>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => store.updateQty(item.productId, item.qty - 1)}>−</button>
                <span style={{ minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                <button className="qty-btn" onClick={() => store.updateQty(item.productId, item.qty + 1)}>+</button>
              </div>
              <span style={{ minWidth: 80, textAlign: "right", fontFamily: "var(--font-display)", color: "var(--accent)" }}>
                ₹{(item.price * item.qty).toLocaleString()}
              </span>
              <button className="btn btn-danger btn-sm" onClick={() => store.removeFromCart(item.productId)}>✕</button>
            </div>
          ))}
          <button className="btn btn-danger btn-sm" style={{ marginTop: 16 }} onClick={() => { store.clearCart(); toast("Cart cleared"); }}>Delete All</button>
        </div>
        <div>
          <div className="cart-total-box">
            <div className="section-label">Order Summary</div>
            {cart.map(c => (
              <div key={c.productId} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: ".88rem" }}>
                <span style={{ color: "var(--muted)" }}>{c.name} ×{c.qty}</span>
                <span>₹{(c.price * c.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="divider" />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
              <span>Grand Total</span>
              <span style={{ color: "var(--accent)" }}>₹{total.toLocaleString()}</span>
            </div>
            <button className="btn btn-gold btn-full" style={{ marginTop: 20 }} onClick={() => setPage("checkout")}>
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div></div>
  );
}

/* ── CHECKOUT ── */
function Checkout({ setPage, store, toast, setLastOrder }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ name: "", email: "", number: "", address: "", city: "", state: "", pinCode: "", paymentMethod: "Cash" });
  const [err, setErr] = useState("");
  const session = store.getSession();
  const total = store.state.cart.reduce((s, c) => s + c.price * c.qty, 0);

  const validate = () => {
    if (!f.name || !f.email || !f.number || !f.address || !f.city || !f.state || !f.pinCode)
      return "Please fill all fields";
    if (!/^\d{6}$/.test(f.pinCode)) return "Pin code must be 6 digits";
    if (!/^\d{10}$/.test(f.number)) return "Phone must be 10 digits";
    return "";
  };

  const placeOrder = () => {
    const e = validate(); if (e) { setErr(e); return; }
    const id = store.placeOrder({ ...f, userId: session?.id, total });
    setLastOrder(id);
    toast("Order placed successfully!");
    setPage("success");
  };

  const steps = ["Details", "Review", "Confirm"];
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Checkout</h2></div>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="step-indicator">
          {steps.map((s, i) => (
            <div key={s} className={`step ${step > i + 1 ? "done" : step === i + 1 ? "active" : ""}`}>
              <div className="step-dot">{step > i + 1 ? "✓" : i + 1}</div>
              <div className="step-label">{s}</div>
            </div>
          ))}
        </div>

        {step === 1 && <div className="form-card wide">
          <div className="form-row">
            <div className="field"><label>Full Name</label><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Your name" /></div>
            <div className="field"><label>Phone</label><input value={f.number} onChange={e => setF({ ...f, number: e.target.value })} placeholder="10-digit number" /></div>
          </div>
          <div className="field"><label>Email</label><input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="email@example.com" /></div>
          <div className="field"><label>Address</label><input value={f.address} onChange={e => setF({ ...f, address: e.target.value })} placeholder="Street address" /></div>
          <div className="form-row">
            <div className="field"><label>City</label><input value={f.city} onChange={e => setF({ ...f, city: e.target.value })} placeholder="City" /></div>
            <div className="field"><label>State</label><input value={f.state} onChange={e => setF({ ...f, state: e.target.value })} placeholder="State" /></div>
          </div>
          <div className="form-row">
            <div className="field"><label>Pin Code</label><input value={f.pinCode} onChange={e => setF({ ...f, pinCode: e.target.value })} placeholder="6-digit pin" /></div>
            <div className="field"><label>Payment Method</label>
              <select value={f.paymentMethod} onChange={e => setF({ ...f, paymentMethod: e.target.value })}>
                <option>Cash</option><option>UPI</option>
              </select>
            </div>
          </div>
          {err && <div className="error-msg">{err}</div>}
          <div className="form-actions">
            <button className="btn btn-outline" onClick={() => setPage("cart")}>← Cart</button>
            <button className="btn btn-gold" onClick={() => { const e = validate(); if (e) setErr(e); else { setErr(""); setStep(2); } }}>Review →</button>
          </div>
        </div>}

        {step === 2 && <div className="form-card wide">
          <div className="section-label">Order Items</div>
          {store.state.cart.map(c => (
            <div key={c.productId} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: ".9rem" }}>
              <span>{c.emoji} {c.name} ×{c.qty}</span>
              <span style={{ color: "var(--accent)" }}>₹{(c.price * c.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="divider" />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-display)", fontSize: "1.15rem", marginBottom: 20 }}>
            <span>Total</span><span style={{ color: "var(--accent)" }}>₹{total.toLocaleString()}</span>
          </div>
          <div className="section-label">Delivery To</div>
          <p style={{ fontSize: ".88rem", color: "var(--muted)", lineHeight: 1.8 }}>
            {f.name} · {f.number}<br />{f.address}, {f.city}, {f.state} - {f.pinCode}<br />Payment: {f.paymentMethod}
          </p>
          <div className="form-actions" style={{ marginTop: 24 }}>
            <button className="btn btn-outline" onClick={() => setStep(1)}>← Edit</button>
            <button className="btn btn-gold" onClick={() => setStep(3)}>Confirm →</button>
          </div>
        </div>}

        {step === 3 && <div className="form-card" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Ready to place your order?</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--accent)", marginBottom: 8 }}>
            ₹{total.toLocaleString()}
          </div>
          <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 24 }}>via {f.paymentMethod}</p>
          <div className="form-actions" style={{ justifyContent: "center" }}>
            <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
            <button className="btn btn-green" onClick={placeOrder}>Order Now ✓</button>
          </div>
        </div>}
      </div>
    </div></div>
  );
}

/* ── SUCCESS ── */
function SuccessPage({ setPage, store, lastOrder }) {
  const order = store.state.orders.find(o => o.id === lastOrder);
  if (!order) return null;
  return (
    <div className="page"><div className="container">
      <div style={{ maxWidth: 520, margin: "60px auto", textAlign: "center" }}>
        <div className="success-ring">✅</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: 8 }}>Thank You!</h2>
        <p style={{ color: "var(--muted)", marginBottom: 28 }}>Your order has been placed successfully</p>
        <div className="form-card wide" style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 16, color: "var(--accent)" }}>
            {order.id}
          </div>
          <div className="section-label">Total Amount</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--accent)", marginBottom: 16 }}>
            ₹{order.total.toLocaleString()}
          </div>
          {[["Name", order.name], ["Email", order.email], ["Phone", order.number],
            ["Address", `${order.address}, ${order.city}, ${order.state} - ${order.pinCode}`],
            ["Payment", order.paymentMethod], ["Status", order.status]
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: ".88rem" }}>
              <span style={{ color: "var(--muted)" }}>{k}</span><span>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
          <button className="btn btn-outline" onClick={() => setPage("orderStatus")}>Track Order</button>
          <button className="btn btn-gold" onClick={() => setPage("vendorBrowse")}>Continue Shopping</button>
        </div>
      </div>
    </div></div>
  );
}

/* ── ORDER STATUS (User) ── */
function OrderStatus({ store }) {
  const session = store.getSession();
  const orders = store.state.orders.filter(o => o.userId === session?.id);
  const statusColor = { "Received": "badge-amber", "Ready for Shipping": "badge-blue", "Out For Delivery": "badge-green" };
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>My Orders</h2><p style={{ color: "var(--muted)" }}>Track your bookings</p></div>
      {orders.length === 0
        ? <div className="empty-state"><div className="icon">📦</div><p>No orders yet</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["Order ID", "Date", "Items", "Total", "Payment", "Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: ".85rem" }}>{o.id}</td>
                    <td>{o.createdAt}</td>
                    <td>{o.items.map(i => `${i.emoji} ${i.name}`).join(", ").substring(0, 40)}…</td>
                    <td>₹{o.total.toLocaleString()}</td>
                    <td>{o.paymentMethod}</td>
                    <td><span className={`badge ${statusColor[o.status] || "badge-amber"}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div></div>
  );
}

/* ── GUEST LIST ── */
function GuestList({ toast }) {
  const [guests, setGuests] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@mail.com", rsvp: "Confirmed", table: "T1" },
    { id: 2, name: "Priya Nair", email: "priya@mail.com", rsvp: "Pending", table: "T2" },
  ]);
  const [f, setF] = useState({ name: "", email: "", rsvp: "Pending", table: "" });
  const add = () => {
    if (!f.name || !f.email) return;
    setGuests([...guests, { ...f, id: Date.now() }]);
    setF({ name: "", email: "", rsvp: "Pending", table: "" });
    toast("Guest added!");
  };
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Guest List</h2><p style={{ color: "var(--muted)" }}>Manage your event attendees</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
        <div className="table-wrap">
          <table>
            <thead><tr>{["Name", "Email", "RSVP", "Table", ""].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {guests.map(g => (
                <tr key={g.id}>
                  <td style={{ fontWeight: 600 }}>{g.name}</td>
                  <td style={{ color: "var(--muted)" }}>{g.email}</td>
                  <td><span className={`badge ${g.rsvp === "Confirmed" ? "badge-green" : "badge-amber"}`}>{g.rsvp}</span></td>
                  <td>{g.table}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => setGuests(guests.filter(x => x.id !== g.id))}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="form-card" style={{ height: "fit-content" }}>
          <div className="form-title" style={{ fontSize: "1.2rem", marginBottom: 16 }}>Add Guest</div>
          <div className="field"><label>Name</label><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Guest name" /></div>
          <div className="field"><label>Email</label><input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="guest@email.com" /></div>
          <div className="field"><label>Table</label><input value={f.table} onChange={e => setF({ ...f, table: e.target.value })} placeholder="Table number" /></div>
          <div className="field"><label>RSVP</label>
            <select value={f.rsvp} onChange={e => setF({ ...f, rsvp: e.target.value })}>
              <option>Pending</option><option>Confirmed</option><option>Declined</option>
            </select>
          </div>
          <button className="btn btn-gold btn-full" onClick={add}>Add Guest</button>
        </div>
      </div>
    </div></div>
  );
}

/* ── VENDOR HOME ── */
function VendorHome({ setPage, store }) {
  const session = store.getSession();
  const vendor = store.getVendor(session?.id);
  const orders = store.state.orders.filter(o => o.items?.some(i => {
    const v = store.getVendor(session?.id);
    return v?.products.some(p => p.id === i.productId);
  }));
  return (
    <div className="page"><div className="container">
      <div className="page-header">
        <div className="hero-tag">Vendor Dashboard</div>
        <h2>Welcome, {vendor?.name}</h2>
        <p style={{ color: "var(--muted)" }}>{vendor?.category} · {vendor?.contact}</p>
      </div>
      <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", marginBottom: 32 }}>
        {[
          { icon: "📦", label: "Products", val: vendor?.products.length || 0, color: "gold" },
          { icon: "🛒", label: "Total Orders", val: store.state.orders.length, color: "blue" },
          { icon: "📬", label: "Requests", val: store.state.requests.length, color: "green" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-info"><h3>{s.val}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>
      <div className="card-grid card-grid-2">
        {[
          { label: "My Products", icon: "🏷️", desc: "View and manage your listed products", page: "yourItems" },
          { label: "Add New Item", icon: "➕", desc: "List a new product or service", page: "addItem" },
          { label: "Transactions", icon: "💳", desc: "View all incoming orders", page: "transactions" },
          { label: "Request Items", icon: "📬", desc: "View user item requests", page: "requestItem" },
        ].map(c => (
          <div className="card" key={c.label} style={{ cursor: "pointer" }} onClick={() => setPage(c.page)}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>{c.icon}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 6 }}>{c.label}</h3>
            <p style={{ color: "var(--muted)", fontSize: ".88rem" }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div></div>
  );
}

/* ── YOUR ITEMS ── */
function YourItems({ setPage, store, toast }) {
  const session = store.getSession();
  const vendor = store.getVendor(session?.id);
  const [edit, setEdit] = useState(null);
  if (!vendor) return null;
  return (
    <div className="page"><div className="container">
      <div className="page-header">
        <h2>My Products</h2>
        <button className="btn btn-gold btn-sm" style={{ float: "right", marginTop: -4 }} onClick={() => setPage("addItem")}>+ Add New</button>
      </div>
      {vendor.products.length === 0
        ? <div className="empty-state"><div className="icon">📦</div><p>No products yet</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["", "Product", "Price", "Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {vendor.products.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontSize: "1.5rem" }}>{p.emoji || "📦"}</td>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>₹{p.price.toLocaleString()}</td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn-outline btn-sm" onClick={() => setEdit(p)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => { store.deleteProduct(vendor.id, p.id); toast("Product deleted"); }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
      {edit && (
        <div className="modal-overlay" onClick={() => setEdit(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Edit Product</h2>
            <div className="field"><label>Name</label><input value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} /></div>
            <div className="field"><label>Price (₹)</label><input type="number" value={edit.price} onChange={e => setEdit({ ...edit, price: +e.target.value })} /></div>
            <div className="field"><label>Emoji</label><input value={edit.emoji} onChange={e => setEdit({ ...edit, emoji: e.target.value })} /></div>
            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setEdit(null)}>Cancel</button>
              <button className="btn btn-gold" onClick={() => { store.updateProduct(vendor.id, edit); setEdit(null); toast("Updated!"); }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div></div>
  );
}

/* ── ADD ITEM ── */
function AddItem({ setPage, store, toast }) {
  const session = store.getSession();
  const [f, setF] = useState({ name: "", price: "", emoji: "📦" });
  const [err, setErr] = useState("");
  const emojis = ["📦", "🍱", "🌸", "🎈", "💡", "🍖", "💐", "✨", "🔦", "🍰", "🌺", "🎪"];
  const submit = () => {
    if (!f.name || !f.price) { setErr("All fields required"); return; }
    store.addProduct(session.id, { name: f.name, price: +f.price, emoji: f.emoji });
    toast(`${f.name} added!`);
    setPage("yourItems");
  };
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Add New Product</h2></div>
      <div className="form-card wide">
        <div className="field"><label>Product Name</label><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="e.g. Wedding Cake" /></div>
        <div className="field"><label>Price (₹)</label><input type="number" value={f.price} onChange={e => setF({ ...f, price: e.target.value })} placeholder="Enter price" /></div>
        <div className="field"><label>Choose Emoji Icon</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {emojis.map(em => (
              <button key={em} onClick={() => setF({ ...f, emoji: em })}
                style={{ fontSize: "1.6rem", background: f.emoji === em ? "rgba(232,184,109,.2)" : "var(--surface2)",
                  border: f.emoji === em ? "2px solid var(--accent)" : "2px solid var(--border)",
                  borderRadius: 10, padding: "8px 12px", cursor: "pointer" }}>{em}</button>
            ))}
          </div>
        </div>
        {err && <div className="error-msg">{err}</div>}
        <div className="form-actions">
          <button className="btn btn-outline" onClick={() => setPage("yourItems")}>Cancel</button>
          <button className="btn btn-gold" onClick={submit}>Add Product</button>
        </div>
      </div>
    </div></div>
  );
}

/* ── TRANSACTIONS (Vendor) ── */
function Transactions({ store }) {
  const session = store.getSession();
  const vendor = store.getVendor(session?.id);
  const productIds = vendor?.products.map(p => p.id) || [];
  const orders = store.state.orders.filter(o => o.items?.some(i => productIds.includes(i.productId)));
  const statusColor = { "Received": "badge-amber", "Ready for Shipping": "badge-blue", "Out For Delivery": "badge-green" };
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Transactions</h2><p style={{ color: "var(--muted)" }}>All orders containing your products</p></div>
      {orders.length === 0
        ? <div className="empty-state"><div className="icon">💳</div><p>No transactions yet</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["Order ID", "Customer", "Items", "Total", "Date", "Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: ".85rem" }}>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.items.filter(i => productIds.includes(i.productId)).map(i => `${i.emoji} ${i.name}`).join(", ")}</td>
                    <td>₹{o.total.toLocaleString()}</td>
                    <td>{o.createdAt}</td>
                    <td><span className={`badge ${statusColor[o.status] || "badge-amber"}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div></div>
  );
}

/* ── PRODUCT STATUS (Vendor manages orders) ── */
function ProductStatus({ store, toast }) {
  const orders = store.state.orders;
  const statuses = ["Received", "Ready for Shipping", "Out For Delivery"];
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Product Status</h2><p style={{ color: "var(--muted)" }}>Update order delivery status</p></div>
      {orders.length === 0
        ? <div className="empty-state"><div className="icon">📋</div><p>No orders to manage</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["Order ID", "Customer", "Email", "Address", "Status", "Update", ""].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: ".82rem" }}>{o.id}</td>
                    <td style={{ fontWeight: 600 }}>{o.name}</td>
                    <td style={{ color: "var(--muted)", fontSize: ".85rem" }}>{o.email}</td>
                    <td style={{ color: "var(--muted)", fontSize: ".85rem" }}>{o.city}</td>
                    <td><span className={`badge ${o.status === "Received" ? "badge-amber" : o.status === "Ready for Shipping" ? "badge-blue" : "badge-green"}`}>{o.status}</span></td>
                    <td>
                      <select value={o.status} onChange={e => { store.updateOrderStatus(o.id, e.target.value); toast("Status updated!"); }}
                        style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", padding: "6px 10px", borderRadius: 8, fontSize: ".82rem", fontFamily: "var(--font-body)" }}>
                        {statuses.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => toast("Order removed (demo)")}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div></div>
  );
}

/* ── REQUEST ITEM ── */
function RequestItem({ store, toast }) {
  const [f, setF] = useState({ item: "", desc: "" });
  const session = store.getSession();
  const myRequests = store.state.requests.filter(r => r.userId === session?.id);
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Request an Item</h2><p style={{ color: "var(--muted)" }}>Can't find what you need? Request it!</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="form-card" style={{ height: "fit-content" }}>
          <div className="form-title" style={{ fontSize: "1.2rem", marginBottom: 16 }}>New Request</div>
          <div className="field"><label>Item Name</label><input value={f.item} onChange={e => setF({ ...f, item: e.target.value })} placeholder="What do you need?" /></div>
          <div className="field"><label>Description</label><input value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} placeholder="Any details..." /></div>
          <button className="btn btn-gold btn-full" onClick={() => {
            if (!f.item) return;
            store.addRequest({ ...f, userId: session?.id, date: new Date().toLocaleDateString() });
            toast("Request submitted!"); setF({ item: "", desc: "" });
          }}>Submit Request</button>
        </div>
        <div>
          <div className="section-label">My Requests</div>
          {myRequests.length === 0
            ? <div className="empty-state" style={{ padding: "30px 0" }}><p>No requests yet</p></div>
            : myRequests.map(r => (
                <div className="card" key={r.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600 }}>{r.item}</div>
                  <div style={{ color: "var(--muted)", fontSize: ".83rem", marginTop: 4 }}>{r.desc}</div>
                  <div style={{ color: "var(--muted)", fontSize: ".78rem", marginTop: 8 }}>{r.date}</div>
                </div>
              ))
          }
        </div>
      </div>
    </div></div>
  );
}

/* ── ADMIN DASHBOARD ── */
function AdminDash({ setPage }) {
  return (
    <div className="page"><div className="container">
      <div className="page-header">
        <div className="hero-tag">Administrator</div>
        <h2>Welcome, Admin</h2>
        <p style={{ color: "var(--muted)" }}>Manage the EventCraft platform</p>
      </div>
      <div className="card-grid card-grid-2">
        {[
          { label: "Maintain Users", icon: "👤", desc: "Add, update, or remove user accounts", page: "maintainUser" },
          { label: "Maintain Vendors", icon: "🏪", desc: "Manage vendor accounts and memberships", page: "maintainVendor" },
          { label: "Memberships", icon: "🎫", desc: "Add or update vendor membership plans", page: "membership" },
          { label: "All Orders", icon: "📦", desc: "View all orders across the platform", page: "allOrders" },
        ].map(c => (
          <div className="card" key={c.label} style={{ cursor: "pointer" }} onClick={() => setPage(c.page)}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>{c.icon}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: 6 }}>{c.label}</h3>
            <p style={{ color: "var(--muted)", fontSize: ".88rem" }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div></div>
  );
}

/* ── MAINTAIN USERS ── */
function MaintainUser({ store, toast }) {
  const [f, setF] = useState({ name: "", email: "", password: "" });
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>User Management</h2></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
        <div className="table-wrap">
          <table>
            <thead><tr>{["Name", "Email", "Role", ""].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {store.state.users.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ color: "var(--muted)" }}>{u.email}</td>
                  <td><span className="badge badge-blue">{u.role}</span></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => { store.deleteUser(u.id); toast("User removed"); }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="form-card" style={{ height: "fit-content" }}>
          <div className="form-title" style={{ fontSize: "1.1rem", marginBottom: 16 }}>Add User</div>
          <div className="field"><label>Name</label><input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
          <div className="field"><label>Email</label><input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></div>
          <div className="field"><label>Password</label><input type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></div>
          <button className="btn btn-gold btn-full" onClick={() => {
            if (!f.name || !f.email) return;
            store.signupUser(f.name, f.email, f.password || "pass123");
            toast("User added!"); setF({ name: "", email: "", password: "" });
          }}>Add User</button>
        </div>
      </div>
    </div></div>
  );
}

/* ── MAINTAIN VENDORS ── */
function MaintainVendor({ store, toast }) {
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Vendor Management</h2></div>
      <div className="table-wrap">
        <table>
          <thead><tr>{["Business", "Email", "Category", "Products", ""].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {store.state.vendors.map(v => (
              <tr key={v.id}>
                <td style={{ fontWeight: 600 }}>{v.name}</td>
                <td style={{ color: "var(--muted)" }}>{v.email}</td>
                <td><span className="badge badge-blue">{v.category}</span></td>
                <td>{v.products.length}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => { store.deleteVendor(v.id); toast("Vendor removed"); }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></div>
  );
}

/* ── MEMBERSHIP ── */
function Membership({ store, toast }) {
  const [mode, setMode] = useState("add");
  const [f, setF] = useState({ vendorId: "", plan: "6 months", price: "5000" });
  const [upd, setUpd] = useState({ membershipNo: "", plan: "" });
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>Membership Management</h2></div>
      <div className="tabs">
        <button className={`tab ${mode === "add" ? "active" : ""}`} onClick={() => setMode("add")}>Add Membership</button>
        <button className={`tab ${mode === "update" ? "active" : ""}`} onClick={() => setMode("update")}>Update Membership</button>
      </div>
      {mode === "add" && (
        <div className="form-card wide">
          <div className="field"><label>Select Vendor</label>
            <select value={f.vendorId} onChange={e => setF({ ...f, vendorId: e.target.value })}>
              <option value="">-- Choose vendor --</option>
              {store.state.vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div className="field"><label>Plan Duration (default: 6 months)</label>
            <select value={f.plan} onChange={e => setF({ ...f, plan: e.target.value })}>
              <option>6 months</option><option>1 year</option><option>2 years</option>
            </select>
          </div>
          <div className="field"><label>Price (₹)</label><input type="number" value={f.price} onChange={e => setF({ ...f, price: e.target.value })} /></div>
          <button className="btn btn-gold" onClick={() => {
            if (!f.vendorId) return;
            store.addMembership({ ...f, id: Date.now(), no: `MEM-${Date.now()}` });
            toast("Membership added!");
          }}>Add Membership</button>
          {store.state.memberships.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div className="section-label">Active Memberships</div>
              {store.state.memberships.map(m => (
                <div key={m.id} className="card" style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: ".85rem" }}>{m.no}</span>
                  <span>{store.getVendor(+m.vendorId)?.name}</span>
                  <span className="badge badge-green">{m.plan}</span>
                  <span>₹{m.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {mode === "update" && (
        <div className="form-card">
          <div className="field"><label>Membership Number</label>
            <select value={upd.membershipNo} onChange={e => {
              const m = store.state.memberships.find(x => x.no === e.target.value);
              setUpd({ membershipNo: e.target.value, plan: m?.plan || "" });
            }}>
              <option value="">-- Select membership --</option>
              {store.state.memberships.map(m => <option key={m.id} value={m.no}>{m.no}</option>)}
            </select>
          </div>
          <div className="field"><label>New Plan</label>
            <select value={upd.plan} onChange={e => setUpd({ ...upd, plan: e.target.value })}>
              <option>6 months</option><option>1 year</option><option>2 years</option>
            </select>
          </div>
          <button className="btn btn-blue" onClick={() => toast("Membership updated!")}>Update</button>
        </div>
      )}
    </div></div>
  );
}

/* ── ALL ORDERS (Admin) ── */
function AllOrders({ store }) {
  const orders = store.state.orders;
  return (
    <div className="page"><div className="container">
      <div className="page-header"><h2>All Orders</h2><p style={{ color: "var(--muted)" }}>{orders.length} total orders</p></div>
      {orders.length === 0
        ? <div className="empty-state"><div className="icon">📦</div><p>No orders yet</p></div>
        : <div className="table-wrap">
            <table>
              <thead><tr>{["Order ID", "Customer", "Email", "Items", "Total", "Payment", "Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "var(--font-display)", color: "var(--accent)", fontSize: ".82rem" }}>{o.id}</td>
                    <td style={{ fontWeight: 600 }}>{o.name}</td>
                    <td style={{ color: "var(--muted)", fontSize: ".85rem" }}>{o.email}</td>
                    <td>{o.items.length} items</td>
                    <td>₹{o.total.toLocaleString()}</td>
                    <td>{o.paymentMethod}</td>
                    <td><span className={`badge ${o.status === "Received" ? "badge-amber" : o.status === "Ready for Shipping" ? "badge-blue" : "badge-green"}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div></div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROUTER / APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  const store = useStore();
  const [page, setPage] = useState("home");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const toast = (msg) => setToastMsg(msg);
  const session = store.getSession();

  // Route guard: redirect to login if not authenticated
  const guard = (component, role) => {
    if (!session || (role && session.role !== role)) {
      setPage(role === "admin" ? "adminLogin" : role === "vendor" ? "vendorLogin" : "userLogin");
      return null;
    }
    return component;
  };

  const renderPage = () => {
    switch (page) {
      case "home":         return <HomePage setPage={setPage} />;
      case "adminLogin":   return <AdminLogin setPage={setPage} store={store} toast={toast} />;
      case "vendorLogin":  return <VendorLogin setPage={setPage} store={store} toast={toast} />;
      case "vendorSignup": return <VendorSignup setPage={setPage} store={store} toast={toast} />;
      case "userLogin":    return <UserLogin setPage={setPage} store={store} toast={toast} />;
      case "userSignup":   return <UserSignup setPage={setPage} store={store} toast={toast} />;

      // User pages
      case "userPortal":   return guard(<UserPortal setPage={setPage} store={store} />, "user");
      case "vendorBrowse": return guard(<VendorBrowse setPage={setPage} store={store} setSelectedVendor={setSelectedVendor} />, "user");
      case "products":     return guard(<Products setPage={setPage} store={store} selectedVendor={selectedVendor} toast={toast} />, "user");
      case "cart":         return guard(<Cart setPage={setPage} store={store} toast={toast} />, "user");
      case "checkout":     return guard(<Checkout setPage={setPage} store={store} toast={toast} setLastOrder={setLastOrder} />, "user");
      case "success":      return guard(<SuccessPage setPage={setPage} store={store} lastOrder={lastOrder} />, "user");
      case "orderStatus":  return guard(<OrderStatus store={store} />, "user");
      case "guestList":    return guard(<GuestList toast={toast} />, "user");
      case "requestItem":  return session?.role === "user"
        ? <RequestItem store={store} toast={toast} />
        : guard(<RequestItem store={store} toast={toast} />, "vendor");

      // Vendor pages
      case "vendorHome":   return guard(<VendorHome setPage={setPage} store={store} />, "vendor");
      case "yourItems":    return guard(<YourItems setPage={setPage} store={store} toast={toast} />, "vendor");
      case "addItem":      return guard(<AddItem setPage={setPage} store={store} toast={toast} />, "vendor");
      case "transactions": return guard(<Transactions store={store} />, "vendor");
      case "productStatus":return guard(<ProductStatus store={store} toast={toast} />, "vendor");

      // Admin pages
      case "adminDash":    return guard(<AdminDash setPage={setPage} />, "admin");
      case "maintainUser": return guard(<MaintainUser store={store} toast={toast} />, "admin");
      case "maintainVendor":return guard(<MaintainVendor store={store} toast={toast} />, "admin");
      case "membership":   return guard(<Membership store={store} toast={toast} />, "admin");
      case "allOrders":    return guard(<AllOrders store={store} />, "admin");

      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{STYLE}</style>
      <Navbar page={page} setPage={setPage} store={store} />
      {renderPage()}
      {toastMsg && <Toast msg={toastMsg} onDone={() => setToastMsg("")} />}
    </>
  );
}
