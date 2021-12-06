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
    insert(query){
        //remove line-break from input query
        var q = query.replace(/\n/g, "")
        var q2 = q.replace(/\s{2,10}/g, " ")
        var q3 = q2.replace(/^\s/g, "")
        //open query
        opt.query(q3, (err, results) => {
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
}

module.exports = Mysql_Query

