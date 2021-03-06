const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const {ensureAuthentication} = require('../middleware/authentication');
const Story = require('../models/Story');
//cut longer stories and give permission to editing
const {cutBody, showEditIcon, selectOption, showNumComments, showDeleteIcon} = require('../helpers/ejs');
const ApplicationError = require('../utils/ApplicationError');



//@DESC         view all posts from diff users
//@ROUTE        GET /stories
router.get('/', async(req, res) => {
    try {
        const stories = await Story.find({status: 'public'})
        .populate('user').populate('comments')
        .sort({createdAt: 'desc'});

        return res.render('stories/index', 
        {
            cutBody, showEditIcon, stories, showNumComments
        });
    } catch (error) {
        console.log(error);
    }
})

//@DESC         add the new story to database
//@ROUTE        GET /stories/new
router.get('/new', ensureAuthentication, (req, res) => {
    res.render('stories/new');
})


//@DESC         update the post to the server
//@ROUTE        PUT /stories/:id
router.put('/:id', ensureAuthentication, urlencodedParser, async(req, res) => {
    try {
        //get the id, update, then redirect to show route
        const {id} = req.params;
        const title = req.body.title;
        const body = req.body.body;
        req.body.body = body.replace(/(<([^>]+)>)/gi, "");
        req.body.title = title.replace(/(<([^>]+)>)/gi, "");
        await Story.findByIdAndUpdate(id, req.body);
        return res.redirect(`/stories/${id}`);
    } catch (error) {
        console.log(error);
    }
})


//@DESC         delete the post to the database
//@ROUTE        DELETE /stories/:id
router.delete('/:id', ensureAuthentication, async(req, res) => {
    try {
        const {id} = req.params;
        const story = await Story.findById(id).populate('user');

        if(!story){
            throw new ApplicationError("Story trying to delete doesn't exist", 404);
        }


        if(req.user.id != story.user.id){
            return res.redirect('/stories');
        } else {
            await Story.findByIdAndDelete(id);
            res.redirect('/dashboard');
        }
    } catch (error) {
        console.log(error);
    }
})


//@DESC         load the edit form
//@ROUTE        GET /stories/:id/edit
router.get('/:id/edit', ensureAuthentication, async (req, res) => {
    try {
        const {id} = req.params;
        const story = await Story.findById(id);

        if(!story){
            throw new ApplicationError("Cannot find that story", 404);
        }

        if(req.user.id != story.user){
            return res.redirect('/stories');
        } else {
            return res.render('stories/edit',{selectOption, story});
        }
    
    } catch (error) {
        console.log(error);
    }

})


//@DESC         view single post
//@ROUTE        GET /stories/:id
router.get('/:id', ensureAuthentication, async (req, res) => {
    const {id} = req.params;
    try {
        //populate the nested schemas for template access
        const story = await Story.findById(id).populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        })
        return res.render('stories/show', {story, showDeleteIcon});
    } catch (error) {
        console.log(error);
    }
})


//@DESC         add the new story to database
//@ROUTE        POST /stories/new
router.post('/new', ensureAuthentication, urlencodedParser, async (req, res) => {
    try {
        req.body.user = req.user.id;
        const title = req.body.title;
        const body = req.body.body;
        req.body.body = body.replace(/(<([^>]+)>)/gi, "");
        req.body.title = title.replace(/(<([^>]+)>)/gi, "");
        await Story.create(req.body);
        //redirect to my dashboard after saving
        res.redirect('/dashboard');
    } catch (error) {   
        console.log(error);
    }
})

module.exports = router;