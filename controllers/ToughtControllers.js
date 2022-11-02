const Tought = require("../models/Tought");
const User = require("../models/User");

const { Op } = require("sequelize");

module.exports = class ToughtController {
  static showToughts = async (request, response) => {
    try {
      const { search, order } = request.query;

      const orderBy = order === "old" ? "asc" : "desc";

      const toughts = await Tought.findAll({
        raw: true,
        nest: true,
        include: User,

        where: {
          title: { [Op.like]: `%${search ?? ''}%` },
        },

        order: [["createdAt", orderBy]],
      });

      response.render("toughts/home", {
        toughts,
        search,
        toughtsQty: toughts.length === 0 ? false : toughts.length,
      });
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

      const emptyToughts = toughts.length === 0;

      response.render("toughts/dashboard", { toughts: toughts, emptyToughts });
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

  static removeTought = async (request, response) => {
    try {
      const { id } = request.body;
      const { userId } = request.session;

      await Tought.destroy({
        where: { id, UserId: userId },
      });

      request.flash("message", "Pensamento removido com sucesso.");

      request.session.save(() => {
        response.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.error(error);
    }
  };

  static updateTought = async (request, response) => {
    try {
      const { id } = request.params;

      const tought = await Tought.findOne({ where: { id }, raw: true });

      response.render("toughts/edit", { tought });
    } catch (error) {
      console.error(error);
    }
  };

  static updateToughtSave = async (request, response) => {
    try {
      const { id, title } = request.body;

      await Tought.update({ title }, { where: { id } });

      request.flash("message", "Pensamento atualizado com sucesso.");

      request.session.save(() => {
        response.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.error(error);
    }
  };
};
