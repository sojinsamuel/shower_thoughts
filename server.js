const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');

//load config
dotenv.config({ path: './config/config.env'})
//passport config
require('./config/passport')(passport)

const PORT = process.env.PORT || 5000
connectDB();


const app = express();

//body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//logging
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))

//handlebar helpers
const { formatDate, stripHTMLTags, shortenDisplay } = require('./helpers/hbs')

//handlebars
app.engine('.hbs', exphbs.engine({ 
  extname: '.hbs', 
  defaultLayout: 'main', 
  helpers: {
    formatDate,
    stripHTMLTags,
    shortenDisplay,
  }
}));
app.set('view engine', '.hbs');
app.set('views', './views');

//express session middleware
app.use(session({
  secret: 'penny thoughts',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//public folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/thoughts', require('./routes/thoughts'))

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))