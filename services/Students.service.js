const { response } = require('express');
const { MongoConnection } = require('../lib/Mongo');
var ObjectId = require("mongodb").ObjectID;

const COLLECTION = "students";

const findStudents = (id) => new Promise(async(resolve, reject) => {
    try {
        //Inicializo MongoClient para que me retorne la Base de Datos
        const DB = await MongoConnection();
        //Obtenemos la collection
        const students = DB.collection(COLLECTION);

        const studentsList = await students.find({}).toArray();

        if(id != undefined){
            var filterResult = studentsList.filter((estudiante) => estudiante._id == id);
            resolve(filterResult);
        }

        resolve(studentsList);
    } catch (error) {
        reject(error);
    }
});

const createStudent = (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, carrera, nivel) => new Promise(async(resolve, reject) => {
    try {
        
        const DB = await MongoConnection();
        const student = DB.collection(COLLECTION);
        const result = await student.insertOne({
            primer_nombre: primer_nombre,
            segundo_nombre: segundo_nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            carrera: carrera,
            nivel: nivel
        });
        resolve(result);

    } catch (error) {
        reject(error);
    }
});

const updateStudent = (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, carrera, nivel) => new Promise(async(resolve, reject) => {
    try {
        const DB = await MongoConnection();
        const students = DB.collection(COLLECTION);

        if(primer_nombre != undefined){
            var result = await students.updateOne(
                {"_id": ObjectId(id)},
                { $set: { primer_nombre: primer_nombre } }
            )
        }
        if(segundo_nombre != undefined){
            var result = await students.updateOne(
                {"_id": ObjectId(id)},
                { $set: { segundo_nombre: segundo_nombre } }
            )
        }
        if(primer_apellido != undefined){
            var result = await students.updateOne(
                {"_id": ObjectId(id)},
                { $set: { primer_apellido: primer_apellido } }
            )
        }
        if(segundo_apellido != undefined){
            var result = await students.updateOne(
                {"_id": ObjectId(id)},
                { $set: { segundo_apellido: segundo_apellido } }
            )
        }
        if(carrera != undefined){
            var result = await students.updateOne(
                {"_id": ObjectId(id)},
                { $set: { carrera: carrera } }
            )
        }
        if(nivel != undefined){
            var result = await students.updateOne(
                {"_id": ObjectId(id)},
                { $set: { nivel: nivel } }
            )
        }
        resolve(result);
    } catch (error) {
        reject(error)
    }
});

const deleteStudent = (id) => new Promise(async(resolve, reject) => {
    try {
        const DB = await MongoConnection();
        const students = DB.collection(COLLECTION);
        const result = await students.deleteOne(
            {"_id": ObjectId(id)},
        )
        resolve(result);
    } catch (error) {
        reject(error)
    }
});

module.exports = {
    findStudents,
    createStudent,
    updateStudent,
    deleteStudent
}