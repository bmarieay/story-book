const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const {ensureAuthentication} = require('../middleware/authentication');
const Story = require('../models/Story');

//@DESC         view all posts from diff users
//@ROUTE        GET /stories
router.get('/', (req, res) => {
    res.render('stories/index');
})



//@DESC         add the new story to database
//@ROUTE        POST /stories/new
router.get('/new', ensureAuthentication, (req, res) => {
    res.render('stories/new');
})


//@DESC         add the new story to database
//@ROUTE        POST /stories/new
router.post('/new', ensureAuthentication, urlencodedParser, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        //redirect to my dashboard after saving
        res.redirect('/dashboard');
    } catch (error) {   
        console.log(error);
    }
})

module.exports = router;