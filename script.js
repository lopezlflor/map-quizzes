document.addEventListener('DOMContentLoaded', () => {
    // ESTADO
    let flow = '', mode = '', region = '', questions = [], currentIndex = 0, score = 0, map = null, isPaused = false;
    let theme = localStorage.getItem('theme') || 'light';
    let timerInterval = null, seconds = 0;
    let bestTimes = JSON.parse(localStorage.getItem('map_records')) || {};

    const countriesData = {
        ar: {
            "buenos aires": { cap: "La Plata", flag: "ar-buenosaires.png" },
            "caba": { cap: "C.A.B.A", flag: "ar-caba.png" },
            "catamarca": { cap: "Catamarca", flag: "ar-catamarca.png" },
            "chaco": { cap: "Resistencia", flag: "ar-chaco.png" },
            "chubut": { cap: "Rawson", flag: "ar-chubut.png" },
            "cordoba": { cap: "Córdoba", flag: "ar-cordoba.png" },
            "corrientes": { cap: "Corrientes", flag: "ar-corrientes.png" },
            "entre rios": { cap: "Paraná", flag: "ar-entrerios.png" },
            "formosa": { cap: "Formosa", flag: "ar-formosa.png" },
            "jujuy": { cap: "S.S. de Jujuy", flag: "ar-jujuy.png" },
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
            "santiago del estero": { cap: "Sgo. del Estero", flag: "ar-santiago.png" },
            "tierra del fuego": { cap: "Ushuaia", flag: "ar-tierra.png" },
            "tucuman": { cap: "S.M. de Tucumán", flag: "ar-tucuman.png" }
        },
        br: {
            "acre": { cap: "Rio Branco", flag: "br-acre.png" }, "alagoas": { cap: "Maceió", flag: "br-alagoas.png" },
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
