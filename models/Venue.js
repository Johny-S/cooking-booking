const { Schema, model } = require('mongoose');

const venueSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  address: {
    required: true,
    type: String
  },
  geo: {
    required: true,
    type: Object
  },
  phone: {
    required: true,
    type: String
  },
  web: {
    required: true,
    type: String
  },
  img: {
    required: true,
    type: String
  },
  from: {
    required: true,
    type: String
  },
  to: {
    required: true,
    type: String
  },
  capacity: {
    required: true,
    type: Number
  },
  price: {
    required: true,
    type: Number
  },
  options: {
    pastry: Boolean,
    gastro: Boolean,
    cold: Boolean
  }
});

module.exports = model('Venue', venueSchema);
