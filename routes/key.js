const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ key: process.env.MAPS_API_KEY });
});

module.exports = router;
