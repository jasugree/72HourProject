const todaysDate = (date) => {
  let date = new Date()
  date.setDate(date.getDate() - 5)
  date = date.toLocaleDateString().split('/')
  date[0] = date[0] < 10 ? '0'+date[0] : date[0]
  date[1] = date[1] < 10 ? '0'+date[1] : date[1]
  return [date[2],date[0],date[1]].join('-')
}

export default todaysDate