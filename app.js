const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const connectDB = require('./config/db');


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
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/storyBooks' })
}))


//passport middleware (session is used for passport deserialization)
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/stories', require('./routes/story'));
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
