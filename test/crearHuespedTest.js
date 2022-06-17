const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  

const { assert } = chai; 


//1. Testeo crear un Huésped.
//Camino feliz: código 201. Se creó.
//Error: código 422 cuando ya exista.
describe('New guest created succesfully', () =>{
    it ('Return confirmation code 201 if guest has just been created and saved.', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:7000/guests', 
            data: {
                id_room: 110,
                identificationNumber: 3319122,
                firstName: "Maria",
                lastName: "Juarez",
                age: 42,
                gender: "Female",

                }
        }).then(response => {
            assert.equal(response.status, 201) 
            done()   
        })
    })
})