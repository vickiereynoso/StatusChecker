const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  

const { assert } = chai; 

//2. Testeo ver si ya existe un Huésped.
//Pasa el test si devuelve error 422, ya que eso me indica que ya existe el Huésped en la bbdd.

describe('Testing if new guest already exists.', () =>{
    it ('Return error 422 if guest already exists.', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {

                identificationNumber: 3319122,

                }   
        }).catch(err => {
            assert.equal(err.response.data.message, 'GUEST_EXISTS')
            done()
        })
    })
})