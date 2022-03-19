const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const connectDB = require('./config/db');

//load configurations
dotenv.config({ path: './config/config.env'});

connectDB();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));




//routes
app.use('/', require('./routes/index'));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
