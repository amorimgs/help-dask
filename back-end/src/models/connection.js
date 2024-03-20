const { createPool } = require('mysql2/promise');

const connection = createPool({
    host: process.env.MYSQL_HOSTNAME || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '123',
    database: process.env.MYSQL_DATABASE || 'helpDask',
});

module.exports = connection;