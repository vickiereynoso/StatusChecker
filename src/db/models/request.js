'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request.init({
    id_area: DataTypes.INTEGER,
    id_guest: DataTypes.INTEGER,
    state: DataTypes.STRING,
    timeCheckIN: DataTypes.DATE,
    timeCheckOUT: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};