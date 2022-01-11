const fs = require('fs')
const csv = require('csv-parser');
const util = require('util')

//create write stream
// var enam = './dict_converted/enamdict.c.txt'
// var javi_extra = './dict/addition_javi.csv'
// var r_ele_filtered = './output/javi_r_ele_filtered.txt'
// var enam_filtered = './output/javi_enam_filtered.txt'
// var jmdict = './dict/jmdict_mongo.csv'
// var mean_filtered = './output/mean_filtered.txt'
// var javi_extra_legit = './dict/addition_javi_legit.csv'
// var javi_original = './dict/javi.csv'
var mock = '../output/mock.csv'
// var javi_wo_re = './dict/javi_wo_re.csv'
// var javi_wo_2 = './dict/javi_wo_addition_2.csv'
var javi_wo_3 = '../dict/javi_wo_addition_3.csv'
var javi_wo_json = '../dict/javi_wo.json'
var javi_wo_re = '../dict/javi_wo_re.csv'
// var removed = './output/removed.csv'
var log_file = '../output/log.text'

//read from
var readFile = fs.createReadStream(javi_wo_re)
// var readFile = fs.readFile(javi_wo_2)
//look up in
// var lookup = fs.readFileSync(javi_wo_2, {encoding:'utf8', flag:'r'});
//write to
// var writeStream1 = fs.createWriteStream(javi_extra_legit)
// var writeStream2 = fs.createWriteStream(javi_wo)
// var writeStream = fs.createWriteStream(javi_wo_json)
// var writeStreamMock = fs.createWriteStream(mock)
// var removeStream = fs.createWriteStream(removed)
var logStream = fs.createWriteStream(log_file)
//parse csv file
var collection = []
readFile
.pipe(csv())
.on('data', (data) => {
    // console.log(data)
    //DO START
    var document = {
        id : 0,
        k_ele: [],
        r_ele : [],
        sense : []
    }
    //SET ID
    document.id = data.Id

    //CASE 1 - NO KANJI
    if(data.Kana != '' && data.Word.match(/[一-龯]/g) == null){
        console.log(`CASE_1`)
     

        //REMOVE K_ELE
        delete document.k_ele

        //PUSH R_ELE
        let r_ele_obj = {
            reb: []
        }
        var kana_split = data.Kana.split(' ')
        for (let j = 0; j < kana_split.length; j++) {
            r_ele_obj.reb.push(kana_split[j])              
            document.r_ele.push(r_ele_obj)
        }

    } 
    //CASE 2 - YES KANJI
    else {
        //PUSH K_ELE
        let k_ele_obj = {
            keb:[data.Word]
        }
        document.k_ele.push(k_ele_obj)

        //PUSH R_ELE
        let r_ele_obj = {
            reb: []
        }
        if(data.Kana != ''){
            var reb_arr = data.Kana.split(' ')
            for (let i = 0; i < reb_arr.length; i++) {
                r_ele_obj.reb.push(reb_arr[i])
                document.r_ele.push(r_ele_obj)
            }
        }
    }

    //PUSH SENSE
  
    // console.log(data.Mean)
    var mean_json = JSON.parse(data.Mean)
    for (let i = 0; i < mean_json.length; i++) {
        var sense_obj = {
            pos: [],
            gloss: [],
            field: []
        }
        var mean_split = mean_json[i].mean.split(/[,;]/g)
        //inject poss
        if(mean_json[i].kind != undefined){
            var kind_split = mean_json[i].kind.split(/[,;]/g)
            for (let j = 0; j < kind_split.length; j++) {
                sense_obj.pos.push(kind_split[j])              
            }
        }

        //inject gloss
        for (let i = 0; i < mean_split.length; i++) {
            sense_obj.gloss.push(mean_split[i])            
        }

        //inject field
        if (mean_json[i].field != undefined){
            var field_split = mean_json[i].field.split(/[,;]/g)
            for (let j = 0; j < field_split.length; j++) {
                sense_obj.field.push(field_split[i])
            }
        }
        document.sense.push(sense_obj)
    }
   
    //DO END
    // logStream.write(JSON.stringify(document))
    console.log(`${util.inspect(document,{showHidden: false, depth: null, colors: true})}\n>>>>>>>>>>`)
    collection.push(document)
})
.on('end',function(){
    //some final operation
    parsed = JSON.stringify(collection)
    fs.appendFile(javi_wo_json, parsed, err => {
        if (err) throw err
        console.log(`JSONify done`)
    })
});  
