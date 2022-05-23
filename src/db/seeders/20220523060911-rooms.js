'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let rooms = []

    for(var i=0; i<150; i++){
      rooms.push({
 /*        occupied: 
        capacity:  */
      })
    }

      await queryInterface.bulkInsert('rooms', rooms, {});
    
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('rooms', null, {});
  }
};
