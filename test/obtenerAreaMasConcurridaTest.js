const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai; 

//Obtener el sector más concurrido de todos.

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