const fs = require('fs')
const csv = require('csv-parser');
const { disconnect } = require('process');
// const sql = require('../sql')
// const query = new sql()
// const mysql = require('mysql')

//create write stream
var enam = './dict_converted/enamdict.c.txt'
var javi_extra = './dict/addition_javi.csv'
var r_ele_filtered = './output/javi_r_ele_filtered.txt'
var enam_filtered = './output/javi_enam_filtered.txt'
var jmdict = './dict/jmdict_mongo.csv'
var mean_filtered = './output/mean_filtered.txt'

//read from
var readFile = fs.createReadStream(enam_filtered)
//look up in
var lookup = fs.readFileSync(jmdict, {encoding:'utf8', flag:'r'});
//write to
var writeStream = fs.createWriteStream(mean_filtered)
//parse csv file
readFile
.pipe(csv())
.on('data', (data) => {
    //DO START
    var parsed = JSON.parse((data.Mean)[0].mean)
    // console.log(JSON.parse(data.Mean)[0].mean)
    //check query
    console.log(lookup.includes(data.Word))
    data.Mean = data.Mean.replace(/"/g, `""`)
    // if(lookup.includes(data.Word)==false){
    //     writeStream.write(`${data.Id},${data.Word},${data.Kana},"${data.Mean}"\n`)
    // }
    //DO END
})
.on('end',function(){
    //some final operation
    // query.end()
});  
