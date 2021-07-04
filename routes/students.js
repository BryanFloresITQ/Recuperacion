const { insertStudent, UpdateStudent } = require('../lib/Schema/Validacion');
const { DataValidator } = require('../middleware/dataValidator');
var express = require("express");
var router = express.Router();

const { findStudents, createStudent, updateStudent, deleteStudent } = require("../services/Students.service");

/* GET users listing. */
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
  .post("/", DataValidator("body",insertStudent), async (req, res) => {
    try {

      const {primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, carrera, nivel} = req.body;
      
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
  .put("/", DataValidator("body",UpdateStudent), async (req, res) => {
    try {
      
      const { query: {id} } = req;
      const {primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, carrera, nivel} = req.body;
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
  .delete("/:id", async (req, res) => {

    try {
      
      const { params: {id} } = req;
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
