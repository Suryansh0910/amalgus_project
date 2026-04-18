// app.js - AmalGus Unified Application Logic
let selectedRole = 'homeowner';

const STATIC_PRODUCTS = [
    { id: 1, name: 'Clear Float Glass', category: 'float', thickness: 5, process: 'Plain Cut', application: 'Windows & Doors', price: 52, priceUnit: 'sqft', color: 'Clear', certification: 'IS 2835', supplier: 'AmalGus Direct', minOrder: '50 sqm', tags: ['float', 'clear', 'windows'], vendors: [
        { name: 'AmalGus Direct', price: 52, time: '3 Days', rating: 4.8, reviews: 156, type: 'Factory' },
        { name: 'Bharat Glass Corp', price: 48, time: '6 Days', rating: 4.2, reviews: 89, type: 'Wholesaler' },
        { name: 'UltraGlass Premium', price: 58, time: '1 Day', rating: 4.9, reviews: 210, type: 'Express' }
    ]},
    { id: 2, name: 'Toughened Safety Glass', category: 'toughened', thickness: 8, process: 'Toughened / Tempered', application: 'Shower Enclosure, Glass Doors', price: 140, priceUnit: 'sqft', color: 'Clear', certification: 'IS 2553', supplier: 'SafetyShield Mfg', minOrder: '30 sqm', tags: ['toughened', 'tempered', 'shower', 'safety'], vendors: [
        { name: 'SafetyShield Mfg', price: 140, time: '4 Days', rating: 4.7, reviews: 312, type: 'Factory' },
        { name: 'RegionGlass Wholesale', price: 132, time: '8 Days', rating: 4.1, reviews: 45, type: 'Wholesaler' },
        { name: 'SwiftStructure Pro', price: 155, time: '2 Days', rating: 5.0, reviews: 120, type: 'Premium' }
    ]},
    { id: 3, name: 'Laminated Safety Glass', category: 'laminated', thickness: 10, process: 'PVB Laminated', application: 'Railing / Balcony Safety', price: 215, priceUnit: 'sqft', color: 'Clear', certification: 'IS 13830', supplier: 'BondedGlass Industries', minOrder: '20 sqm', tags: ['laminated', 'safety', 'balcony', 'railing'], vendors: [
        { name: 'BondedGlass Industries', price: 215, time: '5 Days', rating: 4.6, reviews: 180, type: 'Factory' },
        { name: 'BulkGlass India', price: 195, time: '10 Days', rating: 4.0, reviews: 67, type: 'Distributor' },
        { name: 'PrimeLaminate+', price: 240, time: '3 Days', rating: 4.9, reviews: 93, type: 'Specialist' }
    ]},
    { id: 4, name: 'Insulated Glass Unit (IGU/DGU)', category: 'idu', thickness: 24, process: 'Double Glazed', application: 'Facade / Curtain Wall', price: 425, priceUnit: 'sqft', color: 'Clear', certification: 'IS 1626', supplier: 'ThermalWrap Facades', minOrder: '10 sqm', tags: ['IGU', 'DGU', 'facade', 'energy', 'thermal'], vendors: [
        { name: 'ThermalWrap Facades', price: 425, time: '7 Days', rating: 4.5, reviews: 54, type: 'Factory' },
        { name: 'EcoShield Solutions', price: 410, time: '12 Days', rating: 4.3, reviews: 31, type: 'OEM' },
        { name: 'VelocityGlaze', price: 460, time: '4 Days', rating: 4.8, reviews: 88, type: 'Fast-Track' }
    ]},
    { id: 5, name: 'Frosted Glass', category: 'frosted', thickness: 6, process: 'Acid Etched', application: 'Partition / Privacy Screens', price: 97, priceUnit: 'sqft', color: 'Frosted', certification: 'IS 2835', supplier: 'PrivacyGlass Ltd', minOrder: '25 sqm', tags: ['frosted', 'privacy', 'partition', 'bathroom'], vendors: [
        { name: 'PrivacyGlass Ltd', price: 97, time: '4 Days', rating: 4.6, reviews: 42, type: 'Factory' },
        { name: 'Opaque Solutions', price: 92, time: '7 Days', rating: 4.4, reviews: 28, type: 'Distributor' }
    ]},
    { id: 6, name: 'Reflective Glass', category: 'reflective', thickness: 6, process: 'Pyrolytic Coated', application: 'Exterior Facade', price: 120, priceUnit: 'sqft', color: 'Silver', certification: 'IS 2835', supplier: 'ReflectoFab', minOrder: '25 sqm', tags: ['reflective', 'facade', 'exterior', 'coated'], vendors: [
        { name: 'ReflectoFab', price: 120, time: '5 Days', rating: 4.5, reviews: 36, type: 'Factory' },
        { name: 'FacadeDirect', price: 115, time: '9 Days', rating: 4.2, reviews: 21, type: 'Wholesaler' }
    ]},
    { id: 7, name: 'Low-E Glass', category: 'lowe', thickness: 6, process: 'Soft Coat Low-E', application: 'Energy Efficient Windows', price: 250, priceUnit: 'sqft', color: 'Clear', certification: 'IS 2835', supplier: 'EcoGlass Innovations', minOrder: '20 sqm', tags: ['Low-E', 'energy', 'thermal', 'windows'], vendors: [
        { name: 'EcoGlass Innovations', price: 250, time: '6 Days', rating: 4.7, reviews: 29, type: 'Specialist' },
        { name: 'GreenGlaze Co', price: 240, time: '10 Days', rating: 4.5, reviews: 18, type: 'OEM' }
    ]},
    { id: 8, name: 'Back-Painted Glass', category: 'decorative', thickness: 8, process: 'Lacquered', application: 'Kitchen Splashback / Decorative', price: 185, priceUnit: 'sqft', color: 'Custom', certification: 'IS 2835', supplier: 'DecorPanels', minOrder: '15 sqm', tags: ['back-painted', 'decorative', 'kitchen', 'lacquered'], vendors: [
        { name: 'DecorPanels', price: 185, time: '5 Days', rating: 4.8, reviews: 55, type: 'Designer Fabricator' },
        { name: 'ColorGlass Studio', price: 175, time: '8 Days', rating: 4.6, reviews: 41, type: 'Small Batch' }
    ]},
];

const state = {
    products: [],
    cart: [],
    currentTab: 'home',
};

document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();
    initRouter();
    initThicknessLab();
    loadCart();
    // Render fallback data immediately so catalog is never empty
    renderCatalog('All');
    // Start data fetches
    fetchProducts();
    fetchRates();
    switchTab('home');
});

// ============================================
// Router & Tabs
// ============================================
function initRouter() {
    const navBtns = document.querySelectorAll('[data-tab]');
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(btn.getAttribute('data-tab'));
        });
    });
}
function switchTab(tabId) {
    state.currentTab = tabId;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.toggle('active', pane.id === `tab-${tabId}`));
    
    // Hide footer entirely on Cart page for cleaner checkout UX
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = tabId === 'cart' ? 'none' : 'block';
    
    if (tabId === 'catalog') renderCatalog();
    if (tabId === 'cart') renderCart();
    if (tabId === 'rates') updateRatesCharts();
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// ============================================
// Data Fetching
// ============================================
async function fetchProducts() {
    try {
        const res = await fetch('/api/products');
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Server error ' + res.status);
        }
        state.products = await res.json();
        populateCatalogFilters();
        renderCatalog();
    } catch (error) { 
        console.error('Products fetch failed:', error);
        console.warn("Backend not active for products."); 
    }
}

async function fetchRates() {
    try {
        const res = await fetch('/api/rates');
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Server error ' + res.status);
        }
        const rates = await res.json();
        renderRatesDashboard(rates);
        populateHomeTicker(rates);
    } catch (err) {
        console.error('Rates fetch failed:', err);
    }
}

