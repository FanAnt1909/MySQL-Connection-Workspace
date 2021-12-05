const sql = require('./sql')
const query = new sql()
const mysql = require('mysql')

// query.insert(`
//     show * from javi;
// `)

query.show();