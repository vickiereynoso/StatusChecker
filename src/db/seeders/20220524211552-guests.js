'use strict';

const {randFirstName, randLastName, randNumber, randGender } = require('@ngneat/falso')

module.exports = {
  async up(queryInterface, Sequelize){
  
    let guests = [] 
  
    for(var i=0; i<150; i++){  
  
    guests.push({
      id_room: randNumber({min: 1, max : 150}),
      identificationNumber: randNumber({min: 5000000, max : 50000000}), 
      firstName: randFirstName(), 
      lastName: randLastName(), 
      age: randNumber({min: 6, max : 75}),
      gender: randGender(),
      
    })
  }
  await queryInterface.bulkInsert('guests', guests,{});
  },
  

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('guests', null, {});

  }
};
