const fs = require('fs')
const csv = require('csv-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const sql = require('../sql')
// const query = new sql()


fs.writeFile('../csv/csv_in/javi.eng.csv', 'Hello content!', function (err) {
    if (err) throw err;
    // console.log('Saved!');
  });



const bypass_headers = {
	'Connection': 'close',
	'Upgrade-Insecure-Requests': 1,
	'Accept-Encoding': ['gzip', 'deflate'],
	'Accept-Language' : ['en-US', 'en', {q:0.9}]
  }


//parse csv file
// fs.createReadStream('../csv/output.csv')
fs.createReadStream('../csv/csv_out/javi.eng.csv')
.pipe(csv())
.on('data', function(data){
    try {
      console.log(typeof data.Mean == 'string');
      // console.log(data.Id);
    // console.log(`data: ${data.Mean}`)
    json = JSON.parse(data.Mean)
    // console.log(json[0].mean)
    console.log(json)

    //DO * with data
    // console.log(`${data.Id} : ${json[0].mean}`)
    // var meaning = string.match(/(?<=mean\\":\\").*?(?=\\")/g)
    
    //for each definition of a word
    }

    catch(e) {
        console.log(`error: ${e}`)
    }
})
.on('end',function(){
    //some final operation
});  
