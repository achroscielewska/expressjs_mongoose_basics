# bookshelfAPI
Description TO_DO

## Libraries
* [express](https://www.npmjs.com/package/express)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [body-parser](https://www.npmjs.com/package/body-parser) //https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
* [mongoose](https://www.npmjs.com/package/mongoose)

## Development server

Run `npm run start:server` for a dev server. The app will automatically reload if you change any of the source files.

## APP set up

1. to set up app in express - perform [APP set up](https://github.com/achroscielewska/expressjs_basics/blob/master/README.md) from expressjs_basics project
2. install mongoose library
3. in ./src/environments folder - add new file environment.js

```javascript
const environment = {
  production: false,
  db_url: "mongodb://localhost:27017/bookshelf",
  version: "0.1"
};

module.exports = environment;
```
In this project local Monogo DB is used.

4. in app.js  setup connection to DB and import mongoose.

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const environment = require('../environments/environment');
const mongoose = require('mongoose');

const URL_DB = environment.db_url;

const app = express();

// connection to mongoDB
mongoose
    .connect(URL_DB, { useNewUrlParser: true })
    .then(() => { console.log("Connected to database!"); })
    .catch(() => { console.log("Connection to mongoDB failed!"); });

// CORS configuration https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
```

5. after reload in terminal the message "Connected to database!" should show up


## mongoDB basics commands

show dbs - show DBs
use school - create new DB or if exist set as current
db.createCollection("student")
show collections 
db.student.insert( { firstName: "Jan", lastName: "Kowalski", level: "one"} )
db.student.update( { lastName: "Kowalski"},  { $set: { level: "two" } } ) 
db.student.update( { lastName: "Kowalski"},  { $set: { hobby: "kites" } }, { $upsert: true } )
db.student.remove( {  lastName: "Kowalski" } )
db.student.remove( { _id: ObjectId("5cdd38fade3c61f751e6d10b" ) } )
db.student.find().pretty()
db.student.find( {  lastName: "Kowalski" }).pretty()
db.student.find( { age: { $gt: 20 } } )
db.student.find( { age: { $lt: 20 } } )
db.student.find( { classes: {$in: ['history', 'math'] } } ).pretty()
