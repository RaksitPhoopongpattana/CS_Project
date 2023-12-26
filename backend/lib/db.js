const mysql = require('mysql');

var connect = mysql.createConnection({
    host: "vps163.vpshispeed.net",
    user: "root",
    port: 3309,
    password: "@Abcd1234",
    database: "SmartDetectdb"
});


module.exports = { connect };