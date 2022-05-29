'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('guests', { 
      id:{
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      initialAutoIncrement: 1,
      },
      id_room:{
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      },
      identificationNumber:{
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      unique: true
      },
      firstName:{
      type: Sequelize.DataTypes.STRING(30),
      allowNull: false,
      },
      lastName:{
      type: Sequelize.DataTypes.STRING(30),
      allowNull: false,
      },
      age:{
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      },
      gender:{
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
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
    await queryInterface.dropTable('guests');
  }
};
