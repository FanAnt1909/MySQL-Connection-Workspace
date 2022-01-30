const fs = require('fs')

var jmdict = '../dict/JMdict_e_examp_30_1_2022.json'
var javi = '../dict/javi_wo_re.json'
const readed = fs.readFileSync(jmdict, 'utf-8')
const jsoned = JSON.parse(readed)

//for every document
for (let i = 0; i < jsoned.length; i++) {
    let id = i + 1
    jsoned[i].id = id   
    jsoned[i].done = false
    // delete jsoned[i].verified
    // for every Sense Item
    //simplified example stucture
    for (let s = 0; s < jsoned[i].sense.length; s++) {
        if(jsoned[i].sense[s].example != undefined){
            //for every Example Object
            // console.log(jsoned[i].sense[s])
            for(let k =0; k < jsoned[i].sense[s].example.length; k++){
                // console.log(jsoned[i].sense[s].example[k].ex_sent)
                // console.log(jsoned[i].sense[s].example)
                let sent = jsoned[i].sense[s].example[k].ex_sent[0]._
                let tran = jsoned[i].sense[s].example[k].ex_sent[1]._
                
                //clear old field nested ex_sent value
                jsoned[i].sense[s].example[k].ex_sent = {}
                    jsoned[i].sense[s].example[k].ex_sent.sent = sent
                    jsoned[i].sense[s].example[k].ex_sent.tran = tran
                
                //clear old ex_test value
                jsoned[i].sense[s].example[k].ex_text = jsoned[i].sense[s].example[k].ex_text[0]
            }
        }
    }    
}

fs.writeFile('../dict/javi_wo_re_3.json', JSON.stringify(jsoned, null, 2), function(err) {
    if(err) throw err
    console.log('Done!')
})