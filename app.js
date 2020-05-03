const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

const admin = require('./routes/admin');
const userRoutes = require('./routes/user');
const errorController = require('./controllers/errors');

const mongoConnect = require('./database').mongoConnect;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/admin', admin.routes);
app.use(userRoutes);
app.use(errorController.get404Page);
mongoConnect(() =>{
    app.listen(3001);
})
