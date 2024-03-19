export const auth = (req, res, next) => {
  // Write your code here
  if (req.session.email) {
    next();
  } else {
    res.render("msgPage", { message: "login first to access secure page" });
  }
};
