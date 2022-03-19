const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

//@DESC         Login/landing page
//@ROUTE        GET /
router.get('/', (req, res) => {
    res.send('login');
})

//@DESC         Dashboard
//@ROUTE        GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('stories/index')
})


module.exports = router;