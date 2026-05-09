export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price)
}

export const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}
