const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai; 


//Probar traer la descripción de un sector en particular.

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