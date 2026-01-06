// CONFIGURACIÓN DE DATOS
const regionData = {
    ar: { "buenos aires": { cap: "La Plata", flag: "ar-buenosaires.png" }, "caba": { cap: "Capital Federal", flag: "ar-caba.png" }, "catamarca": { cap: "Catamarca", flag: "ar-catamarca.png" }, "chaco": { cap: "Resistencia", flag: "ar-chaco.png" }, "chubut": { cap: "Rawson", flag: "ar-chubut.png" }, "cordoba": { cap: "Córdoba", flag: "ar-cordoba.png" }, "corrientes": { cap: "Corrientes", flag: "ar-corrientes.png" }, "entre rios": { cap: "Paraná", flag: "ar-entrerios.png" }, "formosa": { cap: "Formosa", flag: "ar-formosa.png" }, "jujuy": { cap: "S.S. de Jujuy", flag: "ar-jujuy.png" }, "la pampa": { cap: "Santa Rosa", flag: "ar-lapampa.png" }, "la rioja": { cap: "La Rioja", flag: "ar-larioja.png" }, "mendoza": { cap: "Mendoza", flag: "ar-mendoza.png" }, "misiones": { cap: "Posadas", flag: "ar-misiones.png" }, "neuquen": { cap: "Neuquén", flag: "ar-neuquen.png" }, "rio negro": { cap: "Viedma", flag: "ar-rionegro.png" }, "salta": { cap: "Salta", flag: "ar-salta.png" }, "san juan": { cap: "San Juan", flag: "ar-sanjuan.png" }, "san luis": { cap: "San Luis", flag: "ar-sanluis.png" }, "santa cruz": { cap: "Río Gallegos", flag: "ar-santacruz.png" }, "santa fe": { cap: "Santa Fe", flag: "ar-santafe.png" }, "santiago del estero": { cap: "Sgo. del Estero", flag: "ar-santiago.png" }, "tierra del fuego": { cap: "Ushuaia", flag: "ar-tierra.png" }, "tucuman": { cap: "S.M. de Tucumán", flag: "ar-tucuman.png" } },
    br: { "sao paulo": { cap: "São Paulo", flag: "br-saopaulo.png" }, "rio de janeiro": { cap: "Rio de Janeiro", flag: "br-rio.png" }, "minas gerais": { cap: "Belo Horizonte", flag: "br-minasgerais.png" }, "bahia": { cap: "Salvador", flag: "br-bahia.png" }, "acre": { cap: "Rio Branco", flag: "br-acre.png" }, "amazonas": { cap: "Manaus", flag: "br-amazonas.png" } },
    ca: { "ontario": { cap: "Toronto", flag: "ca-ontario.png" }, "quebec": { cap: "Quebec City", flag: "ca-quebec.png" }, "british columbia": { cap: "Victoria", flag: "ca-bc.png" }, "alberta": { cap: "Edmonton", flag: "ca-alberta.png" } }
};

let game = {
    flow: '', mode: '', region: '', questions: [], 
    currentIndex: 0, score: 0, map: null, isPaused: false,
    theme: localStorage.getItem('theme') || 'light'
};

// --- FUNCIONES DE NAVEGACIÓN ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(id);
    if(target) target.classList.remove('hidden');
}

function normalize(s) {
    if (!s) return "";
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/province of |estado de /g, "").trim();
}

// --- ESCUCHA GLOBAL DE CLICS (Para evitar fallos de carga) ---
document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.id;

    if (id === 'go-learn') { game.flow = 'learn'; showScreen('screen-modes'); }
    if (id === 'go-play') { game.flow = 'play'; showScreen('screen-modes'); }
    if (id === 'back-to-start') showScreen('screen-start');
    if (id === 'back-from-regions') showScreen('screen-modes');
    if (id === 'show-achievements') document.getElementById('modal-achievements').classList.remove('hidden');
    if (id === 'close-ach') document.getElementById('modal-achievements').classList.add('hidden');
    if (id === 'resume-game') { game.isPaused = false; document.getElementById('modal-pause').classList.add('hidden'); }
    
    if (id === 'btn-theme') {
        game.theme = game.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', game.theme);
        document.body.className = `theme-${game.theme}`;
    }

    if (btn.classList.contains('mode-sel')) {
        game.mode = btn.dataset.mode;
        showScreen('screen-regions');
    }

    if (btn.classList.contains('reg-sel')) {
        initGame(btn.dataset.region);
    }

    if (id === 'btn-pause') {
        if (game.flow === 'learn') location.reload();
        else { game.isPaused = true; document.getElementById('modal-pause').classList.remove('hidden'); }
    }
});

