const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory database for simplicity
let bookings = [];

app.use(bodyParser.json());

// Create operation (book a seat)
app.post('/api/bookings', (req, res) => {
  const { name, seat } = req.body;
  const newBooking = { name, seat };

  bookings.push(newBooking);
  res.json(newBooking);
});

// Read operation (get all bookings)
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Update operation (update a booking)
app.put('/api/bookings/:seat', (req, res) => {
  const seat = req.params.seat;
  const { name } = req.body;

  const bookingIndex = bookings.findIndex(booking => booking.seat === parseInt(seat));
  if (bookingIndex !== -1) {
    bookings[bookingIndex].name = name;
    res.json(bookings[bookingIndex]);
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

// Delete operation (cancel a booking)
app.delete('/api/bookings/:seat', (req, res) => {
  const seat = req.params.seat;
  const bookingIndex = bookings.findIndex(booking => booking.seat === parseInt(seat));

  if (bookingIndex !== -1) {
    const deletedBooking = bookings.splice(bookingIndex, 1);
    res.json(deletedBooking[0]);
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
