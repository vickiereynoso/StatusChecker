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
      Request.hasOne(models.Area, {
        foreignKey: 'id_area'
      })
      Request.hasOne(models.Guest, {
        foreignKey: 'id_guest'
      })
    }
  }

  Request.init({
    id_area: DataTypes.INTEGER,
    id_guest: DataTypes.INTEGER,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};