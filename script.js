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
    
    // Mapeos para BC
    "metro vancouver": { name: "Metro Vancouver", cap: "Burnaby" },
    "kitimat-stikine": { name: "Kitimat-Stikine", cap: "Terrace" },
    "kootenay boundary": { name: "Kootenay Boundary", cap: "Trail" },
    "mount waddington": { name: "Mount Waddington", cap: "Port McNeill" },
    "nanaimo": { name: "Nanaimo", cap: "Nanaimo" },
    "north okanagan": { name: "North Okanagan", cap: "Coldstream" },
    "northern rockies": { name: "Northern Rockies", cap: "Fort Nelson" },
    "okanagan-similkameen": { name: "Okanagan-Similkameen", cap: "Penticton" },
    "peace river": { name: "Peace River", cap: "Dawson Creek" },
    "qathet": { name: "qathet", cap: "Powell River" },
    "squamish-lillooet": { name: "Squamish-Lillooet", cap: "Pemberton" },
    "strathcona": { name: "Strathcona", cap: "Campbell River" },
    "sunshine coast": { name: "Sunshine Coast", cap: "Sechelt" },
    "thompson-nicola": { name: "Thompson-Nicola", cap: "Kamloops" },
    "stikine": { name: "Stikine", cap: "-" },
    "skeena-queen charlotte": { name: "Skeena-Queen Charlotte", cap: "Prince Rupert" }
  },
  
  "br-santacatarina": {
    "florianopolis": { name: "Florianópolis", cap: "Florianópolis" },
    "blumenau": { name: "Blumenau", cap: "Blumenau" },
    "criciuma": { name: "Criciúma", cap: "Criciúma" },
    "joinville": { name: "Joinville", cap: "Joinville" },
    "chapeco": { name: "Chapecó", cap: "Chapecó" },
    "concordia": { name: "Concórdia", cap: "Concórdia" },
    "xanxere": { name: "Xanxerê", cap: "Xanxerê" },
    "sao miguel do oeste": { name: "São Miguel do Oeste", cap: "São Miguel do Oeste" },
    "maravilha": { name: "Maravilha", cap: "Maravilha" },
    "sao lourenco do oeste": { name: "São Lourenço do Oeste", cap: "São Lourenço do Oeste" },
    "videira": { name: "Videira", cap: "Videira" },
    "joacaba": { name: "Joaçaba", cap: "Joaçaba" },
    "cacador": { name: "Caçador", cap: "Caçador" },
    "curitibanos": { name: "Curitibanos", cap: "Curitibanos" },
    "lages": { name: "Lages", cap: "Lages" },
    "mafra": { name: "Mafra", cap: "Mafra" },
    "sao bento do sul": { name: "São Bento do Sul", cap: "São Bento do Sul" },
    "itajai": { name: "Itajaí", cap: "Itajaí" },
    "brusque": { name: "Brusque", cap: "Brusque" },
    "ibirama": { name: "Ibirama", cap: "Presidente Getúlio" },
    "rio do sul": { name: "Rio do Sul", cap: "Rio do Sul" },
    "ituporanga": { name: "Ituporanga", cap: "Ituporanga" },
    "tubarao": { name: "Tubarão", cap: "Tubarão" },
    "ararangua": { name: "Araranguá", cap: "Araranguá" }
  }
};

const game = {
    flow: "", mode: "", region: "", regionType: "country",
    map: null, geoLayer: null, questions: [], current: 0,
    correct: 0, timer: null, seconds: 0, paused: false,
    theme: localStorage.getItem("theme") || "light",
    isChecking: false
};

/* --- UTILIDADES --- */
const normalize = s => s?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() || "";

function getFeatureId(f) {
    const p = f.properties || {};
    if (game.region === "ar-tucuman") return p.id?.toString();
    if (game.region === "ca-bc") {
        const raw = p.CDNAME || p.RD_NAME || p.name || "Desconocido";
        return normalize(raw);
    }
    const name = p.NM_MUN || p.NM_MUNICIP || p.nome_rgi || p.name || p.nombre || p.NAM || "Desconocido";
    return normalize(name);
}

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    document.getElementById(id)?.classList.remove("hidden");
    document.getElementById("fixed-hud").style.display = (id === "screen-game") ? "flex" : "none";
}

