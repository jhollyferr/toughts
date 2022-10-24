const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "root", "toughts", {
  host: "mysql",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectamos com sucesso!");
} catch (error) {
  console.error(`Não foi possível conectar`);
}

module.exports = sequelize;
