const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { hashData } = require('../utils/hash')
const app = express()

app.use(cors())
app.use(bodyParser.json())

// payload - data we want to certify
// userKey - the user requesting the certification
// typeIdentifier - the data type that we are certifying
const handleCertification = (req, res, next) => {
  const { userKey, typeIdentifier, data, hash } = req.body
  res.status(200).send(`${data} hash: ${hashData(data)}`)
}

app.post('/certify', handleCertification);
// app.use()
app.listen(3333, () => {
  console.info('app started on 3333');
})
