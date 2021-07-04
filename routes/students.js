const { insertStudent, UpdateStudent } = require('../lib/Schema/Validacion');
const { DataValidator } = require('../middleware/dataValidator');
var express = require("express");
var router = express.Router();

const { findStudents, createStudent, updateStudent, deleteStudent } = require("../services/Students.service");

/* GET users listing. */
/**
 * @swagger
 *  /students:
 *   get:
 *       description: Obtener Estudiantes
 *       parameters:
 *        - name: id
 *          description: Id del estudiante
 *          in: query
 *       responses:
 *        200:
 *            description: Funcionaaaaaaa!!!!!!!!!!!!
 */
router
  .get("/", async function (req, res, next) {
    try {
      const { query: {id} } = req;
      const students = await findStudents(id);
      res.status(200).json({
        msg: "Path Students",
        body: students,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  /**
  * @openapi
  * /students:
  *   post:
  *       description: Insertar un nuevo estudiante
  *       parameters:
  *        - name: primer_nombre
  *          description: Primer nombre del Estudiante
  *          in: query
  *          required: true
  *        - name: segundo_nombre
  *          description: Segundo nombre del Estudiante
  *          in: query
  *          required: true
  *        - name: primer_apellido
  *          description: primer apellido del Estudiante
  *          in: query
  *          required: true
  *        - name: segundo_apellido
  *          description: segundo apellido del Estudiante
  *          in: query
  *          required: true
  *        - name: carrera
  *          description: carrera que sigue el Estudiante
  *          in: query
  *          required: true
  *        - name: nivel
  *          description: nivel que esta el Estudiante
  *          in: query
  *          required: true 
  *       responses:
  *        200:
  *            description: Funcionaaaaaaa!!!!!!!!!!!!
  */
  .post("/", DataValidator("query",insertStudent), async (req, res) => {
    try {

      const {primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, carrera, nivel} = req.query;
      
      const result = await createStudent(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, carrera, nivel);

      res.status(200).json({
        msg: "Estudiante Creado",
        body: result.ops,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  /**
  * @openapi
  * /students:
  *   put:
  *       description: Insertar un nuevo estudiante
  *       parameters:
  *        - name: id
  *          description: Id del estudiante para actualizar
  *          in: query
  *          required: true
  *        - name: primer_nombre
  *          description: Primer nombre del Estudiante
  *          in: query
  *          required: true
  *        - name: segundo_nombre
  *          description: Segundo nombre del Estudiante
  *          in: query
  *          required: true
  *        - name: primer_apellido
  *          description: primer apellido del Estudiante
  *          in: query
  *          required: true
  *        - name: segundo_apellido
  *          description: segundo apellido del Estudiante
  *          in: query
  *          required: true
  *        - name: carrera
  *          description: carrera que sigue el Estudiante
  *          in: query
  *          required: true
  *        - name: nivel
  *          description: nivel que esta el Estudiante
  *          in: query
  *          required: true
  *       responses:
  *        200:
  *            description: Funcionaaaaaaa!!!!!!!!!!!!
  */
  .put("/", DataValidator("query",UpdateStudent), async (req, res) => {
    try {
      
      const { query: {id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, carrera, nivel} } = req;
      const result = await updateStudent(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, carrera, nivel);
      const studentUpdated = await findStudents(id);

      res.status(200).json({
        msg: "Estudiante Actualizado",
        body: studentUpdated,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  /**
 * @swagger
 *  /students:
 *   delete:
 *       description: Eliminar 
 *       parameters:
 *        - name: id
 *          description: Id del estudiante a eliminar
 *          in: query
 *       responses:
 *        200:
 *            description: Funcionaaaaaaa!!!!!!!!!!!!
 */
  .delete("/", async (req, res) => {

    try {
      
      const { query: {id} } = req;
      const result = await deleteStudent(id);
      const studentDeleted = await findStudents();

      res.status(200).json({
        msg: "Estudiante Eliminado",
        body: studentDeleted,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }

  })

module.exports = router;
