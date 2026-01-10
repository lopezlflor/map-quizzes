/* =====================================================
   DATOS DE REGIONES
   ===================================================== */
const regionData = {
  // --- PAÍSES ---
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
    "yukon": { cap: "Whitehorse", flag: "ca-yukon.png" },
    "nunavut": { cap: "Iqaluit", flag: "ca-nunavut.png" },
    "northwest territories": { cap: "Yellowknife", flag: "ca-nwt.png" }
  },

  // --- SUBDIVISIONES ---
  "ar-tucuman": {
    "capital": { cap: "S. M. de Tucumán" },
    "trancas": { cap: "Trancas" },
    "burruyacu": { cap: "Burruyacú" },
    "tafi viejo": { cap: "Tafí Viejo" },
    "cruz alta": { cap: "Banda del Río Salí" },
    "lules": { cap: "Lules" },
    "famailla": { cap: "Famaillá" },
    "monteros": { cap: "Monteros" },
    "chicligasta": { cap: "Concepción" },
    "rio chico": { cap: "Aguilares" },
    "juan bautista alberdi": { cap: "Juan Bautista Alberdi" },
    "la cocha": { cap: "La Cocha" },
    "graneros": { cap: "Graneros" },
    "simoca": { cap: "Simoca" },
    "leales": { cap: "Bella Vista" },
    "tafi del valle": { cap: "Tafí del Valle" },
    "yerba buena": { cap: "Yerba Buena" }
  },

  "ca-bc": {
    "alberni-clayoquot": { cap: "Port Alberni" },
    "bulkley-nechako": { cap: "Burns Lake" },
    "capital": { cap: "Victoria" },
    "cariboo": { cap: "Williams Lake" },
    "central coast": { cap: "Bella Coola" },
    "central kootenay": { cap: "Nelson" },
    "central okanagan": { cap: "Kelowna" },
    "columbia-shuswap": { cap: "Salmon Arm" },
    "comox valley": { cap: "Courtenay" },
    "cowichan valley": { cap: "Duncan" },
    "east kootenay": { cap: "Cranbrook" },
    "fraser valley": { cap: "Chilliwack" },
    "fraser-fort george": { cap: "Prince George" },
    "metro vancouver": { cap: "Burnaby" },
    "kitimat-stikine": { cap: "Terrace" },
    "kootenay boundary": { cap: "Trail" },
    "mount waddington": { cap: "Port McNeill" },
    "nanaimo": { cap: "Nanaimo" },
    "north okanagan": { cap: "Coldstream" },
    "northern rockies": { cap: "Fort Nelson" },
    "okanagan-similkameen": { cap: "Penticton" },
    "peace river": { cap: "Dawson Creek" },
    "qathet": { cap: "Powell River" },
    "squamish-lillooet": { cap: "Pemberton" },
    "strathcona": { cap: "Campbell River" },
    "sunshine coast": { cap: "Sechelt" },
    "thompson-nicola": { cap: "Kamloops" },
    "stikine": { cap: "-" }
  },
  
  "br-santacatarina": {
    "florianopolis": { cap: "Florianópolis" },
    "joinville": { cap: "Joinville" },
    "blumenau": { cap: "Blumenau" },
    "chapeco": { cap: "Chapecó" },
    "criciuma": { cap: "Criciúma" }
  }
};

/* =====================
   CONFIGURACIÓN GLOBAL
   ===================================================== */
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

/* =====================
   UTILIDADES
   ===================================================== */

function normalize(str) {
  return str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim() || "";
}

function getFeatureName(feature) {
  const p = feature.properties;
  return (
    p.nombre || p.name || p.NAM || p.nam ||      
    p.NM_MUN || p.NM_MUNICIP || p.NM_MESO ||     
    p.CDNAME || p.CFNAME || p.ERNAME ||          
    p.admin_name || p.toponymName || "Desconocido"
  );
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById(id)?.classList.remove("hidden");

  // CORRECCIÓN 2: Controlar visibilidad HUD
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

/* =====================
   INICIALIZACIÓN Y EVENTOS
   ===================================================== */
document.body.className = `theme-${game.theme}`;
hideHUD();

document.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  // NUEVO FLUJO: Botón "Aprender" o "Jugar" van a selección de región
  if (btn.id === "go-learn" || btn.id === "go-play") {
    game.flow = btn.id === "go-learn" ? "learn" : "play";
    showScreen("screen-regions");
  }

  // SELECCIÓN DE REGIÓN
  if (btn.classList.contains("reg-sel")) {
    const region = btn.dataset.region;
    const type = btn.dataset.type;

    game.region = region;

    if (game.flow === "learn") {
      // En modo aprender, vamos directo al mapa siempre
      startMap(region);
    } else {
      // En modo Jugar:
      if (type === "country") {
        // Si es país -> Elegir modo
        showScreen("screen-modes");
      } else {
        // Si es provincia -> Modo nombres directo
        game.mode = "names";
        startMap(region);
      }
    }
  }

  // SELECCIÓN DE MODO (Solo países)
  if (btn.classList.contains("mode-sel")) {
    game.mode = btn.dataset.mode;
    startMap(game.region);
  }

  // BOTONES DE RETORNO
  if (btn.id === "back-to-start") showScreen("screen-start");
  if (btn.id === "back-to-regions") showScreen("screen-regions");

  if (btn.id === "btn-end-home") location.reload();

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

  if (btn.id === "exit-game") location.reload();

  if (btn.id === "show-achievements") {
    renderAchievements();
    document.getElementById("modal-achievements").classList.remove("hidden");
  }

  if (btn.id === "close-ach") {
    document.getElementById("modal-achievements").classList.add("hidden");
  }
});

