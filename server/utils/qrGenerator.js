// QR Code Generator
export const generateQR = (bookingId) => {
  // Generate QR code for ticket
  // Can use 'qrcode' npm package
  return `QR_${bookingId}_${Date.now()}`
}

export const generateTicketNumber = () => {
  return `TKT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
