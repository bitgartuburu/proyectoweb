// --- Búsqueda en el índice ---
const searchInput = document.querySelector('.search-input'); 
const searchForm = document.querySelector('.busqueda'); 
const contentContainer = document.querySelector('#indice');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        performSearch(searchTerm);
    } else {
        clearHighlights();
    }
});

function clearHighlights() {
    const highlights = contentContainer.querySelectorAll('mark'); 
    highlights.forEach(mark => {
        mark.replaceWith(...mark.childNodes);
    });
}

function performSearch(term) {
    clearHighlights();
    if (!term) return; 
    const regex = new RegExp(term, 'gi');
    let htmlContent = contentContainer.innerHTML;
    let newHtmlContent = htmlContent.replace(regex, '<mark>$&</mark>');
    contentContainer.innerHTML = newHtmlContent;
}

// --- Selección de proyecto desde el índice ---
let proyectoSeleccionado = null;
const indiceLinks = document.querySelectorAll("#indice a");

indiceLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // evita que navegue
    proyectoSeleccionado = link.dataset.proyecto; // ej: "practica1"
    console.log("Proyecto seleccionado:", proyectoSeleccionado);

    // feedback visual opcional
    indiceLinks.forEach(l => l.classList.remove("activo"));
    link.classList.add("activo");
  });
});

// --- Botones de pestañas ---
const buttons = document.querySelectorAll('.barramenus button');
const cuerpo = document.getElementById('cuerpo');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!proyectoSeleccionado) {
      alert("Primero selecciona un proyecto del índice.");
      return;
    }
    const tab = btn.dataset.tab;
    cargarProyecto(tab, proyectoSeleccionado);
  });
});

// --- Función principal para cargar contenido ---
async function cargarProyecto(tab, nombreProyecto) {
  try {
    const manifestResponse = await fetch(`proyectos/${nombreProyecto}/manifest.json`);
    const manifest = await manifestResponse.json();

    if (tab === "descripcion") {
      const descResponse = await fetch(`proyectos/${nombreProyecto}/${manifest.descripcion}`);
      const descText = await descResponse.text();
      cuerpo.innerHTML = `<h3>Descripción</h3><p>${descText}</p>`;
    } 
    else if (tab === "pagina") {
      cuerpo.innerHTML = `
        <iframe src="proyectos/${nombreProyecto}/${manifest.html[0]}" 
                width="100%" height="400" style="border:none;"></iframe>
      `;
    } 
    else if (tab === "codigo") {
      let htmlBlocks = "";
      for (const file of manifest.html) {
        const res = await fetch(`proyectos/${nombreProyecto}/${file}`);
        const text = await res.text();
        htmlBlocks += `<h3>${file}</h3><pre><code>${escapeHtml(text)}</code></pre>`;
      }

      let cssBlocks = "";
      for (const file of manifest.css) {
        const res = await fetch(`proyectos/${nombreProyecto}/css/${file}`);
        const text = await res.text();
        cssBlocks += `<h3>${file}</h3><pre><code>${escapeHtml(text)}</code></pre>`;
      }

      cuerpo.innerHTML = htmlBlocks + cssBlocks;
    }
  } catch (error) {
    cuerpo.innerHTML = "<p>Error al cargar el proyecto.</p>";
    console.error(error);
  }
}

// --- Escapar HTML para mostrar código sin ejecutarlo ---
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;");
}
