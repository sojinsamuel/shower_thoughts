const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

//load config
dotenv.config({ path: './config/config.env'})
//passport config
require('./config/passport')(passport)

connectDB();


const app = express();

//logging
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const PORT = process.env.PORT || 5000


//handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

//express session middleware
app.use(session({
  secret: 'penny thoughts',
  resave: false,
  saveUninitialized: true,
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//public folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))