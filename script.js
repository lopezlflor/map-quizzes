/* =====================================================
   regionData
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
    "saskatchewan": { cap: "Regina", flag: "ca-saskatchewan.png" },
    "yukon": { cap: "whitehorse", flag: "ca-yukon.png" },
    "nunavut": { cap: "iqaluit", flag: "ca-nunavut.png" },
    "northwest territories": { cap: "yellowknife", flag: "ca-nt.png" }
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
  processing: false, // Evitar doble click

  startTime: null,
  timerInterval: null,
  paused: false,
  pauseTime: null,

  theme: localStorage.getItem("theme") || "light"
};

// Aplicar tema inicial
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
  const displayCurrent = Math.min(game.current, total);
  
  const elProg = document.getElementById("hud-progress");
  const elCorr = document.getElementById("hud-correct");
  const elPerc = document.getElementById("hud-percent");

  if (elProg) elProg.innerText = `${displayCurrent}/${total}`;
  if (elCorr) elCorr.innerText = `${game.correct}`;
  
  const attempted = Math.max(1, game.current);
  const pct = total === 0 ? 0 : Math.round((game.correct / attempted) * 100);
  if (elPerc) elPerc.innerText = `${pct}%`;
}

/* =====================================================
   Manejo global de clicks
===================================================== */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.id;

  // --- NAVEGACIÓN PRINCIPAL ---

  // Botón: Aprender -> Ir directo a elegir mapa
  if (id === "go-learn") {
    resetGame();
    game.flow = "learn";
    game.mode = null; // En aprender no hay modos de juego
    showScreen("screen-regions");
    return;
  }

  // Botón: Jugar -> Ir a elegir modo
  if (id === "go-play") {
    resetGame();
    game.flow = "play";
    game.mode = null;
    showScreen("screen-modes");
    return;
  }

  // --- SELECCIONES ---

  // Selección de Modo (Nombres, Capitales, Banderas)
  if (btn.classList.contains("mode-sel")) {
    game.mode = btn.dataset.mode;
    showScreen("screen-regions"); // Siguiente paso: elegir mapa
    return;
  }

  // Selección de Región (País) -> Iniciar Mapa
  if (btn.classList.contains("reg-sel")) {
    game.region = btn.dataset.region;
    startMap();
    return;
  }

  // --- UTILIDADES ---

  // Cambiar Tema
  if (id === "btn-theme") {
    game.theme = game.theme === "light" ? "dark" : "light";
    document.body.className = `theme-${game.theme}`;
    localStorage.setItem("theme", game.theme);
    return;
  }

  // Volver atrás
  if (id === "back-to-start") {
    resetGame();
    showScreen("screen-start");
    return;
  }
  if (id === "back-from-regions") {
    // Si veníamos de jugar, volver a modos. Si veníamos de aprender, volver a inicio.
    if (game.flow === "play") {
      showScreen("screen-modes");
    } else {
      showScreen("screen-start");
    }
    return;
  }
  if (id === "back-to-menu" || id === "exit-game") {
    resetGame();
    showScreen("screen-start");
    document.getElementById("modal-gameover")?.classList.add("hidden");
    document.getElementById("modal-pause")?.classList.add("hidden");
    return;
  }

  // --- PAUSA / MODALES ---

  if (id === "btn-pause") {
    if (game.flow !== "play") {
      // En modo aprender, el botón de pausa actúa como salir
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
      const pausedFor = Date.now() - (game.pauseTime || Date.now());
      game.startTime += pausedFor;
      startTimer();
    }
    document.getElementById("modal-pause")?.classList.add("hidden");
    return;
  }

  if (id === "restart-game") {
    // Cerrar modales
    document.getElementById("modal-pause")?.classList.add("hidden");
    document.getElementById("modal-gameover")?.classList.add("hidden");
    
    // Reiniciar manteniendo configuración actual
    const currentRegion = game.region;
    const currentMode = game.mode;
    const currentFlow = game.flow;
    
    resetGame();
    
    // Restaurar estado
    game.region = currentRegion;
    game.mode = currentMode;
    game.flow = currentFlow;
    
    startMap();
    return;
  }

  // Logros
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

  // Limpiar mapa previo
  if (game.map) {
    try { game.map.remove(); } catch (e) {}
    game.map = null;
    game.geoLayer = null;
  }

  // Crear mapa
  game.map = L.map("map", { zoomControl: false, attributionControl: false }).setView([0,0], 2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(game.map);
  
  setTimeout(() => game.map.invalidateSize(), 120);

  // Cargar GeoJSON
  try {
    const res = await fetch(`data/${game.region}.json`);
    const geo = await res.json();

    // Preparar juego
    game.questions = shuffle([...geo.features]);
    game.current = 0;
    game.correct = 0;
    game.processing = false;
    updateHUD();

    // Configurar interfaz según flujo
    if (game.flow === "play") {
      game.startTime = Date.now();
      startTimer();
      updateQuestionText();
      document.getElementById("btn-pause").style.display = "block";
    } else {
      // Modo aprender
      document.getElementById("question-text").innerText = "Toca una provincia para ver información";
      document.getElementById("timer-display").innerText = "--:--";
      // Ocultar botón de pausa o cambiar ícono si quisieras
    }

    // Agregar capa GeoJSON
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

    // Zoom al país
    try {
      game.map.fitBounds(game.geoLayer.getBounds(), { padding: [20, 20] });
    } catch (err) {}

  } catch (err) {
    console.error(err);
    document.getElementById("question-text").innerText = "Error cargando mapa";
  }
}

