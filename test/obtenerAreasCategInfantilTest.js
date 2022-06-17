const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch); 
const { assert } = chai; 

//Probar traer solamente los sectores de la categoría "Apto Niños".

describe('Getting all areas that fit into the Kids Category.', () =>{
    it ('Return code 200 if sucessfull and also return the object to display in browser.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/areas2?category=Apto+Ni%C3%B1os',
            data: {
                category: "AptoNiños"
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