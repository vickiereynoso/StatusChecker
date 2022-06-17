const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const { assert } = chai;

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
                id_guest: 1122,
                state: 'Accepted'
                }
        }).then(response => {
            assert.equal(response.data.message,'ASISTENCIA_MARCADA')
            done()   
        
        }).catch(err => {
            assert.equal(err.response.data.message, 'REQUEST_DECLINED')
            done()
        })
    })
}) 