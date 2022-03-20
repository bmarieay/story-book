module.exports.ensureAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        //continue
        return next();
    } else {
        //user not authorized to the route in
        res.redirect('/login');
    }
}

//prevent authenticated user to log in again
module.exports.ensureGuest = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/dashboard');
    } else {
        return next();
    }
}