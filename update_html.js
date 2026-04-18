const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Updates Fonts
html = html.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:.*?rel="stylesheet"\/>/g,
  `<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>`
);

// 2. CSS variables for dark theme
html = html.replace(
  /:root \{[\s\S]*?\}/,
  `:root {
  --ink:       #ffffff;
  --ink-2:     #e0e0e0;
  --ink-3:     #a0a0a0;
  --ink-4:     #808080;
  --bg:        #0a0a0a;
  --bg-2:      #121212;
  --bg-3:      #1a1a1a;
  --white:     #161616;
  --blue:      #1c52c4;
  --blue-dark: #163fa8;
  --blue-lt:   rgba(28,82,196,0.15);
  --blue-bd:   #1c52c4;
  --green:     #1ea95a;
  --green-lt:  rgba(30,169,90,0.15);
  --green-bd:  #1ea95a;
  --amber:     #e5a935;
  --amber-lt:  rgba(229,169,53,0.15);
  --amber-bd:  #e5a935;
  --red:       #e53535;
  --bd:        rgba(255,255,255,.08);
  --bd-2:      rgba(255,255,255,.15);
  --shadow-sm: 0 1px 2px rgba(0,0,0,.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,.4);
  --shadow-lg: 0 16px 48px rgba(0,0,0,.5);
  --font:      'Sora', system-ui, -apple-system, sans-serif;
  --font-serif: 'Fraunces', serif;
  --ease:      cubic-bezier(.4,0,.2,1);
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 18px;
  --r-xl: 22px;
}`
);

