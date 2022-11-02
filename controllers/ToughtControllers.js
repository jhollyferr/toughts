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

  static createToughtSave = async (request, response) => {
    try {
      const { title } = request.body;
      const { userId } = request.session;

      const tought = await Tought.create({
        title,
        userId,
      });

      request.flash("message", "Pensamento criado com sucesso.");
      
      request.session.save(() => {
        response.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.error(error);
    }
  };
};
