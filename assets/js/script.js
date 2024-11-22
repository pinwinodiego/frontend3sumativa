import { actualizarMoto, eliminarMoto, obtenerMoto, registrarMoto } from "./promesas.js";
// Función que se ejecuta cuando la página ha cargado completamente
window.addEventListener("load", () => {
    // Asigna la función registrar al botón de registro
    document.getElementById("btnRegistrar").addEventListener('click', registrar);
    // Asigna la función Invertir al botón modo oscuro
    document.getElementById("darkMode").addEventListener("click", Invertir);
    // Asigna la función CambiarTamañoFuente al botón de Cambiar fuente
    document.getElementById("changeSize").addEventListener("click", cambiarTamañoFuente);
    // Asigna la función actualizar al botón de actualziar
    document.getElementById('btnActualizar').addEventListener('click', actualizar);

    // Llama a la función para traer datos y mostrarlos
    traerDatos();

});
// Función para registrar una nueva moto
const registrar = () => {
     // Obtiene los valores de los campos del formulario
    let eMarca = document.getElementById("Marca");
    let eModelo = document.getElementById("Modelo");
    let eCilindrada = document.getElementById("Cilindrada");
    let eTipoMoto = document.getElementById("TipoMoto");
    let eFechaRegistro = document.getElementById("FechaRegistro");
    let echeckCasco = document.getElementById("checkCasco");
    let echeckGuantes = document.getElementById("checkGuantes");
    let echeckChaqueta = document.getElementById("checkChaqueta");
    let eFechaMoto = document.getElementById("FechaMoto");
    let eExperiencia = document.getElementById("Experiencia");
// Almacena los valores en un objeto
    let vMarca = eMarca.value;
    let vModelo = eModelo.value;
    let vCilindrada = eCilindrada.value;
    let vTipoMoto = eTipoMoto.value;
    let vFechaRegistro = eFechaRegistro.value;
    let vFechaMoto = eFechaMoto.value;
    let vExperiencia = eExperiencia.value;

    let ccheckCasco = echeckCasco.checked;
    let ccheckGuantes = echeckGuantes.checked;
    let ccheckChaqueta = echeckChaqueta.checked;

    if (!vMarca || !vModelo || !vCilindrada || !vTipoMoto || !vFechaRegistro || !vFechaMoto || !vExperiencia) {
        alert("Todos los campos son obligatorios");
        return;
    }
// Almacena los valores en un objeto
    let objeto = {
        Marca: vMarca,
        Modelo: vModelo,
        Cilindrada: vCilindrada,
        TipoMoto: vTipoMoto,
        FechaRegistro: vFechaRegistro,
        checkCasco: ccheckCasco,
        checkGuantes: ccheckGuantes,
        checkChaqueta: ccheckChaqueta,
        FechaMoto: vFechaMoto,
        Experiencia: vExperiencia
    };

    if (!validar(objeto)) {
        return;
    }

// Llama a la función registrarMoto y maneja la respuesta
    registrarMoto(objeto).then(() => {
        alert("Se registró con éxito");
        document.getElementById("updateForm").classList.add("hidden"); // Ocultar formulario
        limpiarFormularioRegistro(); // Agregamos la llamada a la nueva función
        traerDatos();
    }).catch((r) => {
        console.log(r);
    });
};

// Agregar nueva función para limpiar el formulario de registro
const limpiarFormularioRegistro = () => {
    document.getElementById("Marca").value = "";
    document.getElementById("Modelo").value = "";
    document.getElementById("Cilindrada").value = "";
    document.getElementById("TipoMoto").value = "";
    document.getElementById("FechaRegistro").value = "";
    document.getElementById("checkCasco").checked = false;
    document.getElementById("checkGuantes").checked = false;
    document.getElementById("checkChaqueta").checked = false;
    document.getElementById("FechaMoto").value = "2024"; // Resetear al valor por defecto
    document.getElementById("Experiencia").value = "";
};

