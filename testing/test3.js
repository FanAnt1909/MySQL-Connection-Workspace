const fs = require('fs')
const csv = require('csv-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const sql = require('../sql')
const query = new sql()

function log(state){
  console.log(state)
}

// fs.writeFile('../csv/csv_in/javi.eng.csv', 'Id,Word,Kana,Mean\n', function (err) {
//     if (err) throw err;
//     // console.log('Saved!');
//   });

const bypass_headers = {
	'Connection': 'close',
	'Upgrade-Insecure-Requests': 1,
	'Accept-Encoding': ['gzip', 'deflate'],
	'Accept-Language' : ['en-US', 'en', {q:0.9}]
  }

var writeStream = fs.createWriteStream("../csv/csv_out/javi.eng.csv")

//parse csv file
fs.createReadStream('../csv/output.csv')
// fs.createReadStream('../csv/csv_out/javi.eng.csv')
.pipe(csv())
.on('data', async function(data){
    try {
      // console.log(typeof data.Mean == 'string');
        // console.log(data.Id);

      // console.log(json[0].mean)
      log(data)
      //DO * with data  
      var csv_line = `${data.Id},'${data.Word}','${data.Kana}','${data.Mean}',null`
      log(`csv_line: ${csv_line}`)
      await query.insert('mock',csv_line)
      console.log('query success')
    }

    catch(e) {
        console.log(`error: ${e}`)
    }
})
.on('end',function(){
    console.log('Done!')
    query.end()
});  
