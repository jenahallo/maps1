// ── MAP INIT ──────────────────────────────────────────────────────────────────
const map = L.map('map', {
  center: [40, 20],
  zoom: 3,
  zoomControl: true
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// ── LAYER GROUPS ──────────────────────────────────────────────────────────────
const layers = {
  oil:      L.layerGroup().addTo(map),
  gas:      L.layerGroup().addTo(map),
  ship:     L.layerGroup().addTo(map),
  refinery: L.layerGroup().addTo(map)
};

// ── SVG ICONS ─────────────────────────────────────────────────────────────────
function makeIcon(emoji, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="1.5"/>
    <text x="16" y="21" text-anchor="middle" font-size="14">${emoji}</text>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
}

const icons = {
  oil:      makeIcon('🛢', '#F59E0B'),
  gas:      makeIcon('🔥', '#10B981'),
  lng:      makeIcon('🧊', '#10B981'),
  ship:     makeIcon('⛴', '#3B82F6'),
  refinery: makeIcon('🏭', '#EF4444')
};

// ── DETAIL PANEL ──────────────────────────────────────────────────────────────
function showDetail(icon, title, rows, desc) {
  const el = document.getElementById('detail-content');
  const rowsHtml = rows.map(([k, v]) =>
    `<tr><td>${k}</td><td>${v}</td></tr>`
  ).join('');
  el.innerHTML = `
    <div class="detail-title"><span>${icon}</span>${title}</div>
    <table>${rowsHtml}</table>
    ${desc ? `<p class="detail-desc">${desc}</p>` : ''}
  `;
}

function resetDetail() {
  document.getElementById('detail-content').innerHTML =
    '<span style="font-size:0.8rem">Klikni na marker pro zobrazení detailů.</span>';
}

resetDetail();

// ── POPUP BUILDER ─────────────────────────────────────────────────────────────
function buildPopup(icon, name, rows, desc) {
  const rowsHtml = rows.map(([k, v]) =>
    `<tr><td>${k}</td><td>${v}</td></tr>`
  ).join('');
  return `<div class="popup">
    <div class="popup-header">
      <span class="popup-icon">${icon}</span>
      <strong>${name}</strong>
    </div>
    <table class="popup-table">${rowsHtml}</table>
    <p class="popup-desc">${desc}</p>
  </div>`;
}

// ── LAYER 1 — OIL FIELDS ──────────────────────────────────────────────────────
OIL_FIELDS.forEach(f => {
  const marker = L.marker([f.lat, f.lng], { icon: icons.oil })
    .bindPopup(buildPopup('🛢', f.name, [
      ['Typ', f.type],
      ['Produkce', f.production],
      ['Země', f.country],
      ['Cena', f.price]
    ], f.desc));

  marker.on('click', () => showDetail('🛢', f.name, [
    ['Typ', f.type],
    ['Produkce', f.production],
    ['Země', f.country],
    ['Cena', f.price]
  ], f.desc));

  layers.oil.addLayer(marker);
});

// ── LAYER 2 — GAS PIPELINES ───────────────────────────────────────────────────
GAS_PIPELINES.forEach(p => {
  const line = L.polyline(p.coords, {
    color: '#10B981',
    weight: 2.5,
    dashArray: '8 5',
    opacity: 0.85
  }).bindPopup(buildPopup('🔥', p.name, [
    ['Kapacita', p.capacity],
    ['Stav', p.status]
  ], ''));

  line.on('click', () => showDetail('🔥', p.name, [
    ['Kapacita', p.capacity],
    ['Stav', p.status]
  ], ''));

  layers.gas.addLayer(line);
});

// LNG Terminals
LNG_TERMINALS.forEach(t => {
  const marker = L.marker([t.lat, t.lng], { icon: icons.lng })
    .bindPopup(buildPopup('🧊', t.name, [
      ['Typ', t.type],
      ['Kapacita', t.capacity]
    ], t.desc));

  marker.on('click', () => showDetail('🧊', t.name, [
    ['Typ', t.type],
    ['Kapacita', t.capacity]
  ], t.desc));

  layers.gas.addLayer(marker);
});

// ── LAYER 3 — TANKER ROUTES + ANIMATION ──────────────────────────────────────
const tankerMarkers = [];

TANKER_ROUTES.forEach(route => {
  const latlngs = route.coords.map(c => [c[0], c[1]]);

  // Route line
  const line = L.polyline(latlngs, {
    color: '#3B82F6',
    weight: 1.5,
    opacity: 0.55
  }).bindPopup(buildPopup('⛴', route.name, [
    ['Náklad', route.cargo],
    ['Délka plavby', route.duration]
  ], ''));

  line.on('click', () => showDetail('⛴', route.name, [
    ['Náklad', route.cargo],
    ['Délka plavby', route.duration]
  ], ''));

  layers.ship.addLayer(line);

  // Animated tanker dot
  const dot = L.circleMarker(latlngs[0], {
    radius: 5,
    fillColor: '#3B82F6',
    fillOpacity: 1,
    color: '#fff',
    weight: 1.5
  }).bindPopup(buildPopup('⛴', route.name, [
    ['Náklad', route.cargo],
    ['Délka plavby', route.duration]
  ], ''));

  dot.on('click', () => showDetail('⛴', route.name, [
    ['Náklad', route.cargo],
    ['Délka plavby', route.duration]
  ], ''));

  layers.ship.addLayer(dot);

  // Smooth interpolation animation
  const totalSteps = 500;
  let progress = 0;

  // Pre-compute cumulative distances for smooth movement
  const distances = [0];
  for (let i = 1; i < latlngs.length; i++) {
    const prev = L.latLng(latlngs[i-1]);
    const curr = L.latLng(latlngs[i]);
    distances.push(distances[i-1] + prev.distanceTo(curr));
  }
  const totalDist = distances[distances.length - 1];

  function interpolate(t) {
    const target = t * totalDist;
    for (let i = 1; i < latlngs.length; i++) {
      if (distances[i] >= target) {
        const segFrac = (target - distances[i-1]) / (distances[i] - distances[i-1]);
        const lat = latlngs[i-1][0] + segFrac * (latlngs[i][0] - latlngs[i-1][0]);
        const lng = latlngs[i-1][1] + segFrac * (latlngs[i][1] - latlngs[i-1][1]);
        return [lat, lng];
      }
    }
    return latlngs[latlngs.length - 1];
  }

  const interval = route.animSpeed / totalSteps;
  const anim = setInterval(() => {
    if (!layers.ship._map) return; // layer removed from map
    progress = (progress + 1) % totalSteps;
    const pos = interpolate(progress / totalSteps);
    dot.setLatLng(pos);
  }, interval);

  tankerMarkers.push({ dot, anim });
});

// ── LAYER 4 — REFINERIES ──────────────────────────────────────────────────────
REFINERIES.forEach(r => {
  const marker = L.marker([r.lat, r.lng], { icon: icons.refinery })
    .bindPopup(buildPopup('🏭', r.name, [
      ['Kapacita', r.capacity],
      ['Země', r.country],
      ['Produkty', r.products]
    ], ''));

  marker.on('click', () => showDetail('🏭', r.name, [
    ['Kapacita', r.capacity],
    ['Země', r.country],
    ['Produkty', r.products]
  ], ''));

  layers.refinery.addLayer(marker);
});

// ── TOGGLES ───────────────────────────────────────────────────────────────────
document.querySelectorAll('.toggle-label input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    const layerName = cb.dataset.layer;
    if (cb.checked) {
      map.addLayer(layers[layerName]);
    } else {
      map.removeLayer(layers[layerName]);
    }
  });
});

