let express = require('express')
let app = express()
let fs = require('fs')
let rp = require('request-promise')

app.get('/', (req, res) => {
    fs.readFile('./aa.txt', 'utf8', (err, text) => {
        res.send(text)
    })
})

app.get('/html', (req, res) => {
    let isSpecified = req.query.url !== undefined

    if (isSpecified) {
        rp('http://process.filestackapi.com/' +
                process.env.FILE_STACK_APIKEY +
                '/ascii=background:black,size:90,colored:true,reverse:true/' +
                req.query.url)
            .then((ascii) => {
                res.send(ascii)
            }).catch((err) => {
                if (process.env.FILE_STACK_APIKEY === undefined) {
                    res.send('API keyがだめだよ')
                }
                res.send('ごめんなさい。何らかの原因でAA化に失敗しました。')
            })
    } else {
        fs.readFile('./itc-logo.html', 'utf8', (err, text) => {
            res.send(text)
        })
    }
})

app.use(express.static('public'))

app.listen(process.env.PORT || 8080, () => {
    console.log('server is running on ' + process.env.PORT)
})