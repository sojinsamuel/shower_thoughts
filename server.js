const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');

//load config
dotenv.config({ path: './config/config.env'})

connectDB();


const app = express();

//logging
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const PORT = process.env.PORT || 5000


//handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs')
app.set('views', './views');


//public folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/index'))

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))