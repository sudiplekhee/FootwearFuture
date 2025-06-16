// models/Product.js
const makeproduct = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
  });
  return Product;
};
module.exports=makeproduct
