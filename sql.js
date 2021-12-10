const mysql = require('mysql')

console.log('sql intergrated')

//MySQL connection settings
var opt = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1909",
    database: "random"
    });
//Connect to MySQL
opt.connect(function(err) {
    if (err) throw err;
    console.log("SQL Connected")
    });      

//class for MySQL query functions    
class MySQL_Query {
    //insert items in table
    insert(table, value){
        //remove line-break from input query
        // var q = query.replace(/\n/g, "")
        // var q2 = q.replace(/\s{2,10}/g, " ")
        // var q3 = q2.replace(/^\s/g, "")
        //open query
        var q = `insert into ${table} values(${value})`
        opt.query(q, (err, results) => {
            if (err) throw err;
            console.log(results);
        })   

        //close the connection
        // opt.end(function(err) {
        //     if (err) {
        //         return console.log('error:' + err.message);
        //     }
        //     console.log('Close the database connection.');
        // })

    }

    //show all of table
    show(){
        var q = 'SELECT * FROM RANDOM'
        //open query
        opt.query(q, function(err, results) {
            if (err) throw err;
            console.log(results);
            console.log('done');
        })

        //close the connection
        opt.end(function(err) {
            if (err) {
                return console.log('error:' + err.message);
            }
        });
        
    }

    end(){
        // close the connection
        opt.end(function(err) {
            if (err) {
                return console.log('error:' + err.message);
            }
            console.log('Closed the database connection.');
        })
    }
    //get table columns name
    get_scheme(table){
        var q = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${table}';`
        // var q = query.replace(/\n/g, "")
        // var q2 = q.replace(/\s{2,10}/g, " ")
        // var q3 = q2.replace(/^\s/g, "") 
        //open query
        opt.query(q, (err, results) => {
            if (err) throw err;
            console.log(results);
            console.log('done');
        })

        //close the connection
        opt.end( (err) => {
            if (err) {
                return console.log('error:' + err.message);
            }
        });
    }
}
// const query = new Mysql_Query

// query.get_scheme('random');
module.exports = MySQL_Query
