const fs = require('fs');

//implementación d emanera sincronica


fs.writeFileSync('./productos.txt',"hola soy el archivo");

if(fs.existsSync('./productos.txt')){
    
    let contenido = fs.readFileSync('./productos.txt','utf-8')
    console.log(contenido)

    fs.appendFileSync('./productos.txt',"\nhola soy el archivoaaaaa");

    fs.unlinkSync('./productos.txt')
}


//callbacjs

fs.writeFile('./producto.txt', 'contenido', error => {
    if (error) {
        throw new error (`Error en la creacion ${error}`)
    }

    fs.readFile('./producto.txt', 'utf-8', (error, contenido) => {
        if (error){
            throw new error (`Error en la lectura ${error}`)
        }
        console.log(contenido)
        fs.unlink('./producto.txt', error =>{
            if(error){
                throw new error (`Error en el borrado ${error}`)
            }
        })
    })
})


//promesas
// await solo vale con promesas.
const operacionesArchivos = async () => {
    try {
        await fs.promises.writeFile('./promesas.txt', 'hola promesas')

        let resultado = await fs.promises.readFile('./promesas.txt','utf-8')   

        console.log(resultado)

        await fs.promises.appendFile('./promesas.txt', 'mas cosas')
        let resultado1 = await fs.promises.readFile('./promesas.txt','utf-8')   
        
        console.log(resultado1)

        await fs.promises.unlink('./promesas.txt')
    } catch (error) {
        console.log(error)
    }

}

operacionesArchivos()