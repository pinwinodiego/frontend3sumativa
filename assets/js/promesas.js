import {addDoc,collection,getDocs,updateDoc,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {db} from "./firebase.js";

export const registrarMoto=async(Motos)=>{
    console.log(Motos);
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "Motos"),Motos);
}
export const obtenerMoto = async ()=>{
    const referencia = collection(db,'Motos');
    // obtengo la captura 
    const querySnapshot = await getDocs(referencia);
    let Motos = [];
    querySnapshot.forEach((doc) => {
        // los ... desarma el diccionario para poner los datos por separado y ingresarlos al diccionario nuevo
        Motos.push({...doc.data(), id:doc.id});
    }); 

    // console.log(personas)
    return Motos
}
      
export const actualizarMoto = async(Motos,id)=>{
    // console.log("ACA")
    // console.log(persona)
    // console.log(id)
    const referencia = doc(db, 'Motos', id);
    await updateDoc(referencia, Motos);
}


export const eliminarMoto = async(id)=>{
    const referencia = doc(db,'Motos',id);
    await deleteDoc(referencia);
}