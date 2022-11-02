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

    } catch (error) {
      console.log(error);
    }
  };
};
