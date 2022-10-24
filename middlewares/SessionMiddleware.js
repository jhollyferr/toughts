module.exports = class SessionMiddleware {
  static async store(request, response, next) {
    try {
      if (request.session.userId) response.locals.session = request.session;

      next();
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  }
};
