const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Token = require('../model/token');

router.get('/:id/:token', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send('Invalid link');

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send('Invalid link');

    await User.findOne({ _id: user._id }).updateOne({ verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send('email verified sucessfully');
  } catch (error) {
    console.log(error);
    res.status(400).send('An error occured');
  }
});

module.exports = router;
