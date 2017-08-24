module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(403).send({ error: "User not signed in" });
  }
  next();
};
