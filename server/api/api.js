const express = require('express')
const router = express.Router()
const user = require('./user/user')
const test_config = require('./test/test_config')
const test_role_middleware = require('./test/test_role')

// /api endpoints
router.use('/users', user) //el middleware aca es para testear

//TODO: Delete
router.use('/test/config', test_config)
router.use('/test/role', test_role_middleware)

router.get('/hello', (req, res) => {
    res.status(200).send({ message: 'Hello Api!' })
})

module.exports = router