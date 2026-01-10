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
    "northwest territories": { cap: "yellowknife", flag: "ca-nwt.png" }
  }
};

// =====================
// CONFIGURACIÓN GLOBAL
// =====================

const pastelColors = [
  "#ffd1dc", "#e0bbe4", "#d0f4de",
  "#cddafd", "#fff1c1", "#f6c1cc",
  "#c1e1dc", "#e4c1f9"
];

function randomPastel() {
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}

const game = {
  flow: "",
  mode: "",
  region: "",
  map: null,
  geoLayer: null,
  questions: [],
  current: 0,
  correct: 0,
  timer: null,
  seconds: 0,
  paused: false,
  theme: localStorage.getItem("theme") || "light"
};

// =====================
// UTILIDADES
// =====================

function normalize(str) {
  return str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim() || "";
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById(id)?.classList.remove("hidden");

  // 👉 HUD solo en el mapa
  if (id === "screen-game") {
    showHUD();
  } else {
    hideHUD();
  }
}

function showHUD() {
  document.getElementById("fixed-hud").style.display = "flex";
}

function hideHUD() {
  document.getElementById("fixed-hud").style.display = "none";
}

function resetTimer() {
  clearInterval(game.timer);
  game.seconds = 0;
  updateTimer();
}

function startTimer() {
  resetTimer();
  game.timer = setInterval(() => {
    if (!game.paused) {
      game.seconds++;
      updateTimer();
    }
  }, 1000);
}

function updateTimer() {
  const m = Math.floor(game.seconds / 60);
  const s = game.seconds % 60;
  const timeStr = `${m}:${s.toString().padStart(2, "0")}`;
  document.getElementById("timer-display").innerText = timeStr;
  return timeStr;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// =====================
// INICIALIZACIÓN
// =====================

document.body.className = `theme-${game.theme}`;
hideHUD();

// =====================
// EVENTOS GENERALES
// =====================

document.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.id === "go-learn") {
    game.flow = "learn";
    showScreen("screen-regions");
  }

  if (btn.id === "go-play") {
    game.flow = "play";
    showScreen("screen-modes");
  }

  if (btn.classList.contains("mode-sel")) {
    game.mode = btn.dataset.mode;
    showScreen("screen-regions");
  }

  if (btn.classList.contains("reg-sel")) {
    startMap(btn.dataset.region);
  }

  if (btn.id === "back-to-start" || btn.id === "back-from-regions") {
    showScreen("screen-start");
  }

  if (btn.id === "btn-end-home") {
    location.reload();
  }

  if (btn.id === "btn-theme") {
    game.theme = game.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", game.theme);
    document.body.className = `theme-${game.theme}`;
  }

  if (btn.id === "btn-pause") {
    if (game.flow === "learn") {
      location.reload();
    } else {
      game.paused = true;
      document.getElementById("modal-pause").classList.remove("hidden");
    }
  }

  if (btn.id === "resume-game") {
    game.paused = false;
    document.getElementById("modal-pause").classList.add("hidden");
  }

  if (btn.id === "restart-game") {
    document.getElementById("modal-pause").classList.add("hidden");
    startMap(game.region);
  }

  if (btn.id === "exit-game") {
    location.reload();
  }

  if (btn.id === "show-achievements") {
    renderAchievements();
    document.getElementById("modal-achievements").classList.remove("hidden");
  }

  if (btn.id === "close-ach") {
    document.getElementById("modal-achievements").classList.add("hidden");
  }
});

// =====================
// MAPA Y JUEGO
// =====================

async function startMap(region) {
  game.region = region;
  
  // Reseteo
  game.current = 0;
  game.correct = 0;
  game.paused = false;
  game.seconds = 0; 
  clearInterval(game.timer);
  updateTimer();

  showScreen("screen-game");

  if (game.map) game.map.remove();

  game.map = L.map("map", {
    zoomControl: true,
    attributionControl: false
  }).setView([0, 0], 2);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  ).addTo(game.map);

  const res = await fetch(`data/${region}.json`);
  const data = await res.json();

  // Barajar
  game.questions = [...data.features].sort(() => Math.random() - 0.5);

  game.geoLayer = L.geoJSON(data, {
    style: () => ({
      color: "#555",
      weight: 1.3,
      fillOpacity: 0.85,
      fillColor: randomPastel()
    }),
    onEachFeature: (feature, layer) => {
      layer.on("click", e => {
        if (game.paused) return;

        const rawName =
          feature.properties.nombre ||
          feature.properties.name ||
          feature.properties.NAM;

        if (game.flow === "learn") {
          const info =
            regionData[game.region][normalize(rawName)] || {};

          L.popup()
            .setLatLng(e.latlng)
            .setContent(`
              <b>${rawName}</b><br>
              Capital: ${info.cap || "—"}<br>
              <img src="flags/${info.flag || ""}" height="40">
            `)
            .openOn(game.map);
        } else {
          checkAnswer(layer, rawName);
        }
      });
    }
  }).addTo(game.map);

  game.map.fitBounds(game.geoLayer.getBounds());

  setupHUD();

  if (game.flow === "play") {
    startTimer();
    nextQuestion();
  }
}

// =====================
// HUD
// =====================

