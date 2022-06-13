//REGLA DE NEGOCIO 1: Un huésped no debe poder marcar asistencia en un sector que ya esté lleno.

/*Necesito:
1. Crear exitosamente el huésped. (PROBAR CON UNO DISTINTO CADA VEZ).
2. Testear si se guardó el mismo.
3. Buscar sector para testear que el mismo exista. 
(Usaremos un sector que ya en la BBDD indique que está lleno). 
Debería dar un código 201.
4. Mandar petición a sector preguntando si está disponible.
5. Mandar petición con los datos del huésped a dicho sector. Tiene que dar ERROR. Código:422
*/

const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  //chai es como un motor que ejecuta otras cosas, y acá le pasamos/instalamos ese plugin internamente para que lo pueda usar.

const { assert } = chai; 


//1. Testeo crear un Huésped.
//Camino feliz: código 201. Se creó.
//Error: código 422 cuando ya exista.
describe('New guest created succesfully', () =>{
    it ('Return confirmation code 201 if guest has just been created and saved.', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {
                identificationNumber: 123,
                }
        }).then(response => {
            assert.equal(response.status, 201) //quiero asertar que el response.status sea igual a 201.
            done()   
        })
    })
})

//2. Testeo ver si ya existe un Huésped.
//Pasa el test si devuelve error 422, ya que eso me indica que ya existe el Huésped en la bbdd.

describe('Testing if new guest already exists.', () =>{
    it ('Return error 422 if guest already exists.', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {

                identificationNumber: 1234567,

                }   
        }).catch(err => {
            assert.equal(err.response.data.message, 'GUEST_EXISTS')
            done()
        })
    })
})

//3. Testeo si el sector existe.
//Pasa el test si devuelve 200, ya que eso me indica que el Sector existe en la bbdd.

describe('Testing if area exists.', () =>{
    it ('Return confirmation code 201 if area exists.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/areas/id', 
            data: {
                id: 3,
                }
        }).then(response => {
            //console.log(response)
            assert.equal(response.status, 201) //quiero asertar que el response.status sea igual a 200.
            done()   
        })
    })
})

//4. Testeo si el sector está disponible. (En el ejemplo, está lleno.)
//Debería tirar error.   

describe('An already full area should appear unavailable.', () =>{
    it ('Return error code 422 when asking if it is available.', (done) => {
        
        axios({
            method : 'get',
             url: 'http://localhost:7000/areas?name=Jacuzzi&state=Disponible', 
            data: {
                name: 'Jacuzzi',
                state: 'Disponible'
                }
        }).catch(err => {
            assert.equal(err.response.status, 422)
            done()
        })
    })
})

//5. Testeo crear un Asistencia en un sector lleno.
//Mandar petición con los datos del huésped a dicho sector. Tiene que dar ERROR. Código:422

/* describe('Declining attempt of creating a request in an unavailable area.', () =>{
    it ('Return code 422 if request has been declined.', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:7000/requests?id_area=3&id_guest=1234567', 
            data: {
                id_area: 3,
                id_guest: 1234567
                }
        }).then(response => {
            assert.equal(response.status, 201) //quiero asertar que el response.status sea igual a 201.
            done()   
        })
    })
}) */


//Testeo marcar asistencia en un sector con lugar.
//Tendría que hacer un update en currentOcupation del sector también.
describe('Creating a request in an available area.', () =>{
    it ('Return code 201 if request has been created sucessfully.', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:7000/requests?id_area=2&id_guest=223344', 
            data: {
                id_area: 2,
                id_guest: 55555,
                state: 'Accepted'
                }
        }).then(response => {
            assert.equal(response.status, 201) //quiero asertar que el response.status sea igual a 201.
            done()   
        })
    })
})