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
      const { userId } = request.session;

      const user = await User.findOne({
        where: { id: userId },
        include: Tought,
        plain: true,
      });

      if (!user) response.redirect("/login");

      const toughts = await JSON.parse(JSON.stringify(user.Toughts));

      response.render("toughts/dashboard", { toughts: toughts });
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
        UserId: userId,
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
