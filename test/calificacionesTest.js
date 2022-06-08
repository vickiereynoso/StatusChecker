calificaciontest.js
//REGLA DE NEGOCIO: Que la calificación sea entre 1 a 5.

/*Necesito:
1. Testear que el huésped exista. Esperado: que exista.
2. Testear que el sector exista.
3. Testear que el huesped haya concurrido aunque sea 1 vez a dicho sector:
 (lo buscás en la tabla de registro de asistencias).
4. Testear que la calificación sea mayor a 0.
   Testear que la calificación sea menor a 11.
*/

/* const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  //chai es como un motor que ejecuta otras cosas, y acá le pasamos/instalamos ese plugin internamente para que lo pueda usar.

const { assert } = chai; 


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
}) */