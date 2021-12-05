const fs = require('fs')
const csv = require('csv-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const mysql = require('mysql')
const sql = require('./sql')
const query = new sql()


// fs.writeFile('./csv/test.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   });

// fs.appendFile('./csv/test.txt', '\nHello World !!!', err =>{
//     console.log(err);
// })

const bypass_headers = {
	'Connection': 'close',
	'Upgrade-Insecure-Requests': 1,
	'Accept-Encoding': ['gzip', 'deflate'],
	'Accept-Language' : ['en-US', 'en', {q:0.9}]
  } 


//parse csv file
fs.createReadStream('./csv/test.txt')
.pipe(csv())
.on('data', function(data){
    try {
    //DO * with data
    // console.log(data)
    var string = JSON.stringify(data.Mean)
    var meaning = string.match(/(?<=mean\\":\\").*?(?=\\")/g)
    // console.log(meaning)

    var word = '';
    var text = '';
    //for each definition of a word
    for (var i = 0; i < meaning.length; i++){
        //google translate api url
        word += ' '
        word += meaning[i];
        }

        text = encodeURI(word)
        // console.log(text)
        url = 'https://clients4.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=vi&q=' + text

        //call api to google trans to check if a string is vnmese or english
        fetch(url, {method:'get', header: bypass_headers}).then(res =>{
            // console.log(word)
            return res.json();
        }).then(output =>{
            console.log(`${output.src} ${data.Id} ${word}`)
            console.log('___________________________________')
        })

    }

    catch(e) {
        console.log(e)
    }
})
.on('end',function(){
    //some final operation
});  

query.show()