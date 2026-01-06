/* =====================================================
   regionData (usa el que ya tenías; lo incluyo aquí)
   ===================================================== */
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

/* =====================================================
   Estado global
===================================================== */
let game = {
  flow: null,        // "learn" | "play"
  mode: null,        // "names" | "capitals" | "flags"
  region: null,
  map: null,
  geoLayer: null,

  questions: [],
  current: 0,
  correct: 0,

  startTime: null,
  timerInterval: null,
  paused: false,
  pauseTime: null,

  theme: localStorage.getItem("theme") || "light"
};

document.body.className = `theme-${game.theme}`;

/* =====================================================
   Utilidades
===================================================== */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}

function normalize(text) {
  return (text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function updateHUD() {
  const total = game.questions.length || 0;
  document.getElementById("hud-progress")?.innerText = `${Math.min(game.current + 1, total)}/${total}`;
  document.getElementById("hud-correct")?.innerText = `${game.correct}`;
  const pct = total === 0 ? 0 : Math.round((game.correct / Math.max(1, game.current)) * 100);
  document.getElementById("hud-percent")?.innerText = `${pct}%`;
}

/* =====================================================
   Manejo global de clicks (único listener)
===================================================== */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.id;

  // Inicio
  if (id === "go-learn") {
    resetGame();
    game.flow = "learn";
    game.mode = null;
    showScreen("screen-regions");
    return;
  }
  if (id === "go-play") {
    resetGame();
    game.flow = "play";
    game.mode = null;
    showScreen("screen-modes");
    return;
  }

  // Modos (solo para jugar)
  if (btn.classList.contains("mode-sel")) {
    game.mode = btn.dataset.mode;
    showScreen("screen-regions");
    return;
  }

  // Regiones: iniciar mapa
  if (btn.classList.contains("reg-sel")) {
    game.region = btn.dataset.region;
    startMap();
    return;
  }

  // Tema
  if (id === "btn-theme") {
    game.theme = game.theme === "light" ? "dark" : "light";
    document.body.className = `theme-${game.theme}`;
    localStorage.setItem("theme", game.theme);
    return;
  }

  // Volver
  if (id === "back-to-start") {
    resetGame();
    showScreen("screen-start");
    return;
  }
  if (id === "back-from-regions") {
    resetGame();
    showScreen("screen-start");
    return;
  }
  if (id === "back-to-menu" || id === "exit-game") {
    // limpiar estado y volver
    resetGame();
    showScreen("screen-start");
    return;
  }

  // Pausa / modal
  if (id === "btn-pause") {
    // si no está en juego no hacemos nada
    if (game.flow !== "play") {
      // en modo learn podemos usar como "salir"
      resetGame();
      showScreen("screen-start");
      return;
    }
    game.paused = true;
    game.pauseTime = Date.now();
    clearInterval(game.timerInterval);
    document.getElementById("modal-pause")?.classList.remove("hidden");
    return;
  }
  if (id === "resume-game") {
    if (game.paused) {
      game.paused = false;
      // ajustar startTime para mantener el tiempo transcurrido
      const pausedFor = Date.now() - (game.pauseTime || Date.now());
      game.startTime += pausedFor;
      startTimer();
    }
    document.getElementById("modal-pause")?.classList.add("hidden");
    return;
  }
  if (id === "restart-game") {
    document.getElementById("modal-pause")?.classList.add("hidden");
    resetGame();
    if (game.region) startMap();
    return;
  }

  // Logros modal
  if (id === "show-achievements") {
    document.getElementById("modal-achievements")?.classList.remove("hidden");
    return;
  }
  if (id === "close-ach" || id === "close-achievements" || btn.classList.contains("close-modal")) {
    document.getElementById("modal-achievements")?.classList.add("hidden");
    return;
  }
});

