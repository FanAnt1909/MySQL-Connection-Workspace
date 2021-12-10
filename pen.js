const fs = require('fs')
const csv = require('csv-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const sleep = require('system-sleep')
const sql = require('../sql')
const query = new sql()


// fs.writeFile('./csv/test.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   });



const bypass_headers = {
	'Connection': 'keep-alive',
	'Upgrade-Insecure-Requests': 1,
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language' : 'en-US,en;q=0.9'
} 

//header resembling anonymous tabs requests
const bypass_headers_anonymous = {
    'Connection': 'close',
    'Accept-Encoding': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': "Windows",
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': 1,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
}


//var setup


//create write stream
var writeStream = fs.createWriteStream("../csv/csv_out/javi.eng.csv")

//parse csv file
fs.createReadStream('../csv/output.csv')
// fs.createReadStream('../csv/csv_in/javi.csv')
.pipe(csv())
.on('data', async function(data){
        var word = '';
        var text = '';
    try {
    //DO * with data
        // console.log(data)
        // var meaning = string.match(/(?<=mean\\":\\").*?(?=\\")/g)
        // console.log(`meaning: ${meaning}`)
        var json = JSON.stringify(data.Mean)
        var meaning = json[0].mean

        text = encodeURI(meaning)
        // console.log(`${data.Id}| ${word}: ${text}`)
        var url = 'https://clients4.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=vi&q=' + text;
        //call api to google trans to check if a string is vnmese or english

        fetch(url, {method:'get', headers: bypass_headers_anonymous})
        .then(res =>{
            return res.json();
        }).then(output =>{
            // console.log(`output.src: ${output.src} | id: ${data.Id}`)
            console.log(`${output.src}| ${data.Id}| ${word}: ${text}`)

        // if language detection return eng
            if(output.src != 'vi'){
                //write line to output file
                var def = data.Mean
                var csv_Mean = def.replace(/"/g, `""`)
                var csv_line = `${data.Id},${data.Word},${data.Kana},"${csv_Mean}"\n`
                // fs.appendFile('../csv/csv_out/javi.eng.csv', csv_line, err =>{
                //     console.log(`err: ${err}`);
                // })
                // writeStream.write(csv_line)
             }
        }).catch(e =>{
            console.log(e)
        })
    
    }catch(e) {
        console.log(`error: ${e}`)
    }
    sleep(1000)
    //DO END
})
.on('end',function(){
    //some final operation
});  
