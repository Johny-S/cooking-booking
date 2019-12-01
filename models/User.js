const { Schema, model, connect } = require('mongoose');

const userSchema = new Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

const User = model('User', userSchema);

const uri = 'mongodb+srv://dbUser:xpxA7Dwo4S53xNJo@elbrusbot-i8nza.mongodb.net/CookingBooking?retryWrites=true&w=majority';
connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = model('User', userSchema);
