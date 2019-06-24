'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
      number: DataTypes.STRING,
      customername:DataTypes.STRING,
      principalMember:DataTypes.STRING,
      companyName: DataTypes.STRING,
      customeraddress:DataTypes.STRING,
      date: DataTypes.STRING,
      total: DataTypes.INTEGER,
      paymentType: DataTypes.STRING,
      branch: DataTypes.STRING,
      attendingDoctor: DataTypes.STRING
  }, {});
  Invoice.associate = function(models) {
   
    Invoice.hasMany(models.Item, { onDelete: 'cascade', hooks: true })
  };
  return Invoice;
};