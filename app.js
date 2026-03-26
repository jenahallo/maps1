// ── MAP INIT ───────────────────────────────────────────────────────────────────
const map = L.map('map', {
  center: [35, 30],
  zoom: 3,
  zoomControl: true,
  preferCanvas: true
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// ── LAYER GROUPS ───────────────────────────────────────────────────────────────
const layers = {
  oil:      L.layerGroup().addTo(map),
  gas:      L.layerGroup().addTo(map),
  pipeline: L.layerGroup().addTo(map),
  ship:     L.layerGroup().addTo(map),
  russia:   L.layerGroup().addTo(map),
  refinery: L.layerGroup().addTo(map)
};

// ── ICONS ──────────────────────────────────────────────────────────────────────
function makeSvgIcon(emoji, color, size = 30) {
  const html = `<div style="
    width:${size}px;height:${size}px;
    background:${color}22;
    border:1.5px solid ${color};
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:${Math.round(size*0.48)}px;
    box-shadow:0 0 8px ${color}55;
    ">${emoji}</div>`;
  return L.divIcon({
    html,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2 - 4]
  });
}

const icons = {
  oil:      makeSvgIcon('🛢', '#F59E0B'),
  gas:      makeSvgIcon('🔥', '#10B981'),
  lng:      makeSvgIcon('🧊', '#10B981', 26),
  refinery: makeSvgIcon('🏭', '#EF4444'),
  russia:   makeSvgIcon('🛢', '#f43f5e', 26)
};

// ── BADGE HELPERS ──────────────────────────────────────────────────────────────
const STATUS_BADGE = {
  'active':        { cls: 'badge-active',   label: 'Aktivní' },
  'russia-active': { cls: 'badge-russia',   label: 'Rusko — aktivní' },
  'inactive':      { cls: 'badge-inactive', label: 'Nefunkční' },
  'partial':       { cls: 'badge-partial',  label: 'Přerušovaně' },
  'planned':       { cls: 'badge-planned',  label: 'Plánováno' }
};

function badgeHtml(type) {
  const b = STATUS_BADGE[type] || STATUS_BADGE['active'];
  return `<span class="popup-badge ${b.cls}">${b.label}</span>`;
}

function detailBadgeHtml(type) {
  const b = STATUS_BADGE[type] || STATUS_BADGE['active'];
  return `<span class="detail-badge ${b.cls}">${b.label}</span>`;
}

// ── DETAIL PANEL ───────────────────────────────────────────────────────────────
function showDetail(icon, title, rows, desc, statusType) {
  const rowsHtml = rows.map(([k, v]) =>
    `<tr><td>${k}</td><td>${v}</td></tr>`
  ).join('');
  const badge = statusType ? detailBadgeHtml(statusType) : '';
  document.getElementById('detail-content').innerHTML = `
    <div class="detail-title"><span>${icon}</span>${title}${badge}</div>
    <table>${rowsHtml}</table>
    ${desc ? `<p class="detail-desc">${desc}</p>` : ''}
  `;
}

function resetDetail() {
  document.getElementById('detail-content').innerHTML =
    '<span style="font-size:0.8rem;color:var(--text-muted)">Klikni na marker nebo trasu pro zobrazení detailů.</span>';
}
resetDetail();

// ── POPUP BUILDER ──────────────────────────────────────────────────────────────
function buildPopup(icon, name, rows, desc, statusType) {
  const rowsHtml = rows.map(([k, v]) =>
    `<tr><td>${k}</td><td>${v}</td></tr>`
  ).join('');
  const badge = statusType ? badgeHtml(statusType) : '';
  return `<div class="popup">
    <div class="popup-header">
      <span class="popup-icon">${icon}</span>
      <strong>${name}</strong>${badge}
    </div>
    <table class="popup-table">${rowsHtml}</table>
    ${desc ? `<p class="popup-desc">${desc}</p>` : ''}
  </div>`;
}

// ── LAYER 1 — OIL FIELDS ───────────────────────────────────────────────────────
OIL_FIELDS.forEach(f => {
  const isRu = f.id === 'oil_4';
  const icon = isRu ? icons.russia : icons.oil;
  const targetLayer = isRu ? layers.russia : layers.oil;
  const rows = [
    ['Typ', f.type],
    ['Produkce', f.production],
    ['Export', f.export],
    ['Země', f.country],
    ['Cena', f.price]
  ];
  const statusType = isRu ? 'russia-active' : 'active';

  const marker = L.marker([f.lat, f.lng], { icon })
    .bindPopup(buildPopup('🛢', f.name, rows, f.desc, statusType));

  marker.on('click', () => showDetail('🛢', f.name, rows, f.desc, statusType));
  targetLayer.addLayer(marker);
});

// ── LAYER 2 — GAS PIPELINES ────────────────────────────────────────────────────
const GAS_COLORS = {
  'active':        { color: '#10B981', dash: null,   weight: 3 },
  'inactive':      { color: '#4b5563', dash: '6 5',  weight: 2 },
  'russia-active': { color: '#f43f5e', dash: null,   weight: 2.5 }
};

GAS_PIPELINES.forEach(p => {
  const cfg = GAS_COLORS[p.statusType] || GAS_COLORS['active'];
  const isRu = p.statusType === 'russia-active';
  const targetLayer = isRu ? layers.russia : layers.gas;

  const rows = [
    ['Kapacita', p.capacity],
    ['Stav', p.status]
  ];

  const opts = {
    color: cfg.color,
    weight: cfg.weight,
    opacity: 0.85,
    dashArray: cfg.dash || undefined
  };

  const line = L.polyline(p.coords, opts)
    .bindPopup(buildPopup('🔥', p.name, rows, p.note, p.statusType));

  line.on('click', () => showDetail('🔥', p.name, rows, p.note, p.statusType));
  targetLayer.addLayer(line);
});

// LNG Terminals
LNG_TERMINALS.forEach(t => {
  const rows = [
    ['Typ', t.type],
    ['Kapacita', t.capacity],
    ['Původ / trh', t.origin]
  ];

  const marker = L.marker([t.lat, t.lng], { icon: icons.lng })
    .bindPopup(buildPopup('🧊', t.name, rows, t.desc, 'active'));

  marker.on('click', () => showDetail('🧊', t.name, rows, t.desc, 'active'));
  layers.gas.addLayer(marker);
});

// ── LAYER 3 — OIL PIPELINES ────────────────────────────────────────────────────
const PIPE_COLORS = {
  'active':        { color: '#F97316', dash: null,   weight: 3.5 },
  'inactive':      { color: '#6b7280', dash: '8 6',  weight: 2 },
  'partial':       { color: '#fbbf24', dash: '5 4',  weight: 2.5 },
  'russia-active': { color: '#f43f5e', dash: null,   weight: 3 },
  'planned':       { color: '#8B5CF6', dash: '3 5',  weight: 2 }
};

OIL_PIPELINES.forEach(p => {
  const cfg = PIPE_COLORS[p.statusType] || PIPE_COLORS['active'];
  const isRu = p.statusType === 'russia-active';
  const targetLayer = isRu ? layers.russia : layers.pipeline;

  const rows = [
    ['Kapacita', p.capacity],
    ['Stav', p.status],
    ['Náklad', p.cargo]
  ];

  const opts = {
    color: cfg.color,
    weight: cfg.weight,
    opacity: 0.9,
    dashArray: cfg.dash || undefined,
    lineJoin: 'round'
  };

  const line = L.polyline(p.coords, opts)
    .bindPopup(buildPopup('🔶', p.name, rows, p.note, p.statusType));

  line.on('click', () => showDetail('🔶', p.name, rows, p.note, p.statusType));
  targetLayer.addLayer(line);

  // Label dot at midpoint
  const mid = p.coords[Math.floor(p.coords.length / 2)];
  const dot = L.circleMarker(mid, {
    radius: 4,
    fillColor: cfg.color,
    fillOpacity: 0.9,
    color: '#0f172a',
    weight: 1
  }).bindPopup(buildPopup('🔶', p.name, rows, p.note, p.statusType));

  dot.on('click', () => showDetail('🔶', p.name, rows, p.note, p.statusType));
  targetLayer.addLayer(dot);
});

// ── LAYER 4 — TANKER ROUTES + ANIMATION ───────────────────────────────────────
const animIntervals = [];

function createTankerRoute(route) {
  const latlngs = route.coords.map(c => [c[0], c[1]]);
  const isRu = route.isRussian;
  const color = isRu ? '#f43f5e' : '#3B82F6';
  const targetLayer = isRu ? layers.russia : layers.ship;

  const rows = [
    ['Náklad', route.cargo],
    ['Délka plavby', route.duration],
    ['Objem', route.volume]
  ];
  const statusType = isRu ? 'russia-active' : 'active';

  // Route line
  const line = L.polyline(latlngs, {
    color,
    weight: isRu ? 2 : 1.5,
    opacity: isRu ? 0.7 : 0.5,
    dashArray: isRu ? '10 6' : null
  }).bindPopup(buildPopup('⛴', route.name, rows, '', statusType));

  line.on('click', () => showDetail('⛴', route.name, rows, '', statusType));
  targetLayer.addLayer(line);

  // Animated dot
  const dot = L.circleMarker(latlngs[0], {
    radius: isRu ? 5 : 6,
    fillColor: color,
    fillOpacity: 1,
    color: '#fff',
    weight: 1.5
  }).bindPopup(buildPopup('⛴', route.name, rows, '', statusType));

  dot.on('click', () => showDetail('⛴', route.name, rows, '', statusType));
  targetLayer.addLayer(dot);

  // Smooth distance-based interpolation
  const distances = [0];
  for (let i = 1; i < latlngs.length; i++) {
    const a = L.latLng(latlngs[i - 1]);
    const b = L.latLng(latlngs[i]);
    distances.push(distances[i - 1] + a.distanceTo(b));
  }
  const totalDist = distances[distances.length - 1];

  function getPos(t) {
    const target = t * totalDist;
    for (let i = 1; i < latlngs.length; i++) {
      if (distances[i] >= target) {
        const f = (target - distances[i - 1]) / (distances[i] - distances[i - 1]);
        return [
          latlngs[i-1][0] + f * (latlngs[i][0] - latlngs[i-1][0]),
          latlngs[i-1][1] + f * (latlngs[i][1] - latlngs[i-1][1])
        ];
      }
    }
    return latlngs[latlngs.length - 1];
  }

  const STEPS = 600;
  const interval = route.animSpeed / STEPS;
  let step = Math.floor(Math.random() * STEPS); // stagger start positions

  const id = setInterval(() => {
    step = (step + 1) % STEPS;
    dot.setLatLng(getPos(step / STEPS));
  }, interval);

  animIntervals.push(id);
}

TANKER_ROUTES.forEach(createTankerRoute);

// ── LAYER 5 — REFINERIES ───────────────────────────────────────────────────────
REFINERIES.forEach(r => {
  const rows = [
    ['Kapacita', r.capacity],
    ['Země', r.country],
    ['Zásobování', r.supply],
    ['Produkty', r.products]
  ];

  const marker = L.marker([r.lat, r.lng], { icon: icons.refinery })
    .bindPopup(buildPopup('🏭', r.name, rows, r.desc, 'active'));

  marker.on('click', () => showDetail('🏭', r.name, rows, r.desc, 'active'));
  layers.refinery.addLayer(marker);
});

// ── MAP LEGEND ─────────────────────────────────────────────────────────────────
const legendHtml = `<div class="map-legend">
  <div><span class="leg-line" style="background:#F59E0B"></span> Těžba ropy</div>
  <div><span class="leg-line" style="background:#10B981"></span> Plynovod (aktivní)</div>
  <div><span class="leg-line" style="background:#F97316"></span> Ropovod (aktivní)</div>
  <div><span class="leg-line" style="background:#3B82F6"></span> Trasa tankeru</div>
  <div><span class="leg-line" style="background:#f43f5e"></span> Ruské trasy / zdroje</div>
  <div><span class="leg-line" style="background:#6b7280;border-top:2px dashed #6b7280;height:0"></span> Nefunkční pipeline</div>
  <div><span class="leg-line" style="background:#8B5CF6;border-top:2px dashed #8B5CF6;height:0"></span> Plánováno</div>
  <div><span class="leg-line" style="background:#EF4444"></span> Rafinerie</div>
</div>`;

const legendCtrl = L.control({ position: 'bottomleft' });
legendCtrl.onAdd = () => {
  const div = L.DomUtil.create('div');
  div.innerHTML = legendHtml;
  return div;
};
legendCtrl.addTo(map);

// ── TOGGLES ────────────────────────────────────────────────────────────────────
document.querySelectorAll('.toggle-label input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    const ln = cb.dataset.layer;
    if (cb.checked) map.addLayer(layers[ln]);
    else            map.removeLayer(layers[ln]);
  });
});

