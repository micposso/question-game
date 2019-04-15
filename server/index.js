const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('/avatars/girl-shades.svg, /avatars/man-glasses.svg, /avatars/man-short-hair.svg, ')
})

app.use(express.static('public'))

app.listen(port, () => console.log('Listening in port :' + port))


