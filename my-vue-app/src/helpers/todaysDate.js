const todaysDate = () => {
  let today = new Date()
  today.setDate(today.getDate() - 5)
  today = today.toLocaleDateString().split('/')
  today[0] = today[0] < 10 ? '0'+today[0] : today[0]
  today[1] = today[1] < 10 ? '0'+today[1] : today[1]
  return [today[2],today[0],today[1]].join('-')
}

export default todaysDate