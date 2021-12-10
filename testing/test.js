const fs = require('fs')
const csv = require('csv-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const sleep = require('system-sleep')
// const sql = require('../sql')
// const query = new sql()


// fs.writeFile('../csv/csv_out/javi.eng.csv', 'Id,Word,Kana,Mean', function (err) {
//     if (err) throw err;
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
//

//create write stream
var writeStream = fs.createWriteStream("../csv/csv_out/javi.eng.csv")

//parse csv file
fs.createReadStream('../csv/test2.txt')
// fs.createReadStream('../csv/output.csv')
// fs.createReadStream('../csv/csv_in/javi.csv')
.pipe(csv())
.on('data', async (data) => {
        var word = '';
        var text = '';
    try {
    //DO * with data
    // console.log(data)
        var json = JSON.parse(data.Mean)
        var concat = ''
        for (let i = 0; i < json.length; i++) {
            concat += json[i].mean
            //if its the final word in arr, dont concat '|'
            if(i < json.length - 1) {
                concat += '|'
            }
        }
        console.log(`concated string: ${concat}`) 

        //concat multiples meaning of a word                                                                                                                                                                                   

        text = encodeURI(concat)
        //call api to google trans to check if a string is vnmese or english
        var url = 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=vi&q=' + text;

        fetch(url, {method:'get', headers: bypass_headers_anonymous})
        .then(res =>{
            return res.json();
        }).then(output =>{
            console.log(`trans_res: ${output.sentences[0].trans}`)
            console.log(`${output.src}| ${data.Id} | ${concat}`)
            text = output.sentences[0].trans
            // IF language detection return non-vietnamese
            if(output.src != 'vi'){
                console.log('eng detected')
            //CHANGE DEFINITION OF LINE TO VIETNAMESE
                //split trans res into corrsponding arr
                var res_arr =  text.split(' | ')
                for(let i=0; i < res_arr.length; i++){
                    json[i].mean = res_arr[i]
                }
                
                // console.log(json)

                //convert json object back to string
                var string = JSON.stringify(json)
                // var line = data.Mean
                    string = string.replace(/"/g, `""`)
                var csv_line = `${data.Id},${data.Word},${data.Kana},"${string}"\n`
                
                //write to output file
                writeStream.write(csv_line)
            }
            else {
                //write input without correction to file
                var csv_line = `${data.Id},${data.Word},${data.Kana},"${data.Mean}"\n`
                writeStream.write(csv_line)
            }
        }).catch(e =>{
            console.log(e)
        })
        //pause function
        sleep(50)
    }catch(e) {
        console.log(`error: ${e}`)
    }
    
    //DO END
})
.on('end',function(){
    //some final operation
});  
