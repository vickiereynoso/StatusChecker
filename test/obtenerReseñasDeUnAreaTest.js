const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai; 


//Obtener todas las reseñas escritas de un sector en particular.

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