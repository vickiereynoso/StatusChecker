const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  //chai es como un motor que ejecuta otras cosas, y acá le pasamos/instalamos ese plugin internamente para que lo pueda usar.

const { assert } = chai;

//REGLA DE NEGOCIO: Un huésped no debe poder marcar asistencia en un sector que ya esté CERRADO.

/*Necesito:
1. Testear si existe el huésped.
2. Buscar sector para testear que el mismo exista. 
(Usaremos un sector que ya en la BBDD indica que está cerrado). 
Debería dar un código 201.
3. Mandar petición con los datos del huésped a dicho sector. Tiene que dar ERROR. Código:422
*/

//1. Testeo crear un Huésped.
//Camino feliz: código 201. Se creó.
//Error: código 422 cuando ya exista.
/* describe('New guest created succesfully', () =>{
    it ('Return confirmation code 201 if guest has just been created and saved.', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {
                id_room: 451,
                identificationNumber: 222,
                firstName: "Pepe",
                lastName: "Lopez",
                age: 42,
                gender: "Hombre",

                }
        }).then(response => {
            assert.equal(response.status, 201) //quiero asertar que el response.status sea igual a 201.
            done()   
        })
    })
})
 */
//2. Testeo ver si ya existe un Huésped.
//Pasa el test si devuelve error 422,eso me indica que existe el Huésped en la bbdd.

/* describe('Testing if new guest already exists.', () =>{
    it ('Return error 422 if guest already exists.', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {

                identificationNumber: 222,

                }   
        }).catch(err => {
            assert.equal(err.response.data.message, 'GUEST_EXISTS')
            done()
        })
    })
}) */
 

//3. Testeo si el sector existe.
//Pasa el test si devuelve 200, ya que eso me indica que el Sector existe en la bbdd.

/* describe('Testing if area exists.', () =>{
    it ('Return confirmation code 200 if that area exists, if not it will show "AREA_NONEXISTENT".', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/areas/id', 
            data: {
                id: 3,
                }
        }).then(response => {
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'AREA_NONEXISTENT')
            done()
        })
    })
}) */


//4. Testeo si el sector está disponible. (En el ejemplo, está lleno.)
//Debería tirar error.   

//Quiero preguntarle a un sitio si está lleno.
/* describe('Asking an already full area if it is available.', () =>{
    it ('Should return "AREA_AT_FULL_CAPACITY_AT_THE_MOMENT" if the area is full. On the contrary, if it is an available area it will return a 200 confirmation code.', (done) => {
        
        axios({
            method : 'get',
             url: 'http://localhost:7000/areas?name=Jacuzzi&state=Disponible', 
            data: {
                name: 'Jacuzzi',
                state: 'Disponible'
                }
        }).then(response => {
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'AREA_AT_FULL_CAPACITY_AT_THE_MOMENT')
            done()
        })
        
    })
}) */

//4. Testeo si el sector está disponible. (En el ejemplo, está cerrado.)
//Debería tirar error.   

//Quiero preguntarle a un sitio si está cerrado.

// describe('Asking an already closed area if it is available.', () =>{
//     it ('Should return "AREA_IS_CLOSED_AT_THE_MOMENT" if the area is closed. On the contrary, if it is an available area it will return a 200 confirmation code.', (done) => {
        
//         axios({
//             method : 'get',
//              url: 'http://localhost:7000/areas?name=Gym&state=Cerrado', 
//             data: {
//                 name: 'Gym',
//                 state: 'Cerrado',
//                 }
//         }).then(response => {
//             assert.equal(response.status, 200) 
//             done()   
//         }).catch(err => {
//             assert.equal(err.response.data.message, 'AREA_IS_CLOSED_AT_THE_MOMENT')
//             done()
//         })
        
//     })
// })

//5.Testeo marcar asistencia en un sector con lugar.
//Tendría que hacer un update en currentOcupation del sector también.
//Si no hay lugar igual se crea una asistencia pero con estado rechazado.
/*  describe('Creating a request in an AVAILABLE area.', () =>{
    it ('Return code 201 if request has been created sucessfully.', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:7000/requests?id_area=3&id_guest=223344', 
            data: {
                id_area: 3,
                id_guest: 9999,
                state: 'Accepted'
                }
        }).then(response => {
            assert.equal(response.data.message,'ASISTENCIA_MARCADA') //quiero asertar que el response.status sea igual a 201.
            done()   
        
        }).catch(err => {
            assert.equal(err.response.data.message, 'REQUEST_DECLINED')
            done()
        })
    })
}) 
 */

//6. Testeo crear un Asistencia en un sector lleno.
//Mandar petición con los datos del huésped a dicho sector. Tiene que dar ERROR. Código:422

/* describe('Declining attempt of creating a request in an UNAVAILABLE area.', () =>{
    it ('Return code 422 if request has been declined.', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:7000/requests?id_area=3&id_guest=10', 
            data: {
                id_area: 3,
                id_guest: 666
                }
        }).catch(err => {
            assert.equal(err.response.data.message, 'REQUEST_DECLINED')
            done()
        })
    })
})   */

//6. Testeo crear un Asistencia en un sector cerrado.
//Mandar petición con los datos del huésped a dicho sector. Tiene que dar ERROR. Código:422
describe('Declining attempt of creating a request in an CLOSED area.', () =>{
    it ('Return code 422 if request has been declined.', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:7000/requests5?id_area=4&id_guest=666', 
            data: {
                id_area: 4,
                id_guest: 666
                }
        }).catch(err => {
            assert.equal(err.response.data.message, 'REQUEST_DECLINED')
            done()
        })
    })
})  

//6.Testear cambiar el estado de un sector cuando este llegue a su ocupacion maxima.
/* describe('Updating state of ocupation of a certain area.', () =>{
    it ('Return code 201 if request has been updated sucessfully.', (done) => {

        axios({
            method: 'put',
            url: 'http://localhost:7000/areas?id_area=2&state=Lleno', 
            data: {
                id_area: 2,
                state: 'Lleno'
                }
        }).then(response => {
            assert.equal(response.status, 201) //quiero asertar que el response.status sea igual a 201.
            done()   
        
        })
    })
}) */
