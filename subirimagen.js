// Datos de supabase
const supabaseUrl = "https://bfrzjndxobcqsrmrgfem.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcnpqbmR4b2JjcXNybXJnZmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMTk2NDAsImV4cCI6MjA4Njg5NTY0MH0.hZbabns-DljF35Hm5zzf3w9Zaai0yzaH6SSXmxYnW9I";
const db = supabase.createClient(supabaseUrl, supabaseKey);

// Subir imagen
async function subirImagen(file) {
    const nombre = `${Date.now()}_${file.name}`;

    const { error } = await db.storage
        .from("proyectos")
        .upload(nombre, file);

    if (error) {
        alert("Error subiendo imagen");
        console.error(error);
        return null;
    }

    const { data: urlData } = db.storage
        .from("proyectos")
        .getPublicUrl(nombre);

    return urlData.publicUrl;
}

// Subir proyecto de Scratch
async function subirScratch(file) {
    if (!file) return null;

    const nombre = `${Date.now()}_${file.name}`;

    const { error } = await db.storage
        .from("scratch")
        .upload(nombre, file);

    if (error) {
        console.error("Error subiendo Scratch:", error);
        return null;
    }

    const { data } = db.storage
        .from("scratch")
        .getPublicUrl(nombre);

    return data.publicUrl;
}



// Guardar proyecto
async function guardarProyecto(nombre, apellidos, curso, proyecto, imagenUrl, scratchUrl) {
    const { error } = await db
        .from("proyectos")
        .insert([
            {
                alumno: nombre + " " + apellidos,
                curso: curso,
                titulo: proyecto,
                descripcion: "",
                imagen_url: imagenUrl,
                scratch_url: scratchUrl
            }
        ]);


    if (error) {
        alert("Error guardando proyecto");
        console.error(error);
    } else {
        alert("Proyecto subido correctamente");
    }
}



// Manejo del formulario
document.getElementById("form-proyecto").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const proyecto = document.getElementById("proyecto").value;
    const curso = document.querySelector("input[name='curso']:checked").value;
    const descripcion = document.getElementById("descripcion").value;

    const archivo = document.getElementById("archivo").files[0];
    const archivoScratch = document.getElementById("scratch").files[0];

    // SUBIR IMAGEN
    const imagenUrl = await subirImagen(archivo);

    // SUBIR SCRATCH
    const scratchUrl = await subirScratch(archivoScratch);

    console.log("Scratch seleccionado:", archivoScratch);
    console.log("URL generada:", scratchUrl);

    // GUARDAR EN LA TABLA
    if (imagenUrl) {
        await guardarProyecto(
            nombre,
            apellidos,
            curso,
            proyecto,
            imagenUrl,
            scratchUrl
        );

        window.location.href = "galeria.html";
    }

});
