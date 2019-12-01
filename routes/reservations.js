const { Router } = require('express');
const Reservation = require('../models/Reservation');

const router = Router();

router.get('/', async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
});

router.post('/new', async (req, res) => {
  const reservation = await new Reservation({
    ...req.body,
    data: Date.parse(req.body.date)
  });
  await reservation.save();
  const reservations = await Reservation.find();
  res.json(reservations);
});

module.exports = router;
