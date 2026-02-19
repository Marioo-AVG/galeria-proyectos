const supabaseUrl = "https://bfrzjndxobcqsrmrgfem.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcnpqbmR4b2JjcXNybXJnZmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMTk2NDAsImV4cCI6MjA4Njg5NTY0MH0.hZbabns-DljF35Hm5zzf3w9Zaai0yzaH6SSXmxYnW9I";
const db = supabase.createClient(supabaseUrl, supabaseKey);

async function cargarProyectos() {
    const { data, error } = await db
        .from("proyectos")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error("Error cargando proyectos:", error);
        return;
    }

    data.forEach(proyecto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("Tarjeta-proyecto");

    tarjeta.innerHTML = `
    <div class="imagen-proyecto">
        <img src="${proyecto.imagen_url}" alt="${proyecto.titulo}">
    </div>

    <div class="contenido-proyecto">
        <h3 class="Titulo">${proyecto.titulo}</h3>
        <p class="autor"><strong>Alumno:</strong> ${proyecto.alumno}</p>
        <p class="Descripcion-p">${proyecto.descripcion || ""}</p>
        <span class="Fecha">Curso: ${proyecto.curso}º Primaria</span>

        ${proyecto.scratch_url ? `
    <button class="boton-descargar" onclick="descargarScratch('${proyecto.scratch_url}')">
        Descargar proyecto Scratch
    </button>
` : ""}

    </div>
`;


    const contenedor = document.getElementById(`lista-curso${proyecto.curso}`);
    if (contenedor) contenedor.appendChild(tarjeta);
});
}
cargarProyectos();

function descargarScratch(url){
        const clave = prompt("Introduce una contraseña para descargar el proyecto:");
        if(clave === "5562"){
            window.location.href = url;
        } else {
            alert("Contraseña Invalida");
        }

    }


