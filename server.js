const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))

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

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log('app started...'));
