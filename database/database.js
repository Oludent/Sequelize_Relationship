const { Sequelize } = require('sequelize');

const sequelize = new Sequelize ('backendDB', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;