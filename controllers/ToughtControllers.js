const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtController {
  static showToughts = (request, response) => {
    response.render("toughts/home");
  };
};
