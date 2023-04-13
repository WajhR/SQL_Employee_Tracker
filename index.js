const db = require('./db/connection');

const sql = 
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY Key,
    studentname VARCHAR(250),
);

db.query(sql, (err) => {
    if (err) throw err;

    console.log('Table created successfullly');
});