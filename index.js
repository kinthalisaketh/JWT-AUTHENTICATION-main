require('dotenv').config();
const express = require('express');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const verifyUser = require('./routes/verifyUser');
require('./config/database').mongoConnect();
const app = express();
const auth = require('./middleware/auth');
const verify = require('./middleware/verify');
port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Healthcheck Ok' });
});

//Welcome
app.post('/welcome', auth, (req, res) => {
  res.status(200).send(req.user);
});
//Login
app.use('/login', verify, loginRouter);
//Login
app.use('/register', registerRouter);
//verifyUser
app.use('/user/verify', verifyUser);

app.listen(port, () => {
  console.log(`Webserver listening on port ${port}`);
});
