const { Schema, model, connect } = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const reservationSchema = new Schema({
  date: {
    required: true,
    type: Date
  },
  venueId: {
    required: true,
    type: ObjectId
  },
  userId: {
    required: true,
    type: ObjectId
  }
});

const uri =
  'mongodb+srv://dbUser:xpxA7Dwo4S53xNJo@elbrusbot-i8nza.mongodb.net/CookingBooking?retryWrites=true&w=majority';
connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = model('Reservation', reservationSchema);