// ============================================
// Component Renderers
// ============================================
function getGlassImage(category) {
    const cat = (category || '').toLowerCase();
    if(cat.includes('temper') || cat.includes('tough')) return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop';
    if(cat.includes('lami') || cat.includes('dgu') || cat.includes('sound')) return 'https://images.unsplash.com/photo-1506812574058-fc75483a66ea?q=80&w=600&auto=format&fit=crop';
    if(cat.includes('frost') || cat.includes('privacy')) return 'https://images.unsplash.com/photo-1582885994191-23dcf1abf6c4?q=80&w=600&auto=format&fit=crop';
    if(cat.includes('fire')) return 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=600&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop';
}

function createProductCard(product) {
    const imgUrl = getGlassImage(product.category);
    return `
        <div class="product-card" style="box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid var(--border-light); overflow: hidden; display: flex; flex-direction: column;">
            
            <!-- Real Dynamic Image -->
            <div class="product-image" style="height: 220px; background: url('${imgUrl}') center/cover no-repeat; position: relative; border-bottom: 2px solid var(--accent-dark);">
                <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, rgba(15,23,42,0.8));"></div>
                <span class="product-badge" style="position: absolute; top: 1rem; left: 1rem; background: var(--bg-surface); color: var(--accent-dark); padding: 0.4rem 0.8rem; border-radius: var(--radius-pill); font-size: 0.75rem; font-weight: 700; box-shadow: var(--shadow-sm); z-index: 2;">${product.category}</span>
                
                <div style="position: absolute; bottom: 1rem; left: 1rem; right: 1rem; z-index: 2; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                     ${product.tags ? product.tags.slice(0,3).map(t => `<span style="background:rgba(255,255,255,0.25); backdrop-filter:blur(8px); color:white; padding:0.25rem 0.6rem; border-radius:var(--radius-sm); font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">${t}</span>`).join('') : `<span style="background:var(--accent-dark); color:white; padding:0.25rem 0.6rem; border-radius:var(--radius-sm); font-size:0.7rem; font-weight:700; text-transform:uppercase;">Factory Direct</span>`}
                </div>
            </div>

            <!-- Dense Informative Content -->
            <div class="product-info" style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column;">
                <h3 class="product-title" style="font-size: 1.35rem; font-weight: 700; color: var(--accent-dark); margin-bottom: 0.25rem; line-height: 1.3;">${product.name}</h3>
                <div class="product-supplier" style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; display:flex; align-items:center; justify-content:space-between;">
                    <span><i data-lucide="factory" style="width:14px; display:inline;"></i> Mfg: <strong style="color:var(--text-main);">${product.supplier || 'Verified Factory'}</strong></span>
                    ${product.vendors ? `<span style="color:#0d9488; font-weight:700; font-size:0.8rem; background:rgba(20,184,166,0.1); padding:0.2rem 0.5rem; border-radius:4px; border:1px solid rgba(20,184,166,0.2);"><i data-lucide="users" style="width:12px; display:inline; margin-right:2px;"></i> ${product.vendors.length} Vendors</span>` : ''}
                </div>
                
                <!-- 2x2 Specs Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem; background: var(--bg-alt); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
                    <div style="font-size: 0.85rem;"><span style="color:var(--text-muted); display:flex; align-items:center; gap:0.25rem; font-size:0.75rem; text-transform:uppercase; font-weight:700; margin-bottom:0.15rem;"><i data-lucide="ruler" style="width:12px; height:12px;"></i> Core Thick</span> <span style="font-weight:700; font-size:1rem; color:var(--accent-dark);">${product.thickness || 5}mm</span></div>
                    <div style="font-size: 0.85rem;"><span style="color:var(--text-muted); display:flex; align-items:center; gap:0.25rem; font-size:0.75rem; text-transform:uppercase; font-weight:700; margin-bottom:0.15rem;"><i data-lucide="palette" style="width:12px; height:12px;"></i> Visual</span> <span style="font-weight:700; font-size:1rem; color:var(--accent-dark);">${product.color||'Clear'}</span></div>
                    <div style="font-size: 0.85rem;"><span style="color:var(--text-muted); display:flex; align-items:center; gap:0.25rem; font-size:0.75rem; text-transform:uppercase; font-weight:700; margin-bottom:0.15rem;"><i data-lucide="shield-alert" style="width:12px; height:12px;"></i> Standard</span> <span style="font-weight:700; font-size:1rem; color:var(--accent-dark);">${product.certification || 'IS:2553'}</span></div>
                    <div style="font-size: 0.85rem;"><span style="color:var(--text-muted); display:flex; align-items:center; gap:0.25rem; font-size:0.75rem; text-transform:uppercase; font-weight:700; margin-bottom:0.15rem;"><i data-lucide="boxes" style="width:12px; height:12px;"></i> MOQ</span> <span style="font-weight:700; font-size:1rem; color:var(--accent-dark);">${product.minOrder || '50 sqm'}</span></div>
                </div>
                
                <div class="product-footer" style="padding-top: 1.25rem; border-top: 1px solid var(--border-light); margin-top: auto; display: flex; flex-direction:column; gap: 1rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div class="product-price" style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">₹${Number(product.price).toLocaleString('en-IN')} <span style="font-size:0.85rem; color:var(--text-muted); font-weight:400;">/${product.priceUnit||'sqm'}</span></div>
                        <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); background: transparent; cursor: pointer; display: flex; align-items: center;" onclick="openVendorCompare('${product.id}')"><i data-lucide="git-compare" style="width:14px; margin-right:4px;"></i> Compare Vendors</button>
                    </div>
                    <div style="display:flex; align-items:center; background: var(--bg-surface); padding: 0.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-light); box-shadow: inset 0 2px 4px rgba(0,0,0,0.02)">
                        <div style="display:flex; flex-direction:column; align-items:center; flex:1; padding: 0 0.25rem;">
                            <span style="font-size:0.65rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.15rem;">Width (mm)</span>
                            <input type="number" id="w_${product.id}" style="width:100%; border:none; background:transparent; font-size:1.05rem; padding:0; outline:none; text-align:center; font-weight:700; color:var(--accent-dark);" value="1200">
                        </div>
                        <div style="width:1px; background:var(--border-light); height:30px; margin:0 0.25rem;"></div>
                        <div style="display:flex; flex-direction:column; align-items:center; flex:1; padding: 0 0.25rem;">
                            <span style="font-size:0.65rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.15rem;">Height (mm)</span>
                            <input type="number" id="h_${product.id}" style="width:100%; border:none; background:transparent; font-size:1.05rem; padding:0; outline:none; text-align:center; font-weight:700; color:var(--accent-dark);" value="2100">
                        </div>
                        <button class="btn btn-primary" style="padding: 0.6rem 1rem; font-size: 0.95rem; border-radius: var(--radius-sm); margin-left:0.5rem; white-space:nowrap; box-shadow:0 4px 12px rgba(13,148,136,0.25);" onclick="addToCart('${product.id}', this)"><i data-lucide="plus" style="width:16px; margin-right:4px;"></i> Add</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function openVendorCompare(productId) {
    const source = state.products.length ? state.products : STATIC_PRODUCTS;
    const product = source.find(p => p.id == productId);
    if (!product) return;
    
    // Use structured data if available, otherwise generate mock
    let vendors = product.vendors;
    if (!vendors) {
        const basePrice = Number(product.price) || 150;
        vendors = [
            { name: product.supplier || 'Premium Glass Consortium', price: basePrice, time: '3-4 Days', rating: 4.8, reviews: 124, type: 'Factory Direct', badge: 'Best Value' },
            { name: 'Apex Regional Glass', price: Math.round(basePrice * 0.95), time: '5-7 Days', rating: 4.5, reviews: 89, type: 'Wholesaler', badge: '' },
            { name: 'Express Structural Solutions', price: Math.round(basePrice * 1.08), time: '1-2 Days', rating: 4.9, reviews: 210, type: 'Premium Supplier', badge: 'Fastest Delivery' }
        ];
    }
    
    // Sort by price ascending
    const sortedVendors = [...vendors].sort((a,b) => a.price - b.price);

    // Build modal
    let modalHTML = `
    <div id="vendorModal" style="position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem;">
        <div style="position:absolute; inset:0; background:rgba(15,23,42,0.6); backdrop-filter:blur(4px);" onclick="closeVendorCompare()"></div>
        <div style="position:relative; width:100%; max-width:800px; background:var(--bg-surface); border-radius:var(--radius-lg); box-shadow:var(--shadow-lg); border:1px solid var(--border-light); display:flex; flex-direction:column; max-height:90vh; animation: fadeUp 0.3s ease;">
            
            <div style="padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center; background: var(--bg-alt); border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
                <div>
                    <h2 style="font-size: 1.5rem; color: var(--accent-dark); margin-bottom: 0.25rem;"><i data-lucide="git-compare" style="width:20px; display:inline; vertical-align:middle; margin-right:8px;"></i> Compare Vendor Offers</h2>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">${product.name} ${product.thickness ? ' ('+product.thickness+'mm)' : ''}</p>
                </div>
                <button onclick="closeVendorCompare()" style="background:transparent; border:none; cursor:pointer; color:var(--text-muted); padding:0.5rem; display:flex; align-items:center; justify-content:center;"><i data-lucide="x" style="width:24px; height:24px;"></i></button>
            </div>
            
            <div style="padding: 2rem; overflow-y:auto; display:flex; flex-direction:column; gap:1rem;">
                ${sortedVendors.map(v => {
                    const isBestPrice = v.price === sortedVendors[0].price;
                    const badge = v.badge || (isBestPrice ? 'Lowest Price' : '');
                    const badgeColor = badge === 'Fastest Delivery' ? '#f59e0b' : (badge === 'Lowest Price' ? '#0d9488' : '#14b8a6');
                    
                    return `
                    <div style="display:flex; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1.5rem; background:white; position:relative; gap:1.5rem; align-items:center; transition: transform 0.2s; box-shadow:var(--shadow-sm);">
                        ${badge ? `<div style="position:absolute; top:-0.75rem; left:1.5rem; background:${badgeColor}; color:white; font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; padding:0.25rem 0.85rem; border-radius:var(--radius-pill); box-shadow:0 2px 8px rgba(0,0,0,0.1); z-index:1;">${badge}</div>` : ''}
                        
                        <div style="flex:1;">
                            <h4 style="font-size: 1.25rem; font-weight:700; color:var(--accent-dark); margin-bottom:0.25rem;">${v.name} <span style="font-size:0.7rem; font-weight:800; color:var(--text-muted); background:var(--bg-alt); padding:0.2rem 0.6rem; border-radius:var(--radius-pill); margin-left:0.5rem; border:1px solid var(--border-light); vertical-align:middle; text-transform:uppercase;">${v.type}</span></h4>
                            <div style="display:flex; align-items:center; gap:1.5rem; margin-top:0.75rem;">
                                <div style="display:flex; align-items:center; gap:0.25rem; color:#eab308; font-size:0.95rem; font-weight:700;">
                                    <i data-lucide="star" style="width:16px; fill:#eab308;"></i> ${v.rating} <span style="color:var(--text-muted); font-weight:500; font-size:0.85rem;">(${v.reviews || 0})</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:0.4rem; color:var(--text-muted); font-size:0.9rem;">
                                    <i data-lucide="truck" style="width:16px;"></i> Delivery: <span style="font-weight:700; color:var(--accent-dark);">${v.time}</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:0.4rem; color:var(--text-muted); font-size:0.9rem;">
                                    <i data-lucide="package" style="width:16px;"></i> Capacity: <span style="font-weight:700; color:var(--accent-dark);">Verified</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style="text-align:right; border-left:2px dashed var(--border-light); padding-left:2rem; display:flex; flex-direction:column; justify-content:center; min-width:160px;">
                            <div style="font-size:1.85rem; font-weight:900; color:var(--accent-dark); line-height:1; letter-spacing:-0.02em;">₹${v.price.toLocaleString('en-IN')}</div>
                            <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.25rem; font-weight:500;">per ${product.priceUnit||'sqft'}</div>
                            <button class="btn btn-primary" style="padding:0.75rem 1.5rem; font-size:0.95rem; font-weight:700; border-radius:var(--radius-sm); box-shadow: 0 4px 12px rgba(13,148,136,0.2);" onclick="addSpecificVendorToCart('${product.id}', ${v.price}, '${v.name}'); closeVendorCompare();">Select Offer</button>
                        </div>
                    </div>
                `}).join('')}
            </div>
            
            <div style="padding: 1rem 2rem; border-top: 1px solid var(--border-light); background: var(--bg-alt); border-radius: 0 0 var(--radius-lg) var(--radius-lg); text-align:center;">
                <p style="font-size:0.85rem; color:var(--text-muted); margin:0;"><i data-lucide="shield-check" style="width:14px; display:inline; vertical-align:middle; margin-right:4px;"></i> All listed vendors are verified under the AmalGus Quality Assurance Protocol.</p>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    lucide.createIcons();
}