// ── CHART.JS — TOP 5 EU OIL EXPORTERS ────────────────────────────────────────
const chartData = {
  2019: {
    labels: ["Rusko", "Irák", "Saudská Arábie", "Norsko", "Kazachstán"],
    values: [27.4, 9.1, 7.8, 7.5, 5.9],
    colors: ["#EF4444", "#F59E0B", "#8B5CF6", "#10B981", "#3B82F6"]
  },
  2023: {
    labels: ["Norsko", "USA", "Kazachstán", "Saudská Arábie", "Irák"],
    values: [14.2, 12.6, 9.8, 7.3, 6.1],
    colors: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"]
  }
};

const ctx = document.getElementById('eu-chart').getContext('2d');
const euChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: chartData[2023].labels,
    datasets: [{
      label: '% dovozu do EU',
      data: chartData[2023].values,
      backgroundColor: chartData[2023].colors,
      borderRadius: 4,
      borderSkipped: false
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.raw}%`
        }
      }
    },
    scales: {
      x: {
        max: 35,
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

// ── YEAR SLIDER ───────────────────────────────────────────────────────────────
const slider = document.getElementById('year-slider');
const yearDisplay = document.getElementById('year-display');

slider.addEventListener('input', () => {
  const t = (slider.value - 2019) / (2023 - 2019); // 0..1
  const d2019 = chartData[2019];
  const d2023 = chartData[2023];

  // Interpolate between 2019 and 2023 data (same labels as 2023 for simplicity)
  // We'll show 2019 when t=0, 2023 when t=1, blend in between
  let labels, values, colors;
  if (t <= 0.5) {
    labels = d2019.labels;
    colors = d2019.colors;
    values = d2019.values.map((v, i) => {
      const target = d2023.values[i] !== undefined ? d2023.values[i] : v;
      return +(v + (target - v) * t * 2).toFixed(1);
    });
  } else {
    labels = d2023.labels;
    colors = d2023.colors;
    values = d2023.values.map((v, i) => {
      const start = d2019.values[i] !== undefined ? d2019.values[i] : v;
      return +(start + (v - start) * ((t - 0.5) * 2)).toFixed(1);
    });
  }

  euChart.data.labels = labels;
  euChart.data.datasets[0].data = values;
  euChart.data.datasets[0].backgroundColor = colors;
  euChart.update('none');

  const year = Math.round(2019 + t * (2023 - 2019));
  yearDisplay.textContent = year;
});
