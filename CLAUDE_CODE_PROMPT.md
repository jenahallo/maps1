# World Energy Flow — Zadání pro Claude Code

## Co chceš vytvořit

Vzdělávací interaktivní webová aplikace „World Energy Flow", která vizualizuje celý
energetický řetězec — od těžby ropy a zemního plynu přes námořní a potrubní transport
až po rafinerii a spotřebu v Evropě. Aplikace je čistě statická (žádný backend),
vše běží v prohlížeči.

---

## Technologický stack

- **HTML5 + CSS3 + Vanilla JavaScript** — žádné frameworky
- **Leaflet.js** (CDN) — interaktivní mapa světa
- **Chart.js** (CDN) — mini grafy v side panelu
- **Tile vrstva:** CartoDB Dark Matter (tmavý styl mapy)
- **Data:** Statická JSON data hardcoded v JS souborech

---

## Struktura projektu

Vytvoř následující soubory:

```
world-energy-flow/
├── index.html
├── style.css
├── app.js
└── data/
    ├── oil_fields.js
    ├── gas_pipelines.js
    ├── tanker_routes.js
    └── refineries.js
```

---

## Layout stránky

```
┌─────────────────────────────────────────────────────────┐
│  HEADER: název "World Energy Flow" + 4 toggle přepínače │
│  [ ✓ Těžba ropy ]  [ ✓ Zemní plyn ]                    │
│  [ ✓ Tankery    ]  [ ✓ Rafinerie  ]                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   MAPA (Leaflet, CartoDB Dark Matter, výška 70vh)       │
│   — ikony: vrtné věže, plameny, lodě, továrny           │
│   — animované tečky pohybující se po trasách tankerů    │
│   — popup při kliknutí na každý marker                  │
│                                                         │
├───────────────────────┬─────────────────────────────────┤
│  DETAIL PANEL         │  MINI BAR CHART                 │
│  (info o kliknutém    │  Top 5 exportérů ropy do EU     │
│   objektu)            │  (Chart.js)                     │
└───────────────────────┴─────────────────────────────────┘
```

---

## Vrstva 1 — Těžba ropy (barva: #F59E0B, ikona: vrtná věž)

Přidej tyto body jako Leaflet markery s vlastní SVG ikonou:

| id | název | lat | lng | typ | produkce | popis_popup |
|----|-------|-----|-----|-----|----------|-------------|
| oil_1 | Permian Basin (WTI) | 31.5 | -103.0 | WTI | 5.8 Mb/d | Největší těžební oblast USA, benchmark pro americkou ropu |
| oil_2 | Severní moře (Brent) | 61.0 | 2.5 | Brent | 1.1 Mb/d | Evropský cenový benchmark, těžba UK a Norsko |
| oil_3 | Ghawar (Arab Light) | 25.1 | 49.4 | Arab Light | 3.8 Mb/d | Největší ropné pole světa, Saudská Arábie |
| oil_4 | Záp. Sibiř (Ural) | 62.0 | 68.5 | Ural crude | 9.5 Mb/d | Ruská ropa, před 2022 hlavní zdroj pro EU |
| oil_5 | Kirkuk | 35.5 | 44.4 | Kirkuk | 0.5 Mb/d | Irácká ropa, exportuje přes Ceyhan (Turecko) |
| oil_6 | Niger Delta (Bonny) | 4.4 | 7.1 | Bonny Light | 1.2 Mb/d | Nigerijská lehká ropa, nízký obsah síry |

Popup obsah při kliknutí:
- Název a typ ropy
- Denní produkce (Mb/d)
- Krátký popis
- Cena WTI nebo Brent (statická hodnota: WTI ~78 USD, Brent ~82 USD)

---

## Vrstva 2 — Zemní plyn (barva: #10B981, ikona: plamen)

### Plynovody — nakresli jako Leaflet polylines (čárkované, zelené):

| id | název | trasa (pole souřadnic) | kapacita | stav |
|----|-------|------------------------|----------|------|
| pipe_1 | Nord Stream 1+2 | [[65,33],[60,20],[57,10],[54,13]] | 55 mld. m³/rok | Nefunkční od 2022 |
| pipe_2 | TurkStream | [[45,37],[41,29],[42,27],[42,22],[45,18]] | 31.5 mld. m³/rok | Aktivní |
| pipe_3 | Trans Adriatic (TAP) | [[40,48],[41,42],[41,27],[41,20],[45,14]] | 10 mld. m³/rok | Aktivní |
| pipe_4 | Norský plyn | [[61,2],[56,5],[54,8],[52,5]] | 120 mld. m³/rok | Hlavní zdroj EU |

### LNG terminály — nakresli jako speciální markery (ikona: nádrž):

| id | název | lat | lng | kapacita | popis |
|----|-------|-----|-----|----------|-------|
| lng_1 | Rotterdam Gate | 51.9 | 4.1 | 12 mld. m³/rok | Největší LNG terminál v EU |
| lng_2 | Zeebrugge | 51.3 | 3.2 | 9 mld. m³/rok | Belgický terminál, import z USA a Kataru |
| lng_3 | Sabine Pass (export) | 29.7 | -93.9 | 30 mld. m³/rok | Největší LNG export USA |
| lng_4 | Ras Laffan (Katar) | 25.9 | 51.6 | 77 mld. m³/rok | Největší exportér LNG na světě |

---

## Vrstva 3 — Trasy tankerů (barva: #3B82F6, ikona: loď)

Nakresli jako Leaflet polylines s animovanou tečkou pohybující se po trase.

