const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { hashData } = require('../src/utils/hash')
const web3 = require('web3')
const app = express()

app.use(cors())
app.use(bodyParser.json())

// payload - data we want to certify
// userKey - the user requesting the certification
// typeIdentifier - the data type that we are certifying
// hash - of the data sent
const handleCertification = (req, res, next) => {
  console.log('request received')
  const { userKey, typeIdentifier, data, hash } = req.body
  if (hash === hashData(data)){
    return res.status(200).send({ message: 'Verified' })
  }
    return res.status(400).send({ message: 'Invalid request' })
}

app.post('/certify', handleCertification);
// app.use(*, handleErrors)

app.listen(3333, () => {
  console.info('app started on 3333');
})