function closeVendorCompare() {
    const m = document.getElementById('vendorModal');
    if(m) m.remove();
}

function addSpecificVendorToCart(productId, overridePrice, vendorName) {
    const source = state.products.length ? state.products : STATIC_PRODUCTS;
    const product = source.find(p => p.id == productId);
    if (!product) return;
    
    // Check if dimensional inputs exist
    const wEl = document.getElementById('w_' + productId);
    const hEl = document.getElementById('h_' + productId);
    
    let sqm = 1;
    let dimStr = '';
    
    if(wEl && hEl) {
        const w = parseFloat(wEl.value) || 1200;
        const h = parseFloat(hEl.value) || 2100;
        sqm = (w * h) / 1000000;
        dimStr = `<span style="color:#14b8a6">${w}x${h}mm</span>`;
    }
    
    const pricePerPanel = Math.round(overridePrice * sqm);
    const cartItemId = productId + '_' + (wEl?wEl.value:'def') + 'x' + (hEl?hEl.value:'def') + '_' + vendorName.replace(/\s+/g, '');
    
    const ext = state.cart.find(i => i.id === cartItemId);
    if(ext) { 
        ext.qty++; 
    } else { 
        state.cart.push({ 
            ...product, 
            id: cartItemId, 
            name: product.name,
            thickness: product.thickness ? `${product.thickness}mm | ${dimStr} | ${vendorName}` : `${dimStr} | ${vendorName}`, 
            price: pricePerPanel, 
            qty: 1,
            supplier: vendorName // save vendor info
        }); 
    }
    
    saveCart();
    
    // Toast notification
    const t = document.createElement('div');
    t.innerHTML = `<div style="position:fixed; bottom:2rem; right:2rem; background:#10b981; color:white; padding:1rem 1.5rem; border-radius:8px; display:flex; align-items:center; gap:0.5rem; font-weight:600; box-shadow:var(--shadow-lg); z-index:9999; animation:fadeUp 0.3s ease;"><i data-lucide="check-circle" style="width:20px;"></i> Added ${product.name} (${vendorName})</div>`;
    document.body.appendChild(t);
    lucide.createIcons();
    setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(),300); }, 2500);
}