/* =====================
   MAPA Y LÓGICA
   ===================================================== */

async function startMap(region) {
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

  // CORRECCIÓN 3: Nombres de archivo exactos
  let filename = `${region}.json`;
  if (region === "ar-tucuman") filename = "departamentos-tucuman.json";
  if (region === "br-santacatarina") filename = "br-sc.geojson.txt";
  if (region === "ca-bc") filename = "ca-bc.json";

  try {
    const res = await fetch(`data/${filename}`);
    if (!res.ok) throw new Error("Error cargando archivo: " + filename);
    const data = await res.json();

    // Filtros y barajar
    game.questions = (data.features || [])
      .filter(f => f.geometry) 
      .sort(() => Math.random() - 0.5);

    game.geoLayer = L.geoJSON(data, {
      style: () => ({
        color: "#555",
        weight: 1.0,
        fillOpacity: 0.8,
        fillColor: randomPastel()
      }),
      onEachFeature: (feature, layer) => {
        const rawName = getFeatureName(feature);
        const safeName = normalize(rawName);

        layer.bindTooltip(rawName, { sticky: true, direction: 'top' });

        layer.on("click", e => {
          if (game.paused) return;

          if (game.flow === "learn") {
            const info = regionData[game.region]?.[safeName] || {};
            let content = `<b>${rawName}</b>`;
            
            if (info.cap) content += `<br>Capital/Cabecera: ${info.cap}`;
            if (info.flag) content += `<br><img src="flags/${info.flag}" height="40" style="margin-top:5px">`;

            L.popup()
              .setLatLng(e.latlng)
              .setContent(content)
              .openOn(game.map);
          } else {
            checkAnswer(layer, rawName);
          }
        });
      }
    }).addTo(game.map);

    if (game.geoLayer.getLayers().length > 0) {
      game.map.fitBounds(game.geoLayer.getBounds());
    }

    setupHUD();

    if (game.flow === "play") {
      startTimer();
      nextQuestion();
    }

  } catch (err) {
    console.error(err);
    alert(`No se pudo cargar el mapa de ${region}. Verifica que el archivo '${filename}' esté en la carpeta /data.`);
    showScreen("screen-regions");
  }
}

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
    text.innerText = "Explora: toca una zona para ver info";
  } else {
    stats.style.display = "block";
    pause.innerHTML = '<i class="fas fa-pause"></i>';
  }
}

function nextQuestion() {
  if (game.current >= game.questions.length) {
    showGameOver();
    return;
  }

  const q = game.questions[game.current];
  const raw = getFeatureName(q);
  const info = regionData[game.region]?.[normalize(raw)] || {};

  if (game.mode === "flags") {
    if (info.flag) {
      document.getElementById("question-text").innerHTML =
        `¿De dónde es esta bandera?<br><img src="flags/${info.flag}" height="40">`;
    } else {
      document.getElementById("question-text").innerText = `¿Dónde está ${raw}?`;
    }
    return;
  }

  if (game.mode === "capitals") {
    if (info.cap) {
      document.getElementById("question-text").innerText = `¿Dónde está la capital ${info.cap}?`;
    } else {
      document.getElementById("question-text").innerText = `¿Dónde está ${raw}?`;
    }
  } else {
    document.getElementById("question-text").innerText = `¿Dónde está ${raw}?`;
  }
}

function checkAnswer(layer, rawName) {
  const q = game.questions[game.current];
  const target = normalize(getFeatureName(q));

  if (normalize(rawName) === target) {
    game.correct++;
    layer.setStyle({ fillColor: "#48bb78", fillOpacity: 0.9 });
  } else {
    layer.setStyle({ fillColor: "#f56565", fillOpacity: 0.9 });
    
    game.geoLayer.eachLayer(l => {
      if (normalize(getFeatureName(l.feature)) === target) {
        l.setStyle({ color: "#2f855a", weight: 2 });
        setTimeout(() => l.setStyle({ color: "#555", weight: 1 }), 1000);
      }
    });
  }

  game.current++;

  document.getElementById("hud-progress").innerText = `${game.current}/${game.questions.length}`;
  document.getElementById("hud-correct").innerText = game.correct;
  document.getElementById("hud-percent").innerText =
    game.current > 0 ? Math.round((game.correct / game.current) * 100) + "%" : "0%";

  setTimeout(nextQuestion, 800);
}

