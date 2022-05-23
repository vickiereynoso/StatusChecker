'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('treatments', { 
        id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        initialAutoIncrement: 1,        
        },
        name:{
        type: Sequelize.DataTypes.STRING
        },
       price:{
        type: Sequelize.DataTypes.INTEGER
        },
       professional:{
        type: Sequelize.DataTypes.STRING
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

    await queryInterface.dropTable('treatments');

  }
};
