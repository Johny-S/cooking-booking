const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = Router();
const saltRounds = 10;

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ msg: 'Please fill all fields' });
  const user = await User.findOne({ email });
  if (!user) return res.json({ msg: 'No user found' });
  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) throw err;
    if (result) {
      const token = await jwt.sign(
        {
          id: user.id
        },
        process.env.JWT,
        { expiresIn: 3600 }
      );
      return res.json({ user, token });
    }
    return res.json({ msg: 'Password/Email is incorrect' });
  });
});

// check for logged user
router.get('/user', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ msg: 'Please fill all fields' });
  const found = await User.findOne({ email });
  if (found) return res.json({ msg: 'User with this email already exists' });
  // create user with hashed password
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    // Store hash in your password DB.
    if (err) throw err;
    const user = new User({ email, password: hash });
    await user.save();
    const token = await jwt.sign(
      {
        id: user.id
      },
      process.env.JWT,
      { expiresIn: 3600 }
    );
    return res.json({ user, token });
  });
});
// all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
