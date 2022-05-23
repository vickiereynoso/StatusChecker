'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', { 
        id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        initialAutoIncrement: 1,        
        },
        ocuppied:{
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        },
        capacity:{
        type: Sequelize.DataTypes.INTEGER
        },
        createdAt:{
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
        },
        updatedAt:{
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
        },
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('rooms');
  }
};
