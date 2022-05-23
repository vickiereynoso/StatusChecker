'use strict';
const { randBoolean } = require('@ngneat/falso')

module.exports = {
  async up (queryInterface, Sequelize) {

    let rooms = []

    for(var i=rooms.length; i<50; i++){
          rooms.push({
          //occupied : true,
          capacity : 2,
        })
      }          
    for(var i=rooms.length; i<100; i++){
          rooms.push({
          //occupied : randBoolean(),
          capacity : 3,
          })
        }
    for(var i=rooms.length; i<150; i++){
          rooms.push({
          //occupied : randBoolean(),
          capacity : 4,
          })
        }
 
  await queryInterface.bulkInsert('rooms', rooms, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
