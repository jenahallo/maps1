// Ropovody — oil pipelines
// status: "active" | "inactive" | "partial" | "russia"
const OIL_PIPELINES = [
  {
    id: "crude_1",
    name: "Druzhba — jižní větev (stále aktivní)",
    coords: [
      [56,55],[53,45],[51,33],[50,27],
      [48,24],[48,22],[47,19],[48,17],[48,16.5]
    ],
    capacity: "35 mil. t/rok",
    status: "Aktivní — zásobuje Maďarsko, Slovensko, ČR",
    cargo: "Ural crude (ruská ropa)",
    note: "Jediný ropovod přivádějící ruskou ropu do EU po embargu 2022. Výjimka pro Maďarsko, Slovensko a ČR.",
    statusType: "russia-active"
  },
  {
    id: "crude_2",
    name: "Druzhba — severní větev (zastavena 2023)",
    coords: [
      [56,55],[55,45],[55,33],[54,22],
      [54,16],[54,9],[54,8]
    ],
    capacity: "36 mil. t/rok",
    status: "Zastavena — Polsko, Německo odmítly ruskou ropu od 2023",
    cargo: "Ural crude — přerušeno",
    note: "Polsko a Německo přestaly odebírat ruskou ropu přes Druzhbu v roce 2023. Větvě do Plocku a Schwedt jsou nyní zásobovány alternativně.",
    statusType: "inactive"
  },
  {
    id: "crude_3",
    name: "BTC (Baku–Tbilisi–Ceyhan)",
    coords: [
      [40.5,51],[41,46],[41,43],
      [41,40],[38,37],[37,36.5]
    ],
    capacity: "54 mil. t/rok",
    status: "Aktivní — klíčová alternativa k ruské ropě",
    cargo: "Azeri Light (Ázerbájdžán)",
    note: "Strategický ropovod obcházející Rusko. Od 2022 klíčový pro diverzifikaci EU. Exportní terminál: Ceyhan (Turecko, Středomoří).",
    statusType: "active"
  },
  {
    id: "crude_4",
    name: "CPC — Kaspická potrubní soustava",
    coords: [
      [47,55],[46,50],[45,45],
      [44.7,38]
    ],
    capacity: "67 mil. t/rok",
    status: "Aktivní — kazašská ropa přes Rusko do Černého moře",
    cargo: "CPC Blend (Kazachstán)",
    note: "Přepravuje kazašskou ropu do ruského terminálu Novorossijsk. Kazachstán je 3. největší dodavatel ropy do EU (2025) — 11% podíl.",
    statusType: "active"
  },
  {
    id: "crude_5",
    name: "ESPO (Sibiř–Tichý oceán)",
    coords: [
      [62,68],[58,82],[55,97],
      [52,112],[50,120],[48,130],[43,132]
    ],
    capacity: "80 mil. t/rok",
    status: "Aktivní — hlavní export ruské ropy na východ",
    cargo: "ESPO crude → Čína, Japonsko, Korea",
    note: "Po sankcích EU se ESPO stal klíčovým exportním koridorem. Do Číny jde přes větev Skovorodino–Daqing ~700 000 b/d.",
    statusType: "russia-active"
  },
  {
    id: "crude_6",
    name: "TAL — Trans-alpský ropovod",
    coords: [
      [45.6,13.8],[46.5,14.3],
      [47.5,14.8],[48.2,13.1],[48.2,11.6]
    ],
    capacity: "40 mil. t/rok",
    status: "Aktivní — zásobuje Bavorsko a Rakousko",
    cargo: "Různé druhy — od 2023 bez ruské ropy",
    note: "Z přístavu Terst (Jaderské moře) do rafinérií Ingolstadt (BP) a Schwechat (OMV). Po sankcích nahrazena ruská ropa kasašskou a arabskou.",
    statusType: "active"
  },
  {
    id: "crude_7",
    name: "Kirkuk–Ceyhan (Irák–Turecko)",
    coords: [
      [35.5,44.4],[37,42],[37,39],[37,36.5]
    ],
    capacity: "35 mil. t/rok",
    status: "Aktivní (přerušovaně od 2023)",
    cargo: "Kirkuk crude → Středomoří",
    note: "Ropovod z Kirkuku do tureckého přístavu Ceyhan. Od března 2023 dočasně pozastaven kvůli sporu Irák-Turecko o platby, opakovaně obnovován.",
    statusType: "partial"
  },
  {
    id: "crude_8",
    name: "Power of Siberia 2 (projektován)",
    coords: [
      [55,75],[52,90],[48,100],
      [43,108],[40,111],[32,110]
    ],
    capacity: "50 mld. m³/rok (plyn — plánováno)",
    status: "Projektován — výstavba zahájena 2024",
    cargo: "Zemní plyn Rusko → Čína (přes Mongolsko)",
    note: "Plánovaný plynovod přes Mongolsko do Číny. Má zdvojnásobit dodávky ruského plynu do Číny. Dokončení se předpokládá cca 2030.",
    statusType: "planned"
  }
];
