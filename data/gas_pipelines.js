const GAS_PIPELINES = [
  {
    id: "pipe_1",
    name: "Nord Stream 1+2 (sabotováno 2022)",
    coords: [[65,33],[60,20],[57,10],[54,13]],
    capacity: "110 mld. m³/rok",
    status: "Nefunkční — potrubí zničeno výbuchem září 2022",
    note: "Byl největším plynovodem z Ruska do Německa. Po sabotáži v Baltském moři je mimo provoz. Ztráta 110 mld. m³/rok pro EU.",
    statusType: "inactive"
  },
  {
    id: "pipe_2",
    name: "TurkStream",
    coords: [[45,37],[41,29],[42,27],[42,22],[42,19],[45,18]],
    capacity: "31.5 mld. m³/rok",
    status: "Aktivní — zásobuje Turecko + Balkán",
    note: "Plynovod pod Černým mořem. Větev do Turecka (BluePipe) + větev do Bulharska, Srbska, Maďarska. Stále klíčový koridor pro ruský plyn.",
    statusType: "active"
  },
  {
    id: "pipe_3",
    name: "Trans Adriatic Pipeline (TAP)",
    coords: [[40,48],[41,42],[41,33],[41,27],[41,20],[45,14]],
    capacity: "10 mld. m³/rok (rozšiřuje se na 20)",
    status: "Aktivní — ázerbájdžánský plyn pro EU",
    note: "Součást Jižního plynového koridoru (SGC). Přivádí plyn z Kaspiku do Itálie a dál do EU. Klíčová alternativa k ruskému plynu.",
    statusType: "active"
  },
  {
    id: "pipe_4",
    name: "Norský plyn (Europipe I+II, FLAGS)",
    coords: [[62,2],[58,5],[56,5],[54,8],[52,5]],
    capacity: "120 mld. m³/rok",
    status: "Aktivní — #1 dodavatel plynu do EU (2022–2026)",
    note: "Soustava norských plynovodů do UK, Německa, Francie, Belgie. Po pádu Nord Stream je Norsko největším dodavatelem zemního plynu do EU.",
    statusType: "active"
  },
  {
    id: "pipe_5",
    name: "Power of Siberia 1 (Rusko → Čína)",
    coords: [
      [63,118],[60,124],[55,126],
      [50.3,127.5],[48,128],[44,128],
      [38,117],[31,121]
    ],
    capacity: "38 mld. m³/rok (max 48 mld. m³)",
    status: "Aktivní od 2019 — Rusko exportuje do Číny",
    note: "Plynovod z východosibiřských polí (Kovykta, Čajanda) do Číny. Čína přebírá stále větší podíl ruského plynu jako náhrada za výpadek evropského trhu.",
    statusType: "russia-active"
  },
  {
    id: "pipe_6",
    name: "Baltic Pipe (Norsko → Polsko)",
    coords: [[57,5],[56,8],[55,10],[54,12],[54,16],[52,18]],
    capacity: "10 mld. m³/rok",
    status: "Aktivní od října 2022 — klíčová diverzifikace",
    note: "Nový plynovod propojující norská pole s Polskem přes Dánsko. Slavnostně otevřen 1. října 2022 — den po sabotáži Nord Stream.",
    statusType: "active"
  },
  {
    id: "pipe_7",
    name: "Tranzitní plynovod Ukrajina (zbytky)",
    coords: [[50,38],[49,33],[50,28],[49,24],[48,22],[47,19]],
    capacity: "40 mld. m³/rok (kapacita), reálně ~15",
    status: "Ukončen 1.1.2025 — smlouva o tranzitu vypršela",
    note: "Historická trasa ruského plynu přes Ukrajinu do Střední Evropy. Dne 1. 1. 2025 Ukrajina odmítla obnovit smlouvu — konec tranzitu.",
    statusType: "inactive"
  }
];

const LNG_TERMINALS = [
  {
    id: "lng_1",
    name: "Rotterdam Gate LNG",
    lat: 51.9,
    lng: 4.1,
    capacity: "12 mld. m³/rok",
    type: "Import EU",
    origin: "USA (60%), Katar (25%), Nigérie (15%)",
    desc: "Největší LNG terminál v EU. Od 2022 dramatický nárůst využití — náhrada ruského plynu americkým LNG."
  },
  {
    id: "lng_2",
    name: "Zeebrugge LNG (Belgie)",
    lat: 51.3,
    lng: 3.2,
    capacity: "9 mld. m³/rok",
    type: "Import EU",
    origin: "USA (55%), Katar (35%), Trinidad (10%)",
    desc: "Belgický terminál s přímým napojením na evropskou soustavu. Zásobuje Belgii, Francii, Velkou Británii."
  },
  {
    id: "lng_3",
    name: "Sabine Pass LNG (export USA)",
    lat: 29.7,
    lng: -93.9,
    capacity: "32 mld. m³/rok",
    type: "Export USA",
    origin: "Destinace: EU 45%, Asie 40%, Latinská Amerika 15%",
    desc: "Největší LNG exportní terminál USA (Cheniere Energy). Po krizi 2022 EU se stala hlavním trhem. USA je od 2024 největší světový exportér LNG."
  },
  {
    id: "lng_4",
    name: "Ras Laffan LNG (Katar)",
    lat: 25.9,
    lng: 51.6,
    capacity: "77+ mld. m³/rok",
    type: "Export Katar",
    origin: "Destinace: Asie 65%, EU 25%, ostatní 10%",
    desc: "Největší světový exportér LNG. Katar plánuje do 2030 navýšit kapacitu na 126 mld. m³/rok. Klíčový dlouhodobý partner EU po 2022."
  },
  {
    id: "lng_5",
    name: "Eemshaven (nový, 2023)",
    lat: 53.4,
    lng: 6.8,
    capacity: "8 mld. m³/rok",
    type: "Import EU",
    origin: "USA (hlavně), Norsko",
    desc: "Plovoucí terminál (FSRU) v Německu. Postaven jako krizová odpověď na výpadek Nord Stream. Otevřen 2023."
  },
  {
    id: "lng_6",
    name: "Wilhelmshaven (FSRU, 2023)",
    lat: 53.5,
    lng: 8.15,
    capacity: "5 mld. m³/rok",
    type: "Import EU",
    origin: "USA, Katar, Norsko",
    desc: "Plovoucí terminál v Německu (Deutsche ReGas). Klíčová součást německé strategie po energetické krizi 2022."
  }
];