function showGameOver() {
  clearInterval(game.timer);
  const total = game.questions.length;
  const score = game.correct;
  const timeStr = updateTimer();

  document.getElementById("end-score").innerText = `${score} / ${total}`;
  document.getElementById("end-time").innerText = timeStr;

  const newRecordMsg = document.getElementById("new-record-msg");
  if (score === total) {
    const isNew = saveScore(game.region, game.mode, game.seconds);
    document.getElementById("end-title").innerText = "¡Completado Perfecto!";
    newRecordMsg.classList.toggle("hidden", !isNew);
  } else {
    document.getElementById("end-title").innerText = "Fin del Juego";
    newRecordMsg.classList.add("hidden");
  }
  
  document.getElementById("modal-gameover").classList.remove("hidden");
}

function saveScore(region, mode, seconds) {
  const key = `mq_record_${region}_${mode}`;
  let times = JSON.parse(localStorage.getItem(key)) || [];
  times.push(seconds);
  times.sort((a, b) => a - b);
  times = times.slice(0, 3);
  localStorage.setItem(key, JSON.stringify(times));
  return times[0] === seconds;
}

function renderAchievements() {
  const grid = document.getElementById("achievements-grid");
  grid.innerHTML = "";

  const regions = [
    { id: "ar", name: "Argentina" },
    { id: "br", name: "Brasil" },
    { id: "ca", name: "Canadá" },
    { id: "ar-tucuman", name: "Tucumán" },
    { id: "br-santacatarina", name: "Sta. Catarina" },
    { id: "ca-bc", name: "British C." }
  ];
  
  const modes = [
    { id: "names", name: "Nombres" },
    { id: "capitals", name: "Caps/Cabeceras" },
    { id: "flags", name: "Banderas" }
  ];

  regions.forEach(reg => {
    modes.forEach(mod => {
      const key = `mq_record_${reg.id}_${mod.id}`;
      const records = JSON.parse(localStorage.getItem(key)) || [];
      const isUnlocked = records.length > 0;
      
      const card = document.createElement("div");
      card.className = `ach-card ${isUnlocked ? "unlocked" : "locked"}`;
      
      let timesHtml = isUnlocked 
        ? `<div class="ach-times">${records.map((t, i) => `<div><span>#${i+1}</span> ${formatTime(t)}</div>`).join('')}</div>`
        : `<div class="ach-times">Sin completar</div>`;

      const flagImg = `<img src="flags/${reg.id}.png" class="ach-flag" onerror="this.style.display='none'">`;

      card.innerHTML = `
        <div class="ach-header">
          ${flagImg}
          <div>
            <div class="ach-country">${reg.name}</div>
            <div class="ach-mode">${mod.name}</div>
          </div>
          <div class="ach-icon"><i class="fas ${isUnlocked ? 'fa-check-circle' : 'fa-lock'}"></i></div>
        </div>
        ${timesHtml}
      `;
      grid.appendChild(card);
    });
  });
}
            <h3>${config.title}</h3>
            <div class="medallas-container">
                <span title="Maestro de Nombres" class="medalla ${logroNombres ? 'ganada' : ''}">🥇</span>
                <span title="Maestro de Cabeceras" class="medalla ${logroCabeceras ? 'ganada' : ''}">🏆</span>
            </div>
        `;
        grid.appendChild(card);
    }
}

// --- SELECCIÓN DE MODO ---
function abrirModalModo(mapId) {
    currentMapId = mapId;
    const config = mapsConfig[mapId];
    
    // Si el mapa no tiene datos de cabecera, deshabilitamos ese botón
    const btnCabecera = document.querySelectorAll('.btn-modo')[1];
    if (!config.cabeceraProp) {
        btnCabecera.style.display = 'none';
    } else {
        btnCabecera.style.display = 'block';
    }

    document.getElementById('modal-modo').classList.remove('hidden');
}

function seleccionarModo(modo) {
    currentMode = modo;
    document.getElementById('modal-modo').classList.add('hidden');
    document.getElementById('menu-principal').classList.add('hidden');
    document.getElementById('juego-container').classList.remove('hidden');
    
    iniciarJuego(currentMapId);
}

function volverAlMenu() {
    document.getElementById('juego-container').classList.add('hidden');
    document.getElementById('modal-modo').classList.add('hidden');
    document.getElementById('menu-principal').classList.remove('hidden');
    if (map) {
        map.remove();
        map = null;
    }
    generarMenu(); // Actualizar medallas
}

// --- LÓGICA DEL JUEGO ---
function iniciarJuego(mapId) {
    const config = mapsConfig[mapId];
    correctCount = 0;
    
    // Inicializar mapa
    if (map) map.remove();
    map = L.map('map').setView([0, 0], 5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);

    // Cargar GeoJSON
    fetch(config.file)
        .then(response => response.json())
        .then(data => {
            // Filtrar regiones válidas (que tengan nombre)
            const validFeatures = data.features.filter(f => f.properties[config.nameProp]);
            pendingRegions = [...validFeatures];
            totalCount = validFeatures.length;
            document.getElementById('total-regiones').innerText = totalCount;
            actualizarProgreso();

            geojsonLayer = L.geoJSON(data, {
                style: estiloPorDefecto,
                onEachFeature: (feature, layer) => {
                    // Configurar Popup con información
                    const nombre = feature.properties[config.nameProp] || "Desconocido";
                    const cabecera = feature.properties[config.cabeceraProp] || "N/A";
                    
                    let popupContent = `<b>${nombre}</b>`;
                    if (config.cabeceraProp) {
                        popupContent += `<br><i>Cabecera: ${cabecera}</i>`;
                    }
                    layer.bindPopup(popupContent);

                    // Evento Click
                    layer.on('click', (e) => manejarClick(e, feature, layer));
                }
            }).addTo(map);

            map.fitBounds(geojsonLayer.getBounds());
            siguientePregunta();
        })
        .catch(err => {
            console.error("Error cargando el mapa:", err);
            alert("Error al cargar el archivo del mapa. Revisa la consola.");
        });
}

function estiloPorDefecto(feature) {
    return {
        fillColor: '#4a90e2',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function siguientePregunta() {
    if (pendingRegions.length === 0) {
        finDelJuego();
        return;
    }

    // Elegir región aleatoria
    const randomIndex = Math.floor(Math.random() * pendingRegions.length);
    targetFeature = pendingRegions[randomIndex];
    
    // Generar texto de pregunta según modo
    const config = mapsConfig[currentMapId];
    const nombre = targetFeature.properties[config.nameProp];
    const cabecera = config.cabeceraProp ? targetFeature.properties[config.cabeceraProp] : null;

    const boxTitulo = document.getElementById('texto-instruccion');
    const boxPregunta = document.getElementById('pregunta-actual');

    if (currentMode === 'nombres') {
        boxTitulo.innerText = "Encuentra la región:";
        boxPregunta.innerText = nombre;
    } else {
        boxTitulo.innerText = "¿Dónde está la cabecera?";
        boxPregunta.innerText = cabecera;
    }
}

function manejarClick(e, feature, layer) {
    if (!targetFeature) return;

    const config = mapsConfig[currentMapId];
    // Comparamos usando el ID único o el nombre
    const targetName = targetFeature.properties[config.nameProp];
    const clickedName = feature.properties[config.nameProp];

    if (targetName === clickedName) {
        // Correcto
        mostrarFeedback(true);
        layer.setStyle({ fillColor: '#2ecc71', fillOpacity: 0.9 }); // Verde
        correctCount++;
        
        // Eliminar de pendientes
        pendingRegions = pendingRegions.filter(f => f.properties[config.nameProp] !== targetName);
        
        actualizarProgreso();
        siguientePregunta();
    } else {
        // Incorrecto
        mostrarFeedback(false);
        layer.setStyle({ fillColor: '#e74c3c' }); // Rojo momentáneo
        setTimeout(() => {
            geojsonLayer.resetStyle(layer);
        }, 500);
    }
}

function mostrarFeedback(esCorrecto) {
    const el = document.getElementById('feedback');
    el.innerText = esCorrecto ? "¡Correcto!" : "¡Incorrecto!";
    el.className = esCorrecto ? "correcto" : "incorrecto";
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 1000);
}

function actualizarProgreso() {
    document.getElementById('aciertos').innerText = correctCount;
    const porcentaje = (correctCount / totalCount) * 100;
    document.getElementById('barra-progreso').style.width = `${porcentaje}%`;
}

function finDelJuego() {
    const titulo = document.getElementById('pregunta-actual');
    titulo.innerText = "¡Juego Completado!";
    document.getElementById('texto-instruccion').innerText = "";

    // Efecto Confeti
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

    // Guardar Logro (Solo si acertó todas, en este diseño simple siempre se gana al final)
    const keyLogro = `logro_${currentMapId}_${currentMode}`;
    localStorage.setItem(keyLogro, 'true');

    // Mensaje SweetAlert (Opcional, nativo)
    setTimeout(() => {
        alert(`¡Felicidades! Completaste el mapa de ${mapsConfig[currentMapId].title} en modo ${currentMode}.`);
        volverAlMenu();
    }, 2000);
}
