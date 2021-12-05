const mysql = require('mysql')

    
console.log('sql intergrated')

var opt = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1909",
    database: "random"
    });

opt.connect(function(err) {
    if (err) throw err;
    console.log("SQL Connected")
    });      


class Mysql_Query {
    insert(query_string){
        var q = query_string
        opt.query(q, function(err, results) {
            if (err) throw err;
            console.log(results);
        })   

        //close the connection
        opt.end(function(err) {
            if (err) {
                return console.log('error:' + err.message);
            }
            console.log('Close the database connection.');
        })

    }

    show(){
        var q = 'select * from javi'
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
            console.log('Close the database connection.');
        });
        
    }
}

module.exports = Mysql_Query

