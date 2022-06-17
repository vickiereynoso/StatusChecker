const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai; 

//Testeo si el area está disponible. (En el ejemplo, está llena.)
//Debería tirar error.   
describe('Asking an already full area if it is available.', () =>{
    it ('Should return "AREA_AT_FULL_CAPACITY_AT_THE_MOMENT" if the area is full. On the contrary, if it is an available area it will return a 200 confirmation code.', (done) => {
        
        axios({
            method : 'get',
             url: 'http://localhost:7000/areas?name=Jacuzzi&state=Disponible', 
            data: {
                name: 'Jacuzzi',
                state: 'Disponible'
                }
        }).then(response => {
            assert.equal(response.status, 200) 
            done()   
        }).catch(err => {
            assert.equal(err.response.data.message, 'AREA_AT_FULL_CAPACITY_AT_THE_MOMENT')
            done()
        })
        
    })
})