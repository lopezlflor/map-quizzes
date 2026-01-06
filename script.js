const regionData = {
  ar: {
    "buenos aires": { cap: "La Plata", flag: "ar-buenosaires.png" },
    "caba": { cap: "Capital Federal", flag: "ar-caba.png" },
    "catamarca": { cap: "Catamarca", flag: "ar-catamarca.png" },
    "chaco": { cap: "Resistencia", flag: "ar-chaco.png" },
    "chubut": { cap: "Rawson", flag: "ar-chubut.png" },
    "cordoba": { cap: "Córdoba", flag: "ar-cordoba.png" },
    "corrientes": { cap: "Corrientes", flag: "ar-corrientes.png" },
    "entre rios": { cap: "Paraná", flag: "ar-entrerios.png" },
    "formosa": { cap: "Formosa", flag: "ar-formosa.png" },
    "jujuy": { cap: "San Salvador de Jujuy", flag: "ar-jujuy.png" },
    "la pampa": { cap: "Santa Rosa", flag: "ar-lapampa.png" },
    "la rioja": { cap: "La Rioja", flag: "ar-larioja.png" },
    "mendoza": { cap: "Mendoza", flag: "ar-mendoza.png" },
    "misiones": { cap: "Posadas", flag: "ar-misiones.png" },
    "neuquen": { cap: "Neuquén", flag: "ar-neuquen.png" },
    "rio negro": { cap: "Viedma", flag: "ar-rionegro.png" },
    "salta": { cap: "Salta", flag: "ar-salta.png" },
    "san juan": { cap: "San Juan", flag: "ar-sanjuan.png" },
    "san luis": { cap: "San Luis", flag: "ar-sanluis.png" },
    "santa cruz": { cap: "Río Gallegos", flag: "ar-santacruz.png" },
    "santa fe": { cap: "Santa Fe", flag: "ar-santafe.png" },
    "santiago del estero": { cap: "Santiago del Estero", flag: "ar-santiago.png" },
    "tierra del fuego": { cap: "Ushuaia", flag: "ar-tierra.png" },
    "tucuman": { cap: "San Miguel de Tucumán", flag: "ar-tucuman.png" }
  },

  br: {
    "acre": { cap: "Rio Branco", flag: "br-acre.png" },
    "alagoas": { cap: "Maceió", flag: "br-alagoas.png" },
    "amapa": { cap: "Macapá", flag: "br-amapa.png" },
    "amazonas": { cap: "Manaus", flag: "br-amazonas.png" },
    "bahia": { cap: "Salvador", flag: "br-bahia.png" },
    "ceara": { cap: "Fortaleza", flag: "br-ceara.png" },
    "distrito federal": { cap: "Brasília", flag: "br-df.png" },
    "espirito santo": { cap: "Vitória", flag: "br-espiritosanto.png" },
    "goias": { cap: "Goiânia", flag: "br-goias.png" },
    "maranhao": { cap: "São Luís", flag: "br-maranhao.png" },
    "mato grosso": { cap: "Cuiabá", flag: "br-matogrosso.png" },
    "mato grosso do sul": { cap: "Campo Grande", flag: "br-matogrossodosul.png" },
    "minas gerais": { cap: "Belo Horizonte", flag: "br-minasgerais.png" },
    "para": { cap: "Belém", flag: "br-para.png" },
    "paraiba": { cap: "João Pessoa", flag: "br-paraiba.png" },
    "parana": { cap: "Curitiba", flag: "br-parana.png" },
    "pernambuco": { cap: "Recife", flag: "br-pernambuco.png" },
    "piaui": { cap: "Teresina", flag: "br-piaui.png" },
    "rio de janeiro": { cap: "Rio de Janeiro", flag: "br-rio.png" },
    "rio grande do norte": { cap: "Natal", flag: "br-riograndedonorte.png" },
    "rio grande do sul": { cap: "Porto Alegre", flag: "br-riograndedosul.png" },
    "rondonia": { cap: "Porto Velho", flag: "br-rondonia.png" },
    "roraima": { cap: "Boa Vista", flag: "br-roraima.png" },
    "santa catarina": { cap: "Florianópolis", flag: "br-santacatarina.png" },
    "sao paulo": { cap: "São Paulo", flag: "br-saopaulo.png" },
    "sergipe": { cap: "Aracaju", flag: "br-sergipe.png" },
    "tocantins": { cap: "Palmas", flag: "br-tocantins.png" }
  },

  ca: {
    "alberta": { cap: "Edmonton", flag: "ca-alberta.png" },
    "british columbia": { cap: "Victoria", flag: "ca-bc.png" },
    "manitoba": { cap: "Winnipeg", flag: "ca-manitoba.png" },
    "new brunswick": { cap: "Fredericton", flag: "ca-newbrunswick.png" },
    "newfoundland and labrador": { cap: "St. John's", flag: "ca-newfoundland.png" },
    "nova scotia": { cap: "Halifax", flag: "ca-novascotia.png" },
    "ontario": { cap: "Toronto", flag: "ca-ontario.png" },
    "prince edward island": { cap: "Charlottetown", flag: "ca-pei.png" },
    "quebec": { cap: "Quebec City", flag: "ca-quebec.png" },
    "saskatchewan": { cap: "Regina", flag: "ca-saskatchewan.png" }
  }
};

    let game = {
  flow: null,   // "learn" | "play"
  mode: null,   // names | flags | capitals
  region: null,
  map: null,
  theme: localStorage.getItem("theme") || "light"
};

document.body.className = `theme-${game.theme}`;

/* ------------------ NAVEGACIÓN ------------------ */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

document.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  /* INICIO */
  if (btn.id === "go-learn") {
    game.flow = "learn";
    showScreen("screen-regions");
  }

  if (btn.id === "go-play") {
    game.flow = "play";
    showScreen("screen-modes");
  }

  /* MODOS (SOLO JUGAR) */
  if (btn.classList.contains("mode-sel")) {
    game.mode = btn.dataset.mode;
    showScreen("screen-regions");
  }

  /* REGIÓN */
  if (btn.classList.contains("reg-sel")) {
    game.region = btn.dataset.region;
    startMap();
  }

  /* VOLVER */
  if (btn.id === "back-to-start") showScreen("screen-start");
  if (btn.id === "back-from-regions") {
    showScreen(game.flow === "play" ? "screen-modes" : "screen-start");
  }

  /* TEMA */
  if (btn.id === "btn-theme") {
    game.theme = game.theme === "light" ? "dark" : "light";
    document.body.className = `theme-${game.theme}`;
    localStorage.setItem("theme", game.theme);
  }
});

/* ------------------ MAPA ------------------ */

async function startMap() {
  showScreen("screen-game");

  if (game.map) game.map.remove();

  game.map = L.map("map").setView([0, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(game.map);

  setTimeout(() => game.map.invalidateSize(), 100);

  const res = await fetch(`data/${game.region}.json`);
  const geo = await res.json();

  const layer = L.geoJSON(geo, {
    onEachFeature: (f, l) => {
      l.on("click", e => {
        if (game.flow === "learn") {
          L.popup()
            .setLatLng(e.latlng)
            .setContent(`<b>${f.properties.nombre || f.properties.name}</b>`)
            .openOn(game.map);
        }
      });
    }
  }).addTo(game.map);

  game.map.fitBounds(layer.getBounds());

  document.getElementById("question-text").innerText =
    game.flow === "learn"
      ? "Toca una provincia para ver su información"
      : "Juego en progreso";
}
