const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
//ensure a user is authenticated to protect dashboard route
//ensure a user is a guest to prevent loggin in again
const {ensureAuthentication, ensureGuest} = require('../middleware/authentication');


// //@DESC         view all posts from diff users
// //@ROUTE        GET /
// router.get('/:id/edit', (req, res) => {
//     res.send('EDITING A SINGLE POST');
// })

//@DESC         login page
//@ROUTE        GET /login
router.get('/login', ensureGuest, (req, res) => {
    res.render('users/login');
})

//@DESC         logout user
//@ROUTE        GET /logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

//@DESC         Dashboard (user posts)
//@ROUTE        GET /dashboard
router.get('/dashboard', ensureAuthentication, async (req, res) => {
    const stories = await Story.find({user: req.user.id});
    try {
        return res.render('users/dashboard', 
        {
            name: req.user.firstName,
            stories
        })
    } catch (error) {
        console.log(error);
    }
})

// //@DESC         view all posts from diff users
// //@ROUTE        GET /
// router.get('/:id', (req, res) => {
//     res.send('VIEWING SINGLE POST');
// })


module.exports = router;