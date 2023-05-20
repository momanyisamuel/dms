'use strict';

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(`${process.env.DB_URL}`, {
  dialectOptions: {
    charset: 'utf8'
  }});
console.log(sequelize)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
