const { MongoClient } = require("mongodb");

const DB_NAME = "students";
const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@modulo-1.g70fe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
console.log(URL);
var MongoConnection = () => new Promise(async (resolve, reject) => {
    try {
        let student = new MongoClient(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await student.connect();
        resolve(student.db(DB_NAME));

    } catch (error) {
        reject(error);
    }
});

module.exports.MongoConnection = MongoConnection;