function setupHUD() {
  const stats = document.querySelector(".hud-stats");
  const pause = document.getElementById("btn-pause");
  const text = document.getElementById("question-text");

  document.getElementById("hud-progress").innerText = "0/0";
  document.getElementById("hud-correct").innerText = "0";
  document.getElementById("hud-percent").innerText = "0%";

  if (game.flow === "learn") {
    stats.style.display = "none";
    pause.innerHTML = '<i class="fas fa-home"></i>';
    text.innerText = "Toca una provincia para ver su información";
  } else {
    stats.style.display = "block";
    pause.innerHTML = '<i class="fas fa-pause"></i>';
  }
}

// =====================
// JUEGO
// =====================

function nextQuestion() {
  if (game.current >= game.questions.length) {
    showGameOver();
    return;
  }

  const q = game.questions[game.current];
  const raw =
    q.properties.nombre ||
    q.properties.name ||
    q.properties.NAM;

  const info =
    regionData[game.region][normalize(raw)] || {};

  if (game.mode === "flags") {
    document.getElementById("question-text").innerHTML =
      `¿De dónde es esta bandera?<br>
       <img src="flags/${info.flag}" height="40">`;
    return;
  }

  if (game.mode === "capitals") {
    document.getElementById("question-text").innerText =
      `¿Dónde está la capital ${info.cap}?`;
  } else {
    document.getElementById("question-text").innerText =
      `¿Dónde está ${raw}?`;
  }
}

function checkAnswer(layer, rawName) {
  const q = game.questions[game.current];
  const target =
    normalize(
      q.properties.nombre ||
      q.properties.name ||
      q.properties.NAM
    );

  if (normalize(rawName) === target) {
    game.correct++;
    layer.setStyle({ fillColor: "#9ae6b4" });
  } else {
    layer.setStyle({ fillColor: "#feb2b2" });
  }

  game.current++;

  document.getElementById("hud-progress").innerText =
    `${game.current}/${game.questions.length}`;
  document.getElementById("hud-correct").innerText = game.correct;
  document.getElementById("hud-percent").innerText =
    Math.round((game.correct / game.current) * 100) + "%";

  setTimeout(nextQuestion, 600);
}

// =====================
// FIN DEL JUEGO Y LOGROS
// =====================

function showGameOver() {
  clearInterval(game.timer);
  
  const total = game.questions.length;
  const score = game.correct;
  const timeStr = updateTimer();

  document.getElementById("end-score").innerText = `${score} / ${total}`;
  document.getElementById("end-time").innerText = timeStr;

  // Si acierta todas, guardamos el récord
  const newRecordMsg = document.getElementById("new-record-msg");
  
  if (score === total) {
    const isNew = saveScore(game.region, game.mode, game.seconds);
    document.getElementById("end-title").innerText = "¡Completado!";
    
    if(isNew) {
       newRecordMsg.classList.remove("hidden");
    } else {
       newRecordMsg.classList.add("hidden");
    }
  } else {
    document.getElementById("end-title").innerText = "Fin del Juego";
    newRecordMsg.classList.add("hidden");
  }
  
  document.getElementById("modal-gameover").classList.remove("hidden");
}

function saveScore(region, mode, seconds) {
  const key = `mq_record_${region}_${mode}`;
  // Obtener array actual o iniciar vacío
  let times = JSON.parse(localStorage.getItem(key)) || [];
  
  // Añadir nuevo tiempo
  times.push(seconds);
  
  // Ordenar de menor a mayor
  times.sort((a, b) => a - b);
  
  // Mantener solo los 3 mejores
  times = times.slice(0, 3);
  
  localStorage.setItem(key, JSON.stringify(times));

  // Devolver true si el tiempo actual es el mejor de la lista
  return (times[0] === seconds);
}

function renderAchievements() {
  const grid = document.getElementById("achievements-grid");
  grid.innerHTML = "";

  const regions = [
    { id: "ar", name: "Argentina" },
    { id: "br", name: "Brasil" },
    { id: "ca", name: "Canadá" }
  ];
  
  const modes = [
    { id: "names", name: "Nombres" },
    { id: "capitals", name: "Capitales" },
    { id: "flags", name: "Banderas" }
  ];

  regions.forEach(reg => {
    modes.forEach(mod => {
      const key = `mq_record_${reg.id}_${mod.id}`;
      const records = JSON.parse(localStorage.getItem(key)) || [];
      const isUnlocked = records.length > 0;
      
      const card = document.createElement("div");
      card.className = `ach-card ${isUnlocked ? "unlocked" : "locked"}`;
      
      let timesHtml = "";
      if (isUnlocked) {
        timesHtml = `<div class="ach-times">
          ${records.map((t, i) => 
            `<div><span>#${i+1}</span> ${formatTime(t)}</div>`
          ).join('')}
        </div>`;
      } else {
        timesHtml = `<div class="ach-times">Sin completar</div>`;
      }

      card.innerHTML = `
        <div class="ach-header">
          <img src="flags/${reg.id}.png" class="ach-flag">
          <div>
            <div class="ach-country">${reg.name}</div>
            <div class="ach-mode">${mod.name}</div>
          </div>
          <div class="ach-icon">
            <i class="fas ${isUnlocked ? 'fa-check-circle' : 'fa-lock'}"></i>
          </div>
        </div>
        ${timesHtml}
      `;
      
      grid.appendChild(card);
    });
  });
}
