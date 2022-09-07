const faker = require("faker")
faker.locale = 'es'

function generarProducto() {
 return {
   title: faker.commerce.product(),
   price: faker.finance.amount(),
   thumbnail: faker.image.avatar(),
 }
}

module.exports = { generarProducto }