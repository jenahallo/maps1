const OIL_FIELDS = [
  {
    id: "oil_1",
    name: "Permian Basin (WTI)",
    lat: 31.5,
    lng: -103.0,
    type: "WTI crude",
    production: "6.3 Mb/d",
    export: "~3.8 Mb/d (EU, Asie, Latinská Amerika)",
    country: "USA",
    desc: "Největší těžební oblast USA a světový benchmark pro lehkou ropu. Po energetické krizi 2022 výrazně zvýšeny dodávky do EU.",
    price: "WTI ~78 USD/bbl (2026)"
  },
  {
    id: "oil_2",
    name: "Severní moře (Brent)",
    lat: 61.0,
    lng: 2.5,
    type: "Brent crude",
    production: "1.1 Mb/d",
    export: "~0.8 Mb/d (převážně EU)",
    country: "UK / Norsko",
    desc: "Evropský cenový benchmark. Norsko je od 2022 největší jednotlivý dodavatel ropy a plynu do EU.",
    price: "Brent ~82 USD/bbl (2026)"
  },
  {
    id: "oil_3",
    name: "Ghawar (Arab Light)",
    lat: 25.1,
    lng: 49.4,
    type: "Arab Light",
    production: "3.8 Mb/d",
    export: "~7.5 Mb/d (Saudská Arábie celkem: Asie 70%, EU 15%)",
    country: "Saudská Arábie",
    desc: "Největší ropné pole světa. Saudská Arábie exportuje cca 7.5 Mb/d, hlavní trhy jsou Čína, Indie a Japonsko.",
    price: "Brent ~82 USD/bbl (2026)"
  },
  {
    id: "oil_4",
    name: "Záp. Sibiř (Ural crude)",
    lat: 62.0,
    lng: 68.5,
    type: "Ural crude",
    production: "9.0 Mb/d",
    export: "~4.8 Mb/d: Čína 2.2, Indie 1.5, Turecko 0.5, EU (pipeline) 0.4",
    country: "Rusko",
    desc: "Po embargu EU 2022 se ruský export přesměroval do Číny a Indie. Do EU jde pouze pipeline Druzhba (Maďarsko, Slovensko, ČR).",
    price: "Ural ~68 USD/bbl — diskont vůči Brentu (sankce)"
  },
  {
    id: "oil_5",
    name: "Tengiz & Kashagan",
    lat: 47.0,
    lng: 54.0,
    type: "CPC Blend / Kazakh Light",
    production: "2.1 Mb/d",
    export: "~1.8 Mb/d (EU 65%, Asie 35%) přes ropovod CPC",
    country: "Kazachstán",
    desc: "Hlavní kazašský exportní terminál. Ropa putuje ropový ropovod CPC do Novorossijsku, pak tankery do EU. Kazachstán je 3. největší dodavatel do EU (2025).",
    price: "Brent ~82 USD/bbl (2026)"
  },
  {
    id: "oil_6",
    name: "Kirkuk",
    lat: 35.5,
    lng: 44.4,
    type: "Kirkuk crude",
    production: "0.5 Mb/d",
    export: "~0.35 Mb/d přes Ceyhan (Turecko) — EU, Asie",
    country: "Irák",
    desc: "Irácká ropa exportuje přes turecký přístav Ceyhan. Irák celkem exportuje ~3.5 Mb/d, EU dostává cca 7% dovozu.",
    price: "Brent ~82 USD/bbl (2026)"
  },
  {
    id: "oil_7",
    name: "Niger Delta (Bonny Light)",
    lat: 4.4,
    lng: 7.1,
    type: "Bonny Light",
    production: "1.4 Mb/d",
    export: "~1.1 Mb/d (EU, USA, Asie)",
    country: "Nigérie",
    desc: "Nigerijská lehká ropa s nízkým obsahem síry. Oblíbená pro evropské rafinérie. Exportuje se z terminálu Bonny.",
    price: "Brent premium (nízký obsah síry)"
  },
  {
    id: "oil_8",
    name: "Azeri Light (ACG)",
    lat: 40.5,
    lng: 51.0,
    type: "Azeri Light",
    production: "0.65 Mb/d",
    export: "~0.60 Mb/d přes BTC ropovod — EU (Itálie, Izrael, Turecko)",
    country: "Ázerbájdžán",
    desc: "Ropa těžená z pole ACG v Kaspickém moři. Exportuje se ropovod BTC (Baku–Tbilisi–Ceyhan), klíčová alternativa k ruské ropě.",
    price: "Brent ~82 USD/bbl (2026)"
  }
];
