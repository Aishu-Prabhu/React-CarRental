import React, { useEffect, useState } from 'react';
import './BookingHistory.css'; // Import the CSS file

// Utility function to calculate inclusive days difference
function calculateDays(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  return Math.ceil((e - s) / (1000 * 3600 * 24)) + 1;
}

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage or replace with API call
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div className="booking-history-container">
      <h2 className="booking-history-title">My Booking History</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">You have no past bookings.</p>
      ) : (
        <div className="table-responsive">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Car</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => {
                // Calculate price if total_cost not present
                const price =
                  booking.total_cost !== undefined
                    ? booking.total_cost
                    : booking.cost_per_day !== undefined
                    ? calculateDays(booking.start_date, booking.end_date) * booking.cost_per_day
                    : '-';

                return (
                  <tr key={index}>
                    <td>{booking.car_name || booking.name || 'N/A'}</td>
                    <td>{booking.start_date}</td>
                    <td>{booking.end_date}</td>
                    <td>₹{price !== '-' ? price : '-'}</td>
                    <td>
                      <span className={`status-badge ${booking.status || 'confirmed'}`}>
                        {booking.status || 'confirmed'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
