// ===== DATOS DE LAS SERIES - AQUÍ AGREGAS TUS SERIES =====
const seriesData = {
    // EJEMPLO 1: Serie con 1 temporada
    'squidgame': {
        titulo: 'El Juego del Calamar',
        descripcion: 'Cientos de personas con problemas económicos aceptan una extraña invitación a un juego de supervivencia. Adentro, les espera un premio millonario, pero los participantes arriesgan su vida para ganarlo.',
        temporadas: {
            // SOLO 1 TEMPORADA
            1: [
                { capitulo: 1, titulo: 'Luz roja, luz verde', link_yt: 'https://www.youtube.com/embed/oqxAJKy0ii4' },
                { capitulo: 2, titulo: 'El infierno', link_yt: 'https://www.youtube.com/embed/oqxAJKy0ii4' },
                { capitulo: 3, titulo: 'El hombre del paraguas', link_yt: 'https://www.youtube.com/embed/oqxAJKy0ii4' }
                // Puedes agregar más capítulos aquí...
            ]
        }
    },
    
    // EJEMPLO 2: Serie con 2 temporadas
    'breakingbad': {
        titulo: 'Breaking Bad',
        descripcion: 'Un profesor de química de secundaria con cáncer terminal se asocia con un exalumno para asegurar el futuro de su familia fabricando y vendiendo metanfetamina.',
        temporadas: {
            // TEMPORADA 1
            1: [
                { capitulo: 1, titulo: 'Piloto', link_yt: 'https://www.youtube.com/embed/HhesaQXLuRY' },
                { capitulo: 2, titulo: "Cat's in the Bag...", link_yt: 'https://www.youtube.com/embed/HhesaQXLuRY' },
                { capitulo: 3, titulo: '...And the Bag\'s in the River', link_yt: 'https://www.youtube.com/embed/HhesaQXLuRY' }
            ],
            // TEMPORADA 2  
            2: [
                { capitulo: 1, titulo: 'Seven Thirty-Seven', link_yt: 'https://www.youtube.com/embed/HhesaQXLuRY' },
                { capitulo: 2, titulo: 'Grilled', link_yt: 'https://www.youtube.com/embed/HhesaQXLuRY' },
                { capitulo: 3, titulo: 'Bit by a Dead Bee', link_yt: 'https://www.youtube.com/embed/HhesaQXLuRY' }
            ]
        }
    }
    
    // PARA AGREGAR MÁS SERIES: Copia y pega una de arriba, cambia el nombre y los datos
};

// ===== SISTEMA DE FILTRADO ORIGINAL (TU CÓDIGO) =====
document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleccionar elementos
    const botones = document.querySelectorAll('.filtro-btn');
    const peliculas = document.querySelectorAll('.movie-card, .serie-card');

    // 2. Función para filtrar (¡NUEVA VERSIÓN!)
    function filtrarPeliculas(categoria) {
        peliculas.forEach(pelicula => {
            const categoriasPeli = pelicula.getAttribute('data-categoria');
            const mostrar = categoria === 'todas' || categoriasPeli === categoria;
            
            pelicula.style.display = mostrar ? 'block' : 'none';
        });
    }

    // 3. Event listeners para botones
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase 'activo' de todos los botones
            botones.forEach(btn => btn.classList.remove('activo'));
                
            // Añadir clase al botón clickeado
            this.classList.add('activo');
            
            // Filtrar
            const categoria = this.getAttribute('data-categoria');
            filtrarPeliculas(categoria);
        });
    });

    // 4. Mostrar todas al cargar la página
    const btnTodas = document.querySelector('.filtro-btn[data-categoria="todas"]');
    if (btnTodas) btnTodas.click();
});

// ===== SISTEMA DE SERIES =====

// Variable para saber qué serie está abierta
let serieActual = '';

/**
 * ABRIR MODAL DE SERIE - Se ejecuta al hacer click en una serie
 * @param {string} serieId - ID de la serie (ej: 'squidgame')
 */
function abrirModal(serieId) {
    serieActual = serieId;
    const serie = seriesData[serieId];
    
    // Actualizar título y descripción del modal
    document.getElementById('modal-titulo').textContent = serie.titulo;
    document.getElementById('modal-desc').textContent = serie.descripcion;
    
    // GENERAR BOTONES DE TEMPORADAS
    const tempBotones = document.getElementById('temporadas-botones');
    tempBotones.innerHTML = ''; // Limpiar botones anteriores
    
    // Crear un botón por cada temporada
    Object.keys(serie.temporadas).forEach(tempNum => {
        const boton = document.createElement('button');
        boton.className = 'temp-btn';
        boton.textContent = `Temporada ${tempNum}`;
        boton.onclick = () => cargarCapitulos(parseInt(tempNum));
        tempBotones.appendChild(boton);
    });
    
    // Cargar la primera temporada por defecto
    cargarCapitulos(1);
    
    // Mostrar el modal
    document.getElementById('serie-modal').style.display = 'block';
}
e
/**
 * CARGAR CAPÍTULOS - Muestra los capítulos de una temporada
 * @param {number} temporada - Número de temporada (1, 2, 3...)
 */
function cargarCapitulos(temporada) {
    const serie = seriesData[serieActual];
    const capitulos = serie.temporadas[temporada];
    const listaCapitulos = document.getElementById('capitulos-lista');
    
    // Limpiar lista anterior
    listaCapitulos.innerHTML = '';
    
    // Crear elemento por cada capítulo
    capitulos.forEach(cap => {
        const capItem = document.createElement('div');
        capItem.className = 'capitulo-item';
        capItem.innerHTML = `
            <h4>Capítulo ${cap.capitulo}: ${cap.titulo}</h4>
            <p>Duración: 45 min</p>
            <a href="${cap.link_yt}?autoplay=1&fs=1&rel=0&modestbranding=1&controls=1&playsinline=0" 
            class="boton" target="_blank">
            VER CAPÍTULO <i class="fas fa-play"></i>
            </a>
        `;
        listaCapitulos.appendChild(capItem);
    });
}

/**
 * CERRAR MODAL - Se ejecuta al hacer click en la X
 */
function cerrarModal() {
    document.getElementById('serie-modal').style.display = 'none';
}

// Cerrar modal si se hace click fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('serie-modal');
    if (event.target === modal) {
        cerrarModal();
    }
}

// ===== CÓMO AGREGAR MÁS SERIES - INSTRUCCIONES =====
/*
PARA AGREGAR UNA NUEVA SERIE:

1. En el objeto seriesData, agrega una nueva propiedad:

'nombre_unico': {
    titulo: 'Título de la serie',
    descripcion: 'Descripción de la serie...',
    temporadas: {
        1: [ // TEMPORADA 1
            { capitulo: 1, titulo: 'Nombre capítulo 1', link_yt: 'link_youtube' },
            { capitulo: 2, titulo: 'Nombre capítulo 2', link_yt: 'link_youtube' }
        ],
        2: [ // TEMPORADA 2 (opcional)
            { capitulo: 1, titulo: 'Nombre capítulo 1', link_yt: 'link_youtube' }
        ]
    }
}

2. En el HTML, agrega una nueva tarjeta:

<div class="serie-card" data-categoria="series" onclick="abrirModal('nombre_unico')">
    <img src="url_portada" class="movie-poster">
    <h3 class="movie-title">Título Serie</h3>
    <button class="boton-serie">VER SERIE <i class="fas fa-play"></i></button>
</div>

¡Y LISTO!
*/

console.log('✅ Sistema de series cargado correctamente');
console.log('📺 Series disponibles:', Object.keys(seriesData));