/* =====================================================
   Lógica del mapa
===================================================== */
async function startMap() {
  showScreen("screen-game");

  // limpiar mapa previo
  if (game.map) {
    try { game.map.remove(); } catch (e) { /* ignore */ }
    game.map = null;
    game.geoLayer = null;
  }

  // crear mapa
  game.map = L.map("map", { zoomControl: false, attributionControl: false }).setView([0,0], 2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(game.map);
  setTimeout(() => game.map.invalidateSize(), 120);

  // cargar geojson
  try {
    const res = await fetch(`data/${game.region}.json`);
    const geo = await res.json();

    // preparar preguntas aleatorias para play
    game.questions = shuffle([...geo.features]);
    game.current = 0;
    game.correct = 0;
    updateHUD();

    // iniciar timer si es play
    if (game.flow === "play") {
      game.startTime = Date.now();
      startTimer();
      updateQuestionText();
    } else {
      document.getElementById("question-text").innerText = "Toca una provincia para ver su información";
    }

    // agregar capa
    game.geoLayer = L.geoJSON(geo, {
      style: () => ({ color: "#444", weight: 1.2, fillOpacity: 0.75, fillColor: "#ddd" }),
      onEachFeature: (feature, layer) => {
        layer.on("click", (e) => {
          if (game.flow === "learn") {
            learnPopup(feature, e);
          } else if (game.flow === "play") {
            playClick(feature, layer, e);
          }
        });
      }
    }).addTo(game.map);

    // ajustar vista
    try {
      game.map.fitBounds(game.geoLayer.getBounds(), { maxZoom: 8 });
    } catch (err) { /* ignorar */ }

  } catch (err) {
    console.error("Error cargando geojson:", err);
    document.getElementById("question-text").innerText = "Error cargando el mapa";
  }
}

/* =====================================================
   Aprender -> popup con capital + bandera
===================================================== */
function learnPopup(feature, e) {
  const raw = feature.properties.nombre || feature.properties.name || "Desconocido";
  const key = normalize(raw);
  const info = regionData[game.region]?.[key] || {};
  const flagHtml = info.flag ? `<div style="margin-top:6px"><img src="flags/${info.flag}" height="36" alt="bandera"></div>` : "";
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`<strong>${raw}</strong><br>Capital: ${info?.cap || "—"}${flagHtml}`)
    .openOn(game.map);
}

/* =====================================================
   Jugar -> manejo de clicks
===================================================== */
function updateQuestionText() {
  const total = game.questions.length;
  if (!total) {
    document.getElementById("question-text").innerText = "No hay preguntas";
    return;
  }
  const q = game.questions[game.current];
  const raw = q.properties.nombre || q.properties.name || "Desconocido";
  const info = regionData[game.region]?.[normalize(raw)] || {};
  let text = "";
  if (game.mode === "names") text = `¿Dónde está ${raw}?`;
  else if (game.mode === "capitals") text = `¿Dónde está ${info.cap || "??"}?`;
  else if (game.mode === "flags") text = `¿De dónde es esta bandera? <div style="margin-top:6px"><img src="flags/${info.flag || ''}" height="36"></div>`;
  document.getElementById("question-text").innerHTML = text;
  updateHUD();
}

function playClick(feature, layer, e) {
  if (game.paused) return;
  const clicked = normalize(feature.properties.nombre || feature.properties.name || "");
  const target = game.questions[game.current];
  const expected = normalize(target.properties.nombre || target.properties.name || "");
  if (clicked === expected) {
    layer.setStyle({ fillColor: "#a8e6cf", fillOpacity: 1 });
    game.correct++;
  } else {
    layer.setStyle({ fillColor: "#ff8a80", fillOpacity: 1 });
  }
  game.current++;
  updateHUD();

  setTimeout(() => {
    // restablecer colores de la capa si queremos (simple)
    // avanzar a la siguiente pregunta
    if (game.current >= game.questions.length) {
      endGame();
    } else {
      updateQuestionText();
    }
  }, 600);
}

/* =====================================================
   Timer / fin del juego
===================================================== */
function startTimer() {
  clearInterval(game.timerInterval);
  game.timerInterval = setInterval(() => {
    const elapsed = Date.now() - game.startTime;
    document.getElementById("timer-display").innerText = formatTime(elapsed);
  }, 500);
}

function endGame() {
  clearInterval(game.timerInterval);
  updateHUD();
  const total = game.questions.length;
  // mostrar modal simple por ahora
  document.getElementById("final-score") && (document.getElementById("final-score").innerText = Math.round((game.correct / Math.max(1, total)) * 100));
  // puedes reemplazar con un modal bonito; por ahora alert
  alert(`Fin del juego\nAciertos: ${game.correct}/${total}\nTiempo: ${formatTime(Date.now() - game.startTime)}`);
}

/* =====================================================
   Reset
===================================================== */
function resetGame() {
  clearInterval(game.timerInterval);
  game.current = 0;
  game.correct = 0;
  game.questions = [];
  game.paused = false;
  game.pauseTime = null;
  game.startTime = null;
  // remover mapa para que al volver a abrir se regenere limpio
  if (game.map) {
    try { game.map.remove(); } catch (e) {}
    game.map = null;
    game.geoLayer = null;
  }
  // limpiar HUD texto
  document.getElementById("question-text") && (document.getElementById("question-text").innerText = "");
  document.getElementById("timer-display") && (document.getElementById("timer-display").innerText = "0:00");
  updateHUD();
      }
