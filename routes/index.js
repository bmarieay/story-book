const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

//@DESC         view all posts from diff users
//@ROUTE        GET /
router.get('/', (req, res) => {
    res.render('stories/index');
})

//@DESC         view all posts from diff users
//@ROUTE        GET /
router.get('/:id/edit', (req, res) => {
    res.send('EDITING A SINGLE POST');
})

//@DESC         login page
//@ROUTE        GET /login
router.get('/login', (req, res) => {
    res.render('login');
})
//@DESC         Dashboard (user posts)
//@ROUTE        GET /dashboard
router.get('/dashboard', (req, res) => {
    res.send('DASHBOARD')
})

//@DESC         view all posts from diff users
//@ROUTE        GET /
router.get('/:id', (req, res) => {
    res.send('VIEWING SINGLE POST');
})







module.exports = router;