// --- CONFIGURACIÓN DE LOS MAPAS ---
const mapsConfig = {
    'tucuman': {
        title: 'Tucumán',
        file: 'departamentos-tucuman.json',
        // Nombres de propiedades EXACTOS como aparecen en el GeoJSON
        nameProp: 'departamento',  // Para el nombre del departamento
        cabeceraProp: 'cabecera',  // Para el modo ciudad cabecera
        regions: [ // Lista para calcular progreso (17 departamentos)
            "BURRUYACU", "CAPITAL", "CHICLIGASTA", "CRUZ ALTA", "FAMAILLA", 
            "GRANEROS", "JUAN BAUTISTA ALBERDI", "LA COCHA", "LEALES", 
            "LULES", "MONTEROS", "RIO CHICO", "SIMOCA", "TAFI DEL VALLE", 
            "TAFI VIEJO", "TRANCAS", "YERBA BUENA"
        ]
    },
    'santa-catarina': {
        title: 'Santa Catarina',
        file: 'br-sc.geojson', // Nombre corregido (sin .txt)
        nameProp: 'nome_rgi',  // Según snippet: nome_rgi
        cabeceraProp: 'nome_rgi', // En regiones inmediatas, la cabecera suele ser el mismo nombre
        regions: [ // Las 24 Regiones Inmediatas de SC actualizadas
            "Florianópolis", "Criciúma", "Tubarão", "Araranguá", "Blumenau", "Brusque", 
            "Itajaí", "Rio do Sul", "Ibirama - Presidente Getúlio", "Ituporanga", "Joinville", 
            "São Bento do Sul - Rio Negrinho", "Mafra", "Canoinhas", "Chapecó", 
            "Joaçaba - Herval d'Oeste", "Videira", "Concórdia", "Xanxerê", 
            "São Miguel do Oeste", "Maravilha", "São Lourenço do Oeste", "Lages", "Curitibanos"
        ]
    },
    'british-columbia': {
        title: 'British Columbia',
        file: 'ca-bc.json',
        nameProp: 'CDNAME', // Ajusta esto según tu archivo de BC (CDNAME o CDUID)
        cabeceraProp: null, // Si no tienes cabeceras para BC, pon null
        regions: [] // Rellena si quieres validación exacta
    }
};

// --- VARIABLES DE ESTADO ---
let map, geojsonLayer;
let currentMapId = null;
let currentMode = 'nombres'; // 'nombres' o 'cabeceras'
let pendingRegions = [];
let targetFeature = null;
let correctCount = 0;
let totalCount = 0;

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    generarMenu();
});

function generarMenu() {
    const grid = document.querySelector('.grid-mapas');
    grid.innerHTML = '';

    for (const [key, config] of Object.entries(mapsConfig)) {
        // Verificar logros guardados
        const logroNombres = localStorage.getItem(`logro_${key}_nombres`) === 'true';
        const logroCabeceras = localStorage.getItem(`logro_${key}_cabeceras`) === 'true';

        const card = document.createElement('div');
        card.className = 'card-mapa';
        card.onclick = () => abrirModalModo(key);
        card.innerHTML = `
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
