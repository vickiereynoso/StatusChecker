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
                id_room: 111,
                identificationNumber: 777,
                firstName: "Maria",
                lastName: "Juarez",
                age: 42,
                gender: "Female",

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

                identificationNumber: 777,

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
})


//4. Testeo si el sector está disponible. (En el ejemplo, está lleno.)
//Debería tirar error.   

//Quiero preguntarle a un sitio si está lleno.
describe('Asking an already full area if it is available.', () =>{
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
})

//5.Testeo marcar asistencia en un sector con lugar.
//Tendría que hacer un update en currentOcupation del sector también.
//Si no hay lugar igual se crea una asistencia pero con estado rechazado.
 describe('Creating a request in an AVAILABLE area.', () =>{
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


//6. Testeo crear un Asistencia en un sector lleno.
//Mandar petición con los datos del huésped a dicho sector. Tiene que dar ERROR. Código:422

describe('Declining attempt of creating a request in an UNAVAILABLE area.', () =>{
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
})  

//6.Testear cambiar el estado de un sector cuando este llegue a su ocupacion maxima.
describe('Updating state of ocupation of a certain area.', () =>{
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
})



//7. Probar traer solamente los sectores de la categoría "Apto Niños".

 describe('Getting all areas that fit into the Kids Category.', () =>{
    it ('Return code 200 if sucessfull and also return the object to display in browser.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/areas2?category=Apto+Ni%C3%B1os',
            data: {
                category: "AptoNinios"
                }   
        }).then(response => {
            //console.log(response.data)
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'NO_AREAS_IN_SUCH_CATEGORY')
            done()
        })
    })
}) 


//6.Testear cambiar el state de un request de la tabla requests, para señalizar que la persona se ha retirado de un sector determinado.
//También habrá que restar 1 a la currentOcupation.
//ACLARACIÓN: en la tabla en la base de datos, una vez actualizado el campo state, la columna aparecerá vacía (no dirá "checked out"), pues en realidad ahí solo acepta lo que configuramos como ENUM desde un principio, y por un tema tiempo preferimos no hacer de nuevo migración.
describe('Updating field "state" of a certain area, from "accepted" to "checked out", to indicate the person left that sector.', () =>{
    it ('Return code 201 if state has been updated sucessfully.', (done) => {

        axios({
            method: 'put',
            url: 'http://localhost:7000/requests?id_guest=26237497&id_area=1&state=Checked%20out', 
            data: {
                id_guest: 26237497,
                id_area: 1,
                state:"Checked out"
                }
        }).then(response => {
            assert.equal(response.status, 201) //quiero asertar que el response.status sea igual a 201.
            done()   
        
        })
    })
})

//7. Probar traer la descripción de un sector en particular.

describe('Getting a description from a sector.', () =>{
    it ('Return code 200 if sucessfull and also return the object to display in browser.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/areas3?id=4',
            data: {
                id: 4
                }   
        }).then(response => {
            //console.log(response.data)
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'NO_DESCRIPTION_AVAILABLE')
            done()
        })
    })
}) 


//7. Obtener todas las reseñas escritas de TODOS los sectores.

describe('Getting all reviews from all areas.', () =>{
    it ('Return code 200 if sucessfull and also return the object to display in browser.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/ratings2',
            data: {
                
                }   
        }).then(response => {
            //console.log(response.data)
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'NO_REVIEWS_AVAILABLE')
            done()
        })
    })
}) 

//7. Obtener todas las reseñas escritas de un sector en particular.

describe('Getting all reviews from a particular area.', () =>{
    it ('Return code 200 if sucessfull and also return the object to display in browser.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/ratings3?id_area=5',
            data: {
                id_area: 5
                }   
        }).then(response => {
            //console.log(response.data)
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'NO_REVIEWS_AVAILABLE')
            done()
        })
    })
}) 


//7. Obtener todas las asistencias (requests) creadas por un huésped en particular.

describe('Getting all requests made by a specific guest.', () =>{
    it ('Return code 200 if sucessfull and also return the object to display in browser.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/requests2?id_guest=29421209',
            data: {
                id_guest: 29421209
                }   
        }).then(response => {
            //console.log(response.data)
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'NO_REQUESTS_AVAILABLE')
            done()
        })
    })
}) 

//7. Obtener el sector más concurrido de todos.

describe('Getting the most frequently visited area.', () =>{
    it ('Return code 200 if sucessfull and also return the object with results to display in browser.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/requests3',
            data: {
                
                }   
        }).then(response => {
            //console.log(response.data)
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'NO_RESULTS_AVAILABLE')
            done()
        })
    })
}) 


//7. Obtener promedio más alto de calificaciones numéricas de un sector en particular.

/* describe('Getting highest average calification of a certain area.', () =>{
    it ('Return code 200 if sucessfull and also return the object with results to display in browser.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/ratings4?id_area=1',
            data: {
                id_area: 1
                }   
        }).then(response => {
            //console.log(response.data)
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'NO_RESULTS_AVAILABLE')
            done()
        })
    })
})  */