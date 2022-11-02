const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtController {
  static showToughts = async (request, response) => {
    try {
      response.render("toughts/home");
    } catch (error) {
      console.error(error);
    }
  };
};
