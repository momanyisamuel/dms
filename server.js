const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
var passport = require('passport')
const session = require("express-session")
const { Client } = require('pg')

const app = express();

app.use(session({secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());
//passport config
require('./config/passport')(passport)
//handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')))
//database 
const db = require('./models');
//test db connection
db.sequelize.sync({
  force : false,
  logging : console.log
})
.then(() => {
  console.log('DB Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
// heroku connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();
app.use('/', require('./routes/login'))
app.use('/invoices',  require('./routes/invoice'))
// Receipt
app.use('/receipts',  require('./routes/receipt'))
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log('app started...'));
