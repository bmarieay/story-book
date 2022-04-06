const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const User = require('../models/User');
//ensure a user is authenticated to protect dashboard route
//ensure a user is a guest to prevent loggin in again
const {cutBody, showEditIcon} = require('../helpers/ejs');
const {ensureAuthentication, ensureGuest} = require('../middleware/authentication');


//@DESC         view user profile
//@ROUTE        GET /user/:id
router.get('/user/:id', async(req, res) => {
    const {id} = req.params;
    console.log(id);
    const user = await User.findById(id);
    const stories = await Story.find({user : user.id}).populate('user');
    res.render('users/show', 
        {
            user, stories, cutBody,
            showEditIcon
        }
    );
})

//@DESC         login page
//@ROUTE        GET /login
router.get('/', ensureGuest, (req, res) => {
    res.render('users/login');
})

//@DESC         logout user
//@ROUTE        GET /logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

//@DESC         Dashboard (user posts)
//@ROUTE        GET /dashboard
router.get('/dashboard', ensureAuthentication, async (req, res) => {
    const stories = await Story.find({user: req.user.id});
    try {
        return res.render('users/dashboard', 
        {
            name: req.user.firstName,
            stories,
            cutBody,
            showEditIcon
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