// --- MOTOR DEL JUEGO ---
async function initGame(regId) {
    game.region = regId; game.score = 0; game.currentIndex = 0;
    showScreen('screen-game');
    
    if (game.map) { game.map.remove(); game.map = null; }
    
    game.map = L.map('map', { zoomControl: false, attributionControl: false }).setView([0,0], 2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(game.map);

    document.getElementById('btn-pause').innerHTML = game.flow === 'learn' ? '<i class="fas fa-times"></i>' : '<i class="fas fa-pause"></i>';

    try {
        const response = await fetch(`data/${regId}.json`);
        const data = await response.json();
        game.questions = data.features.sort(() => Math.random() - 0.5);

        const geoLayer = L.geoJSON(data, {
            style: () => ({
                color: "#444", weight: 1.5, fillOpacity: 0.7,
                fillColor: `hsl(${Math.random() * 360}, 60%, 80%)`
            }),
            onEachFeature: (feature, layer) => {
                layer.on('click', (e) => {
                    if (game.isPaused) return;
                    const name = feature.properties.nombre || feature.properties.name || feature.properties.NAM || "";
                    const cleanName = normalize(name);
                    
                    if (game.flow === 'learn') {
                        const info = regionData[game.region][cleanName] || { cap: "No disponible" };
                        L.popup().setLatLng(e.latlng).setContent(`<b>${name}</b><br>Capital: ${info.cap}`).openOn(game.map);
                    } else {
                        const targetName = normalize(game.questions[game.currentIndex].properties.nombre || game.questions[game.currentIndex].properties.name);
                        if (cleanName === targetName) {
                            game.score++;
                            layer.setStyle({ fillColor: '#a8e6cf', fillOpacity: 1 });
                        } else {
                            layer.setStyle({ fillColor: '#ffaaa5', fillOpacity: 1 });
                        }
                        setTimeout(() => { game.currentIndex++; updateQuestion(); }, 500);
                    }
                });
            }
        }).addTo(game.map);

        game.map.fitBounds(geoLayer.getBounds());
        if (game.flow === 'play') updateQuestion();
        else document.getElementById('question-text').innerText = "Toca un territorio para aprender";

    } catch (error) {
        console.error("Error cargando datos:", error);
        document.getElementById('question-text').innerText = "Error al cargar datos";
    }
}

function updateQuestion() {
    if (game.currentIndex >= game.questions.length) {
        document.getElementById('final-score').innerText = Math.round((game.score / game.questions.length) * 100);
        document.getElementById('modal-gameover').classList.remove('hidden');
        return;
    }

    const q = game.questions[game.currentIndex];
    const rawName = q.properties.nombre || q.properties.name || q.properties.NAM;
    const info = regionData[game.region][normalize(rawName)] || { cap: "???", flag: "none.png" };

    document.getElementById('game-progress').innerText = `${game.currentIndex + 1}/${game.questions.length}`;
    document.getElementById('game-accuracy').innerText = `${Math.round((game.score / (game.currentIndex || 1)) * 100)}%`;

    const qText = document.getElementById('question-text');
    const qCont = document.getElementById('question-content');
    qCont.innerHTML = "";

    if (game.mode === 'names') qText.innerText = `¿Dónde está ${rawName}?`;
    else if (game.mode === 'capitals') qText.innerText = `Busca el territorio de: ${info.cap}`;
    else if (game.mode === 'flags') {
        qText.innerText = "Busca esta bandera:";
        qCont.innerHTML = `<img src="flags/${info.flag}" height="60" style="border-radius:5px; margin-top:10px;">`;
    }
}

// Iniciar tema
document.body.className = `theme-${game.theme}`;
        if (id === 'go-play') { flow = 'play'; showScreen('screen-modes'); }
        if (id === 'back-to-start' || target.classList.contains('back-to-start')) { showScreen('screen-start'); }
        if (id === 'back-from-regions') { showScreen(flow === 'learn' ? 'screen-start' : 'screen-modes'); }
        if (id === 'btn-theme') { toggleTheme(); }
        if (id === 'show-achievements') { showRecords(); }
        if (id === 'resume-game') { isPaused = false; document.getElementById('modal-pause').classList.add('hidden'); }
        if (id === 'btn-pause') {
            if (flow === 'learn') location.reload();
            else { isPaused = true; document.getElementById('modal-pause').classList.remove('hidden'); }
        }
        
        // Cierres de modales
        if (target.classList.contains('close-modal') || target.classList.contains('btn-back-start')) {
            document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
        }

        // Selección de modo o región
        if (target.classList.contains('mode-sel')) { mode = target.dataset.mode; showScreen('screen-regions'); }
        if (target.classList.contains('reg-sel')) { startGame(target.dataset.region); }
    });

    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        applyTheme();
    }

    function applyTheme() {
        document.body.className = `theme-${theme}`;
        document.getElementById('theme-icon').className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // --- MOTOR DEL JUEGO ---
    async function startGame(regId) {
        region = regId; currentIndex = 0; score = 0; seconds = 0; isPaused = false;
        showScreen('screen-game');
        if (map) map.remove();

        map = L.map('map', { zoomControl: false }).setView([0,0], 2);
        const tileType = theme === 'light' ? 'light_all' : 'dark_all';
        L.tileLayer(`https://{s}.basemaps.cartocdn.com/${tileType}/{z}/{x}/{y}{r}.png`).addTo(map);

        const btnP = document.getElementById('btn-pause');
        if (flow === 'learn') {
            btnP.innerHTML = '<i class="fas fa-times"></i>';
            document.getElementById('hud-stats').style.display = 'none';
        } else {
            btnP.innerHTML = '<i class="fas fa-pause"></i>';
            document.getElementById('hud-stats').style.display = 'flex';
            startTimer();
        }

        try {
            const res = await fetch(`data/${region}.json`);
            const data = await res.json();
            questions = [...data.features].sort(() => Math.random() - 0.5);

            const geoLayer = L.geoJSON(data, {
                style: () => ({ color: theme === 'light' ? "#fff" : "#111", weight: 2, fillColor: `hsl(${Math.random()*360}, 60%, 80%)`, fillOpacity: 0.8 }),
                onEachFeature: (f, l) => l.on('click', (e) => handleMapClick(f, l, e))
            }).addTo(map);

            map.fitBounds(geoLayer.getBounds());
            if (flow === 'play') nextQuestion();
            else document.getElementById('question-text').innerText = "Toca un territorio para aprender";
        } catch(e) { console.error("Error cargando el JSON", e); }
    }

    function handleMapClick(f, l, e) {
        if (isPaused) return;
        const name = f.properties.nombre || f.properties.name || f.properties.NAM || "";
        const clean = normalize(name);
        const data = countriesData[region][clean] || { cap: "???", flag: "none.png" };

        if (flow === 'learn') {
            L.popup().setLatLng(e.latlng).setContent(`
                <div style="text-align:center;">
                    <b>${name}</b><br>Capital: ${data.cap}<br>
                    <img src="flags/${data.flag}" width="60" style="margin-top:5px" onerror="this.style.display='none'">
                </div>
            `).openOn(map);
            return;
        }

        const target = normalize(questions[currentIndex].properties.nombre || questions[currentIndex].properties.name || questions[currentIndex].properties.NAM);
        if (clean === target) {
            score++;
            l.setStyle({ fillColor: '#a8e6cf', fillOpacity: 1 });
        } else {
            l.setStyle({ fillColor: '#ffaaa5', fillOpacity: 1 });
        }

        setTimeout(() => {
            l.setStyle({ fillOpacity: 0.8 });
            currentIndex++;
            nextQuestion();
        }, 600);
    }

    function nextQuestion() {
        if (currentIndex >= questions.length) { finish(); return; }
        const q = questions[currentIndex];
        const raw = q.properties.nombre || q.properties.name || q.properties.NAM;
        const data = countriesData[region][normalize(raw)] || { cap: "???", flag: "none.png" };

        document.getElementById('game-progress').innerText = `${currentIndex+1}/${questions.length}`;
        document.getElementById('game-accuracy').innerText = `${Math.round((score/(currentIndex || 1))*100)}%`;

        const txt = document.getElementById('question-text');
        const cont = document.getElementById('question-content');
        cont.innerHTML = "";

        if (mode === 'names') txt.innerText = `¿Dónde está ${raw}?`;
        else if (mode === 'capitals') txt.innerText = `¿Qué territorio tiene capital: ${data.cap}?`;
        else {
            txt.innerText = "Busca este territorio:";
            cont.innerHTML = `<img src="flags/${data.flag}" height="80" style="border:3px solid white; border-radius:10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">`;
        }
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => { if (!isPaused) { seconds++; document.getElementById('timer-display').innerText = formatTime(seconds); } }, 1000);
    }

    function finish() {
        clearInterval(timerInterval);
        const pct = Math.round((score/questions.length)*100);
        document.getElementById('final-score').innerText = pct;
        document.getElementById('modal-gameover').classList.remove('hidden');

        if (pct === 100) {
            const cat = `${region}_${mode}`;
            if (!bestTimes[cat]) bestTimes[cat] = [];
            bestTimes[cat].push(seconds);
            bestTimes[cat].sort((a,b) => a-b);
            bestTimes[cat] = bestTimes[cat].slice(0, 10);
            localStorage.setItem('map_records', JSON.stringify(bestTimes));
        }
    }

    function showRecords() {
        const list = document.getElementById('achievements-list');
        list.innerHTML = "";
        for (let cat in bestTimes) {
            const div = document.createElement('div');
            div.style.marginBottom = "15px";
            div.innerHTML = `<strong>${cat.replace('_', ' ').toUpperCase()}</strong>`;
            const table = document.createElement('table');
            table.className = "records-table";
            bestTimes[cat].forEach((t, i) => { table.innerHTML += `<tr><td>#${i+1}</td><td>${formatTime(t)}</td></tr>`; });
            div.appendChild(table);
            list.appendChild(div);
        }
        document.getElementById('modal-achievements').classList.remove('hidden');
    }

    applyTheme();
});
            "amapa": { cap: "Macapá", flag: "br-amapa.png" }, "amazonas": { cap: "Manaus", flag: "br-amazonas.png" },
            "bahia": { cap: "Salvador", flag: "br-bahia.png" }, "ceara": { cap: "Fortaleza", flag: "br-ceara.png" },
            "distrito federal": { cap: "Brasília", flag: "br-df.png" }, "espirito santo": { cap: "Vitória", flag: "br-es.png" },
            "goias": { cap: "Goiânia", flag: "br-goias.png" }, "maranhao": { cap: "São Luís", flag: "br-maranhao.png" },
            "mato grosso": { cap: "Cuiabá", flag: "br-matogrosso.png" }, "mato grosso do sul": { cap: "Campo Grande", flag: "br-matogrossodosul.png" },
            "minas gerais": { cap: "Belo Horizonte", flag: "br-minasgerais.png" }, "para": { cap: "Belém", flag: "br-para.png" },
            "paraiba": { cap: "João Pessoa", flag: "br-paraiba.png" }, "parana": { cap: "Curitiba", flag: "br-parana.png" },
            "pernambuco": { cap: "Recife", flag: "br-pernambuco.png" }, "piaui": { cap: "Teresina", flag: "br-piaui.png" },
            "rio de janeiro": { cap: "Rio de Janeiro", flag: "br-rio.png" }, "rio grande do norte": { cap: "Natal", flag: "br-rgn.png" },
            "rio grande do sul": { cap: "Porto Alegre", flag: "br-rgs.png" }, "rondonia": { cap: "Porto Velho", flag: "br-rondonia.png" },
            "roraima": { cap: "Boa Vista", flag: "br-roraima.png" }, "santa catarina": { cap: "Florianópolis", flag: "br-santacatarina.png" },
            "sao paulo": { cap: "São Paulo", flag: "br-saopaulo.png" }, "sergipe": { cap: "Aracaju", flag: "br-sergipe.png" },
            "tocantins": { cap: "Palmas", flag: "br-tocantins.png" }
        },
        ca: {
            "alberta": { cap: "Edmonton", flag: "ca-alberta.png" }, "british columbia": { cap: "Victoria", flag: "ca-bc.png" },
            "manitoba": { cap: "Winnipeg", flag: "ca-manitoba.png" }, "new brunswick": { cap: "Fredericton", flag: "ca-newbrunswick.png" },
            "newfoundland and labrador": { cap: "St. John's", flag: "ca-newfoundland.png" }, "nova scotia": { cap: "Halifax", flag: "ca-novascotia.png" },
            "ontario": { cap: "Toronto", flag: "ca-ontario.png" }, "prince edward island": { cap: "Charlottetown", flag: "ca-pei.png" },
            "quebec": { cap: "Quebec City", flag: "ca-quebec.png" }, "saskatchewan": { cap: "Regina", flag: "ca-saskatchewan.png" },
            "northwest territories": { cap: "Yellowknife", flag: "ca-nwt.png" }, "nunavut": { cap: "Iqaluit", flag: "ca-nunavut.png" }, "yukon": { cap: "Whitehorse", flag: "ca-yukon.png" }
        }
    };

    function normalize(s) {
        if (!s) return "";
        return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/province of |territory of |estado de /g, "").split(",")[0].trim();
    }

    function formatTime(s) {
        const m = Math.floor(s/60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // NAVEGACIÓN
    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        document.getElementById(id).classList.remove('hidden');
    }

    // EVENTOS (CENTRALIZADOS)
    document.getElementById('go-learn').onclick = () => { flow = 'learn'; showScreen('screen-regions'); };
    document.getElementById('go-play').onclick = () => { flow = 'play'; showScreen('screen-modes'); };
    document.querySelectorAll('.back-to-start').forEach(b => b.onclick = () => showScreen('screen-start'));
    document.getElementById('back-from-regions').onclick = () => showScreen(flow === 'learn' ? 'screen-start' : 'screen-modes');
    document.getElementById('btn-theme').onclick = toggleTheme;
    document.getElementById('show-achievements').onclick = showRecords;
    document.querySelectorAll('.close-modal').forEach(b => b.onclick = () => document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden')));

    document.querySelectorAll('.mode-sel').forEach(b => {
        b.onclick = () => { mode = b.dataset.mode; showScreen('screen-regions'); };
    });

    document.querySelectorAll('.reg-sel').forEach(b => {
        b.onclick = () => startGame(b.dataset.region);
    });

    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        applyTheme();
    }

    function applyTheme() {
        document.body.className = `theme-${theme}`;
        document.getElementById('theme-icon').className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // JUEGO
    async function startGame(regId) {
        region = regId; currentIndex = 0; score = 0; seconds = 0;
        showScreen('screen-game');
        if (map) map.remove();

        map = L.map('map', { zoomControl: false }).setView([0,0], 2);
        const tile = theme === 'light' ? 'light_all' : 'dark_all';
        L.tileLayer(`https://{s}.basemaps.cartocdn.com/${tile}/{z}/{x}/{y}{r}.png`).addTo(map);

        const btnP = document.getElementById('btn-pause');
        if (flow === 'learn') {
            btnP.innerHTML = '<i class="fas fa-times"></i>';
            btnP.onclick = () => location.reload();
            document.getElementById('hud-stats').style.display = 'none';
        } else {
            btnP.innerHTML = '<i class="fas fa-pause"></i>';
            btnP.onclick = () => { isPaused = true; document.getElementById('modal-pause').classList.remove('hidden'); };
            document.getElementById('hud-stats').style.display = 'flex';
            startTimer();
        }

        try {
            const res = await fetch(`data/${region}.json`);
            const data = await res.json();
            questions = [...data.features].sort(() => Math.random() - 0.5);

            const geoLayer = L.geoJSON(data, {
                style: () => ({ color: "#444", weight: 1.5, fillColor: `hsl(${Math.random()*360}, 60%, 80%)`, fillOpacity: 0.8 }),
                onEachFeature: (f, l) => l.on('click', (e) => handleMapClick(f, l, e))
            }).addTo(map);

            map.fitBounds(geoLayer.getBounds());
            if (flow === 'play') nextQuestion();
            else document.getElementById('question-text').innerText = "Toca un territorio para aprender";
        } catch(e) { alert("Error cargando mapas"); }
    }

    function handleMapClick(f, l, e) {
        if (isPaused) return;
        const name = f.properties.nombre || f.properties.name || f.properties.NAM || "";
        const clean = normalize(name);
        const data = countriesData[region][clean] || { cap: "???", flag: "none.png" };

        if (flow === 'learn') {
            L.popup().setLatLng(e.latlng).setContent(`<b>${name}</b><br>Capital: ${data.cap}<br><img src="flags/${data.flag}" width="50">`).openOn(map);
            return;
        }

        const target = normalize(questions[currentIndex].properties.nombre || questions[currentIndex].properties.name || questions[currentIndex].properties.NAM);
        if (clean === target) {
            score++;
            l.setStyle({ fillColor: '#a8e6cf', fillOpacity: 1 });
        } else {
            l.setStyle({ fillColor: '#ffaaa5', fillOpacity: 1 });
        }

        setTimeout(() => {
            l.setStyle({ fillOpacity: 0.8 });
            currentIndex++;
            nextQuestion();
        }, 600);
    }

    function nextQuestion() {
        if (currentIndex >= questions.length) { finish(); return; }
        const q = questions[currentIndex];
        const raw = q.properties.nombre || q.properties.name || q.properties.NAM;
        const data = countriesData[region][normalize(raw)] || { cap: "???", flag: "none.png" };

        document.getElementById('game-progress').innerText = `${currentIndex+1}/${questions.length}`;
        document.getElementById('game-accuracy').innerText = `${Math.round((score/(currentIndex || 1))*100)}%`;

        const txt = document.getElementById('question-text');
        const cont = document.getElementById('question-content');
        cont.innerHTML = "";

        if (mode === 'names') txt.innerText = `¿Dónde está ${raw}?`;
        else if (mode === 'capitals') txt.innerText = `¿Capital: ${data.cap}?`;
        else {
            txt.innerText = "";
            cont.innerHTML = `<img src="flags/${data.flag}" height="70">`;
        }
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (!isPaused) {
                seconds++;
                document.getElementById('timer-display').innerText = formatTime(seconds);
            }
        }, 1000);
    }

    function finish() {
        clearInterval(timerInterval);
        const pct = Math.round((score/questions.length)*100);
        document.getElementById('final-score').innerText = pct;
        document.getElementById('modal-gameover').classList.remove('hidden');

        if (pct === 100) {
            const cat = `${region}_${mode}`;
            if (!bestTimes[cat]) bestTimes[cat] = [];
            bestTimes[cat].push(seconds);
            bestTimes[cat].sort((a,b) => a-b);
            bestTimes[cat] = bestTimes[cat].slice(0, 10);
            localStorage.setItem('map_records', JSON.stringify(bestTimes));
        }
    }

    function showRecords() {
        const list = document.getElementById('achievements-list');
        list.innerHTML = "";
        for (let cat in bestTimes) {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${cat.replace('_', ' ').toUpperCase()}</strong>`;
            const table = document.createElement('table');
            table.className = "records-table";
            bestTimes[cat].forEach((t, i) => {
                table.innerHTML += `<tr><td>#${i+1}</td><td>${formatTime(t)}</td></tr>`;
            });
            div.appendChild(table);
            list.appendChild(div);
        }
        document.getElementById('modal-achievements').classList.remove('hidden');
    }

    document.getElementById('resume-game').onclick = () => { isPaused = false; document.getElementById('modal-pause').classList.add('hidden'); };

    applyTheme();
});
            "amapa": { cap: "Macapá", flag: "br-amapa.png" }, "amazonas": { cap: "Manaus", flag: "br-amazonas.png" },
            "bahia": { cap: "Salvador", flag: "br-bahia.png" }, "ceara": { cap: "Fortaleza", flag: "br-ceara.png" },
            "distrito federal": { cap: "Brasília", flag: "br-df.png" }, "espirito santo": { cap: "Vitória", flag: "br-es.png" },
            "goias": { cap: "Goiânia", flag: "br-goias.png" }, "maranhao": { cap: "São Luís", flag: "br-maranhao.png" },
            "mato grosso": { cap: "Cuiabá", flag: "br-matogrosso.png" }, "mato grosso do sul": { cap: "Campo Grande", flag: "br-matogrossodosul.png" },
            "minas gerais": { cap: "Belo Horizonte", flag: "br-minasgerais.png" }, "para": { cap: "Belém", flag: "br-para.png" },
            "paraiba": { cap: "João Pessoa", flag: "br-paraiba.png" }, "parana": { cap: "Curitiba", flag: "br-parana.png" },
            "pernambuco": { cap: "Recife", flag: "br-pernambuco.png" }, "piaui": { cap: "Teresina", flag: "br-piaui.png" },
            "rio de janeiro": { cap: "Rio de Janeiro", flag: "br-rio.png" }, "rio grande do norte": { cap: "Natal", flag: "br-rgn.png" },
            "rio grande do sul": { cap: "Porto Alegre", flag: "br-rgs.png" }, "rondonia": { cap: "Porto Velho", flag: "br-rondonia.png" },
            "roraima": { cap: "Boa Vista", flag: "br-roraima.png" }, "santa catarina": { cap: "Florianópolis", flag: "br-santacatarina.png" },
            "sao paulo": { cap: "São Paulo", flag: "br-saopaulo.png" }, "sergipe": { cap: "Aracaju", flag: "br-sergipe.png" },
            "tocantins": { cap: "Palmas", flag: "br-tocantins.png" }
        },
        ca: {
            "alberta": { cap: "Edmonton", flag: "ca-alberta.png" }, "british columbia": { cap: "Victoria", flag: "ca-bc.png" },
            "manitoba": { cap: "Winnipeg", flag: "ca-manitoba.png" }, "new brunswick": { cap: "Fredericton", flag: "ca-newbrunswick.png" },
            "newfoundland and labrador": { cap: "St. John's", flag: "ca-newfoundland.png" }, "nova scotia": { cap: "Halifax", flag: "ca-novascotia.png" },
            "ontario": { cap: "Toronto", flag: "ca-ontario.png" }, "prince edward island": { cap: "Charlottetown", flag: "ca-pei.png" },
            "quebec": { cap: "Quebec City", flag: "ca-quebec.png" }, "saskatchewan": { cap: "Regina", flag: "ca-saskatchewan.png" },
            "northwest territories": { cap: "Yellowknife", flag: "ca-nwt.png" }, "nunavut": { cap: "Iqaluit", flag: "ca-nunavut.png" }, "yukon": { cap: "Whitehorse", flag: "ca-yukon.png" }
        }
    };

    function normalize(s) {
        if (!s) return "";
        return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/province of |territory of |estado de /g, "").split(",")[0].trim();
    }

    function formatTime(s) {
        const m = Math.floor(s/60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // NAVEGACIÓN
    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        document.getElementById(id).classList.remove('hidden');
    }

    // EVENTOS (CENTRALIZADOS)
    document.getElementById('go-learn').onclick = () => { flow = 'learn'; showScreen('screen-regions'); };
    document.getElementById('go-play').onclick = () => { flow = 'play'; showScreen('screen-modes'); };
    document.querySelectorAll('.back-to-start').forEach(b => b.onclick = () => showScreen('screen-start'));
    document.getElementById('back-from-regions').onclick = () => showScreen(flow === 'learn' ? 'screen-start' : 'screen-modes');
    document.getElementById('btn-theme').onclick = toggleTheme;
    document.getElementById('show-achievements').onclick = showRecords;
    document.querySelectorAll('.close-modal').forEach(b => b.onclick = () => document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden')));

    document.querySelectorAll('.mode-sel').forEach(b => {
        b.onclick = () => { mode = b.dataset.mode; showScreen('screen-regions'); };
    });

    document.querySelectorAll('.reg-sel').forEach(b => {
        b.onclick = () => startGame(b.dataset.region);
    });

    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        applyTheme();
    }

    function applyTheme() {
        document.body.className = `theme-${theme}`;
        document.getElementById('theme-icon').className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // JUEGO
    async function startGame(regId) {
        region = regId; currentIndex = 0; score = 0; seconds = 0;
        showScreen('screen-game');
        if (map) map.remove();

        map = L.map('map', { zoomControl: false }).setView([0,0], 2);
        const tile = theme === 'light' ? 'light_all' : 'dark_all';
        L.tileLayer(`https://{s}.basemaps.cartocdn.com/${tile}/{z}/{x}/{y}{r}.png`).addTo(map);

        const btnP = document.getElementById('btn-pause');
        if (flow === 'learn') {
            btnP.innerHTML = '<i class="fas fa-times"></i>';
            btnP.onclick = () => location.reload();
            document.getElementById('hud-stats').style.display = 'none';
        } else {
            btnP.innerHTML = '<i class="fas fa-pause"></i>';
            btnP.onclick = () => { isPaused = true; document.getElementById('modal-pause').classList.remove('hidden'); };
            document.getElementById('hud-stats').style.display = 'flex';
            startTimer();
        }

        try {
            const res = await fetch(`data/${region}.json`);
            const data = await res.json();
            questions = [...data.features].sort(() => Math.random() - 0.5);

            const geoLayer = L.geoJSON(data, {
                style: () => ({ color: "#444", weight: 1.5, fillColor: `hsl(${Math.random()*360}, 60%, 80%)`, fillOpacity: 0.8 }),
                onEachFeature: (f, l) => l.on('click', (e) => handleMapClick(f, l, e))
            }).addTo(map);

            map.fitBounds(geoLayer.getBounds());
            if (flow === 'play') nextQuestion();
            else document.getElementById('question-text').innerText = "Toca un territorio para aprender";
        } catch(e) { alert("Error cargando mapas"); }
    }

    function handleMapClick(f, l, e) {
        if (isPaused) return;
        const name = f.properties.nombre || f.properties.name || f.properties.NAM || "";
        const clean = normalize(name);
        const data = countriesData[region][clean] || { cap: "???", flag: "none.png" };

        if (flow === 'learn') {
            L.popup().setLatLng(e.latlng).setContent(`<b>${name}</b><br>Capital: ${data.cap}<br><img src="flags/${data.flag}" width="50">`).openOn(map);
            return;
        }

        const target = normalize(questions[currentIndex].properties.nombre || questions[currentIndex].properties.name || questions[currentIndex].properties.NAM);
        if (clean === target) {
            score++;
            l.setStyle({ fillColor: '#a8e6cf', fillOpacity: 1 });
        } else {
            l.setStyle({ fillColor: '#ffaaa5', fillOpacity: 1 });
        }

        setTimeout(() => {
            l.setStyle({ fillOpacity: 0.8 });
            currentIndex++;
            nextQuestion();
        }, 600);
    }

    function nextQuestion() {
        if (currentIndex >= questions.length) { finish(); return; }
        const q = questions[currentIndex];
        const raw = q.properties.nombre || q.properties.name || q.properties.NAM;
        const data = countriesData[region][normalize(raw)] || { cap: "???", flag: "none.png" };

        document.getElementById('game-progress').innerText = `${currentIndex+1}/${questions.length}`;
        document.getElementById('game-accuracy').innerText = `${Math.round((score/(currentIndex || 1))*100)}%`;

        const txt = document.getElementById('question-text');
        const cont = document.getElementById('question-content');
        cont.innerHTML = "";

        if (mode === 'names') txt.innerText = `¿Dónde está ${raw}?`;
        else if (mode === 'capitals') txt.innerText = `¿Capital: ${data.cap}?`;
        else {
            txt.innerText = "";
            cont.innerHTML = `<img src="flags/${data.flag}" height="70">`;
        }
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (!isPaused) {
                seconds++;
                document.getElementById('timer-display').innerText = formatTime(seconds);
            }
        }, 1000);
    }

    function finish() {
        clearInterval(timerInterval);
        const pct = Math.round((score/questions.length)*100);
        document.getElementById('final-score').innerText = pct;
        document.getElementById('modal-gameover').classList.remove('hidden');

        if (pct === 100) {
            const cat = `${region}_${mode}`;
            if (!bestTimes[cat]) bestTimes[cat] = [];
            bestTimes[cat].push(seconds);
            bestTimes[cat].sort((a,b) => a-b);
            bestTimes[cat] = bestTimes[cat].slice(0, 10);
            localStorage.setItem('map_records', JSON.stringify(bestTimes));
        }
    }

    function showRecords() {
        const list = document.getElementById('achievements-list');
        list.innerHTML = "";
        for (let cat in bestTimes) {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${cat.replace('_', ' ').toUpperCase()}</strong>`;
            const table = document.createElement('table');
            table.className = "records-table";
            bestTimes[cat].forEach((t, i) => {
                table.innerHTML += `<tr><td>#${i+1}</td><td>${formatTime(t)}</td></tr>`;
            });
            div.appendChild(table);
            list.appendChild(div);
        }
        document.getElementById('modal-achievements').classList.remove('hidden');
    }

    document.getElementById('resume-game').onclick = () => { isPaused = false; document.getElementById('modal-pause').classList.add('hidden'); };

    applyTheme();
});
            "amapa": { cap: "Macapá", flag: "br-amapa.png" }, "amazonas": { cap: "Manaus", flag: "br-amazonas.png" },
            "bahia": { cap: "Salvador", flag: "br-bahia.png" }, "ceara": { cap: "Fortaleza", flag: "br-ceara.png" },
            "distrito federal": { cap: "Brasília", flag: "br-df.png" }, "espirito santo": { cap: "Vitória", flag: "br-es.png" },
            "goias": { cap: "Goiânia", flag: "br-goias.png" }, "maranhao": { cap: "São Luís", flag: "br-maranhao.png" },
            "mato grosso": { cap: "Cuiabá", flag: "br-matogrosso.png" }, "mato grosso do sul": { cap: "Campo Grande", flag: "br-matogrossodosul.png" },
            "minas gerais": { cap: "Belo Horizonte", flag: "br-minasgerais.png" }, "para": { cap: "Belém", flag: "br-para.png" },
            "paraiba": { cap: "João Pessoa", flag: "br-paraiba.png" }, "parana": { cap: "Curitiba", flag: "br-parana.png" },
            "pernambuco": { cap: "Recife", flag: "br-pernambuco.png" }, "piaui": { cap: "Teresina", flag: "br-piaui.png" },
            "rio de janeiro": { cap: "Rio de Janeiro", flag: "br-rio.png" }, "rio grande do norte": { cap: "Natal", flag: "br-rgn.png" },
            "rio grande do sul": { cap: "Porto Alegre", flag: "br-rgs.png" }, "rondonia": { cap: "Porto Velho", flag: "br-rondonia.png" },
            "roraima": { cap: "Boa Vista", flag: "br-roraima.png" }, "santa catarina": { cap: "Florianópolis", flag: "br-santacatarina.png" },
            "sao paulo": { cap: "São Paulo", flag: "br-saopaulo.png" }, "sergipe": { cap: "Aracaju", flag: "br-sergipe.png" },
            "tocantins": { cap: "Palmas", flag: "br-tocantins.png" }
        },
        ca: {
            "alberta": { cap: "Edmonton", flag: "ca-alberta.png" }, "british columbia": { cap: "Victoria", flag: "ca-bc.png" },
            "manitoba": { cap: "Winnipeg", flag: "ca-manitoba.png" }, "new brunswick": { cap: "Fredericton", flag: "ca-newbrunswick.png" },
            "newfoundland and labrador": { cap: "St. John's", flag: "ca-newfoundland.png" }, "nova scotia": { cap: "Halifax", flag: "ca-novascotia.png" },
            "ontario": { cap: "Toronto", flag: "ca-ontario.png" }, "prince edward island": { cap: "Charlottetown", flag: "ca-pei.png" },
            "quebec": { cap: "Quebec City", flag: "ca-quebec.png" }, "saskatchewan": { cap: "Regina", flag: "ca-saskatchewan.png" },
            "northwest territories": { cap: "Yellowknife", flag: "ca-nwt.png" }, "nunavut": { cap: "Iqaluit", flag: "ca-nunavut.png" }, "yukon": { cap: "Whitehorse", flag: "ca-yukon.png" }
        }
    };

    function normalize(s) {
        if (!s) return "";
        return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/province of |territory of |estado de /g, "").split(",")[0].trim();
    }

    function formatTime(s) {
        const m = Math.floor(s/60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // NAVEGACIÓN
    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        document.getElementById(id).classList.remove('hidden');
    }

    // EVENTOS (CENTRALIZADOS)
    document.getElementById('go-learn').onclick = () => { flow = 'learn'; showScreen('screen-regions'); };
    document.getElementById('go-play').onclick = () => { flow = 'play'; showScreen('screen-modes'); };
    document.querySelectorAll('.back-to-start').forEach(b => b.onclick = () => showScreen('screen-start'));
    document.getElementById('back-from-regions').onclick = () => showScreen(flow === 'learn' ? 'screen-start' : 'screen-modes');
    document.getElementById('btn-theme').onclick = toggleTheme;
    document.getElementById('show-achievements').onclick = showRecords;
    document.querySelectorAll('.close-modal').forEach(b => b.onclick = () => document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden')));

    document.querySelectorAll('.mode-sel').forEach(b => {
        b.onclick = () => { mode = b.dataset.mode; showScreen('screen-regions'); };
    });

    document.querySelectorAll('.reg-sel').forEach(b => {
        b.onclick = () => startGame(b.dataset.region);
    });

    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        applyTheme();
    }

    function applyTheme() {
        document.body.className = `theme-${theme}`;
        document.getElementById('theme-icon').className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // JUEGO
    async function startGame(regId) {
        region = regId; currentIndex = 0; score = 0; seconds = 0;
        showScreen('screen-game');
        if (map) map.remove();

        map = L.map('map', { zoomControl: false }).setView([0,0], 2);
        const tile = theme === 'light' ? 'light_all' : 'dark_all';
        L.tileLayer(`https://{s}.basemaps.cartocdn.com/${tile}/{z}/{x}/{y}{r}.png`).addTo(map);

        const btnP = document.getElementById('btn-pause');
        if (flow === 'learn') {
            btnP.innerHTML = '<i class="fas fa-times"></i>';
            btnP.onclick = () => location.reload();
            document.getElementById('hud-stats').style.display = 'none';
        } else {
            btnP.innerHTML = '<i class="fas fa-pause"></i>';
            btnP.onclick = () => { isPaused = true; document.getElementById('modal-pause').classList.remove('hidden'); };
            document.getElementById('hud-stats').style.display = 'flex';
            startTimer();
        }

        try {
            const res = await fetch(`data/${region}.json`);
            const data = await res.json();
            questions = [...data.features].sort(() => Math.random() - 0.5);

            const geoLayer = L.geoJSON(data, {
                style: () => ({ color: "#444", weight: 1.5, fillColor: `hsl(${Math.random()*360}, 60%, 80%)`, fillOpacity: 0.8 }),
                onEachFeature: (f, l) => l.on('click', (e) => handleMapClick(f, l, e))
            }).addTo(map);

            map.fitBounds(geoLayer.getBounds());
            if (flow === 'play') nextQuestion();
            else document.getElementById('question-text').innerText = "Toca un territorio para aprender";
        } catch(e) { alert("Error cargando mapas"); }
    }

    function handleMapClick(f, l, e) {
        if (isPaused) return;
        const name = f.properties.nombre || f.properties.name || f.properties.NAM || "";
        const clean = normalize(name);
        const data = countriesData[region][clean] || { cap: "???", flag: "none.png" };

        if (flow === 'learn') {
            L.popup().setLatLng(e.latlng).setContent(`<b>${name}</b><br>Capital: ${data.cap}<br><img src="flags/${data.flag}" width="50">`).openOn(map);
            return;
        }

        const target = normalize(questions[currentIndex].properties.nombre || questions[currentIndex].properties.name || questions[currentIndex].properties.NAM);
        if (clean === target) {
            score++;
            l.setStyle({ fillColor: '#a8e6cf', fillOpacity: 1 });
        } else {
            l.setStyle({ fillColor: '#ffaaa5', fillOpacity: 1 });
        }

        setTimeout(() => {
            l.setStyle({ fillOpacity: 0.8 });
            currentIndex++;
            nextQuestion();
        }, 600);
    }

    function nextQuestion() {
        if (currentIndex >= questions.length) { finish(); return; }
        const q = questions[currentIndex];
        const raw = q.properties.nombre || q.properties.name || q.properties.NAM;
        const data = countriesData[region][normalize(raw)] || { cap: "???", flag: "none.png" };

        document.getElementById('game-progress').innerText = `${currentIndex+1}/${questions.length}`;
        document.getElementById('game-accuracy').innerText = `${Math.round((score/(currentIndex || 1))*100)}%`;

        const txt = document.getElementById('question-text');
        const cont = document.getElementById('question-content');
        cont.innerHTML = "";

        if (mode === 'names') txt.innerText = `¿Dónde está ${raw}?`;
        else if (mode === 'capitals') txt.innerText = `¿Capital: ${data.cap}?`;
        else {
            txt.innerText = "";
            cont.innerHTML = `<img src="flags/${data.flag}" height="70">`;
        }
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (!isPaused) {
                seconds++;
                document.getElementById('timer-display').innerText = formatTime(seconds);
            }
        }, 1000);
    }

    function finish() {
        clearInterval(timerInterval);
        const pct = Math.round((score/questions.length)*100);
        document.getElementById('final-score').innerText = pct;
        document.getElementById('modal-gameover').classList.remove('hidden');

        if (pct === 100) {
            const cat = `${region}_${mode}`;
            if (!bestTimes[cat]) bestTimes[cat] = [];
            bestTimes[cat].push(seconds);
            bestTimes[cat].sort((a,b) => a-b);
            bestTimes[cat] = bestTimes[cat].slice(0, 10);
            localStorage.setItem('map_records', JSON.stringify(bestTimes));
        }
    }

    function showRecords() {
        const list = document.getElementById('achievements-list');
        list.innerHTML = "";
        for (let cat in bestTimes) {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${cat.replace('_', ' ').toUpperCase()}</strong>`;
            const table = document.createElement('table');
            table.className = "records-table";
            bestTimes[cat].forEach((t, i) => {
                table.innerHTML += `<tr><td>#${i+1}</td><td>${formatTime(t)}</td></tr>`;
            });
            div.appendChild(table);
            list.appendChild(div);
        }
        document.getElementById('modal-achievements').classList.remove('hidden');
    }

    document.getElementById('resume-game').onclick = () => { isPaused = false; document.getElementById('modal-pause').classList.add('hidden'); };

    applyTheme();
});
