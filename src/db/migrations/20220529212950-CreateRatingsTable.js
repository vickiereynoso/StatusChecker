'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', { 
      id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        initialAutoIncrement: 1,
        },
        id_area:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        },
        id_request:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        },
        score:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        },
        review:{
        type: Sequelize.DataTypes.String(300),
        allowNull: false,
        unique: true
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
    await queryInterface.dropTable('ratings');
  }
};
