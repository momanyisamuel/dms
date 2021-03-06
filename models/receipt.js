'use strict';
module.exports = (sequelize, DataTypes) => {
  const Receipt = sequelize.define('Receipt', {
      number: DataTypes.STRING,
      customer: DataTypes.STRING,
      customeraddress: DataTypes.STRING,
      principalMember:DataTypes.STRING,
      companyName: DataTypes.STRING,
      date: DataTypes.STRING,
      total: DataTypes.INTEGER,
      paymentType: DataTypes.STRING,
      branch: DataTypes.STRING,
      attendingDoctor: DataTypes.STRING,
      fileNo: DataTypes.STRING,
      membershipNumber: DataTypes.STRING
  }, {});
  Receipt.associate = function(models) {
    // associations can be defined here
    Receipt.hasMany(models.Item, { onDelete: 'cascade', hooks: true })
  };
  return Receipt;
};