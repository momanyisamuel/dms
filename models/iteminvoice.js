'use strict';
module.exports = (sequelize, DataTypes) => {
  const ItemInvoice = sequelize.define('ItemInvoice', {
    itemId: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  ItemInvoice.associate = function(models) {
    ItemInvoice.hasMany(models.Invoice)
    ItemInvoice.hasMany(models.Item)
  };
  return ItemInvoice;
};