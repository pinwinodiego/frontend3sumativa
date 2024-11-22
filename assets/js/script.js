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
// Llama a la función registrarMoto y maneja la respuesta
    registrarMoto(objeto).then(() => {
        alert("Se registró con éxito");
        traerDatos();
    }).catch((r) => {
        console.log(r);
    });
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

    let id = document.getElementById('btnActualizar').value;

    actualizarMoto(objeto, id).then(() => {
        alert('Se actualizó correctamente');
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