console.log("hola")

let amigos = ['martin', 'pepe', 'cacho'];
let vacio = [];

// for (const ami of amigos) {
//     console.log(ami)
// }

// amigos.forEach((e)=> {console.log(e)})
// amigos.push('cacho2')
// amigos.forEach((e)=> {console.log(e)})

function mostrarLista (lista) {
    return lista.length === 0 ? 'vacio' : 'contiene algo'
}

console.log(mostrarLista(amigos))
console.log(mostrarLista(vacio))
