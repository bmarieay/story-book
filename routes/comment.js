const express = require('express');
//merge the comment route from the parent route
const router = express.Router({mergeParams: true});
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const Comment = require('../models/Comment');
const Story = require('../models/Story');
const {ensureAuthentication} = require('../middleware/authentication');

//@DESC         create a comment associated with the post 
//@ROUTE        POST /stories/:id/comments
router.post('/', ensureAuthentication, urlencodedParser, async(req, res) => {
    try {
        //get the story commented on 
        const story = await Story.findById(req.params.id);

        //save the comment to the database
        req.body.comment = req.body.comment.replace(/(<([^>]+)>)/gi, "");
        const comment = await Comment.create({body: req.body.comment});
        comment.author = req.user.id;

        //connect the comment to the post
        story.comments.push(comment);
        await story.save();
        await comment.save();
        res.redirect(`/stories/${story.id}`);
    } catch (error) {
        console.log(error);
    }
})

//@DESC         delete a comment associated with the post 
//@ROUTE        DELETE /stories/:storyid/comments/:reviewid
router.delete('/:commentId', ensureAuthentication, async(req, res) => {
    try {
        //delete the comment and delete it on the post
        const {id, commentId} = req.params;
        await Story.findByIdAndUpdate(id, { $pull: { comments: commentId } })
        await Comment.findByIdAndDelete(commentId);
        res.redirect(`/stories/${id}`);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;