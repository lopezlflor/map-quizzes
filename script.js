/* =====================================================
   DATOS DE REGIONES
   ===================================================== */
const regionData = {
  // --- PAÍSES ---
  ar: {
    "buenos aires": { name: "Buenos Aires", cap: "La Plata", flag: "ar-buenosaires.png" },
    "caba": { name: "CABA", cap: "Capital Federal", flag: "ar-caba.png" },
    "catamarca": { name: "Catamarca", cap: "Catamarca", flag: "ar-catamarca.png" },
    "chaco": { name: "Chaco", cap: "Resistencia", flag: "ar-chaco.png" },
    "chubut": { name: "Chubut", cap: "Rawson", flag: "ar-chubut.png" },
    "cordoba": { name: "Córdoba", cap: "Córdoba", flag: "ar-cordoba.png" },
    "corrientes": { name: "Corrientes", cap: "Corrientes", flag: "ar-corrientes.png" },
    "entre rios": { name: "Entre Ríos", cap: "Paraná", flag: "ar-entrerios.png" },
    "formosa": { name: "Formosa", cap: "Formosa", flag: "ar-formosa.png" },
    "jujuy": { name: "Jujuy", cap: "S. S. de Jujuy", flag: "ar-jujuy.png" },
    "la pampa": { name: "La Pampa", cap: "Santa Rosa", flag: "ar-lapampa.png" },
    "la rioja": { name: "La Rioja", cap: "La Rioja", flag: "ar-larioja.png" },
    "mendoza": { name: "Mendoza", cap: "Mendoza", flag: "ar-mendoza.png" },
    "misiones": { name: "Misiones", cap: "Posadas", flag: "ar-misiones.png" },
    "neuquen": { name: "Neuquén", cap: "Neuquén", flag: "ar-neuquen.png" },
    "rio negro": { name: "Río Negro", cap: "Viedma", flag: "ar-rionegro.png" },
    "salta": { name: "Salta", cap: "Salta", flag: "ar-salta.png" },
    "san juan": { name: "San Juan", cap: "San Juan", flag: "ar-sanjuan.png" },
    "san luis": { name: "San Luis", cap: "San Luis", flag: "ar-sanluis.png" },
    "santa cruz": { name: "Santa Cruz", cap: "Río Gallegos", flag: "ar-santacruz.png" },
    "santa fe": { name: "Santa Fe", cap: "Santa Fe", flag: "ar-santafe.png" },
    "santiago del estero": { name: "Sgo. del Estero", cap: "Santiago del Estero", flag: "ar-santiago.png" },
    "tierra del fuego": { name: "Tierra del Fuego", cap: "Ushuaia", flag: "ar-tierra.png" },
    "tucuman": { name: "Tucumán", cap: "S. M. de Tucumán", flag: "ar-tucuman.png" }
  },
  br: {
    "acre": { name: "Acre", cap: "Rio Branco", flag: "br-acre.png" },
    "alagoas": { name: "Alagoas", cap: "Maceió", flag: "br-alagoas.png" },
    "amapa": { name: "Amapá", cap: "Macapá", flag: "br-amapa.png" },
    "amazonas": { name: "Amazonas", cap: "Manaus", flag: "br-amazonas.png" },
    "bahia": { name: "Bahia", cap: "Salvador", flag: "br-bahia.png" },
    "ceara": { name: "Ceará", cap: "Fortaleza", flag: "br-ceara.png" },
    "distrito federal": { name: "Distrito Federal", cap: "Brasília", flag: "br-df.png" },
    "espirito santo": { name: "Espírito Santo", cap: "Vitória", flag: "br-espiritosanto.png" },
    "goias": { name: "Goiás", cap: "Goiânia", flag: "br-goias.png" },
    "maranhao": { name: "Maranhão", cap: "São Luís", flag: "br-maranhao.png" },
    "mato grosso": { name: "Mato Grosso", cap: "Cuiabá", flag: "br-matogrosso.png" },
    "mato grosso do sul": { name: "Mato Grosso do Sul", cap: "Campo Grande", flag: "br-matogrossodosul.png" },
    "minas gerais": { name: "Minas Gerais", cap: "Belo Horizonte", flag: "br-minasgerais.png" },
    "para": { name: "Pará", cap: "Belém", flag: "br-para.png" },
    "paraiba": { name: "Paraíba", cap: "João Pessoa", flag: "br-paraiba.png" },
    "parana": { name: "Paraná", cap: "Curitiba", flag: "br-parana.png" },
    "pernambuco": { name: "Pernambuco", cap: "Recife", flag: "br-pernambuco.png" },
    "piaui": { name: "Piauí", cap: "Teresina", flag: "br-piaui.png" },
    "rio de janeiro": { name: "Rio de Janeiro", cap: "Rio de Janeiro", flag: "br-rio.png" },
    "rio grande do norte": { name: "Rio Grande do Norte", cap: "Natal", flag: "br-riograndedonorte.png" },
    "rio grande do sul": { name: "Rio Grande do Sul", cap: "Porto Alegre", flag: "br-riograndedosul.png" },
    "rondonia": { name: "Rondônia", cap: "Porto Velho", flag: "br-rondonia.png" },
    "roraima": { name: "Roraima", cap: "Boa Vista", flag: "br-roraima.png" },
    "santa catarina": { name: "Santa Catarina", cap: "Florianópolis", flag: "br-santacatarina.png" },
    "sao paulo": { name: "São Paulo", cap: "São Paulo", flag: "br-saopaulo.png" },
    "sergipe": { name: "Sergipe", cap: "Aracaju", flag: "br-sergipe.png" },
    "tocantins": { name: "Tocantins", cap: "Palmas", flag: "br-tocantins.png" }
  },
  ca: {
    "alberta": { name: "Alberta", cap: "Edmonton", flag: "ca-alberta.png" },
    "british columbia": { name: "British Columbia", cap: "Victoria", flag: "ca-bc.png" },
    "manitoba": { name: "Manitoba", cap: "Winnipeg", flag: "ca-manitoba.png" },
    "new brunswick": { name: "New Brunswick", cap: "Fredericton", flag: "ca-newbrunswick.png" },
    "newfoundland and labrador": { name: "Newfoundland and Labrador", cap: "St. John's", flag: "ca-newfoundland.png" },
    "nova scotia": { name: "Nova Scotia", cap: "Halifax", flag: "ca-novascotia.png" },
    "ontario": { name: "Ontario", cap: "Toronto", flag: "ca-ontario.png" },
    "prince edward island": { name: "Prince Edward Island", cap: "Charlottetown", flag: "ca-pei.png" },
    "quebec": { name: "Quebec", cap: "Quebec City", flag: "ca-quebec.png" },
    "saskatchewan": { name: "Saskatchewan", cap: "Regina", flag: "ca-saskatchewan.png" },
    "yukon": { name: "Yukon", cap: "Whitehorse", flag: "ca-yukon.png" },
    "nunavut": { name: "Nunavut", cap: "Iqaluit", flag: "ca-nunavut.png" },
    "northwest territories": { name: "Northwest Territories", cap: "Yellowknife", flag: "ca-nwt.png" }
  },

  // --- SUBDIVISIONES ---
  "ar-tucuman": {
    "472": { name: "La Cocha", cap: "La Cocha" },
    "473": { name: "Graneros", cap: "Graneros" },
    "474": { name: "Juan Bautista Alberdi", cap: "Juan Bautista Alberdi" },
    "475": { name: "Río Chico", cap: "Aguilares" },
    "476": { name: "Chicligasta", cap: "Concepción" },
    "477": { name: "Simoca", cap: "Simoca" },
    "478": { name: "Lules", cap: "Lules" },
    "479": { name: "Monteros", cap: "Monteros" },
    "480": { name: "Leales", cap: "Bella Vista" },
    "481": { name: "Famaillá", cap: "Famaillá" },
    "482": { name: "Capital", cap: "San Miguel de Tucumán" },
    "483": { name: "Cruz Alta", cap: "Banda del Río Salí" },
    "484": { name: "Yerba Buena", cap: "Yerba Buena" },
    "485": { name: "Burruyacú", cap: "Burruyacú" },
    "486": { name: "Tafí Viejo", cap: "Tafí Viejo" },
    "487": { name: "Tafí del Valle", cap: "Tafí del Valle" },
    "490": { name: "Trancas", cap: "Trancas" }
  },

  "ca-bc": {
    "alberni-clayoquot": { name: "Alberni-Clayoquot", cap: "Port Alberni" },
    "bulkley-nechako": { name: "Bulkley-Nechako", cap: "Burns Lake" },
    "capital": { name: "Capital", cap: "Victoria" },
    "cariboo": { name: "Cariboo", cap: "Williams Lake" },
    "central coast": { name: "Central Coast", cap: "Bella Coola" },
    "central kootenay": { name: "Central Kootenay", cap: "Nelson" },
    "central okanagan": { name: "Central Okanagan", cap: "Kelowna" },
    "columbia-shuswap": { name: "Columbia-Shuswap", cap: "Salmon Arm" },
    "comox valley": { name: "Comox Valley", cap: "Courtenay" },
    "cowichan valley": { name: "Cowichan Valley", cap: "Duncan" },
    "east kootenay": { name: "East Kootenay", cap: "Cranbrook" },
    "fraser valley": { name: "Fraser Valley", cap: "Chilliwack" },
    "fraser-fort george": { name: "Fraser-Fort George", cap: "Prince George" },
    
    // NOTA: El mapa a veces usa "Greater Vancouver", mapeamos ambos
    "metro vancouver": { name: "Metro Vancouver", cap: "Burnaby" },
    
    "kitimat-stikine": { name: "Kitimat-Stikine", cap: "Terrace" },
    "kootenay boundary": { name: "Kootenay Boundary", cap: "Trail" },
    "mount waddington": { name: "Mount Waddington", cap: "Port McNeill" },
    "nanaimo": { name: "Nanaimo", cap: "Nanaimo" },
    "north okanagan": { name: "North Okanagan", cap: "Coldstream" },
    "northern rockies": { name: "Northern Rockies", cap: "Fort Nelson" },
    "okanagan-similkameen": { name: "Okanagan-Similkameen", cap: "Penticton" },
    "peace river": { name: "Peace River", cap: "Dawson Creek" },
    
    // NOTA: El mapa usa "Powell River", mapeamos a "qathet"
    "qathet": { name: "qathet", cap: "Powell River" },
    
    "squamish-lillooet": { name: "Squamish-Lillooet", cap: "Pemberton" },
    "strathcona": { name: "Strathcona", cap: "Campbell River" },
    "sunshine coast": { name: "Sunshine Coast", cap: "Sechelt" },
    "thompson-nicola": { name: "Thompson-Nicola", cap: "Kamloops" },
    "stikine": { name: "Stikine", cap: "-" },
    
    // AGREGADO: Skeena-Queen Charlotte (a veces llamado North Coast)
    "skeena-queen charlotte": { name: "Skeena-Queen Charlotte", cap: "Prince Rupert" }
  },
  
  "br-santacatarina": {
    "420001": { name: "Florianópolis", cap: "Florianópolis" },
    "420002": { name: "Blumenau", cap: "Blumenau" },
    "420003": { name: "Criciúma", cap: "Criciúma" },
    "420004": { name: "Joinville", cap: "Joinville" },
    "420005": { name: "Chapecó", cap: "Chapecó" },
    "420006": { name: "Concórdia", cap: "Concórdia" },
    "420007": { name: "Xanxerê", cap: "Xanxerê" },
    "420008": { name: "São Miguel do Oeste", cap: "São Miguel do Oeste" },
    "420009": { name: "Maravilha", cap: "Maravilha" },
    "420010": { name: "São Lourenço do Oeste", cap: "São Lourenço do Oeste" },
    "420011": { name: "Videira", cap: "Videira" },
    "420012": { name: "Joaçaba - Herval d'Oeste", cap: "Joaçaba" },
    "420013": { name: "Caçador", cap: "Caçador" },
    "420014": { name: "Curitibanos", cap: "Curitibanos" },
    "420015": { name: "Lages", cap: "Lages" },
    "420016": { name: "Mafra", cap: "Mafra" },
    "420017": { name: "São Bento do Sul - Rio Negrinho", cap: "São Bento do Sul" },
    "420018": { name: "Itajaí", cap: "Itajaí" },
    "420019": { name: "Brusque", cap: "Brusque" },
    "420020": { name: "Ibirama - Presidente Getúlio", cap: "Presidente Getúlio" },
    "420021": { name: "Rio do Sul", cap: "Rio do Sul" },
    "420022": { name: "Ituporanga", cap: "Ituporanga" },
    "420023": { name: "Tubarão", cap: "Tubarão" },
    "420024": { name: "Araranguá", cap: "Araranguá" }
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
  regionType: "country", // country o subdivision
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

function getFeatureId(feature) {
  const p = feature.properties || {};
  const reg = game.region;

  let id;

  // --- CASO 1: TUCUMÁN ---
  if (reg === "ar-tucuman") {
    id = p.id;
  } 
  // --- CASO 2: SANTA CATARINA ---
  else if (reg === "br-santacatarina" || reg === "br-sc") {
    id = p.CD_MUN || p.cod_ibge || p.id || p.rgi;
  } 
  // --- CASO 3: BRITISH COLUMBIA (Canadá) ---
  else if (reg === "ca-bc") {
    // Busca primero CDNAME, si no existe usa name
    let raw = p.CDNAME || p.RD_NAME || p.ADMIN_AREA_NAME || p.name || "Desconocido";
    
    // Normalizamos primero (ej: "Greater Vancouver" -> "greater vancouver")
    id = normalize(raw);

    // Mapeo de Nombres Antiguos (Mapa) -> Nombres Modernos (Tus Datos)
    const aliases = {
      "greater vancouver": "metro vancouver", // El mapa dice "Greater", tus datos "Metro"
      "powell river": "qathet"                // El mapa dice "Powell River", tus datos "qathet"
    };

    if (aliases[id]) {
      return aliases[id];
    }
    
    return id;
  }
  // --- CASO 4: PAÍSES Y OTROS (Genérico) ---
  else {
    let name = p.name || p.nombre || p.NAM || p.nam || p.nom || p.departamento || p.provincia || "Desconocido";
    return normalize(name);
  }

  return id ? id.toString() : null;
}

function getFeatureName(feature) {
  const p = feature.properties || {};
  // Si estamos en BC, intenta usar CDNAME para mostrar el nombre "bonito" del mapa
  if (game.region === "ca-bc") {
      return p.CDNAME || p.RD_NAME || p.name || "Desconocido";
  }
  return (
    p.nome_rgi ||
    p.departamento ||
    p.nombre ||
    p.name ||
    p.NAM ||
    "Desconocido"
  );
}

function getRegionKey(region) {
  const aliases = {
    "br-sc": "br-santacatarina",
    "br-santa-catarina": "br-santacatarina"
  };
  return aliases[region] || region;
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById(id)?.classList.remove("hidden");

  // Control visibilidad HUD
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

  // Botón "Aprender" o "Jugar"
  if (btn.id === "go-learn" || btn.id === "go-play") {
    game.flow = btn.id === "go-learn" ? "learn" : "play";
    showScreen("screen-regions");
  }

  // SELECCIÓN DE REGIÓN
  if (btn.classList.contains("reg-sel")) {
    const region = btn.dataset.region;
    const type = btn.dataset.type; // 'country' o 'subdivision'

    game.region = region;
    game.regionType = type;

    if (game.flow === "learn") {
      startMap(region);
    } else {
      // Si es subdivisión, ocultamos el botón de banderas
      const btnFlags = document.getElementById("btn-mode-flags");
      
      if (type === "subdivision") {
        btnFlags.classList.add("hidden"); 
      } else {
        btnFlags.classList.remove("hidden"); 
      }
      
      showScreen("screen-modes");
    }
  }

  // SELECCIÓN DE MODO
  if (btn.classList.contains("mode-sel")) {
    game.mode = btn.dataset.mode;
    startMap(game.region);
  }

  // BOTONES DE RETORNO Y CONTROL
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

  let filename = `${region}.json`;
  if (region === "ar-tucuman") filename = "departamentos-tucuman.json";
  if (region === "br-santacatarina") filename = "br-sc.geojson";
  if (region === "ca-bc") filename = "ca-bc.json";

  try {
    const res = await fetch(`data/${filename}`);
    if (!res.ok) throw new Error("Error cargando archivo: " + filename);
    const data = await res.json();

    // FILTRO DE SEGURIDAD: Solo cargamos zonas que existen en tus datos
    game.questions = (data.features || [])
      .filter(f => {
         const id = getFeatureId(f);
         const regionKey = getRegionKey(game.region);
         // Verifica si tenemos datos para esta zona (evita islas huerfanas)
         return f.geometry && regionData[regionKey] && regionData[regionKey][id];
      }) 
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
        
        // --- TOOLTIP ELIMINADO PARA LIMPIEZA VISUAL ---
        // layer.bindTooltip(rawName, { sticky: true, direction: 'top' });

        layer.on("click", () => {
          if (game.flow === "play") {
            checkAnswer(layer);
          } else {
            // Modo Aprender: Mostrar Popup CON bandera si existe
            const id = getFeatureId(feature);
            const regionKey = getRegionKey(game.region);
            const info = regionData[regionKey]?.[id];

            if (!info) {
              layer.bindPopup(`<strong>${rawName}</strong><br>Sin datos`).openPopup();
              return;
            }

            // HTML para la bandera en el popup
            const flagHtml = info.flag ? 
              `<div style="text-align:center; margin-bottom:5px;">
                 <img src="flags/${info.flag}" style="width:40px; border:1px solid #ccc;">
               </div>` : "";

            layer.bindPopup(`
              ${flagHtml}
              <strong>${info.name}</strong><br>
              Capital / Cabecera: ${info.cap}
            `).openPopup();
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
    text.innerText = "Modo Exploración: toca una zona";
  } else {
    stats.style.display = "flex";
    pause.innerHTML = '<i class="fas fa-pause"></i>';
  }
}

function nextQuestion() {
  if (game.current >= game.questions.length) {
    showGameOver();
    return;
  }

  const q = game.questions[game.current];
  const id = getFeatureId(q);
  const regionKey = getRegionKey(game.region);
  const info = regionData[regionKey]?.[id];

  const box = document.getElementById("question-text");

  // Definimos 'displayName' seguro
  const displayName = info?.name || getFeatureName(q);

  // Si info no existe (caso raro de desajuste de IDs), usamos datos genéricos
  const cap = info?.cap || "Desconocido";
  const flag = info?.flag || null;

  if (game.mode === "capitals") {
    box.innerText = `¿Dónde está la capital: ${cap}?`;
  } else if (game.mode === "flags") {
    if (flag) {
      box.innerHTML = `<span style="vertical-align:middle; margin-right:8px;">Ubica:</span> <img src="flags/${flag}" class="hud-flag" alt="Bandera">`;
    } else {
      box.innerText = `¿Dónde está ${displayName}? (Sin bandera)`;
    }
  } else {
    // Modo normal (Names)
    box.innerText = `¿Dónde está ${displayName}?`;
  }
}

function checkAnswer(layer) {
  const q = game.questions[game.current];
  const targetId = getFeatureId(q);
  const clickedId = getFeatureId(layer.feature);

  if (clickedId === targetId) {
    game.correct++;
    layer.setStyle({ fillColor: "#48bb78", fillOpacity: 0.9 });
  } else {
    layer.setStyle({ fillColor: "#f56565", fillOpacity: 0.9 });
  }

  game.current++;

  document.getElementById("hud-progress").innerText =
    `${game.current}/${game.questions.length}`;
  document.getElementById("hud-correct").innerText = game.correct;
  document.getElementById("hud-percent").innerText =
    Math.round((game.correct / game.current) * 100) + "%";

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
    document.getElementById("end-title").innerText = "¡Perfecto! 🎉";
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
    { id: "ar", name: "Argentina", type: "country" },
    { id: "br", name: "Brasil", type: "country" },
    { id: "ca", name: "Canadá", type: "country" },
    { id: "ar-tucuman", name: "Tucumán", type: "subdivision" },
    { id: "br-santacatarina", name: "Sta. Catarina", type: "subdivision" },
    { id: "ca-bc", name: "British C.", type: "subdivision" }
  ];
  
  const allModes = [
    { id: "names", name: "Nombres" },
    { id: "capitals", name: "Caps/Cabeceras" },
    { id: "flags", name: "Banderas" }
  ];

  regions.forEach(reg => {
    let activeModes = allModes;
    if (reg.type === "subdivision") {
        activeModes = allModes.filter(m => m.id !== "flags");
    }

    activeModes.forEach(mod => {
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