/* --- LÓGICA DE JUEGO --- */
async function startMap(region) {
    game.current = 0; game.correct = 0; game.paused = false; game.seconds = 0;
    clearInterval(game.timer);
    showScreen("screen-game");

    if (game.map) game.map.remove();
    game.map = L.map("map", { zoomControl: false, attributionControl: false }).setView([0,0], 2);
    
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png").addTo(game.map);

    let file = `${region}.json`;
    if (region === "ar-tucuman") file = "departamentos-tucuman.json";
    if (region === "br-santacatarina") file = "br-sc.geojson";
    if (region === "ca-bc") file = "ca-bc.json";

    try {
        const res = await fetch(`data/${file}`);
        const data = await res.json();
        
        game.questions = (data.features || [])
            .filter(f => regionData[region]?.[getFeatureId(f)])
            .sort(() => Math.random() - 0.5);

        game.geoLayer = L.geoJSON(data, {
            style: () => ({ color: "#fff", weight: 1, fillOpacity: 0.7, fillColor: "#cbd5e0" }),
            onEachFeature: (f, layer) => {
                layer.on("click", () => {
                    if (game.flow === "play" && !game.isChecking && !game.paused) checkAnswer(layer);
                    else if (game.flow === "learn") showInfo(f, layer);
                });
            }
        }).addTo(game.map);

        if (game.geoLayer.getLayers().length) game.map.fitBounds(game.geoLayer.getBounds(), { padding: [50, 50] });

        if (game.flow === "play") {
            startTimer();
            nextQuestion();
        } else {
            document.getElementById("question-text").innerText = "Modo Exploración: toca una zona";
        }
    } catch (e) {
        alert("Error al cargar mapa.");
        showScreen("screen-regions");
    }
}

function nextQuestion() {
    if (game.current >= game.questions.length) return showGameOver();
    const q = game.questions[game.current];
    const info = regionData[game.region][getFeatureId(q)];
    const box = document.getElementById("question-text");
    
    game.isChecking = false;

    if (game.mode === "capitals") box.innerText = `Ubica la capital: ${info.cap}`;
    else if (game.mode === "flags" && info.flag) {
        box.innerHTML = `Ubica: <img src="flags/${info.flag}" class="hud-flag">`;
    } else box.innerText = `¿Dónde está ${info.name}?`;
}

function checkAnswer(layer) {
    game.isChecking = true;
    const targetId = getFeatureId(game.questions[game.current]);
    const clickedId = getFeatureId(layer.feature);

    if (clickedId === targetId) {
        game.correct++;
        layer.setStyle({ fillColor: "#2ecc71", fillOpacity: 0.9 });
    } else {
        layer.setStyle({ fillColor: "#e74c3c", fillOpacity: 0.9 });
        // Feedback: resaltar el correcto
        game.geoLayer.eachLayer(l => {
            if (getFeatureId(l.feature) === targetId) {
                l.setStyle({ color: "#f1c40f", weight: 4 });
                setTimeout(() => game.geoLayer.resetStyle(l), 1200);
            }
        });
    }

    game.current++;
    updateStats();
    setTimeout(nextQuestion, 1200);
}

function updateStats() {
    document.getElementById("hud-correct").innerText = game.correct;
    const p = Math.round((game.correct / game.current) * 100) || 0;
    document.getElementById("hud-percent").innerText = p + "%";
}

function startTimer() {
    game.timer = setInterval(() => {
        if (!game.paused) {
            game.seconds++;
            const m = Math.floor(game.seconds / 60);
            const s = (game.seconds % 60).toString().padStart(2, "0");
            document.getElementById("timer-display").innerText = `${m}:${s}`;
        }
    }, 1000);
}

function showGameOver() {
    clearInterval(game.timer);
    document.getElementById("end-score").innerText = `${game.correct} / ${game.questions.length}`;
    document.getElementById("modal-gameover").classList.remove("hidden");
}

/* --- EVENTOS --- */
document.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.id === "go-learn" || btn.id === "go-play") {
        game.flow = btn.id === "go-learn" ? "learn" : "play";
        showScreen("screen-regions");
    }
    if (btn.classList.contains("reg-sel")) {
        game.region = btn.dataset.region;
        if (game.flow === "learn") startMap(game.region);
        else showScreen("screen-modes");
    }
    if (btn.classList.contains("mode-sel")) {
        game.mode = btn.dataset.mode;
        startMap(game.region);
    }
    if (btn.id === "btn-pause") {
        if (game.flow === "learn") location.reload();
        else { game.paused = true; document.getElementById("modal-pause").classList.remove("hidden"); }
    }
    if (btn.id === "resume-game") { game.paused = false; document.getElementById("modal-pause").classList.add("hidden"); }
    if (btn.id === "exit-game" || btn.id === "btn-end-home") location.reload();
});

document.body.className = `theme-${game.theme}`;

      
