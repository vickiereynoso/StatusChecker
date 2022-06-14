//calificaciontest.js
//REGLA DE NEGOCIO: Que la calificación sea entre 1 a 5.
/*
Necesito:
1. Testear que el huésped exista. Esperado: que exista.
2. Testear que el sector exista.
3. Testear que el huesped haya concurrido aunque sea 1 vez a dicho sector:
 (lo buscás en la tabla de registro de asistencias).
4. Testear que la calificación sea mayor a 0.
   Testear que la calificación sea menor a 11.
*/

const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  //chai es como un motor que ejecuta otras cosas, y acá le pasamos/instalamos ese plugin internamente para que lo pueda usar.

const { assert } = chai; 

//1. Testear que el huésped exista. Esperado: que exista.
describe("Huesped existente", () => {
    it('el status de respuesta debe ser 200', (done)=>{
        axios({
            method: 'get',
            url: 'http://localhost:7000/guests/:id',
            data: {
                id: 1,
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

//2. Testear que el sector exista.
describe("Area existente", () => {
    it('el status de respuesta debe ser 200', (done)=>{
        axios({
            method: 'get',
            url: 'http://localhost:7000/areas/:id',
            data: {
                id: 1,
            }
        }).then(response=>{
            console.log(response.status)
            console.log(response.data.id)
            assert.equal(response.status, 200)
            done()
        }).catch(err => {
            console.log(err.message)
        })
    })
})

//3. Testear que el huesped haya concurrido aunque sea 1 vez a dicho sector:
 //(lo buscás en la tabla de registro de asistencias).


//TENGO QUE CAMBIAR LOS DATOS PARA CREAR UNA NUEVA CALIFICACIÓN. 
//DE LO CONTRARIO TIRA ERROR PORQUE CHOCA CON UN DATO EXISTENTE
// describe("Creando calificacion", () => {
//     it('el status de respuesta debe ser 200', (done)=>{
//         axios({
//             method: 'post',
//             url: 'http://localhost:7000/ratings',
//             data: {
//                 id: 36,
//                 id_area: 4,
//                 id_request: 60,
//                 score: 5,
//                 review: 'Increible',
//             }
//         }).then(response=>{
//             console.log(response.status)
//             assert.equal(response.status, 201)
//             done()
//         }).catch(err => {
//             console.log(err.message)
//         })
//     })
// })



// describe("Testenado que un huesped haya asistido en una area", () => {
//     it('el status debe ser 201', (done)=>{
//         axios({
//             method: 'get',
//             url: 'http://localhost:7000/requests/:id_guest',
//             data: {
//                 id_guest: 29421209
//             }
//         }).then(response=>{
//             //console.log(response.data.id)
//             assert.equal(response.status, 201)
//             //assert.isBelow(response.data.score, 11, "el score es menor a 10")
//             done()
//         })
//     })
// })

describe("Testeando calificación menor a 11", () => {
    it('el score debe ser menor a 11', (done)=>{
        axios({
            method: 'get',
            url: 'http://localhost:7000/ratings/1',
        }).then(response=>{
            assert.isBelow(response.data.score, 11, "el score es menor a 10")
            done()
        })
    })
})

describe("Testeando calificación mayor a 0", () => {
    it('el status de respuesta debe ser 200', (done)=>{
        axios({
            method: 'get',
            url: 'http://localhost:7000/ratings/1',
        }).then(response=>{
            assert.isAbove(response.data.score, 0)
            console.log(response.data)
            done()
        })
    })
})

// describe("Creando calificacion", () => {
//     it('el status de respuesta debe ser 200', (done)=>{
//         axios({
//             method: 'get',
//             url: 'http://localhost:7000/ratings/1',
//         }).then(response=>{
//             //console.log(response.data.id)
//             console.log(response.status)
//             assert.equal(response.data.id_request, 6, "COINCIDEN")
//             //assert.isBelow(response.data.score, 11, "el score es menor a 10")
//             done()
//         }).catch(err => {
//             console.log(err.message)
//         })
//     })
// })


/*
describe('Guest exists', () =>{
    it ('return code 201 if guest exists', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/guests/1', 
            params: {
                id:1,
                identificationNumber: 29421209,
                }   
        }).catch(err => {
            assert.equal(err.response.data.message, 'GUEST_DOES_NOT_EXIST')
            done()
        })
    })
})

describe('Area exists', () =>{
    it ('return code 201 if area exists', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/areas/:id', 
            params: {
                id:1,
                }   
        }).catch(err => {
            assert.equal(err.response.data.message, 'AREA_DOES_NOT_EXIST')
            done()
        })
    })
})


describe('The guest checked in on area at least once.', () =>{
    it ('return code 201 if check-in exists', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/requests/:id', 
            data: {
                //id_guest:1,
                }   
        }).catch(err => {
            assert.equal(err.response.data.message, 'AREA_DOES_NOT_EXIST')
            done()
        })
    })
}) 
*/