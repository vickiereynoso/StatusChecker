'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Guest.hasMany(models.Request, {
        foreignKey: 'id_guest'
      })
    }
  }
  Guest.init({
    id_room: DataTypes.INTEGER,
    identificationNumber: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};