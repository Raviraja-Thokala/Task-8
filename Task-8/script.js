document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const seat = formData.get('seat');
  
    // Send data to backend for CRUD operation (e.g., booking)
    // Example AJAX call or fetch request to backend API
    fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, seat }),
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('bookingStatus').textContent = `Seat ${data.seat} booked for ${data.name}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  