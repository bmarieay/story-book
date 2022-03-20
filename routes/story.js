const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//ensure a user is authenticated to protect dashboard route
//ensure a user is a guest to prevent loggin in again
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const {ensureAuthentication, ensureGuest} = require('../middleware/authentication');

//@DESC         view all posts from diff users
//@ROUTE        GET /stories
router.get('/', (req, res) => {
    res.render('stories/index');
})


//@DESC         create a new story
//@ROUTE        GET /stories/new
router.post('/new', urlencodedParser, (req, res) => {
    res.send(req.body)
})

module.exports = router;