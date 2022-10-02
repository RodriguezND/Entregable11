const { text } = require("express");
const { mongoose } = require("mongoose");



const model = require("../models/mensajes")

class ContenedorMongoDb{

    constructor()
    {
        this.id = 0        
    }


    async save(objeto){

        /* let mensajesBuscado = await model.find({})

        const IDmensajessOrdenados = mensajesBuscado.sort((a,b) => a.id - b.id);
        const mayorID = IDmensajessOrdenados[IDmensajessOrdenados.length-1].id

        console.log(mayorID) */

        const dia = new Date().getDay()
        const mes = new Date().getMonth()
        const año = new Date().getFullYear()
        const hora = new Date().getHours()
        const min = new Date().getMinutes()
        const seg = new Date().getSeconds()

        const horaFinal = `${dia}/${mes}/${año} - ${hora}:${min}:${seg}`

        console.log(objeto.author)

        const mensaje = { author: objeto.author,
                            text: objeto.text,
                            hora: horaFinal
        }
        
        console.log("bbbbb")
        console.log(mensaje)

        const mensajeSaveModel = model(mensaje)
        let mensajeSave = await mensajeSaveModel.save()
        console.log(mensajeSave)

        console.log("AGREGADO")

    }
        
    async getById(id)
    {
       
    }

    async getAll()
    {
        console.log("READ ALL")

        let mensaje = await model.find({})

        return mensaje
    }

    async deleteById(id){
    }


    async deleteAll(){

    }

}


module.exports = ContenedorMongoDb








