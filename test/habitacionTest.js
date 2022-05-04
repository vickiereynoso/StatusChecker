const {assert} = require('chai')

const Habitacion = require('../src/entities/Habitacion')

describe('Habitacion Entity', function(){
    
    let h = new Habitacion()

    beforeEach(function(){
    h.nroHabitacion = 100;

    })

    
    it('Que el número de habitacion sea mayor a 0 ', function(){

/*      .isAbove(valueToCheck, valueToBeAbove, [message]) */
        assert.isAbove(h.nroHabitacion, 100)

    })


})