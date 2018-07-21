const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/send_data', (req,res) => {
    console.log(req.body)
    res.send('Received something...')
})

app.listen(8081, () => {
    console.log('Listening on 8081')
})