function createAISearchResultCard(p) {
    const ex = p.explanation || {};
    const benefitsHTML = (ex.keyBenefits || []).slice(0,3).map(b => `<span class="spec-tag" style="border-color:var(--glass-edge); color:#0d9488; background:rgba(20, 184, 166, 0.05); font-size:0.85rem;"><i data-lucide="check" style="width:14px;height:14px;color:#0d9488"></i>${b}</span>`).join('');
    
    // Parse tags (if mock data has tags) or fallback gracefully
    const tagsArr = Array.isArray(p.tags) ? p.tags : ['Factory Direct', 'Verified'];
    
    return `
        <div class="product-card" style="grid-column: 1/-1; position: relative; border: 1px solid var(--border-dark); box-shadow: var(--shadow-sm); overflow: hidden; display: flex; flex-direction: column;">
            
            <!-- Match Score Floating Badge over the card right corner -->
            <div style="position: absolute; top: 1.5rem; right: 1.5rem; display: flex; align-items: center; gap: 0.5rem; background: var(--bg-surface); padding: 0.5rem 1rem; border-radius: var(--radius-pill); border: 2px solid #14b8a6; box-shadow: 0 4px 12px rgba(20,184,166,0.15); z-index: 10;">
                <i data-lucide="brain-circuit" style="color: #14b8a6; width: 18px;"></i>
                <span style="font-weight: 800; color: var(--accent-dark); font-size: 1.1rem;">${p.matchScore}% Match</span>
            </div>

            <!-- Main Content -->
            <div style="padding: 2.5rem; display: flex; flex-direction: column; flex: 1;">
                <div style="margin-bottom: 1.5rem; padding-right: 140px;"> <!-- Padding right avoids the absolute badge -->
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; align-items: center;">
                        <span class="product-badge" style="position:static; background: var(--bg-alt); font-size:0.75rem; border:1px solid var(--border-light); margin:0;">${p.category}</span>
                        ${tagsArr.map(t => `<span style="background:var(--accent-dark); color:white; padding:0.25rem 0.75rem; border-radius:var(--radius-pill); font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">${t}</span>`).join('')}
                    </div>
                    <h3 class="product-title" style="font-size:2rem; margin-bottom:0.5rem; color:var(--accent-dark); font-weight: 700; line-height: 1.2;">${p.name}</h3>
                    <p style="color:var(--text-muted); font-size: 1.1rem; margin-bottom:0;"><i data-lucide="factory" style="width: 16px; display:inline;"></i> Mfg: <strong style="color:var(--accent-dark);">${p.supplier || 'Premium Glass Consortium'}</strong></p>
                </div>

                <!-- Inline Specs Row (Responsive & Clean) -->
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem;">
                    ${p.thickness ? `<span style="background: var(--bg-alt); border: 1px solid var(--border-light); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; color: var(--text-main); display:flex; align-items:center; gap:0.5rem;"><i data-lucide="ruler" style="width:14px; opacity:0.6;"></i> ${p.thickness}mm Thick</span>` : ''}
                    ${p.certification ? `<span style="background: var(--bg-alt); border: 1px solid var(--border-light); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; color: var(--text-main); display:flex; align-items:center; gap:0.5rem;"><i data-lucide="shield-alert" style="width:14px; opacity:0.6;"></i> ${p.certification}</span>` : ''}
                    ${p.edge ? `<span style="background: var(--bg-alt); border: 1px solid var(--border-light); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; color: var(--text-main); display:flex; align-items:center; gap:0.5rem;"><i data-lucide="scissors" style="width:14px; opacity:0.6;"></i> ${p.edge}</span>` : ''}
                    ${p.color ? `<span style="background: var(--bg-alt); border: 1px solid var(--border-light); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; color: var(--text-main); display:flex; align-items:center; gap:0.5rem;"><i data-lucide="droplet" style="width:14px; opacity:0.6;"></i> ${p.coating ? p.coating + ' · ' : ''}${p.color}</span>` : ''}
                    ${p.minOrder ? `<span style="background: var(--bg-alt); border: 1px solid var(--border-light); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; color: var(--text-main); display:flex; align-items:center; gap:0.5rem;"><i data-lucide="boxes" style="width:14px; opacity:0.6;"></i> MOQ: ${p.minOrder}</span>` : ''}
                    ${p.leadTime ? `<span style="background: var(--bg-alt); border: 1px solid var(--border-light); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; color: var(--text-main); display:flex; align-items:center; gap:0.5rem;"><i data-lucide="clock" style="width:14px; opacity:0.6;"></i> Lead: ${p.leadTime}</span>` : ''}
                </div>

                <!-- AI Explanation Component -->
                <div style="background: rgba(20, 184, 166, 0.05); padding: 1.5rem; border-radius: var(--radius-md); border-left: 4px solid #14b8a6; margin-bottom: 2rem;">
                    <p style="font-weight:700; font-size:1.1rem; margin-bottom:0.5rem; color:#14b8a6; display:flex; align-items:center; gap:0.5rem;">
                        Why it fits your need:
                    </p>
                    <p style="font-size:1.05rem; color:var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">
                        ${ex.whyThisGlass || p.description}
                    </p>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">${benefitsHTML}</div>
                </div>

                <!-- Price and Button Row -->
                <div class="product-footer" style="border-top: 1px solid var(--border-light); padding-top:1.5rem; margin-top:auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                    <div class="product-price" style="font-size:2rem; color:var(--text-main);">₹${Number(p.price).toLocaleString('en-IN')} <span style="font-size:1rem; color:var(--text-muted); font-weight:500;">/${p.priceUnit||'sqft'} (Ex. GST)</span></div>
                    <div style="display:flex; gap:1rem;">
                        <button class="btn btn-outline" style="font-size:1.15rem; padding: 1rem 1.5rem; border-radius:var(--radius-sm); border:1px solid var(--border-light); display:flex; align-items:center; cursor:pointer;" onclick="openVendorCompare('${p.id}')"><i data-lucide="git-compare" style="width:18px; margin-right:6px;"></i> Compare</button>
                        <button class="btn btn-primary" onclick="addToCart('${p.id}')" style="font-size:1.15rem; padding: 1rem 2rem;"><i data-lucide="shopping-cart" style="width:18px"></i> Add To Cart</button>               
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// Infinite Ticker Marquee Generator
// ============================================
function populateHomeTicker(rates) {
    const ticker = document.getElementById('homeRatesTicker');
    if (!ticker) return;

    // Generate inner items
    const generateItems = () => rates.map(r => {
        const clr = r.trend === 'UP' ? '#0d9488' : r.trend === 'DOWN' ? '#ef4444' : 'var(--text-muted)';
        const ico = r.trend === 'UP' ? 'trending-up' : r.trend === 'DOWN' ? 'trending-down' : 'minus';
        return `
            <div class="marquee-item" style="font-size: 1.25rem;">
                <span style="color:var(--text-muted)">${r.name} (${r.thickness || 'Var'})</span>
                <span style="color:var(--text-main)">${r.rate}</span>
                <i data-lucide="${ico}" style="color:${clr}; width:20px; height:20px;"></i>
            </div>
        `;
    }).join('');

    const fullSet = generateItems();
    // Putting it multiple times forces it completely over 200% screen width ensuring the loop never breaks visually.
    ticker.innerHTML = fullSet + fullSet + fullSet + fullSet;
    lucide.createIcons();
}


// ============================================
// Catalog Tab
// ============================================
function populateCatalogFilters() {
    const cats = [...new Set(state.products.map(p => p.category))];
    const sel = document.getElementById('catalogCategoryFilter');
    if(!sel) return;
    cats.forEach(c => { const o = document.createElement('option'); o.value=c; o.innerText=c; sel.appendChild(o); });
}

function setCatalogFilter(cat) {
    const sel = document.getElementById('catalogCategoryFilter');
    if (!sel) return;
    
    // Attempt exact dropdown match
    let found = false;
    for(let i=0; i<sel.options.length; i++) {
        if(sel.options[i].value === cat) {
            sel.selectedIndex = i;
            found = true;
            break;
        }
    }
    // If not found in native dropdown, drop query into search box
    if(!found && cat !== '') {
         document.getElementById('catalogSearch').value = cat;
         sel.value = '';
    } else {
         document.getElementById('catalogSearch').value = '';
    }
    
    // Highlight UI Button
    document.querySelectorAll('.quick-filters .prompt-chip').forEach(btn => {
        if((cat !== '' && btn.innerText.includes(cat.split(' ')[0])) || (cat === '' && btn.innerText === 'All')) {
            btn.style.background = 'var(--accent-dark)';
            btn.style.color = 'white';
            btn.style.borderColor = 'var(--accent-dark)';
        } else {
            btn.style.background = 'var(--bg-surface)';
            btn.style.color = 'var(--text-muted)';
            btn.style.borderColor = 'var(--border-light)';
        }
    });

    handleCatalogFilter();
}

function handleCatalogFilter() { renderCatalog(); }
function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    if(!grid) return;
    const cat = document.getElementById('catalogCategoryFilter').value;
    const q = (document.getElementById('catalogSearch').value||'').toLowerCase();
    
    // Use backend products if loaded, else fall back to static catalog
    const source = state.products.length ? state.products : STATIC_PRODUCTS;
    
    const filtered = source.filter(p => {
        const catMatch = !cat || p.category === cat;
        const qMatch = !q || p.name.toLowerCase().includes(q) || (p.application||'').toLowerCase().includes(q) || (p.process||'').toLowerCase().includes(q);
        return catMatch && qMatch;
    });
    
    if(!filtered.length) {
        grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1"><i data-lucide="search-x"></i><h3>No products found</h3></div>`;
    } else {
        grid.innerHTML = filtered.map(createProductCard).join('');
    }
    lucide.createIcons();
}

