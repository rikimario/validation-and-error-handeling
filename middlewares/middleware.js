exports.isPasswordValidLength = (req, res, next) => {
  if (!req.body.password || req.body.password.length < 5) {
    return res.status(404).send('Invalid password form middleware');
  }
  next();
}