var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require('dotenv').config();

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Recuperacion',
            version: '1.0.0'
        }
    },
    apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
