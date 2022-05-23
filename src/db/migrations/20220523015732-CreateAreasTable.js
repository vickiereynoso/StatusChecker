'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('areas', { 
          
        id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        initialAutoIncrement: 1,
        },
        name:{
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false
        },
        description:{
        type: Sequelize.DataTypes.STRING(200)
        },
        maxCapacity:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
        },
        currentOcupation:{
        type: Sequelize.DataTypes.INTEGER
        },
        openingHour:{
        type: Sequelize.DataTypes.STRING
        },
        closingHour:{
        type: Sequelize.DataTypes.STRING
        },
        state:{
        type: Sequelize.DataTypes.ENUM('Cerrado','Lleno','Disponible'),
        defaultValue: 'Disponible'
        },
        category:{
        type: Sequelize.DataTypes.ENUM('Apto Niños','Aire Libre','Tratamientos','Climatizado'),
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
    await queryInterface.dropTable('areas');
  }
};
