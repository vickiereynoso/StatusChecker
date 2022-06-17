const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai; 


//Testear cambiar el estado de un sector cuando este llegue a su ocupacion maxima.
describe('Updating state of ocupation of a certain area.', () =>{
    it ('Return code 201 if request has been updated sucessfully.', (done) => {

        axios({
            method: 'put',
            url: 'http://localhost:7000/areas?id_area=2&state=Lleno', 
            data: {
                id_area: 2,
                state: 'Lleno'
                }
        }).then(response => {
            assert.equal(response.status, 201) 
            done()   
        
        })
    })
})
