const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
const api  = require('./api/api')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.use(bodyParser.json())
        server.use(bodyParser.urlencoded({ extended: true }))
        server.use('/api',api)

        server.get('*', (req, res) => {
            return handle(req, res) //esto hace que lo maneje next si no 
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })