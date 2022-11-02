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

  static logout = async (request, response) => {
    try {
      request.session.destroy();
      response.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  };

  static loginPost = async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      request.flash("message", "Usuário não encontrado");

      response.render("auth/login");
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      request.flash("message", "Senha ou e-mail inválido");

      response.render("auth/login");
      return;
    }

    request.session.userId = user.id;

    request.flash("message", "Autenticação realizada com sucesso");

    request.session.save(() => {
      response.redirect("/");
    });
  };
};