/* =====================================================
   Aprender: Popups
===================================================== */
function learnPopup(feature, e) {
  const raw = feature.properties.nombre || feature.properties.name || "Desconocido";
  const key = normalize(raw);
  const info = regionData[game.region]?.[key] || {};
  
  const flagHtml = info.flag 
    ? `<div style="margin-top:8px; text-align:center;"><img src="flags/${info.flag}" height="50" style="border:1px solid #ccc; border-radius:4px;"></div>` 
    : "";
  
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`<div style="text-align:center"><strong>${raw}</strong><br><span style="color:#666">Capital: ${info.cap || "—"}</span>${flagHtml}</div>`)
    .openOn(game.map);
}

/* =====================================================
   Jugar: Lógica de aciertos
===================================================== */
function updateQuestionText() {
  const total = game.questions.length;
  if (!total || game.current >= total) {
    document.getElementById("question-text").innerText = "¡Completado!";
    return;
  }
  
  const q = game.questions[game.current];
  const raw = q.properties.nombre || q.properties.name || "Desconocido";
  const info = regionData[game.region]?.[normalize(raw)] || {};
  
  let text = "";
  if (game.mode === "names") text = `¿Dónde está <strong>${raw}</strong>?`;
  else if (game.mode === "capitals") text = `¿Dónde está la capital <strong>${info.cap || "??"}</strong>?`;
  else if (game.mode === "flags") text = `¿De dónde es esta bandera? <div style="margin-top:10px"><img src="flags/${info.flag || ''}" height="60" style="border:1px solid #ccc; border-radius:4px;"></div>`;
  
  const el = document.getElementById("question-text");
  if (el) el.innerHTML = text;
  updateHUD();
}

function playClick(feature, layer, e) {
  if (game.paused || game.processing) return;
  game.processing = true;

  const clicked = normalize(feature.properties.nombre || feature.properties.name || "");
  const target = game.questions[game.current];
  const expected = normalize(target.properties.nombre || target.properties.name || "");
  
  const isCorrect = (clicked === expected);

  if (isCorrect) {
    layer.setStyle({ fillColor: "#a8e6cf", fillOpacity: 1, color: "#2e7d32" });
    game.correct++;
  } else {
    layer.setStyle({ fillColor: "#ff8a80", fillOpacity: 1, color: "#c62828" });
  }
  
  game.current++;
  updateHUD();

  setTimeout(() => {
    // Si falló, restaurar color. Si acertó, dejar verde.
    if (!isCorrect) {
      game.geoLayer.resetStyle(layer);
    }
    
    if (game.current >= game.questions.length) {
      endGame();
    } else {
      updateQuestionText();
    }
    game.processing = false;
  }, 800);
}

/* =====================================================
   Timer y Fin
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
  const scorePct = Math.round((game.correct / Math.max(1, total)) * 100);
  const timeStr = formatTime(Date.now() - game.startTime);

  // Llenar datos del modal
  const scoreEl = document.getElementById("final-score");
  const timeEl = document.getElementById("final-time");
  if (scoreEl) scoreEl.innerText = `${game.correct} / ${total} (${scorePct}%)`;
  if (timeEl) timeEl.innerText = timeStr;

  // Mostrar modal
  document.getElementById("modal-gameover")?.classList.remove("hidden");
}

function resetGame() {
  clearInterval(game.timerInterval);
  game.current = 0;
  game.correct = 0;
  game.questions = [];
  game.paused = false;
  game.processing = false;
  
  if (game.map) {
    try { game.map.remove(); } catch (e) {}
    game.map = null;
    game.geoLayer = null;
  }
  
  const qText = document.getElementById("question-text");
  const tDisp = document.getElementById("timer-display");
  if (qText) qText.innerText = "";
  if (tDisp) tDisp.innerText = "0:00";
  
  updateHUD();
}
