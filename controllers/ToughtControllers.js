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

  static dashboard = async (request, response) => {
    try {
      response.render("toughts/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  static createTought = async (request, response) => {
    try {
      response.render("toughts/create");
    } catch (error) {
      console.error(error);
    }
  };
};
