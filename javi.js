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
var jmdict = './dict/JMdict_e.json'
// var mean_filtered = './output/mean_filtered.txt'
var javi_extra_legit = './dict/addition_javi_legit.csv'
var javi_original = './dict/javi.csv'

//read from
var readFile = fs.createReadStream(javi_extra_legit)
//look up in
var lookup = fs.readFileSync(enam, {encoding:'utf8', flag:'r'});
//write to
var writeStream = fs.createWriteStream(enam_filtered)
//parse csv file
readFile
.pipe(csv())
.on('data', (data) => {
    //DO START
    // var parsed = JSON.parse(data.Mean)[0].mean
    var parsed = data.Word
    // console.log(JSON.parse(data.Mean)[0].mean)
    //check query
    console.log(lookup.includes(parsed))
    data.Mean = data.Mean.replace(/"/g, `""`)
    if(lookup.includes(parsed)==false){
        writeStream.write(`${data.Id},${data.Word},${data.Kana},"${data.Mean}"\n`)
    }
    //DO END
})
.on('end',function(){
    //some final operation
    // query.end()
});  
