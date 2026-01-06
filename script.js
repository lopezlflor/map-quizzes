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
  flow: null,        // learn | play
  mode: null,        // names | capitals | flags
  region: null,
  map: null,
  geoLayer: null,

  questions: [],
  current: 0,
  correct: 0,

  startTime: null,
  timerInterval: null,
  paused: false,

  theme: localStorage.getItem("theme") || "light"
};

document.body.className = `theme-${game.theme}`;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");
}

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

document.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.id === "go-learn") {
    resetGame();
    game.flow = "learn";
    showScreen("screen-regions");
  }

  if (btn.id === "go-play") {
    resetGame();
    game.flow = "play";
    showScreen("screen-modes");
  }

  if (btn.classList.contains("mode-sel")) {
    game.mode = btn.dataset.mode;
    showScreen("screen-regions");
  }

  if (btn.classList.contains("reg-sel")) {
    game.region = btn.dataset.region;
    startMap();
  }

  if (btn.id === "btn-theme") {
    game.theme = game.theme === "light" ? "dark" : "light";
    document.body.className = `theme-${game.theme}`;
    localStorage.setItem("theme", game.theme);
  }

  if (btn.id === "back-to-start") showScreen("screen-start");
  if (btn.id === "back-from-regions") showScreen("screen-start");
});

async function startMap() {
  showScreen("screen-game");

  if (game.map) game.map.remove();

  game.map = L.map("map", { zoomControl: false }).setView([0, 0], 2);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png")
    .addTo(game.map);

  setTimeout(() => game.map.invalidateSize(), 100);

  const res = await fetch(`data/${game.region}.json`);
  const geo = await res.json();

  const features = shuffle([...geo.features]);
  game.questions = features;

  if (game.flow === "play") {
    game.startTime = Date.now();
    startTimer();
    updateQuestionText();
  } else {
    document.getElementById("question-text").innerText =
      "Toca una provincia para ver su información";
  }

  game.geoLayer = L.geoJSON(geo, {
    style: () => ({
      color: "#444",
      weight: 1.5,
      fillOpacity: 0.7,
      fillColor: "#ddd"
    }),
    onEachFeature: (feature, layer) => {
      layer.on("click", e =>
        game.flow === "learn"
          ? learnPopup(feature, e)
          : playClick(feature, layer)
      );
    }
  }).addTo(game.map);

  game.map.fitBounds(game.geoLayer.getBounds());
}

function learnPopup(feature, e) {
  const raw = feature.properties.nombre || feature.properties.name;
  const key = normalize(raw);
  const info = regionData[game.region][key];

  L.popup()
    .setLatLng(e.latlng)
    .setContent(`
      <strong>${raw}</strong><br>
      Capital: ${info?.cap || "—"}<br>
      ${info?.flag
        ? `<img src="flags/${info.flag}" height="40">`
        : ""}
    `)
    .openOn(game.map);
}

function updateQuestionText() {
  const q = game.questions[game.current];
  const raw = q.properties.nombre || q.properties.name;
  const info = regionData[game.region][normalize(raw)];

  let text = "";

  if (game.mode === "names") text = `¿Dónde está ${raw}?`;
  if (game.mode === "capitals") text = `¿Dónde está ${info.cap}?`;
  if (game.mode === "flags")
    text = `¿De dónde es esta bandera?<br>
            <img src="flags/${info.flag}" height="40">`;

  document.getElementById("question-text").innerHTML = text;
}

function playClick(feature, layer) {
  if (game.paused) return;

  const target = game.questions[game.current];
  const clicked = normalize(
    feature.properties.nombre || feature.properties.name
  );
  const expected = normalize(
    target.properties.nombre || target.properties.name
  );

  if (clicked === expected) {
    layer.setStyle({ fillColor: "#a8e6cf", fillOpacity: 1 });
    game.correct++;
  } else {
    layer.setStyle({ fillColor: "#ff8a80", fillOpacity: 1 });
  }

  game.current++;

  setTimeout(() => {
    if (game.current >= game.questions.length) endGame();
    else updateQuestionText();
  }, 600);
}

function startTimer() {
  game.timerInterval = setInterval(() => {
    document.getElementById("timer-display").innerText =
      formatTime(Date.now() - game.startTime);
  }, 1000);
}

function endGame() {
  clearInterval(game.timerInterval);
  alert(
    `Fin del juego\nAciertos: ${game.correct}/${game.questions.length}`
  );
}


function resetGame() {
  clearInterval(game.timerInterval);
  game.current = 0;
  game.correct = 0;
  game.paused = false;
}

  if (btn.id === "go-learn") {
    game.flow = "learn";
    game.mode = null;
    showScreen("screen-regions");
  }

  if (btn.id === "go-play") {
    game.flow = "play";
    game.mode = null;
    showScreen("screen-modes");
  }

  if (btn.classList.contains("mode-sel")) {
    game.mode = btn.dataset.mode;
    showScreen("screen-regions");
  }

  if (btn.classList.contains("reg-sel")) {
    game.region = btn.dataset.region;
    startMap();
  }

  if (btn.id === "back-to-start") {
    showScreen("screen-start");
  }

  if (btn.id === "back-from-regions") {
    if (game.flow === "play") {
      showScreen("screen-modes");
    } else {
      showScreen("screen-start");
    }
  }

  if (btn.id === "btn-theme") {
    game.theme = game.theme === "light" ? "dark" : "light";
    document.body.className = `theme-${game.theme}`;
    localStorage.setItem("theme", game.theme);
  }

  if (btn.id === "show-achievements") {
    document.getElementById("modal-achievements")
      .classList.remove("hidden");
  }

  if (btn.id === "close-ach") {
    document.getElementById("modal-achievements")
      .classList.add("hidden");
  }
});

async function startMap() {
  showScreen("screen-game");

  if (game.map) {
    game.map.remove();
    game.map = null;
  }

  game.map = L.map("map", {
    zoomControl: false,
    attributionControl: false
  }).setView([0, 0], 2);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  ).addTo(game.map);

  setTimeout(() => game.map.invalidateSize(), 100);

  try {
    const response = await fetch(`data/${game.region}.json`);
    const geo = await response.json();

    const layer = L.geoJSON(geo, {
      style: () => ({
        color: "#444",
        weight: 1.5,
        fillOpacity: 0.7,
        fillColor: `hsl(${Math.random() * 360}, 60%, 80%)`
      }),

      onEachFeature: (feature, leafletLayer) => {
        leafletLayer.on("click", e => {

          const rawName =
            feature.properties.nombre ||
            feature.properties.name ||
            feature.properties.NAM ||
            "Desconocido";

          if (game.flow === "learn") {
            L.popup()
              .setLatLng(e.latlng)
              .setContent(`
                <strong>${rawName}</strong><br>
                Modo aprendizaje
              `)
              .openOn(game.map);
          }
           
          if (game.flow === "play") {
            L.popup()
              .setLatLng(e.latlng)
              .setContent(`
                <strong>${rawName}</strong><br>
                Modo juego: ${game.mode}
              `)
              .openOn(game.map);
          }
        });
      }
    }).addTo(game.map);

    game.map.fitBounds(layer.getBounds());

    document.getElementById("question-text").innerText =
      game.flow === "learn"
        ? "Toca una provincia para ver su información"
        : "Selecciona la respuesta correcta en el mapa";

  } catch (err) {
    console.error(err);
    document.getElementById("question-text").innerText =
      "Error cargando el mapa";
  }
}
