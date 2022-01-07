const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios')

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const bypass_headers = {
	'Connection': 'close',
	'Upgrade-Insecure-Requests': 1,
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language' : 'en-US,en;q=0.9',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36'
} 

const bypass_headers_anonymous = {
    'Connection': 'close',
    // 'Accept-Encoding': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    // 'accept-language': 'en-US,en;q=0.9',
    // 'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    // 'sec-ch-ua-mobile': '?0',
    // 'sec-ch-ua-platform': "Windows",
    // 'sec-fetch-dest': 'document',
    // 'sec-fetch-mode': 'navigate',
    // 'sec-fetch-site': 'none',
    // 'sec-fetch-user': '?1',
    // 'upgrade-insecure-requests': 1,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36'
}

var text = 'sự thất bại; sự bại diệt'
text = encodeURI(text)
var c = 0
var url = `https://clients1.google.com/translate_a/t?client=dict-chrome-ex&sl=ja&tl=en&q=${text}` ;

setInterval( () =>{
    (function loop(){
        axios.get(url, {headers: bypass_headers})
            .then(res =>{
                console.log(c)
                console.log(res.data.sentences[0].trans)
                c++
            }).catch(e =>{
                loop()
                console.log(e)
                return e
            })
        })()
}, 500)
// setInterval(loop, 500);
// console.log('cá')