// 3. Body background grid and glow
html = html.replace(
  /body \{[\s\S]*?min-height: 100vh;/,
  `body {
  font-family: var(--font);
  background-color: var(--bg);
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  background-attachment: fixed;
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;`
);

// Body pseudo glow
html = html.replace(
  /button \{ cursor: pointer;/,
  `body::before {
  content: "";
  position: fixed;
  top: -20%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(28,82,196,0.15) 0%, transparent 60%);
  pointer-events: none;
  z-index: -1;
}
button { cursor: pointer;`
);

html = html.replace(
  /background: rgba\(249,248,245,\.88\);/,
  `background: rgba(10,10,10,.88);`
);

// Typography overrides
html = html.replace(
  /\/\* ── WELCOME \/ EMPTY STATE ── \*\//,
  `h1, h2, h3, h4, h5, h6, .nav-brand { font-family: var(--font-serif); }

/* ── TAB SECTIONS ── */
.tab-section { display: none; padding: 20px 0 100px; max-width: 1000px; margin: 0 auto; width: 100%; animation: fadeUp .3s ease forwards; }
.tab-section.active { display: block; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

/* ── ANIMATIONS ── */
.fadeUp { animation: fadeUp .3s ease forwards; }

/* ── WELCOME / EMPTY STATE ── */`
);

html = html.replace(
  /background: var\(--ink\);[\s\S]*?color: white; border: none;/,
  `background: var(--blue); color: white; border: none;`
);
html = html.replace(
  /\.btn-send:hover \{ background: #0d0d0b;/,
  `.btn-send:hover { background: var(--blue-dark);`
);
html = html.replace(
  /\.mbtn-submit \{[\s\S]*?background: var\(--ink\);/,
  `.mbtn-submit { flex: 1; background: var(--blue);`
);
html = html.replace(
  /\.mbtn-submit:hover \{ background: #0d0d0b; \}/,
  `.mbtn-submit:hover { background: var(--blue-dark); }`
);


// 4. Update Navigation Links
html = html.replace(
  /<div class="nav-right">[\s\S]*?<\/div>/,
  `<div class="nav-right">
    <a class="nav-link tab-link active" href="#" data-target="search-tab">
      <i data-lucide="message-square"></i> Search
    </a>
    <a class="nav-link tab-link" href="#" data-target="catalog-tab">
      <i data-lucide="grid-3x3"></i> Catalog
    </a>
    <a class="nav-link tab-link" href="#" data-target="estimate-tab">
      <i data-lucide="calculator"></i> Estimate
    </a>
    <a class="nav-link tab-link" href="#" data-target="rates-tab">
      <i data-lucide="trending-up"></i> Rates
    </a>
    <div id="statusPill" class="status-pill loading">
      <i data-lucide="loader" id="statusIcon"></i>
      <span id="statusText">Connecting...</span>
    </div>
  </div>`
);

// 5. Structure Tabs
html = html.replace(
  /<!-- CHAT AREA -->/,
  `<!-- TAB SECTIONS -->
<main id="mainContent" style="flex: 1; display: flex; flex-direction: column;">

<!-- SEARCH TAB -->
<div id="search-tab" class="tab-section active" style="flex:1; display:flex; flex-direction:column; padding:0;">
<!-- CHAT AREA -->`
);

// Close Search Tab and Search Dock at bottom, and add other tabs
html = html.replace(
  /<!-- ENQUIRY MODAL -->/,
  `</div> <!-- end search-tab -->

<!-- CATALOG TAB -->
<div id="catalog-tab" class="tab-section" style="padding: 40px 20px;">
  <h2 style="font-size: 28px; margin-bottom: 20px;">Glass Product Catalog</h2>
  <div style="display:flex; gap:10px; margin-bottom:24px; flex-wrap:wrap; align-items:center;" id="catalogFilters">
    <span style="font-size: 13px; color: var(--ink-3);">Filters:</span>
    <button class="filter-chip active" data-cat="All">All</button>
    <button class="filter-chip" data-cat="Toughened">Toughened</button>
    <button class="filter-chip" data-cat="Laminated">Laminated</button>
    <button class="filter-chip" data-cat="Float">Float</button>
    <button class="filter-chip" data-cat="IGU">IGU</button>
    <button class="filter-chip" data-cat="Frosted">Frosted</button>
    <button class="filter-chip" data-cat="Decorative">Decorative</button>
  </div>
  <div id="catalogGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;"></div>
</div>

<!-- ESTIMATE TAB -->
<div id="estimate-tab" class="tab-section" style="padding: 40px 20px;">
  <h2 style="font-size: 28px; margin-bottom: 20px;">Estimate Calculator</h2>
  <div class="pc" style="max-width: 600px; margin: 0 auto; padding: 30px;">
    <div class="mfield">
      <label>Glass Type</label>
      <select id="estGlassType" style="width: 100%; border: 1.5px solid var(--bd-2); border-radius: var(--r-sm); padding: 10px 13px; font-size: 14px; font-family: var(--font); color: var(--ink); background: var(--bg); outline: none;">
        <option>Clear Float 5mm</option>
        <option>Toughened 8mm</option>
        <option>Laminated 10mm</option>
        <option>IGU/DGU 6+12+6mm</option>
        <option>Frosted 6mm</option>
        <option>Reflective 6mm</option>
        <option>Low-E 6mm</option>
        <option>Back-Painted 8mm</option>
      </select>
    </div>
    <div class="mfield-row">
      <div class="mfield"><label>Width (mm)</label><input type="number" id="estWidth" placeholder="e.g. 1200"/></div>
      <div class="mfield"><label>Height (mm)</label><input type="number" id="estHeight" placeholder="e.g. 2100"/></div>
    </div>
    <div class="mfield"><label>Quantity (panels)</label><input type="number" id="estQty" placeholder="e.g. 10"/></div>
    <button class="mbtn-submit" onclick="calculateEstimate()" style="width:100%; margin-top:10px;">
      <i data-lucide="calculator"></i> Calculate Estimate
    </button>
    
    <div id="estResult" style="margin-top:24px; display:none; padding: 20px; background:var(--blue-lt); border:1px solid var(--blue-bd); border-radius:var(--r-md); animation:fadeUp .3s;">
      <div style="font-size:12px; color:var(--blue); font-weight:600; text-transform:uppercase; margin-bottom:4px;" id="estResType"></div>
      <div style="font-size:24px; font-weight:700; margin-bottom:12px;" id="estResPrice"></div>
      <div style="font-size:13px; color:var(--ink-2); margin-bottom:12px;" id="estResCalculation"></div>
      <div style="font-size:11px; color:var(--ink-4); font-style:italic; margin-bottom:16px;">Final price subject to daily rates and vendor confirmation</div>
      <button class="btn-enquire" style="width:100%; justify-content:center;" onclick="openEstimateEnquiry()">
        Talk to a Supplier <i data-lucide="arrow-right"></i>
      </button>
    </div>
  </div>
</div>

<!-- RATES TAB -->
<div id="rates-tab" class="tab-section" style="padding: 40px 20px;">
  <h2 style="font-size: 28px; margin-bottom: 20px;">Daily Glass Rates</h2>
  <div style="font-size:13px; color:var(--ink-3); margin-bottom:20px;">Rates updated: Today 9:00 AM IST</div>
  <div id="ratesGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;"></div>
</div>

</main>
<!-- ENQUIRY MODAL -->`
);

// Role Selector and Rates Ticker
html = html.replace(
  /<div class="welcome" id="welcome">/,
  `<div class="welcome" id="welcome">
    
    <!-- Rates Ticker -->
    <div style="width: 100%; max-width: 820px; margin-bottom: 30px; overflow: hidden; padding: 10px 0; border-top: 1px solid var(--bd); border-bottom: 1px solid var(--bd); white-space: nowrap; position: relative;">
      <div style="display:inline-block; font-size:12px; font-weight:600; color:var(--ink-3); margin-right:16px;">TODAY'S RATES:</div>
      <div id="ratesTicker" style="display:inline-flex; gap: 20px; animation: scrollLeft 30s linear infinite;"></div>
    </div>

    <!-- Role Selector -->
    <div style="margin-bottom: 40px;">
      <div style="font-size: 14px; font-weight: 600; color: var(--ink-3); margin-bottom: 12px; text-align: center;">I am a...</div>
      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
        <button class="filter-chip role-btn" data-role="Homeowner" data-ph="e.g. glass for my bathroom shower, balcony railing...">Homeowner</button>
        <button class="filter-chip role-btn" data-role="Architect / Designer" data-ph="e.g. structural glazing for south facade, acoustic partition...">Architect / Designer</button>
        <button class="filter-chip role-btn" data-role="Builder / Developer" data-ph="e.g. bulk toughened glass for 50 apartments, IGU for curtain wall...">Builder / Developer</button>
        <button class="filter-chip role-btn" data-role="Glass Dealer" data-ph="e.g. 6mm clear float, 8mm toughened stock availability...">Glass Dealer</button>
      </div>
    </div>`
);
html = html.replace(
  /<\/style>/,
  `@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.role-btn.active {
  background: var(--blue);
  color: white;
  border-color: var(--blue-bd);
}
</style>`
);

// Cross Sell block
html = html.replace(
  /<\/div>` \+ `<div style="display:flex;flex-direction:column;gap:14px">\$\{cardsHTML\}<\/div>`;/,
  `</div>` + \`<div style="display:flex;flex-direction:column;gap:14px">\$\{cardsHTML\}</div>
  
  <div class="fadeUp" style="margin-top: 40px;">
    <div class="examples-label">You'll also need (Allied Products)</div>
    <div id="crossSellGrid-\$\{typingId\}" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;"></div>
  </div>\`;`
);


// Update Enquiry Modal to include field for Customer Type
html = html.replace(
  /<div class="mfield-row">\s*<div class="mfield"><label>Your name<\/label><input placeholder="Rajesh Kumar"\/><\/div>\s*<div class="mfield"><label>Company \/ Project<\/label><input placeholder="ABC Constructions"\/><\/div>\s*<\/div>/,
  `<div class="mfield-row">
      <div class="mfield"><label>Your name</label><input placeholder="Rajesh Kumar"/></div>
      <div class="mfield"><label>Company / Project</label><input placeholder="ABC Constructions"/></div>
    </div>
    <div class="mfield-row">
      <div class="mfield"><label>Customer Type</label><input id="modalRole" value="\${selectedRole || ''}" placeholder="e.g. Homeowner"/></div>
      <div class="mfield"><label>Phone / WhatsApp</label><input type="tel" placeholder="+91 98765 43210"/></div>
    </div>`
);
html = html.replace(
  /<div class="mfield"><label>Phone \/ WhatsApp<\/label><input type="tel" placeholder="\+91 98765 43210"\/><\/div>/,
  `` // remove extra phone field since we moved it above
);


// Scripts implementation
html = html.replace(
  /let lastQuery = '';/,
  `let lastQuery = '';
let selectedRole = '';
let allProducts = [];
let allRates = [];`
);

// At the end of DOMContentLoaded
html = html.replace(
  /pollStatus\(\);/,
  `pollStatus();
  setupTabs();
  setupRoleSelector();
  fetchProducts();
  fetchRates();`
);

let fullScriptAdditions = `
function setupTabs() {
  const links = document.querySelectorAll('.tab-link');
  const sections = document.querySelectorAll('.tab-section');
  links.forEach(l => {
    l.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(k => k.classList.remove('active'));
      l.classList.add('active');
      const target = l.getAttribute('data-target');
      sections.forEach(s => s.classList.remove('active'));
      document.getElementById(target).classList.add('active');
      
      // Hide dock search bar if not on search tab
      if (target === 'search-tab') {
        document.querySelector('.search-dock').style.display = 'block';
      } else {
        document.querySelector('.search-dock').style.display = 'none';
      }
    });
  });
}

function setupRoleSelector() {
  const btns = document.querySelectorAll('.role-btn');
  const input = document.getElementById('qInput');
  btns.forEach(b => {
    b.addEventListener('click', () => {
      btns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      selectedRole = b.getAttribute('data-role');
      input.setAttribute('placeholder', b.getAttribute('data-ph'));
    });
  });
}

async function fetchProducts() {
  try {
    allProducts = await (await fetch(API + '/products')).json();
    renderCatalog('All');
  } catch {}
}

const catBtnRules = {
  'Toughened': ['Tempered Glass'],
  'Laminated': ['Laminated Glass'],
  'Float': ['Float Glass'],
  'IGU': ['Insulated Glass Unit'],
  'Frosted': ['Float Glass'], // Frosted is in float glass
  'Decorative': ['Decorative Glass', 'Mirror']
};

document.querySelectorAll('#catalogFilters .filter-chip').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#catalogFilters .filter-chip').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderCatalog(b.getAttribute('data-cat'));
  });
});

function renderCatalog(filter) {
  const grid = document.getElementById('catalogGrid');
  let list = allProducts;
  if (filter !== 'All') {
    if (filter === 'Frosted') {
      list = allProducts.filter(p => p.color.toLowerCase().includes('frosted'));
    } else {
      const cats = catBtnRules[filter] || [];
      list = allProducts.filter(p => cats.includes(p.category));
    }
  }
  
  grid.innerHTML = list.map(p => {
    const specs = [p.thickness ? p.thickness+'mm' : null, p.process, p.color].filter(Boolean);
    return \`
    <div class="pc fadeUp" style="display:flex; flex-direction:column;">
      <div class="pc-body" style="padding:16px; flex:1;">
        <div class="pc-category"><i data-lucide="layers" style="width:12px;height:12px"></i>\${h(p.category)}</div>
        <div class="pc-name" style="font-size:16px;">\${h(p.name)}</div>
        <div class="pc-specs" style="margin-top:8px;">
          \${specs.map(s => \`<span class="spec-chip">\${h(s)}</span>\`).join('')}
        </div>
      </div>
      <div class="pc-footer" style="padding:12px 16px; margin-top:0;">
        <div class="pc-price" style="font-size:16px;">₹\${(+p.price).toLocaleString()} <span>\${h(p.priceUnit)}</span></div>
        <button class="btn-enquire" style="padding:6px 12px; font-size:12px;" onclick="openModal(\${p.id},'\${ea(p.name)}',\${p.price},'\${ea(p.priceUnit)}','\${ea(p.supplier)}')">Get Quote</button>
      </div>
    </div>\`;
  }).join('');
  lucide.createIcons();
}

async function fetchRates() {
  try {
    allRates = await (await fetch(API + '/rates')).json();
    const ticker = document.getElementById('ratesTicker');
    const grid = document.getElementById('ratesGrid');
    
    const renderRate = (r) => {
      let c = r.trend === 'UP' ? 'var(--red)' : r.trend === 'DOWN' ? 'var(--green)' : 'var(--ink-4)'; // actually in glass rates up=red? user said up=green down=red.
      c = r.trend === 'UP' ? 'var(--green)' : r.trend === 'DOWN' ? 'var(--red)' : 'var(--ink-4)';
      const icon = r.trend === 'UP' ? 'arrow-up' : r.trend === 'DOWN' ? 'arrow-down' : 'minus';
      return \`<div style="display:inline-flex; align-items:center; gap:6px; background:var(--bg-2); padding:4px 10px; border-radius:6px; font-size:12px; border:1px solid var(--bd);">
        <span style="font-weight:600;">\${r.name} \${r.thickness}</span>
        <span style="color:var(--ink-2);">\${r.rate}</span>
        <i data-lucide="\${icon}" style="width:12px;height:12px;color:\${c}"></i>
      </div>\`;
    };

    // Double for infinite scroll
    ticker.innerHTML = allRates.map(renderRate).join('') + allRates.map(renderRate).join('');
    
    grid.innerHTML = allRates.map(r => {
      let c = r.trend === 'UP' ? 'var(--green)' : r.trend === 'DOWN' ? 'var(--red)' : 'var(--ink-4)';
      const icon = r.trend === 'UP' ? 'trending-up' : r.trend === 'DOWN' ? 'trending-down' : 'minus';
      return \`<div class="pc fadeUp" style="padding:16px;">
        <div style="font-size:11px; color:var(--ink-3); text-transform:uppercase; font-weight:600; margin-bottom:4px;">\${r.thickness ? r.name + ' ' + r.thickness : r.name}</div>
        <div style="display:flex; justify-content:space-between; align-items:flex-end;">
          <div style="font-size:22px; font-weight:700;">\${r.rate}</div>
          <i data-lucide="\${icon}" style="width:20px;height:20px;color:\${c}"></i>
        </div>
      </div>\`;
    }).join('');
    lucide.createIcons();
  } catch {}
}

async function calculateEstimate() {
  const gType = document.getElementById('estGlassType').value;
  const w = document.getElementById('estWidth').value;
  const h = document.getElementById('estHeight').value;
  const q = document.getElementById('estQty').value;
  
  if(!w || !h || !q) return alert("Please fill all dimensions and quantity");
  
  try {
    const res = await (await fetch(API + '/estimate', {
      method: "POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({glassType: gType, width: w, height: h, qty: q})
    })).json();
    
    document.getElementById('estResult').style.display = 'block';
    document.getElementById('estResType').textContent = res.glassType;
    document.getElementById('estResPrice').textContent = \`₹\${res.minPrice.toLocaleString()} – ₹\${res.maxPrice.toLocaleString()}\`;
    document.getElementById('estResCalculation').textContent = \`\${res.sqft} sqft × ₹\${res.rateMin}–\${res.rateMax}/sqft\`;
    window.currentEstimateData = res;
    lucide.createIcons();
  } catch {}
}

function openEstimateEnquiry() {
  if(!window.currentEstimateData) return;
  openModal(0, window.currentEstimateData.glassType + ' (Estimate)', 0, 'custom', 'Multiple verified suppliers');
}

// Intercept renderResults to add allied products
const origRenderResults = renderResults;
renderResults = function(results, query, typingId) {
  origRenderResults(results, query, typingId);
  
  // Find cross sell grid
  const xgrid = document.getElementById('crossSellGrid-' + typingId);
  if(xgrid && allProducts.length > 0) {
    const hardware = allProducts.filter(p => ['Hardware', 'Speciality Glass', 'Window System'].includes(p.category));
    let matched = hardware.slice(0,4);
    
    xgrid.innerHTML = matched.map(p => \`
      <div class="pc" style="padding:14px; display:flex; flex-direction:column; gap:8px;">
        <i data-lucide="package" style="width:20px;height:20px;color:var(--amber)"></i>
        <div style="font-weight:600; font-size:13px; line-height:1.3;">\${h(p.name)}</div>
        <div style="font-size:11px; color:var(--ink-3); flex:1;">\${h(p.description).substring(0, 60)}...</div>
        <button class="btn-save" style="font-size:11px; padding:4px 8px; justify-content:center;" onclick="openModal(\${p.id},'\${ea(p.name)}',\${p.price},'\${ea(p.priceUnit)}','\${ea(p.supplier)}')">View Details</button>
      </div>
    \`).join('');
    lucide.createIcons();
  }
}

`;

html = html.replace(/<\/script>/, fullScriptAdditions + '\n</script>');

// Include Role in API search call: Add filters { ... role: selectedRole }
html = html.replace(
  /filters: \{/,
  `filters: {
          role: selectedRole,`
);

fs.writeFileSync('index.html', html);
console.log('Update Complete.');
