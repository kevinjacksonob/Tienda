'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "userId" });
      Product.hasMany(models.ProductInCart, { foreignKey: "productId" });
      Product.hasMany(models.ProductInOrder, { foreignKey: "productId" });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    availableQty: DataTypes.INTEGER, 
    status: DataTypes.STRING, 
    userId: DataTypes.INTEGER, 
    productImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};