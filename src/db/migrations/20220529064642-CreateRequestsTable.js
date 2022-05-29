'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('requests', { 
      id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        initialAutoIncrement: 1,
        },
        id_area:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
        },
        id_guest:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
        },
        state:{
        type: Sequelize.DataTypes.ENUM("Accepted", "Declined"),
        },
        createdAt:{
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
        },
        updatedAt:{
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
        }
        
    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('requests');

  }
};
