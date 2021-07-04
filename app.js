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

/**
 * @swagger
 *  /students:
 *   get:
 *       description: Obtener todos los estudiantes
 *       parameters:
 *        - name: id
 *          description: Id del estudiante
 *          in: query
 *       responses:
 *        200:
 *            description: Lista de Estudiantes
*/
/**
 * @swagger
 *  /students:
 *   post:
 *       description: Insertar estudiante
 *       parameters:
 *        - name: primer_nombre
 *          description: Primer nombre 
 *          in: query
 *          required: true
 *        - name: segundo_nombre
 *          description: Segundo nombre 
 *          in: query
 *          required: true
 *        - name: primer_apellido
 *          description: primer apellido
 *          in: query
 *          required: true
 *        - name: segundo_apellido
 *          description: segundo apellido
 *          in: query
 *          required: true
 *        - name: carrera
 *          description: carrera
 *          in: query
 *          required: true
 *        - name: nivel
 *          description: nivel
 *          in: query
 *          required: true  
 *       responses:
 *        200:
 *            description: Dato Ingresado Correctamente
*/
/**
 * @swagger
 *  /students:
 *   put:
 *      description: Actualizar datos estudiante
 *      parameters:
 *        - name: id
 *          description: Id del estudiante que quieren modificar
 *          in: query
 *          required: true
 *        - name: primer_nombre
 *          description: Primer nombre 
 *          in: query
 *          required: false
 *        - name: segundo_nombre
 *          description: Segundo nombre 
 *          in: query
 *          required: false
 *        - name: primer_apellido
 *          description: primer apellido 
 *          in: query
 *          required: false
 *        - name: segundo_apellido
 *          description: segundo apellido 
 *          in: query
 *          required: false
 *        - name: carrera
 *          description: carrera que sigue el alumno
 *          in: query
 *          required: false
 *        - name: nivel
 *          description: nivel que esta el alumno
 *          in: query
 *          required: false
 *      responses:
 *        200:
 *            description: Dato Actualizado
*/
/**
 * @swagger
 *  /students:
 *   delete:
 *        descripcion: Borrar a un estudiante
 *        parameters:
 *          - name: id
 *            description: Aqui debe ir la id del estudiante a borrar
 *            in: query
 *            required: true
 *        responses:
 *         200:
 *             description: Perfecto!!!
 */
 /* GET home page. */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
