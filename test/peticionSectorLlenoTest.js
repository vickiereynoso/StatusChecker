//REGLA DE NEGOCIO 1: Un huésped no debe poder marcar asistencia en un sector que ya esté lleno.

/*Necesito:
1. Crear huésped. Testear si se guardó el mismo.
2. Buscar sector para testear que el mismo exista. 
(Usaremos un sector que ya en la BBDD indica que está lleno). 
Debería dar un código 201.
3. Mandar petición con los datos del huésped a dicho sector . Tiene que dar ERROR. Código:422
*/

const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  //chai es como un motor que ejecuta otras cosas, y acá le pasamos/instalamos ese plugin internamente para que lo pueda usar.

const { assert } = chai; 

/* beforeEach(function (done) {
    this.timeout(10000)

    done();
}); */
   
describe('New guest created succesfully', () =>{
    it ('return confirmation code 201 if guest is saved', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {
            
                id_room: 150,
                identificationNumber: 123456789,
                firstName: "Fulano",
                lastName: "Mengano",
                age: 23,
                gender: "Male",
                }
        }).then(response => {
            assert.equal(response.status, 201) //quiero asertar que el response.status sea igual a 201.
            done()   
        })
    })
})

describe('New guest created succesfully', () =>{
    it ('return error 422 if guest already exists', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {

                identificationNumber: 123456789,

                }   
        }).catch(err => {
            assert.equal(err.response.data.message, 'GUEST_EXISTS')
            done()
        })
    })
})


/*  describe('New guest created succesfully', () =>{
    it ('return confirmation code 201 if guest is saved', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {
                id:1,
                id_room: 79,
                identificationNumber: 29421209,
                firstName: "Piotr",
                lastName: "Jóhannsson",
                age: 21,
                gender: "Male",
                 createdAt:"2022-01-06 19:30:00",
                updatedAt:"2022-01-06 20:30:00" 
                }
        }).then(response => {
            assert(response.status, 201) 
            done()   
        }).catch(err => {
            assert(err.response.status, 201)
            done()
        })
    })
}) 

 describe('New guest created succesfully', () =>{
    it ('return error 422 if guest already exists', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {
                id:1,
                id_room: 79,
                identificationNumber: 29421209,
                firstName: "Piotr",
                lastName: "Jóhannsson",
                age: 21,
                gender: "Male",
                }   
        }).catch(err => {
            assert.equal(err.response.data.message, 'GUEST_EXISTS')
            done()
        })
    })
})  */    

