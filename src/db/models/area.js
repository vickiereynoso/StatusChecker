'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Area.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    maxCapacity: DataTypes.INTEGER,
    currentOcupation: DataTypes.INTEGER,
    openingHour: DataTypes.STRING,
    closingHour: DataTypes.STRING,
    state: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};