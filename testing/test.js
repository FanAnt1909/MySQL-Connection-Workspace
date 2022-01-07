const fs = require('fs')
const csv = require('csv-parser');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios')
// const sql = require('../sql')
// const query = new sql()

function log(state){
    console.log(state)
}

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
 }

// fs.writeFile('../csv/csv_out/javi.eng.csv', 'Id,Word,Kana,Mean', function (err) {
//     if (err) throw err;
//   });

//PARSE CSV FILE => GET DEFINITION => CALL API TO GET TRANSLATION OF ENG DEFINITION => THEN WRITE IT TO OUTPUT


// const bypass_headers = {
// 	'Connection': 'keep-alive',
// 	'Upgrade-Insecure-Requests': 1,
// 	'Accept-Encoding': 'gzip, deflate',
// 	'Accept-Language' : 'en-US,en;q=0.9'
// } 

//header resembling anonymous tabs requests
const bypass_headers_anonymous = {
    'Connection': 'keep-alive',
    // 'accept-Encoding': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    // 'accept-language': 'en-US,en;q=0.9',
    // 'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    // 'sec-ch-ua-mobile': '?0',
    // 'sec-ch-ua-platform': "Windows",
    // 'sec-fetch-dest': 'document',
    // 'sec-fetch-mode': 'navigate',
    // 'sec-fetch-site': 'none',
    // 'sec-fetch-user': '?1',
    'upgrade-insecure-requests': 1,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
}

//path variable
// var test2 = '../csv/test2.txt'
// var javi = '../csv/csv_in/javi.csv'
var javi_wo_addition = '../dict/javi_wo_addition.csv'
var javi_wo_re = '../dict/javi_wo_re.csv'
var err_log = '../output/error.txt'

//create write stream
var writeStreamVI = fs.createWriteStream(javi_wo_re)
// var writeStreamEN = fs.createWriteStream(javi_wo_re)
var errStream = fs.createWriteStream(err_log)
var readFile = fs.createReadStream(javi_wo_addition)
//parse csv file

.pipe(csv())
.on('data', async (data) => {
    try {
        //PAUSE STREAM
        readFile.pause()

        //DO * with data
        var json = JSON.parse(data.Mean)
        var concat = ''

        //concat all meaning of one line into one string separated by |
        for (let i = 0; i < json.length; i++) {
            concat += json[i].mean

            //if its the final word in arr, dont concat '|'
            if(i < json.length - 1) {
                concat += ' | '
            }
        }
        // console.log(`concated string: ${concat}`) 
        //concat multiples meaning of a word                                                                                                                                                                                   
        // var response
        var text = encodeURI(concat);
        // console.log(`before request: ${concat}`)
        //call api to google trans to check if a string is vnmese or english
        // var url = `https://clients${randomInt(1,5)}.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=vi&q=` + text;
        // log('fetch reached')

        //IMMEDIATE Recursive googleapi_call
        await (function google_api(){
            var url = `https://clients${randomInt(1,5)}.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=vi&q=` + text;
            axios.get(url, {headers: bypass_headers_anonymous})
            .then(res =>{
                response = res.data
                var fixed = 'no'
                // console.log(`OUTPUT`)
                // console.log(res.data)
                translation = res.data.sentences[0].trans
                // console.log(`${res.data.src}| ${data.Id} | ${concat}`)
                console.log(`${data.Id} - trans res: ${translation}`)
                // text = translation
                // IF language detection return non-vietnamese
                if(res.data.src != 'vi'){
                    fixed = 'yes'
                    //CHANGE DEFINITION OF LINE TO VIETNAMESE
                    //vnmese trans json => corresponding array with array before concat
                    var res_arr =  translation.split(' | ')
                    for(let i=0; i < res_arr.length; i++){
                        json[i].mean = res_arr[i]
                    }
                    
                    //convert json object back to string
                    data.Mean = JSON.stringify(json)
                    data.Mean = data.Mean.replace(/"/g, `""`)
                    // data.Kana = data.Kana.replace(/ /g, ', ')
                    var csv_line = `${data.Id},${data.Word},${data.Kana},"${data.Mean}",${fixed}\n`
                    
                    //write to output file
                    // log('non-vnmese detected')
                    writeStreamVI.write(csv_line)
                }
                else {
                    // log('vnmese detected')
                    //write input without correction to file
                    // data.Kana = data.Kana.replace(/ /g, ', ')
                    var csv_line = `${data.Id},${data.Word},${data.Kana},"${data.Mean}",${fixed}\n`
                    writeStreamVI.write(csv_line)
                }
            //catch google api error 
            }).catch(e =>{
                //write to error file
                console.log(e.response)
                errStream.write(`${e}\n ${data.Id} \n |*BEFORE REQUEST ${concat}\n | RESPONSE: ${response}>>>\n`)
                google_api()
                // console.log(response)
                return e.response
            })
        }) ()
        
        // RESUME STREAM after N second
        setTimeout( () => {
            readFile.resume()
        }, 25);

    }catch(e) {
        console.log(`error: ${e}`)
        return e;
    }
    // console.log('data process done')
    //DO END
})
.on('end',function(){
    //some final operation
    console.log('Parsing completed')
});  