// ============================================
// AI Search Tab
// ============================================
function selectRole(role, el) {
    selectedRole = role;
    document.querySelectorAll('.role-pill').forEach(b => {
        b.style.background = 'var(--bg-surface)';
        b.style.color = 'var(--text-muted)';
        b.style.borderColor = 'var(--border-light)';
    });
    el.style.background = 'var(--accent-dark)';
    el.style.color = 'white';
    el.style.borderColor = 'var(--accent-dark)';
    const placeholders = {
        homeowner: 'e.g. I need glass for my bathroom shower, balcony railing, or bedroom window...',
        architect: 'e.g. Structural glazing for south facade, acoustic laminated for boardroom partition...',
        builder:   'e.g. Bulk toughened glass for 50 apartments, IGU units for curtain wall system...',
        dealer:    'e.g. 6mm clear float stock price, 8mm toughened availability from factory...'
    };
    const inp = document.getElementById('aiSearchInput');
    if(inp) inp.placeholder = placeholders[role] || placeholders.homeowner;
}

async function performAISearch() {
    // Check both input fields (home page and AI Match tab)
    const inp1 = document.getElementById('aiSearchInput');
    const inp2 = document.getElementById('aiSearchInput2');
    const q = (inp1 && inp1.value.trim()) || (inp2 && inp2.value.trim()) || '';
    if(!q) return;
    
    // Determine which results container to use
    const resContainer = document.getElementById('searchResults') || document.getElementById('searchResults2');
    // Also update the secondary container if it exists
    const resContainer2 = document.getElementById('searchResults2');
    resContainer.innerHTML = `<div class="empty-state" style="grid-column: 1/-1"><i data-lucide="loader" class="spin"></i><p>Finding best matches...</p></div>`;
    lucide.createIcons();

    try {
        const res = await fetch('/api/search', {
            method: 'POST', headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ query: q, topK: 3, filters: {}, role: selectedRole })
        });
        
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Server error ' + res.status + ' — Check that GROQ_API_KEY is set in Render environment variables.');
        }
        
        const data = await res.json();
        
        if(data.results && data.results.length > 0) {
                // Determine Allied products dynamically based on match
                const ALLIED_PRODUCTS = {
                    'toughened': [
                        { name: 'Heavy Duty Spider Fittings (SS 304)', category: 'Hardware', price: 1500, priceUnit: 'set', reason: 'Toughened glass necessitates point-fixings that evenly distribute severe load weights without shattering panes.' },
                        { name: 'Aluminium Balcony U-Channel Profile', category: 'Railing', price: 2200, priceUnit: 'meter', reason: 'This exact U-Channel is engineered to lock heavy tempered panes into place purely via pressure gaskets, eliminating drilling weaknesses.' }
                    ],
                    'laminated': [
                        { name: 'Structural SGP Grade Sealant', category: 'Sealant', price: 650, priceUnit: 'tube', reason: 'Standard sealants aggressively degrade laminated inner PVB films over time. SGP Grade explicitly prevents edge-delamination.' },
                        { name: 'Heavy Duty Glass Suction Lifter', category: 'Construction Tools', price: 4500, priceUnit: 'unit', reason: 'Because acoustic laminated panels weigh roughly 40% more than float sheets, raw manual handling invites severe micro-fractures.' }
                    ],
                    'frosted': [
                        { name: 'Anti-Bacterial Silicone Sealant', category: 'Chemicals', price: 350, priceUnit: 'tube', reason: 'Frosted/etched surfaces in high-moisture bathroom environments easily trap mold. This sealant actively rejects fungal buildup at the seams.' },
                        { name: 'Patch Fittings (Matte Black Finish)', category: 'Hardware', price: 1200, priceUnit: 'set', reason: 'Aesthetically pairs perfectly with low-opacity frosting, providing sleek structural hinging without ruining the privacy aesthetic.' }
                    ],
                    'default': [
                        { name: 'Clear Grade Weather Sealant PRO', category: 'Sealant', price: 280, priceUnit: 'tube', reason: 'The absolute essential requirement for guaranteeing airtight, moisture-proof bounding lines when mating glass to solid framework.' },
                        { name: 'Diamond Edge Polishing KIT', category: 'Accessories', price: 850, priceUnit: 'kit', reason: 'Exposed glass perimeters require extreme smoothing to prevent deep cuts or chips during mounting and everyday spatial usage.' }
                    ]
                };

                let queryCat = 'default';
                const lowerCat = data.results[0]?.category?.toLowerCase() || '';
                const lowerQ = q.toLowerCase();
                
                if(lowerCat.includes('tough') || lowerQ.includes('rail') || lowerQ.includes('balcony') || lowerQ.includes('exterior')) queryCat = 'toughened';
                else if(lowerCat.includes('lami') || lowerCat.includes('dgu') || lowerCat.includes('acoustic')) queryCat = 'laminated';
                else if(lowerCat.includes('frost') || lowerQ.includes('privacy') || lowerQ.includes('bath')) queryCat = 'frosted';
                
                const allied = ALLIED_PRODUCTS[queryCat] || ALLIED_PRODUCTS['default'];

                const mainMatchesHTML = data.results.map(createAISearchResultCard).join('');
                
                // Construct Allied HTML Box
                const alliedHTML = `
                    <div style="grid-column: 1/-1; background:var(--bg-surface); padding: 2.5rem; border-radius: var(--radius-lg); border: 2px dashed #14b8a6; margin-top: 1rem; box-shadow: 0 10px 30px rgba(20, 184, 166, 0.05);">
                        <h4 style="font-size:1.75rem; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.75rem;">
                            <i data-lucide="package-plus" style="color:#14b8a6; width:28px; height:28px;"></i>
                            Frequently Bought Together
                        </h4>
                        <p style="color:var(--text-muted); font-size:1.15rem; margin-bottom:2rem;">Based on your structural requirements, our AI recommends these allied accessories.</p>
                        <div style="display:flex; gap:1.5rem; flex-wrap:wrap;">
                            ${allied.map((a, i) => `
                                <div style="background:var(--bg-main); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--border-light); flex:1; min-width:280px; display:flex; flex-direction:column; transition: var(--transition);">
                                    <div style="font-size:0.85rem; font-weight:700; color:#14b8a6; margin-bottom:0.5rem; text-transform:uppercase; letter-spacing: 0.05em;">${a.category}</div>
                                    <h4 style="font-size:1.25rem; margin-bottom:1rem; flex:1; color:var(--accent-dark);">${a.name}</h4>
                                    
                                    <div style="background: rgba(20, 184, 166, 0.05); padding: 0.85rem; border-radius: var(--radius-sm); border-left: 2px solid #14b8a6; margin-bottom: 1.5rem;">
                                        <div style="font-size:0.75rem; font-weight:700; color:#14b8a6; margin-bottom:0.25rem;">WHY THIS IS BEST FOR YOU</div>
                                        <p style="font-size:0.9rem; color:var(--text-muted); line-height: 1.5; margin:0;">${a.reason}</p>
                                    </div>
                                    
                                    <div style="display:flex; justify-content:space-between; align-items:center; border-top: 1px solid var(--border-light); padding-top: 1.25rem;">
                                        <div style="font-weight:700; font-size:1.35rem; color:var(--text-main);">₹${a.price} <span style="font-size:0.9rem; color:var(--text-muted); font-weight:400;">/${a.priceUnit}</span></div>
                                        <button class="btn btn-outline btn-sm" onclick="alert('Added ${a.name} to Cart!')" style="padding:0.6rem 1.25rem; border-color:var(--accent-dark); color:var(--accent-dark); font-weight:600;"><i data-lucide="plus" style="width:14px; height:14px; margin-right:4px;"></i> Add</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

                resContainer.innerHTML = `<h3 style="margin-bottom:1.5rem; font-size:2.25rem; width:100%; grid-column:1/-1;">AI Match Results for "${q}"</h3>` 
                                         + mainMatchesHTML + alliedHTML;
        } else {
            resContainer.innerHTML = `<div class="empty-state" style="grid-column: 1/-1"><i data-lucide="info"></i><p style="opacity:0.6;padding:16px">No matches found. Try a different query.</p></div>`;
        }
    } catch(e) {
        console.error('Search failed:', e);
        resContainer.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><p style="color:#ef4444;padding:16px">Search error: ${e.message}</p></div>`;
    }
    lucide.createIcons();
}

// ============================================
// Estimate Tab
// ============================================
function calculateEstimate() {
    const glassTypeKey = document.getElementById('estGlassType').value;
    const w = parseFloat(document.getElementById('estWidth').value);
    const h = parseFloat(document.getElementById('estHeight').value);
    const qty = parseInt(document.getElementById('estQty').value) || 1;
    const resDiv = document.getElementById('estResultBox');
    
    if(!w || !h) {
        resDiv.innerHTML = `<p style="color:#ef4444; padding:1rem;">Please enter both width and height in mm.</p>`;
        return;
    }
    
    const rates = {
        'float':      { min: 45,  max: 60,  name: 'Clear Float 5mm' },
        'toughened':  { min: 120, max: 160, name: 'Toughened 8mm' },
        'laminated':  { min: 180, max: 250, name: 'Laminated 10mm' },
        'idu':        { min: 350, max: 500, name: 'IGU/DGU 6+12+6mm' },
        'frosted':    { min: 85,  max: 110, name: 'Frosted 6mm' },
        'reflective': { min: 100, max: 140, name: 'Reflective 6mm' },
        'lowe':       { min: 200, max: 300, name: 'Low-E 6mm' },
        'decorative': { min: 150, max: 220, name: 'Back-Painted 8mm' },
    };
    
    const rate = rates[glassTypeKey] || rates['float'];
    // Convert mm to sqft: 1 sqft = 92,900 mm²
    const areaSqft = (w * h * qty) / 92900;
    const minCost = Math.round(areaSqft * rate.min);
    const maxCost = Math.round(areaSqft * rate.max);
    
    resDiv.innerHTML = `
        <div style="text-align:left;">
            <p style="font-weight:700; color:#94a3b8; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:1.5rem;">Estimate Summary</p>
            <div style="font-size:0.95rem; color:#cbd5e1; margin-bottom:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
                <div style="display:flex; justify-content:space-between;"><span style="color:#64748b;">Glass Type</span><span style="font-weight:600;">${rate.name}</span></div>
                <div style="display:flex; justify-content:space-between;"><span style="color:#64748b;">Size</span><span style="font-weight:600;">${w}mm x ${h}mm</span></div>
                <div style="display:flex; justify-content:space-between;"><span style="color:#64748b;">Quantity</span><span style="font-weight:600;">${qty} panel${qty>1?'s':''}</span></div>
                <div style="display:flex; justify-content:space-between;"><span style="color:#64748b;">Total Area</span><span style="font-weight:600;">${areaSqft.toFixed(1)} sqft</span></div>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:1.25rem; margin-bottom:1.25rem;">
                <p style="font-size:0.8rem; color:#64748b; font-weight:700; text-transform:uppercase; margin-bottom:0.5rem;">Estimated Cost</p>
                <h2 style="font-size:2.75rem; color:white; font-family:var(--font-heading); line-height:1;">₹${minCost.toLocaleString('en-IN')} <span style="font-size:1.75rem; color:#14b8a6;">–</span> ₹${maxCost.toLocaleString('en-IN')}</h2>
                <p style="font-size:0.9rem; color:#64748b; margin-top:0.5rem;">₹${rate.min} – ₹${rate.max} per sqft (today's rate)</p>
            </div>
            <div style="font-size:0.82rem; color:#475569; margin-bottom:1.5rem; line-height:1.6;">
                * Excludes installation &amp; freight<br>* Final price confirmed by supplier
            </div>
            <button class="btn btn-primary" style="width:100%; justify-content:center; padding:0.9rem;" onclick="switchTab('search')"><i data-lucide="send" style="width:16px; margin-right:6px;"></i> Request Exact Quote</button>
        </div>
    `;
    lucide.createIcons();
}

// ============================================
// Rates Tab
// ============================================
let rsChart=null, barChart=null;
function renderRatesDashboard(rates) {
    const grid = document.getElementById('ratesGrid');
    if(grid) {
        grid.innerHTML = rates.map(r => {
            const clr = r.trend === 'UP' ? 'teal' : r.trend === 'DOWN' ? '#ef4444' : 'var(--text-muted)';
            const ico = r.trend === 'UP' ? 'trending-up' : r.trend === 'DOWN' ? 'trending-down' : 'minus';
            return `
            <div style="background:var(--bg-surface); border:1px solid var(--border-light); padding:1.5rem; border-radius:var(--radius-md); box-shadow:var(--shadow-sm);">
                <div style="font-size:0.85rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.5rem;">${r.name} · ${r.thickness||'Var'}</div>
                <div style="font-size:1.75rem; font-weight:700; margin-bottom:0.5rem;">${r.rate}</div>
                <div style="font-size:1rem; color:${clr}; font-weight:600; display:flex; align-items:center; gap:0.25rem;"><i data-lucide="${ico}" style="width:16px; height:16px;"></i> ${r.trend}</div>
            </div>`;
        }).join('');
    }
    updateRatesCharts();
    lucide.createIcons();
}

function updateRatesCharts() {
    if(!document.getElementById('ratesChartMain')) return; 
    if(rsChart) rsChart.destroy();
    if(barChart) barChart.destroy();

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Multi-series 7-day trend: 5 major glass types
    rsChart = new Chart(document.getElementById('ratesChartMain').getContext('2d'), {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Toughened 8mm (₹/sqft)',
                    data: [132, 134, 138, 142, 140, 141, 144],
                    borderColor: '#0f172a', backgroundColor: 'transparent',
                    tension: 0.4, borderWidth: 2.5, pointRadius: 3
                },
                {
                    label: 'Laminated 10mm (₹/sqft)',
                    data: [210, 212, 218, 215, 220, 222, 225],
                    borderColor: '#14b8a6', backgroundColor: 'transparent',
                    tension: 0.4, borderWidth: 2.5, pointRadius: 3
                },
                {
                    label: 'IGU/DGU (₹/sqft)',
                    data: [400, 405, 410, 415, 418, 420, 425],
                    borderColor: '#6366f1', backgroundColor: 'transparent',
                    tension: 0.4, borderWidth: 2.5, pointRadius: 3
                },
                {
                    label: 'Low-E Glass (₹/sqft)',
                    data: [230, 235, 238, 242, 240, 245, 250],
                    borderColor: '#f59e0b', backgroundColor: 'transparent',
                    tension: 0.4, borderWidth: 2.5, pointRadius: 3
                },
                {
                    label: 'Clear Float 5mm (₹/sqft)',
                    data: [48, 50, 51, 52, 51, 53, 54],
                    borderColor: '#94a3b8', backgroundColor: 'transparent',
                    tension: 0.4, borderWidth: 1.5, pointRadius: 3,
                    borderDash: [5, 4]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: { boxWidth: 12, font: { size: 11 }, padding: 16 }
                },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: v => '₹' + v } },
                x: { grid: { display: false } }
            }
        }
    });

    // Bar chart — all 8 glass category avg prices
    barChart = new Chart(document.getElementById('ratesBarChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Float 5mm', 'Toughened\n8mm', 'Frosted\n6mm', 'Reflective\n6mm', 'Back-Painted\n8mm', 'Laminated\n10mm', 'Low-E\n6mm', 'IGU/DGU'],
            datasets: [{
                label: 'Avg Price (₹/sqft)',
                data: [52, 140, 97, 120, 185, 215, 250, 425],
                backgroundColor: [
                    '#94a3b8',   // Float — neutral
                    '#0f172a',   // Toughened — dark navy
                    '#8b5cf6',   // Frosted — purple
                    '#06b6d4',   // Reflective — cyan
                    '#f97316',   // Back-Painted — orange
                    '#334155',   // Laminated — slate
                    '#f59e0b',   // Low-E — amber
                    '#14b8a6',   // IGU/DGU — teal
                ],
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: ctx => ' ₹' + ctx.parsed.y + ' / sqft' } }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { callback: v => '₹' + v }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });
}

// ============================================
// Cart Logic
// ============================================
function loadCart() { const s = localStorage.getItem('am_cart'); if(s) state.cart = JSON.parse(s); updateCartIcon(); }
function saveCart() { localStorage.setItem('am_cart', JSON.stringify(state.cart)); updateCartIcon(); if(state.currentTab==='cart') renderCart(); }
function updateCartIcon() {
    const badge = document.getElementById('cartBadge');
    const tot = state.cart.reduce((s, i) => s + i.qty, 0);
    badge.innerText = tot;
    badge.style.display = tot > 0 ? 'flex' : 'none';
}

function addToCart(productId, btnEl) {
    const source = state.products.length ? state.products : STATIC_PRODUCTS;
    const product = source.find(p => p.id == productId);
    if (!product) return;
    
    // Extract Dimensional Geometry (if available)
    const wEl = document.getElementById('w_' + productId);
    const hEl = document.getElementById('h_' + productId);
    
    let sqm = 1; // Default to 1 sqm baseline
    let dimStr = '';
    
    if(wEl && hEl) {
        const w = parseFloat(wEl.value) || 1200;
        const h = parseFloat(hEl.value) || 2100;
        sqm = (w * h) / 1000000;
        dimStr = `<span style="color:#14b8a6">${w}x${h}mm</span>`;
    }
    
    // Calculate engineered panel price
    const pricePerPanel = Math.round(product.price * sqm);
    const cartItemId = productId + '_' + (wEl?wEl.value:'def') + 'x' + (hEl?hEl.value:'def');
    
    const ext = state.cart.find(i => i.id === cartItemId);
    if(ext) { 
        ext.qty++; 
    } else { 
        state.cart.push({ 
            ...product, 
            id: cartItemId, 
            name: product.name,
            thickness: product.thickness ? `${product.thickness}mm | ${dimStr}` : dimStr, 
            price: pricePerPanel, 
            qty: 1 
        }); 
    }
    
    saveCart();
    
    // UI Button Feedback
    const btn = btnEl || event.currentTarget;
    const origin = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check" style="width:16px"></i>`;
    btn.style.background = '#10b981';
    btn.style.borderColor = '#10b981';
    lucide.createIcons();
    setTimeout(() => { btn.innerHTML=origin; btn.style.background=''; btn.style.borderColor=''; lucide.createIcons(); }, 1000);
}

function updateCartQty(id, amt) {
    const item = state.cart.find(i => i.id == id);
    if(!item) return;
    item.qty += amt;
    if(item.qty <= 0) state.cart = state.cart.filter(i => i.id != id);
    saveCart(); setTimeout(renderCart, 50); // Give storage time to set
}

const alliedAccessories = [
    { id: 'a1', name: 'High-Viscosity Silicone Sealant (Clear)', price: 450, tag: 'Sealant', match: ['float', 'frosted', 'toughened', 'decorative'], image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400' },
    { id: 'a2', name: '316-Grade Stainless Steel Spigots (Set of 2)', price: 1850, tag: 'Hardware', match: ['laminated', 'toughened'], image: 'https://images.unsplash.com/photo-1517646288022-779899f8992e?q=80&w=400' },
    { id: 'a3', name: 'Aluminium U-Channel Profile (3m Base)', price: 850, tag: 'Extrusion', match: ['acoustic', 'laminated', 'float', 'frosted'], image: 'https://images.unsplash.com/photo-1533038595180-f748d8d1847a?q=80&w=400' },
    { id: 'a4', name: 'Heavy Duty Patch Fittings (Floor Spring Ready)', price: 3200, tag: 'Hardware', match: ['toughened'], image: 'https://images.unsplash.com/photo-1542013936693-884638324a02?q=80&w=400' },
    { id: 'a5', name: 'DGU Primary Sealant & Spacers (Per Meter)', price: 120, tag: 'Insulation', match: ['idu'], image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400' },
    { id: 'a6', name: 'Glass Lacquer Solvent (Cleaning Grade)', price: 280, tag: 'Cleaning', match: ['decorative'], image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400' }
];

function addAlliedToCart(aid) {
    const ax = alliedAccessories.find(a => a.id === aid);
    if(!ax) return;
    const existing = state.cart.find(i => i.id === aid);
    if(existing) { existing.qty++; } else {
        state.cart.push({ id: ax.id, name: ax.name, category: ax.tag, price: ax.price, image: ax.image, qty: 1, supplier: 'Verified Allied Partner' });
    }
    saveCart(); renderCart();
}

function renderCart() {
    const cont = document.getElementById('cartItemsList');
    const alliedBox = document.getElementById('cartAlliedBox');
    const alliedList = document.getElementById('cartAlliedList');
    const leftCol = document.getElementById('cartItemsList').parentElement;

    if(!state.cart.length) {
        cont.innerHTML = `<div class="empty-state" style="padding: 6rem 2rem; background:var(--bg-surface); border:1px solid var(--border-light); border-radius:var(--radius-lg); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;"><i data-lucide="shopping-cart" style="width:64px;height:64px;color:rgba(15,23,42,0.1);margin-bottom:1.5rem;"></i><h3 style="font-size:1.75rem; color:var(--accent-dark); margin-bottom:0.5rem;">Your cart is entirely empty.</h3><p style="color:var(--text-muted); font-size:1.1rem; margin-bottom:2rem;">Browse our verified architectural glass catalog to begin building your project payload.</p><button class="btn btn-primary" onclick="switchTab('catalog')" style="padding: 1.25rem 2.5rem; font-size:1.15rem; box-shadow:0 4px 15px rgba(15,23,42,0.15);">Explore Material Catalog</button></div>`;
        if(alliedBox) alliedBox.style.display = 'none';
        const summaryBox = document.querySelector('.cart-summary');
        if(summaryBox) summaryBox.style.display = 'none';
        leftCol.style.gridColumn = '1 / -1';
        document.querySelector('.cart-layout').style.display = 'block'; // break grid
        lucide.createIcons(); return;
    }
    
    const summaryBox = document.querySelector('.cart-summary');
    if(summaryBox) summaryBox.style.display = 'block';
    
    // RESTORE PROPER 2-COLUMN GRID POSITIONS
    leftCol.style.gridColumn = ''; 
    document.querySelector('.cart-layout').style.display = 'grid';
    
    // Render Premium Cart List
    cont.innerHTML = state.cart.map(item => `
        <div class="cart-item" style="display:flex; align-items:center; gap:1.5rem; background:var(--bg-surface); padding:1.5rem; border-radius:var(--radius-lg); border:1px solid var(--border-light); box-shadow:var(--shadow-sm); transition:transform 0.2s;">
            <div class="cart-item-img" style="width:100px; height:100px; border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--border-light);flex-shrink:0;">
                <img src="${item.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400'}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="cart-item-info" style="flex:1;">
                <div class="cart-item-title" style="font-size:1.25rem; font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">${item.name}</div>
                <div class="cart-item-meta" style="font-size:0.95rem; color:var(--text-muted); display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
                    <span style="background:var(--bg-alt); padding:0.2rem 0.5rem; border-radius:4px; border:1px solid var(--border-light); text-transform:uppercase; font-size:0.75rem; font-weight:700;">${item.category}</span> 
                    ${item.thickness ? '<span style="color:var(--border-dark)">|</span> '+item.thickness : ''}
                    ${item.supplier ? '<span style="color:var(--border-dark)">|</span> <span style="color:var(--accent-dark); font-weight:700;"><i data-lucide="factory" style="width:12px; display:inline; margin-right:2px;"></i> '+item.supplier+'</span>' : ''}
                </div>
                <div style="margin-top:1rem; display:flex; align-items:center; gap:1.5rem;">
                    <div class="cart-item-qty" style="display:flex; align-items:center; background:var(--bg-alt); padding:0.25rem; border-radius:var(--radius-md); border:1px solid var(--border-light);">
                        <button onclick="updateCartQty('${item.id}', -1)" style="width:32px; height:32px; background:white; border-radius:6px; box-shadow:var(--shadow-sm); font-size:1.2rem; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center;">-</button>
                        <span style="font-size:1.1rem; font-weight:700; width:40px; text-align:center;">${item.qty}</span>
                        <button onclick="updateCartQty('${item.id}', 1)" style="width:32px; height:32px; background:white; border-radius:6px; box-shadow:var(--shadow-sm); font-size:1.2rem; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center;">+</button>
                    </div>
                </div>
            </div>
            <div class="cart-item-price" style="font-size:1.5rem; font-weight:800; color:var(--accent-dark); min-width:120px; text-align:right;">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        </div>
    `).join('');
    
    // Allied Logic mapping
    let matchedKeywords = [];
    state.cart.forEach(c => {
        const cat = (c.category||'').toLowerCase();
        matchedKeywords.push(cat); // Match exact category
        if(cat.includes('tough')) matchedKeywords.push('toughened'); 
        if(cat.includes('lamin')) matchedKeywords.push('laminated');
        if(cat.includes('float')) matchedKeywords.push('float'); 
        if(cat.includes('frost')) matchedKeywords.push('frosted');
        if(cat.includes('acous')) matchedKeywords.push('acoustic'); 
        if(cat.includes('fire')) matchedKeywords.push('fire rated');
        if(cat.includes('deco') || cat.includes('painted')) matchedKeywords.push('decorative');
    });
    
    let suggested = alliedAccessories.filter(a => {
        const inCart = state.cart.find(c => c.id === a.id);
        const isMatch = a.match.some(m => matchedKeywords.includes(m));
        return !inCart && isMatch;
    });
    
    // Fallback if no specific match
    if(!suggested.length && !state.cart.find(c=>c.id==='a1')) suggested.push(alliedAccessories[0]);
    
    if(suggested.length && alliedBox) {
        alliedBox.style.display = 'block';
        alliedList.innerHTML = suggested.slice(0,3).map(a => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:1.25rem; background:white; border-radius:var(--radius-md); border:1px solid var(--border-light); box-shadow:var(--shadow-sm);">
                 <div>
                      <div style="font-weight:700; font-size:1.1rem; margin-bottom:0.25rem;">${a.name}</div>
                      <div style="font-size:0.85rem; color:var(--text-muted);"><span style="background:var(--bg-alt); padding:0.1rem 0.4rem; border-radius:4px; border:1px solid var(--border-light);">${a.tag}</span> · Perfectly pairs with your selection</div>
                 </div>
                 <div style="display:flex; align-items:center; gap:1.5rem;">
                      <span style="font-weight:800; font-size:1.25rem; color:var(--accent-dark);">₹${a.price}</span>
                      <button class="btn" onclick="addAlliedToCart('${a.id}')" style="background:#0d9488; color:white; padding:0.5rem 1rem; border-radius:var(--radius-pill); font-size:0.9rem; border:none; box-shadow:0 2px 8px rgba(13,148,136,0.25);"><i data-lucide="plus" style="width:14px; margin-right:4px;"></i> Add</button>
                 </div>
            </div>
        `).join('');
    } else if(alliedBox) {
        alliedBox.style.display = 'none';
    }

    const sub = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('cartSubtotal').innerText = `₹${sub.toLocaleString('en-IN')}`;
    document.getElementById('cartTaxes').innerText = `₹${(sub*0.18).toLocaleString('en-IN')}`;
    document.getElementById('cartTotal').innerText = `₹${(sub*1.18).toLocaleString('en-IN')}`;
    lucide.createIcons();
}

function checkout() {
    if(!state.cart.length) return;
    alert("Proceeding to checkout with " + state.cart.length + " items.");
    state.cart = []; saveCart(); switchTab('home');
}

// ============================================
// Thickness Visualizer Logic
// ============================================
function initThicknessLab() {
    const slider = document.getElementById('thickSlider');
    if(!slider) return;
    slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        document.getElementById('thickDisplayVal').innerText = val + 'mm';
        document.getElementById('glassPane3d').style.setProperty('--thick', (val * 3) + 'px');
        const infos = { 4: "Standard framing", 6: "Table tops", 8: "Shower screens", 10: "Doors & Glass Walls", 15: "Heavy structural glass", 19: "Walkable floors" };
        let c = 4; Object.keys(infos).forEach(k => { if(val >= Number(k)) c = k; });
        document.getElementById('thickApp').innerText = "Ideal for: " + infos[c];
    });
    slider.dispatchEvent(new Event('input'));
}
