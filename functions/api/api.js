const express = require('express')
const router = express.Router()
const user = require('./user/user')
// const test_config = require('./test/test_config')
// const test_role_middleware = require('./test/test_role')
const mail = require('./mail/mail')

// /api endpoints
router.use('/users',user) //el middleware aca es para testear
router.use('/mail',mail)

router.get('/test', (req, res) => {
    res.status(200).send({ message: 'Hello Api!' })
});

module.exports = router;
