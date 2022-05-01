const express = require("express");
const router = express.Router({mergeParams: true});
const Story = require("../models/Story");
const User = require("../models/User");


//@DESC         add a reaction associated with a user AND a post
//@ROUTE        POST /stories/:id/reactions
router.post('/', async(req, res) => {
    try {
        res.send('UPDATE REACTION SERVER');
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;