const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const morgan = require('morgan');
const moment = require('moment');
const favicon = require('serve-favicon');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const connectDB = require('./config/db');
const ApplicationError = require('./utils/ApplicationError');
const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');



//load configurations
dotenv.config({ path: './config/config.env'});

require('./config/passport')(passport);

connectDB();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}

//session middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}))


//passport middleware (session is used for passport deserialization)
app.use(passport.initialize());
app.use(passport.session());

//prevent nosql injection
app.use(mongoSanitize());

//method override for post and delete
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.svg')));
//get the user for every route
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.moment = moment;
    next();
})

//routes
app.use('/stories', require('./routes/story'));
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


//ROUTE NOT FOUND
app.all('*', (req, res, next) => {
    next(new ApplicationError('Page not Found', 404))
})

// error handler
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', {err});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
