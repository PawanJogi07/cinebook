import React, { useState } from 'react';

export default function SeatLayout() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  return (
    <div className="seat-layout">
      <h2>Select Your Seats</h2>
      <div className="seat-grid">
        {Array.from({ length: 60 }, (_, i) => (
          <button
            key={i}
            className={`seat ${selectedSeats.includes(i) ? 'selected' : ''}`}
            onClick={() => toggleSeat(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <p>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.map(s => s + 1).join(', ') : 'None'}</p>
    </div>
  );
}
