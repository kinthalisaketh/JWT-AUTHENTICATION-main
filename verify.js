const User = require('../model/user');

const verify = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser.verified == false) {
      return res.status(401).send('User Not Validated');
    }
  } catch (err) {
    console.error(err);
    return res.status(401).send('Error Occured  while verifying user');
  }
  return next();
};

module.exports = verify;
