export const formatNum = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export const round = (value, precision) => {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}
