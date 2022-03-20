const express = require('express');
const passport = require('passport');
const router = express.Router();
//passport authenticate will call serialize
//and subsequent requests will call deserialize along with express session



//@DESC         authenticate with Google
//@ROUTE        GET /auth/google
router.get('/google', 
    passport.authenticate('google', {
        scope: ['profile']
    })
)

//@DESC         Google authentication callback
//@ROUTE        GET /auth/google/callback
router.get('/google/callback', 
    passport.authenticate('google', {failureRedirect: '/login'}), 
        (req, res) => {
            res.redirect('/dashboard');
        }
)


module.exports = router;