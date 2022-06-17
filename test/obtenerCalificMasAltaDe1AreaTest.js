const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai; 

//Obtener promedio más alto de calificaciones numéricas de un sector en particular.

describe('Getting highest average calification of a certain area.', () =>{
    it ('Return code 200 if sucessfull and also return the object with results to display in browser.', (done) => {

        axios({
            method : 'get',
            url: 'http://localhost:7000/ratings4?id_area=1',
            data: {
                id_area: 1
                }   
        }).then(response => {
            //console.log(response.data)
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'NO_DATA_AVAILABLE')
            done()
        })
    })
}) 