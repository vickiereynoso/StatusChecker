/*Test calificar un Área
Se evalua que se cumplan las siguientes reglas de negocio
REGLA DE NEGOCIOS: 
Necesito:
1. Testear que el GUEST exista (el GUEST debe encontrarse registrado en el hotel)
2. Testear que el AREA exista (el AREA debe existir en el hotel)
3. Testear que el GUEST haya concurrido al menos 1 vez a dicha AREA (debe existir un 
    registro en REQUEST que contenga al GUEST y al AREA)
4. Testear que el SCORE del RATING esté comprendido entre 0 y 10 (el SCORE
    debe tener un valor entre 1-10 (incluidos) para que el GUEST pueda calificar el
    AREA)
*/

const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  //chai es como un motor que ejecuta otras cosas, y acá le pasamos/instalamos ese plugin internamente para que lo pueda usar.

const { assert } = chai; 

//1. Testear que el GUEST exista.
describe("Testing if the guest  exists in the database", () => {
    it('Status response must be 200', (done)=>{
        axios({
            method: 'get',
            url: 'http://localhost:7000/guests/24200780',
            data: {
                identificationNumber: 24200780,
            }
        }).then(response => {
            console.log(response.status)
            console.log(response.data)
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            console.log(err.message)
        })
    })
})

//2. Testear que el AREA exista.
describe("Testing if the area  exists in the database", () => {
    it('Status response must be 200', (done)=>{
        axios({
            method: 'get',
            url: 'http://localhost:7000/areas/:id',
            data: {
                id: 1,
            }
        }).then(response => {
            console.log(response.status)
            console.log(response.data)
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            console.log(err.message)
        })
    })
})

//3. Testear que el GUEST haya concurrido al menos 1 vez a dicha AREA
 describe("Testing if the guest has already assisted the area ", () => {
    it('Status response must be 200', (done)=>{
        axios({
            method: 'get',
            url: 'http://localhost:7000/requests/24200780/1',
            data: {
                id_guest: 24200780,
                id_area: 1
            }
        }).then(response=>{
            console.log(response.status)
            console.log(response.data)
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            console.log(err.message)
        })
    })
})


//Testear que el SCORE del RATING esté comprendido entre 0 y 10
//para que efectivamente el GUEST pueda calificar el
//AREA
//IMPORTANTE: TENGO QUE CAMBIAR LOS DATOS PARA CREAR UNA NUEVA CALIFICACIÓN. 
//DE LO CONTRARIO TIRA ERROR PORQUE CHOCA CON UN DATO EXISTENTE
describe("Testing the creation of a rating", () => {
    it('Status response must be 200', (done)=>{
        axios({
            method: 'post',
            url: 'http://localhost:7000/ratings',
            data: {
                id: 50,
                id_area: 5,
                id_request: 68,
                score: 4,
                review: 'Genialesss',
            }
        }).then(response=>{
            console.log(response.status)
            assert.equal(response.status, 201)
            done()
        }).catch(err => {
            console.log(err.message)
        })
    })
})