// Función para obtener y mostrar los datos de las motos en la tabla
const traerDatos = () => {
    obtenerMoto().then((Motos) => {
        let estructura = "";
        Motos.forEach((p) => {
            estructura += "<tr>";
            estructura += "<td>" + p.Marca + "</td>";
            estructura += "<td>" + p.Modelo + "</td>";
            estructura += "<td>" + p.Cilindrada + "</td>";
            estructura += "<td>" + p.TipoMoto + "</td>";
            estructura += "<td>" + p.FechaRegistro + "</td>";
            estructura += "<td>" + (p.checkCasco ? "Sí" : "No") + "</td>";
            estructura += "<td>" + (p.checkGuantes ? "Sí" : "No") + "</td>";
            estructura += "<td>" + (p.checkChaqueta ? "Sí" : "No") + "</td>";
            estructura += "<td>" + p.FechaMoto + "</td>";
            estructura += "<td>" + p.Experiencia + "</td>";
            estructura += "<td><button id='UPD" + p.id + "'>Actualizar</button></td>";
            estructura += "<td><button id='DEL" + p.id + "'>Eliminar</button></td>";
            estructura += "</tr>";
        });
 // Inserta la estructura generada en la tabla
        document.getElementById("tbMotos").innerHTML = estructura;
        // Asigna las funciones de actualizar y eliminar a los botones correspondientes
        Motos.forEach((p) => {
            document.getElementById("UPD" + p.id).addEventListener("click", () => {
                document.getElementById("updateForm").classList.remove("hidden");
                document.getElementById("UPDMarca").value = p.Marca;
                document.getElementById("UPDModelo").value = p.Modelo;
                document.getElementById("UPDCilindrada").value = p.Cilindrada;
                document.getElementById("UPDTipoMoto").value = p.TipoMoto;
                document.getElementById("UPDFechaRegistro").value = p.FechaRegistro;
                document.getElementById("UPDcheckCasco").checked = p.checkCasco;
                document.getElementById("UPDcheckGuantes").checked = p.checkGuantes;
                document.getElementById("UPDcheckChaqueta").checked = p.checkChaqueta;
                document.getElementById("UPDFechaMoto").value = p.FechaMoto;
                document.getElementById("UPDExperiencia").value = p.Experiencia;
                document.getElementById("btnActualizar").value = p.id;
            });

            document.getElementById('DEL' + p.id).addEventListener('click', () => {
                eliminar(p.id);
            });
        });
    });
};
// Función para eliminar una moto
const eliminar = (id) => {
    eliminarMoto(id).then(() => {
        alert("Se han eliminado los datos con éxito");
        traerDatos();
    }).catch((e) => {
        console.log(e);
    });
};
// Función para actualizar los datos de una moto
const actualizar = () => {
    let eMarca = document.getElementById("UPDMarca");
    let eModelo = document.getElementById("UPDModelo");
    let eCilindrada = document.getElementById("UPDCilindrada");
    let eTipoMoto = document.getElementById("UPDTipoMoto");
    let eFechaRegistro = document.getElementById("UPDFechaRegistro");
    let echeckCasco = document.getElementById("UPDcheckCasco");
    let echeckGuantes = document.getElementById("UPDcheckGuantes");
    let echeckChaqueta = document.getElementById("UPDcheckChaqueta");
    let eFechaMoto = document.getElementById("UPDFechaMoto");
    let eExperiencia = document.getElementById("UPDExperiencia");

    let vMarca = eMarca.value;
    let vModelo = eModelo.value;
    let vCilindrada = eCilindrada.value;
    let vTipoMoto = eTipoMoto.value;
    let vFechaRegistro = eFechaRegistro.value;
    let vcheckCasco = echeckCasco.checked;
    let vcheckGuantes = echeckGuantes.checked;
    let vcheckChaqueta = echeckChaqueta.checked;
    let vFechaMoto = eFechaMoto.value;
    let vExperiencia = eExperiencia.value;

    if (!vMarca || !vModelo || !vCilindrada || !vTipoMoto || !vFechaRegistro || !vFechaMoto || !vExperiencia) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let objeto = {
        Marca: vMarca,
        Modelo: vModelo,
        Cilindrada: vCilindrada,
        TipoMoto: vTipoMoto,
        FechaRegistro: vFechaRegistro,
        checkCasco: vcheckCasco,
        checkGuantes: vcheckGuantes,
        checkChaqueta: vcheckChaqueta,
        FechaMoto: vFechaMoto,
        Experiencia: vExperiencia
    };

    if (!validar(objeto)) {
        return;
    }

    let id = document.getElementById('btnActualizar').value;

    actualizarMoto(objeto, id).then(() => {
        alert('Se actualizó correctamente');
        document.getElementById("updateForm").classList.add("hidden"); // Ocultar formulario
        traerDatos();
    }).catch((e) => {
        console.log(e);
    });
};

document.getElementById('btnActualizar').addEventListener('click', actualizar);
// Función para cambiar el contraste (modo oscuro/claro)
function Invertir() {
    let body = document.body;

    if (body.style.backgroundColor === 'black') {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
    } else {
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
    }
}
// Función para cambiar el tamaño de la fuente
function cambiarTamañoFuente() {
    let body = document.body;
    if (body.style.fontSize === '1.5em') {
        body.style.fontSize = '1em';
    } else {
        body.style.fontSize = '1.5em';
    }
}

const validar = (moto) => {
    // Validación de marca (solo letras, más simple)
    const marca = moto.Marca.trim();
    if (marca.length < 2 || marca.length > 30) {
        alert("La marca debe tener entre 2 y 30 caracteres");
        return false;
    }

    // Validación de cilindrada (más simple)
    const cilindrada = moto.Cilindrada.toLowerCase();
    if (!cilindrada.endsWith('cc')) {
        alert("La cilindrada debe terminar en 'cc'");
        return false;
    }
    

    // Validación de fecha (no puede ser futura)
    const fechaRegistro = new Date(moto.FechaRegistro);
    if (fechaRegistro > new Date()) {
        alert("La fecha de registro no puede ser futura");
        return false;
    }

    // Validación de experiencia (mínimo 10 caracteres)
    if (moto.Experiencia.length < 10) {
        alert("La experiencia debe tener al menos 10 caracteres");
        return false;
    }

    return true;
};

const mostrarFormularioActualizacion = () => {
    const form = document.getElementById("updateForm");
    form.classList.remove("hidden");
    form.style.animation = "slideDown 0.5s ease-out";
};

// Agregar función para limpiar formulario
const limpiarFormulario = () => {
    document.getElementById("updateForm").classList.add("hidden");
    // Opcional: limpiar los campos del formulario
    document.getElementById("UPDMarca").value = "";
    document.getElementById("UPDModelo").value = "";
    document.getElementById("UPDCilindrada").value = "";
    document.getElementById("UPDTipoMoto").value = "";
    document.getElementById("UPDFechaRegistro").value = "";
    document.getElementById("UPDcheckCasco").checked = false;
    document.getElementById("UPDcheckGuantes").checked = false;
    document.getElementById("UPDcheckChaqueta").checked = false;
    document.getElementById("UPDFechaMoto").value = "";
    document.getElementById("UPDExperiencia").value = "";
};