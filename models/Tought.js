const { DataTypes } = require("sequelize");

const connection = require("../database/connection");

const User = require("./User");

const Tought = connection.define("Tought", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;
