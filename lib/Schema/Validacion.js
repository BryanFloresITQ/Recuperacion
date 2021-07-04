const joi = require("joi");

const insertStudent = joi.object({
    primer_nombre: joi.string().min(3).max(50).empty().required(),
    segundo_nombre: joi.string().min(3).max(50).empty().required(),
    primer_apellido: joi.string().min(3).max(50).empty().required(),
    segundo_apellido: joi.string().min(3).max(50).empty().required(),
    carrera: joi.string().min(3).max(50).empty().required(),
    nivel: joi.number().min(1).max(20).empty().required(),
  });

const UpdateStudent = joi.object({
    id: joi.string().required(),
    primer_nombre: joi.string().min(3).max(50).empty(),
    segundo_nombre: joi.string().min(3).max(50).empty(),
    primer_apellido: joi.string().min(3).max(50).empty(),
    segundo_apellido: joi.string().min(3).max(50).empty(),
    carrera: joi.string().min(3).max(50).empty(),
    nivel: joi.number().min(1).max(20).empty(),
  });

  const DeleteStudent = joi.object({
    id: joi.string().required(),
  })

module.exports = {
    insertStudent,
    UpdateStudent,
    DeleteStudent,
  };