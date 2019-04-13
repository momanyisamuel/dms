const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//database 
const db = require('./config/database');
//test db connection
db.authenticate()
.then(() => {
  console.log('DB Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


app.get('/', (req, res) => res.send('index'))

app.use('/invoices', require('./routes/invoice'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('app started...'));
