const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const {ensureAuthentication} = require('../middleware/authentication');
const Story = require('../models/Story');
//cut longer stories and give permission to editing
const {cutBody, showEditIcon} = require('../helpers/ejs');


//@DESC         view all posts from diff users
//@ROUTE        GET /stories
router.get('/', async(req, res) => {
    try {
        const stories = await Story.find({status: 'public'})
        .populate('user')
        .sort({createdAt: 'desc'});
        console.log(showEditIcon);
        return res.render('stories/index', 
        {
            cutBody, showEditIcon, stories
        });
    } catch (error) {
        console.log(error);
    }
})

//@DESC         add the new story to database
//@ROUTE        POST /stories/new
router.get('/new', ensureAuthentication, (req, res) => {
    res.render('stories/new');
})


router.get('/edit', ensureAuthentication, (req, res) => {
    //TODO: EDIT FORM AND PATCH ROUTE
    res.send("edit form");
})

//@DESC         view single post
//@ROUTE        GET /stories/:id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const story = await Story.findById(id);
        return res.render('stories/show', {story});
    } catch (error) {
        console.log(error);
    }
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