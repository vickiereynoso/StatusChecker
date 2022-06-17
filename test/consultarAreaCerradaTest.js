const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai;

//Testeo crear un Asistencia en un sector cerrado. Elegiremos el GYM cuyo estado es CERRADO.
//Mandar petición con los datos del huésped a dicho sector. Tiene que dar ERROR. Código:422
describe('Declining attempt of creating a request in an CLOSED area.', () =>{
    it ('Return code 422 if request has been declined.', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:7000/requests?id_area=4&id_guest=666', 
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
