import apiClient from './api'

export const bookingService = {
  bookSeats: (bookingData) => apiClient.post('/bookings', bookingData),
  getBookings: () => apiClient.get('/bookings'),
  cancelBooking: (id) => apiClient.delete(`/bookings/${id}`),
}

export default bookingService
