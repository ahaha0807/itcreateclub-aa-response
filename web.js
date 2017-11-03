let express = require('express')
let app = express()
let fs = require('fs')

app.get('/', (req, res) => {
    fs.readFile('./aa.txt', 'utf8', (err, text) => {
        res.send(text)
    })
})

app.get('/html', (req, res) => {
    fs.readFile('./aa.txt', 'utf8', (err, text) => {
        res.send('<pre>'+ text + '</pre>')
    })        
})

app.use(express.static('public'))

app.listen(process.env.PORT || 8080, () => {
    console.log('server is running on ' + process.env.PORT)
})