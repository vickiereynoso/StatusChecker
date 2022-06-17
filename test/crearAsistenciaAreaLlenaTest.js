const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai; 


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