const express = require('express');
const router = express.Router();
//ensure a user is authenticated to protect dashboard route
//ensure a user is a guest to prevent loggin in again
const {ensureAuthentication, ensureGuest} = require('../middleware/authentication');

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
router.get('/login', ensureGuest, (req, res) => {
    res.render('login');
})

//@DESC         logout user
//@ROUTE        GET /logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

//@DESC         Dashboard (user posts)
//@ROUTE        GET /dashboard
router.get('/dashboard', ensureAuthentication, (req, res) => {
    res.send('DASHBOARD');
})

//@DESC         view all posts from diff users
//@ROUTE        GET /
router.get('/:id', (req, res) => {
    res.send('VIEWING SINGLE POST');
})


module.exports = router;