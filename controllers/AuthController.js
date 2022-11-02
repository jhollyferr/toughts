const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login = async (request, response) => {
    try {
      response.render("auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  static register = async (request, response) => {
    try {
      response.render("auth/register");
    } catch (error) {
      console.log(error);
    }
  };

  static registerPost = async (request, response) => {
    try {
      const { name, email, password, confirmpassword } = request.body;

      if (password !== confirmpassword) {
        request.flash("message", "As senhas não conferem, tente novamente.");
        response.render("auth/register");
        return;
      }

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        request.flash("message", "O e-mail já está em uso");
        response.render("auth/register");
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      if (user) {
        request.flash("message", "Cadastro realizado com sucesso");

        request.session.userId = user.id;

        request.session.save(() => {
          response.redirect("/");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