| id | název | trasa | typ nákladu | délka plavby |
|----|-------|-------|-------------|--------------|
| route_1 | Perský záliv → Rotterdam (Suez) | [[26,56],[24,58],[20,60],[13,43],[30,33],[33,32],[36,28],[38,22],[36,14],[12,-15],[10,-15],[36,-5],[40,0],[42,3],[51,4]] | Ropa | 25 dní |
| route_2 | Perský záliv → Rotterdam (Mys) | [[26,56],[10,58],[-5,40],[-34,26],[-6,-10],[36,-5],[51,4]] | Ropa (obchvat) | 45 dní |
| route_3 | Sabine Pass → Rotterdam | [[30,-94],[40,-65],[45,-40],[50,-20],[51,4]] | LNG | 12 dní |
| route_4 | Ras Laffan → Rotterdam | [[26,52],[20,58],[13,43],[30,33],[36,28],[42,3],[51,4]] | LNG | 20 dní |

Animace: každá trasa má tečku (circle marker, průměr 8px), která se plynule pohybuje
po polyline v nekonečné smyčce. Různé trasy mají různou rychlost animace.

---

## Vrstva 4 — Rafinerie (barva: #EF4444, ikona: továrna)

| id | název | lat | lng | kapacita | produkty |
|----|-------|-----|-----|----------|----------|
| ref_1 | Shell Pernis, Rotterdam | 51.88 | 4.26 | 400 000 b/d | Nafta, benzín, letecký petrolej |
| ref_2 | Total Antverpy | 51.22 | 4.39 | 338 000 b/d | Nafta, benzín, petrochemie |
| ref_3 | BP Gelsenkirchen | 51.57 | 7.05 | 250 000 b/d | Nafta, benzín |
| ref_4 | OMV Schwechat | 48.12 | 16.57 | 190 000 b/d | Nafta, benzín, LPG |
| ref_5 | Slovnaft Bratislava | 48.09 | 17.16 | 105 000 b/d | Nafta, benzín |
| ref_6 | Unipetrol Litvínov | 50.60 | 13.60 | 55 000 b/d | Nafta, benzín, plasty |

---

## Popup obsah (pro všechny vrstvy)

Každý marker při kliknutí otevře Leaflet popup s touto strukturou:

```html
<div class="popup">
  <div class="popup-header">
    <span class="popup-icon">🛢</span>  <!-- nebo 🔥 ⛴ 🏭 -->
    <strong>Název objektu</strong>
  </div>
  <table class="popup-table">
    <tr><td>Typ</td><td>WTI crude</td></tr>
    <tr><td>Produkce</td><td>5.8 Mb/d</td></tr>
    <tr><td>Země</td><td>USA</td></tr>
  </table>
  <p class="popup-desc">Krátký popis...</p>
</div>
```

---

## Side panel — mini graf (Chart.js)

Vpravo dole zobrazuj horizontální bar chart: **Top 5 exportérů ropy do EU (2023)**

```javascript
const data = {
  labels: ["Norsko", "USA", "Kazachstán", "Saudská Arábie", "Irák"],
  values: [14.2, 12.6, 9.8, 7.3, 6.1],  // % podíl na dovozu EU
  colors: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"]
};
```

Nad grafem přidej slider **Rok: 2019 – 2024** pro porovnání (použij jen 2019 a 2023 jako
dvě sady dat, interpoluj mezi nimi).

---

## Styling (style.css)

Tmavý theme:
```css
:root {
  --bg: #0f172a;           /* tmavě modrá */
  --bg2: #1e293b;          /* panel pozadí */
  --text: #f1f5f9;         /* světlý text */
  --text-muted: #94a3b8;   /* šedý text */
  --border: #334155;       /* border */
  --oil: #F59E0B;          /* amber - ropa */
  --gas: #10B981;          /* zelená - plyn */
  --ship: #3B82F6;         /* modrá - tankery */
  --refinery: #EF4444;     /* červená - rafinerie */
}

body { background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; }
```

Toggle přepínače v headeru: styled checkboxy s barevným dot indikátorem (barva odpovídá
vrstvě). Při odškrtnutí se vrstva okamžitě skryje/zobrazí na mapě.

---

## Animace tankerů — implementace

```javascript
// Pro každou trasu vytvoř animovanou tečku
function animateTanker(route, durationMs) {
  const marker = L.circleMarker(route[0], {
    radius: 5,
    fillColor: '#3B82F6',
    fillOpacity: 1,
    stroke: false
  }).addTo(map);

  let step = 0;
  const totalSteps = route.length - 1;

  function move() {
    step = (step + 1) % totalSteps;
    marker.setLatLng(route[step]);
  }

  setInterval(move, durationMs / totalSteps);
  return marker;
}
```

---

## Co NENÍ potřeba (zjednodušení)

- Žádná live API data (ceny ropy, AIS polohy lodí) — vše statické
- Žádný backend ani databáze
- Žádná autentizace
- Žádné npm/build systémy — vše přes CDN `<script>` tagy

---

## CDN závislosti (vlož do index.html)

```html
<!-- Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

---

## Spuštění

Po vygenerování souborů otevři `index.html` přímo v prohlížeči — žádný server není potřeba.

---

## Priorita implementace

1. `index.html` + `style.css` — základní layout a dark theme
2. Mapa s CartoDB tile vrstvou
3. Vrstva 1 (těžba ropy) — markery + popupy
4. Toggle přepínače vrstev
5. Vrstva 2 (plyn) — plynovody jako polylines + LNG terminály
6. Vrstva 3 (tankery) — trasy + animace
7. Vrstva 4 (rafinerie) — markery + popupy
8. Side panel s Chart.js grafem
9. Rok slider

Začni od bodu 1 a postupuj v pořadí. Po každém kroku ověř, že mapa se zobrazuje správně.
