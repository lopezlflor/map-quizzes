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
  processing: false, // CORRECCIÓN: Para evitar doble click rápido

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
  // Se usa min(game.current, total) para que al final no muestre ej: 11/10
  const displayCurrent = Math.min(game.current, total); 
  
  document.getElementById("hud-progress")?.innerText = `${displayCurrent}/${total}`;
  document.getElementById("hud-correct")?.innerText = `${game.correct}`;
  
  // Evitar división por cero
  const attempted = Math.max(1, game.current);
  const pct = total === 0 ? 0 : Math.round((game.correct / attempted) * 100);
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
    resetGame();
    showScreen("screen-start");
    // Ocultar modal gameover si está abierto
    document.getElementById("modal-gameover")?.classList.add("hidden");
    return;
  }

  // Pausa / modal
  if (id === "btn-pause") {
    if (game.flow !== "play") {
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
    document.getElementById("modal-pause")?.classList.add("hidden");
    document.getElementById("modal-gameover")?.classList.add("hidden");
    resetGame();
    // Re-iniciar con la misma región/modo
    // Necesitamos recordar region/flow/mode antes del reset, 
    // pero resetGame limpia todo. Ajuste rápido:
    // Mejor volver a screen-regions o re-llamar startMap con cuidado.
    // Por simplicidad, mandamos al usuario a elegir región de nuevo:
    showScreen("screen-regions");
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
  
  // Forzar redibujado
  setTimeout(() => game.map.invalidateSize(), 120);

  // cargar geojson
  try {
    const res = await fetch(`data/${game.region}.json`);
    const geo = await res.json();

    // preparar preguntas aleatorias para play
    game.questions = shuffle([...geo.features]);
    game.current = 0;
    game.correct = 0;
    game.processing = false;
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
      game.map.fitBounds(game.geoLayer.getBounds(), { maxZoom: 6 }); // Zoom un poco menos agresivo
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
  
  // CORRECCIÓN: Estilo mejorado para la bandera
  const flagHtml = info.flag ? `<div style="margin-top:8px; text-align:center;"><img src="flags/${info.flag}" height="50" style="border:1px solid #ccc; border-radius:4px;" alt="bandera"></div>` : "";
  
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`<div style="text-align:center"><strong>${raw}</strong><br><span style="font-size:0.9em; color:#555">Capital: ${info?.cap || "—"}</span>${flagHtml}</div>`)
    .openOn(game.map);
}

/* =====================================================
   Jugar -> manejo de clicks
===================================================== */
function updateQuestionText() {
  const total = game.questions.length;
  if (!total || game.current >= total) {
    document.getElementById("question-text").innerText = "Completado";
    return;
  }
  
  const q = game.questions[game.current];
  const raw = q.properties.nombre || q.properties.name || "Desconocido";
  const info = regionData[game.region]?.[normalize(raw)] || {};
  
  let text = "";
  // CORRECCIÓN: Uso de negritas y HTML para mejor lectura
  if (game.mode === "names") text = `¿Dónde está <strong>${raw}</strong>?`;
  else if (game.mode === "capitals") text = `¿Dónde está la capital <strong>${info.cap || "??"}</strong>?`;
  else if (game.mode === "flags") text = `¿De dónde es esta bandera? <div style="margin-top:10px"><img src="flags/${info.flag || ''}" height="60" style="border:1px solid #ccc; border-radius:4px; display:inline-block;"></div>`;
  
  const el = document.getElementById("question-text");
  if (el) el.innerHTML = text;
  updateHUD();
}

function playClick(feature, layer, e) {
  // CORRECCIÓN: Evitar clics si está pausado o procesando el anterior
  if (game.paused || game.processing) return;
  game.processing = true;

  const clicked = normalize(feature.properties.nombre || feature.properties.name || "");
  const target = game.questions[game.current];
  const expected = normalize(target.properties.nombre || target.properties.name || "");
  
  const isCorrect = (clicked === expected);

  if (isCorrect) {
    // Verde para correcto
    layer.setStyle({ fillColor: "#a8e6cf", fillOpacity: 1, color: "#388e3c" });
    game.correct++;
  } else {
    // Rojo para incorrecto
    layer.setStyle({ fillColor: "#ff8a80", fillOpacity: 1, color: "#d32f2f" });
  }
  
  game.current++;
  updateHUD();

  // Esperar un poco para ver el color
  setTimeout(() => {
    // Si fue incorrecto, limpiamos el color para no ensuciar el mapa
    // Si fue correcto, lo dejamos verde para mostrar progreso
    if (!isCorrect) {
      game.geoLayer.resetStyle(layer);
    }
    
    // Verificar fin del juego
    if (game.current >= game.questions.length) {
      endGame();
    } else {
      updateQuestionText();
    }
    
    // Liberar bloqueo de clic
    game.processing = false;
  }, 800);
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
  updateHUD(); // Asegurar que HUD muestre 100% o el final
  
  const total = game.questions.length;
  const scorePct = Math.round((game.correct / Math.max(1, total)) * 100);
  const timeStr = formatTime(Date.now() - game.startTime);

  // Llenar datos del modal si existen
  const scoreEl = document.getElementById("final-score");
  const timeEl = document.getElementById("final-time");
  if (scoreEl) scoreEl.innerText = `${game.correct} / ${total} (${scorePct}%)`;
  if (timeEl) timeEl.innerText = timeStr;

  // Mostrar modal de Game Over
  const modal = document.getElementById("modal-gameover");
  if (modal) {
    modal.classList.remove("hidden");
  } else {
    // Fallback si no hay modal creado aún
    alert(`Fin del juego\nAciertos: ${game.correct}/${total}\nTiempo: ${timeStr}`);
  }
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
