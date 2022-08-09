const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override')
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

//method overrride
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

//logging
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))

//handlebar helpers
const { formatDate, stripHTMLTags, shortenDisplay, editIcon, editSelect } = require('./helpers/hbs')

//handlebars
app.engine('.hbs', exphbs.engine({ 
  extname: '.hbs', 
  defaultLayout: 'main', 
  helpers: {
    formatDate,
    stripHTMLTags,
    shortenDisplay,
    editIcon,
    editSelect,
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

//set global variable
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

//public folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/thoughts', require('./routes/thoughts'))

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))