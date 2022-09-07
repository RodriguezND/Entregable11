const { mongoose } = require("mongoose");

const model = require("../models/producto")

class ContenedorMongoDbProductos{

    constructor()
    {
        this.id = 0        
    }


    async save(objeto){

        /* let productoBuscado = await model.find({})

        const IDproductosOrdenados = productoBuscado.sort((a,b) => a.id - b.id);
        const mayorID = IDproductosOrdenados[IDproductosOrdenados.length-1].id

        console.log(mayorID) */

        const producto = { title: objeto.title,
        price: objeto.price,
        thumbnail: objeto.thumbnail
        }
        console.log("aaaa")
        console.log(producto)

        const productoSaveModel = model(producto)
        let productoSave = await productoSaveModel.save()
        console.log(productoSave)

        console.log("AGREGADO")

    
    }
        
    async getById(id)
    {
       
      

    }

    async getAll()
    {
       console.log("READ ALL")
       let producto = await model.find({})
       /* console.log(producto) */

       return producto
        
    }

    async deleteById(id)
    {
        
    }


    async deleteAll(){

        
    }

}


module.exports = ContenedorMongoDbProductos











