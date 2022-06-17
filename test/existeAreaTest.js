const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  

const { assert } = chai; 

//3. Testeo si el area existe.
//Pasa el test si devuelve 200, ya que eso me indica que el area existe en la bbdd.

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