// ── CHART.JS — EU OIL IMPORT SHARE ────────────────────────────────────────────
// Fixed label order — shows Russia's dramatic fall after 2022 sanctions
const EU_LABELS = ['Rusko', 'USA', 'Norsko', 'Kazachstán', 'S. Arábie', 'Irák'];
const EU_COLORS = ['#f43f5e', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#F97316'];

const EU_DATA = {
  2022: [18.0, 10.0, 12.0,  8.0, 7.0, 6.0],  // před/začátek embargu
  2025: [ 5.0, 19.0, 14.0, 11.0, 9.0, 7.0]   // po plném embargu
};

function interpolateData(t) {
  return EU_DATA[2022].map((v22, i) => {
    const v25 = EU_DATA[2025][i];
    return +((v22 + (v25 - v22) * t).toFixed(1));
  });
}

const ctx = document.getElementById('eu-chart').getContext('2d');
const euChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: EU_LABELS,
    datasets: [{
      label: '% dovozu do EU',
      data: EU_DATA[2025],
      backgroundColor: EU_COLORS.map(c => c + 'cc'),
      borderColor: EU_COLORS,
      borderWidth: 1.5,
      borderRadius: 4,
      borderSkipped: false
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 300 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.raw}% podíl na dovozu EU`
        }
      }
    },
    scales: {
      x: {
        max: 25,
        ticks: { color: '#94a3b8', font: { size: 10 }, callback: v => v + '%' },
        grid: { color: '#334155' }
      },
      y: {
        ticks: { color: '#f1f5f9', font: { size: 10 } },
        grid: { display: false }
      }
    }
  }
});

// ── YEAR SLIDER ────────────────────────────────────────────────────────────────
const slider = document.getElementById('year-slider');
const yearDisplay = document.getElementById('year-display');

slider.addEventListener('input', () => {
  const t = (slider.value - 2022) / (2025 - 2022);
  const values = interpolateData(t);
  euChart.data.datasets[0].data = values;
  euChart.update('none');
  const yr = Math.round(2022 + t * 3);
  yearDisplay.textContent = yr;
});
