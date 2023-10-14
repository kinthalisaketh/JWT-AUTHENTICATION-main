const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    //console.log({ email, password });
    //Validate User Input
    if (!email && !password) {
      res.status(400).send("All inputs are required.");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      // save user token
      user.token = token;
      // user
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
