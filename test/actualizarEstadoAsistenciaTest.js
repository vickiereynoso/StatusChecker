const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);  
const { assert } = chai; 

//Testear cambiar el state de un request de la tabla requests, para señalizar que la persona se ha retirado de un sector determinado.
//También habrá que restar 1 a la currentOcupation.

//ACLARACIÓN: en la tabla en la base de datos, una vez actualizado el campo state, la columna aparecerá vacía (no dirá "checked out"), pues en realidad ahí solo acepta lo que configuramos como ENUM desde un principio, y por un tema tiempo preferimos no hacer de nuevo migración.

describe('Updating field "state" of a certain area, from "accepted" to "checked out", to indicate the person left that sector.', () =>{
    it ('Return code 201 if state has been updated sucessfully.', (done) => {

        axios({
            method: 'put',
            url: 'http://localhost:7000/requests?id_guest=26237497&id_area=1&state=Checked%20out', 
            data: {
                id_guest: 26237497,
                id_area: 1,
                state:"Checked out"
                }
        }).then(response => {
            assert.equal(response.status, 201) //quiero asertar que el response.status sea igual a 201.
            done()   
        
        })
    })
})