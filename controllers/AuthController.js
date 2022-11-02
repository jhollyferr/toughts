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
};
