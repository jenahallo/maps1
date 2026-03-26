// Trasy tankerů — Leaflet polylines + animované tečky
// POZOR: souřadnice pečlivě trasovány, aby neprocházely pevninou
const TANKER_ROUTES = [
  {
    id: "route_1",
    name: "Perský záliv → Rotterdam (Suezský průplav)",
    coords: [
      [26,57],                          // Hormuzský průliv
      [22,58],[18,56],[15,52],          // Arabské moře
      [12,48],[12,45],                  // Adenský záliv
      [15,42],[20,38],[25,36],[28,34],  // Rudé moře (sever)
      [30,32.5],[31.2,32.3],            // Suezský průplav
      [33,27],[35,22],[37,15],          // Středomoří (střed)
      [38,12],[38,9],                   // Středomoří (západ)
      [36,-5.5],                        // Gibraltarský průliv
      [38,-9],[43,-10],[47,-9],[50,-4], // Atlantik / Biskajský záliv
      [51.2,2],[51.9,4.1]              // Severní moře → Rotterdam
    ],
    cargo: "Ropa (Arab Light, Kuwait, Iraqi)",
    duration: "25 dní",
    volume: "~5 mil. barelů/měsíc",
    isRussian: false,
    animSpeed: 65000
  },
  {
    id: "route_2",
    name: "Perský záliv → Rotterdam (Mys dobré naděje)",
    coords: [
      [26,57],                              // Hormuzský průliv
      [18,60],[10,63],[0,65],               // Indický oceán (jih)
      [-15,55],[-33,27],                    // Jižní Indický oceán
      [-34.5,18.5],                         // Mys dobré naděje
      [-32,16],[-25,12],[-15,8],            // Jižní Atlantik
      [-5,3],[5,-2],[15,-18],[30,-13],      // Atlantik (sever)
      [35,-10],[36,-6],                     // Gibraltarský průliv
      [43,-10],[50,-4],                     // Biskajský záliv
      [51.2,2],[51.9,4.1]                  // Rotterdam
    ],
    cargo: "Ropa VLCC (obchvat — příliš velké pro Suez)",
    duration: "45 dní",
    volume: "~2 mil. barelů/měsíc",
    isRussian: false,
    animSpeed: 100000
  },
  {
    id: "route_3",
    name: "Sabine Pass → Rotterdam (LNG USA)",
    coords: [
      [29.7,-93.9],                         // Sabine Pass, Texas
      [28,-88],[28,-82],                    // Mexický záliv
      [26,-80],[30,-78],                    // Florida
      [35,-75],[40,-65],[45,-40],           // Atlantik západ
      [50,-20],[51,2],[51.9,4.1]            // Atlantik východ → Rotterdam
    ],
    cargo: "LNG (USA → EU)",
    duration: "12 dní",
    volume: "5 mld. m³/měsíc",
    isRussian: false,
    animSpeed: 45000
  },
  {
    id: "route_4",
    name: "Ras Laffan → Rotterdam (LNG Katar)",
    coords: [
      [26,51.5],                            // Ras Laffan, Katar
      [22,58],[18,56],[15,52],              // Arabské moře
      [12,48],[12,45],                      // Adenský záliv
      [15,42],[20,38],[27,34],              // Rudé moře
      [30,32.5],[31.2,32.3],               // Suezský průplav
      [33,27],[35,22],[38,12],             // Středomoří
      [36,-5.5],                            // Gibraltar
      [44,-10],[50,-4],                     // Biskajský záliv
      [51.9,4.1]                           // Rotterdam
    ],
    cargo: "LNG (Katar → EU)",
    duration: "20 dní",
    volume: "4 mld. m³/měsíc",
    isRussian: false,
    animSpeed: 58000
  },
  {
    id: "route_5",
    name: "Novorossijsk → Indie (ruská ropa, post-2022)",
    coords: [
      [44.7,37.8],                          // Novorossijsk, Černé moře
      [41.5,29],[40,26.5],                  // Bospor → Dardanely
      [38,24],[35,22],[35,18],              // Egejské → Středomoří
      [33,25],                              // Středomoří (východ)
      [30,32.5],[31.2,32.3],               // Suezský průplav
      [25,37],[20,38],[15,42],             // Rudé moře
      [12,45],[12,48],                      // Adenský záliv
      [15,52],[18,62],[15,73],[13,80]      // Arabské moře → Indie
    ],
    cargo: "Ural crude → Indie (\"shadow fleet\")",
    duration: "18 dní",
    volume: "~1.5 Mb/d do Indie celkem z Ruska",
    isRussian: true,
    animSpeed: 72000
  },
  {
    id: "route_6",
    name: "Primorsk (Baltik) → Indie (ruská ropa)",
    coords: [
      [60,28],                              // Primorsk, Finský záliv
      [58,22],[57,12],[55,8],               // Baltské moře
      [55,5],[50,-2],                       // Severní moře / La Manche
      [46,-8],[42,-10],                     // Biskajský záliv
      [36,-5.5],                            // Gibraltar
      [35,0],[35,10],[33,25],              // Středomoří
      [30,32.5],[31.2,32.3],               // Suezský průplav
      [25,37],[20,38],[15,42],[12,45],[12,48], // Rudé moře
      [15,52],[18,62],[15,73],[13,80]      // Indie
    ],
    cargo: "Ural crude z Baltiku → Indie / Čína",
    duration: "28 dní (do Indie)",
    volume: "~0.6 Mb/d z baltských přístavů",
    isRussian: true,
    animSpeed: 115000
  },
  {
    id: "route_7",
    name: "Kozmino (Vladivostok) → Čína",
    coords: [
      [43,132],                             // Kozmino, Rusko (Pacifik)
      [42,128],[40,123],[38,121]            // Čína (Shanghai / Ningbo)
    ],
    cargo: "ESPO crude → Čína (krátká trasa)",
    duration: "3 dny",
    volume: "~1.6 Mb/d z ESPO (celkem do Číny)",
    isRussian: true,
    animSpeed: 20000
  }
];
