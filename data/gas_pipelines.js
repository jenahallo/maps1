const GAS_PIPELINES = [
  {
    id: "pipe_1",
    name: "Nord Stream 1+2",
    coords: [[65,33],[60,20],[57,10],[54,13]],
    capacity: "55 mld. m³/rok",
    status: "Nefunkční od 2022"
  },
  {
    id: "pipe_2",
    name: "TurkStream",
    coords: [[45,37],[41,29],[42,27],[42,22],[45,18]],
    capacity: "31.5 mld. m³/rok",
    status: "Aktivní"
  },
  {
    id: "pipe_3",
    name: "Trans Adriatic (TAP)",
    coords: [[40,48],[41,42],[41,27],[41,20],[45,14]],
    capacity: "10 mld. m³/rok",
    status: "Aktivní"
  },
  {
    id: "pipe_4",
    name: "Norský plyn",
    coords: [[61,2],[56,5],[54,8],[52,5]],
    capacity: "120 mld. m³/rok",
    status: "Hlavní zdroj EU"
  }
];

const LNG_TERMINALS = [
  {
    id: "lng_1",
    name: "Rotterdam Gate",
    lat: 51.9,
    lng: 4.1,
    capacity: "12 mld. m³/rok",
    type: "Import",
    desc: "Největší LNG terminál v EU"
  },
  {
    id: "lng_2",
    name: "Zeebrugge",
    lat: 51.3,
    lng: 3.2,
    capacity: "9 mld. m³/rok",
    type: "Import",
    desc: "Belgický terminál, import z USA a Kataru"
  },
  {
    id: "lng_3",
    name: "Sabine Pass (export)",
    lat: 29.7,
    lng: -93.9,
    capacity: "30 mld. m³/rok",
    type: "Export",
    desc: "Největší LNG export USA"
  },
  {
    id: "lng_4",
    name: "Ras Laffan (Katar)",
    lat: 25.9,
    lng: 51.6,
    capacity: "77 mld. m³/rok",
    type: "Export",
    desc: "Největší exportér LNG na světě"
  }
];
