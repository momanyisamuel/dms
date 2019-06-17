'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    number: DataTypes.STRING,
    customername:DataTypes.STRING,
    customeraddress:DataTypes.STRING,
    date: DataTypes.STRING,
    total: DataTypes.INTEGER
  }, {});
  Invoice.associate = function(models) {
   
    Invoice.hasMany(models.Item, { onDelete: 'cascade', hooks: true })
  };
  return Invoice;
};