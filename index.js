const express = require('express');
const { isNameValid, isPasswordValid } = require('./utils/validator');
const { isPasswordValidLength } = require('./middlewares/middleware.js');
const isStrongPassword = require('validator/lib/isStrongPassword');
const isEmail = require('validator/lib/isEmail');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.urlencoded({ extended: false }));
const PORT = 5000;


app.get('/', (req, res) => {
  res.send(`
  <form  method="post">
  <label for="name">Name</label>
  <input type="text" name="name">

  <label for="email">Email</label>
  <input type="text" name="email" id="email">

  <label for="password">Password</label>
  <input type="password" name="password">

  <input type="submit" value="Submit">
</form>`);
});

const bodyValidatePassword = body('password')
  .isLength({ min: 4, max: 15 })
  .withMessage('Invalid password from express-validator');

const bodyValidateEmail = body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Invalid email from express-validator')

// Saas => software as a service
app.post('/', bodyValidatePassword, bodyValidateEmail, (req, res) => {
  const { name, password, email } = req.body;
  console.log(name, password, email);

  const errors = validationResult(req);

  // Guard clauses!
  if (!isNameValid(name)) {
    return res.status(400).send('Invalid name');
  }

  // if (!isPasswordValid(password)) {
  //   return res.status(400).send('Invalid password');
  // }

  // if (!isEmail(email)) {
  //   return res.status(400).send('Weak email!');
  // }

  // if (!isStrongPassword(password)) {
  //   return res.status(400).send('Weak password!');
  // }

  console.log(errors);
  if (!
    errors.isEmpty()) {
    return res.status(404).send(`Error msg: ${errors.array()[0].msg}`);
  }

  res.send('Ok!');
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}...`));