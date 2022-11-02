const checkAuth = async (request, response, next) => {
  try {
    const userId = request.session.userId;

    if (!userId) response.redirect("/login");

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkAuth;
