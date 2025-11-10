// busqueda.js

// 1. Elementos que ya seleccionaste (Input y Formulario)
const searchInput = document.querySelector('.search-input'); 
const searchForm = document.querySelector('.busqueda'); 

// **NUEVO:** Seleccionamos el contenedor de todo el contenido
const contentContainer = document.querySelector('#indice');


searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const searchTerm = searchInput.value.trim(); // .trim() quita espacios innecesarios
    
    // Solo buscamos si hay un término
    if (searchTerm) {
        performSearch(searchTerm);
    } else {
        // Si el usuario borra el texto, quitamos los resaltados
        clearHighlights();
    }
});

// --- Funciones de Lógica de Búsqueda ---

// Función para limpiar cualquier resaltado (<mark>) anterior
function clearHighlights() {
    // 1. Buscamos todas las etiquetas <mark> que existen actualmente
    const highlights = contentContainer.querySelectorAll('mark'); 
    
    // 2. Iteramos sobre cada una para "deshacer" el resaltado
    highlights.forEach(mark => {
        // Reemplazamos la etiqueta <mark> con solo su contenido de texto.
        mark.replaceWith(...mark.childNodes);
    });
}


// Función principal para buscar y resaltar
function performSearch(term) {
    // 1. Limpiamos cualquier resultado anterior para empezar de cero
    clearHighlights();
    
    // Si el término de búsqueda es vacío, simplemente salimos de la función
    if (!term) return; 

    // 2. Usamos una expresión regular para encontrar todas las coincidencias
    // 'gi' significa Global (encuentra TODAS las coincidencias) e Insensible (no distingue mayúsculas/minúsculas).
    const regex = new RegExp(term, 'gi');
    
    // 3. Obtenemos el HTML completo de la zona de búsqueda
    let htmlContent = contentContainer.innerHTML;

    // 4. Usamos .replace() para reemplazar CADA coincidencia (el texto) 
    // con ese mismo texto envuelto en la etiqueta <mark>.
    // La variable '$&' en el reemplazo significa "el texto que acaba de coincidir".
    let newHtmlContent = htmlContent.replace(regex, '<mark>$&</mark>');

    // 5. Reemplazamos el contenido original de la página con el nuevo HTML resaltado
    contentContainer.innerHTML = newHtmlContent;
}

const buttons = document.querySelectorAll('.barramenus button');
const cuerpo = document.getElementById('cuerpo');

buttons.forEach(btn => {
  btn.addEventListener('click', async () => { // Se añade la etiqueta asyc para que se ejecute de forma asincrona (de este modo espera a que se ejecuten los otros procesos y evita bugs)
    const tab = btn.dataset.tab;

    if (tab === "descripcion") {
      cuerpo.innerHTML = "<h3>Descripción</h3><p>Este proyecto tiene como objetivo...</p>";
    } 
    else if (tab === "pagina") {
      cuerpo.innerHTML = '<iframe src="proyectos/practica1/practica1.html" width="100%" height="400"></iframe>';
    } 
   else if (tab === "codigo") {
      // Usamos fetch para traer el código fuente
      try {
        const htmlResponse = await fetch("proyectos/practica1/practica1.html");
        const htmlText = await htmlResponse.text();

        const cssResponse = await fetch("proyectos/practica1/css/estilo.css");
        const cssText = await cssResponse.text();

        cuerpo.innerHTML = `
          <h3>Código HTML</h3>
          <pre><code>${escapeHtml(htmlText)}</code></pre>
          <h3>Código CSS</h3>
          <pre><code>${escapeHtml(cssText)}</code></pre>
        `;
      } catch (error) {
        cuerpo.innerHTML = "<p>Error al cargar el código.</p>";
      }
    }
  });
});

// Función para escapar caracteres especiales y que el código se muestre bien
function escapeHtml(text) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}