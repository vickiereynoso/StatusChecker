const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai; 

//Obtener todas las asistencias (requests) creadas por un huésped en particular.

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