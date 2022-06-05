'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rating.belongsTo(models.Area, {
        foreignKey: 'id_area'
      })
      Rating.belongsTo(models.Request, {
        foreignKey: 'id_area'
      })  
    }
  }
  Rating.init({
    id_area: DataTypes.INTEGER,
    id_request: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    review: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};