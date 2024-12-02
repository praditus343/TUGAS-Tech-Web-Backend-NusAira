const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection established successfully!');
        connection.release(); 
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1); 
    }
})();

module.exports = pool;
