const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var arr = `[{"kind":"exp, v5r","mean":"to be"},{"mean":"to come"},{"mean":"to go"}]`
var json = JSON.parse(arr);

const bypass_headers = {
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

async function concat(){
var text = '';
    for(var i = 0; i < json.length; i++){
        text += `${json[i].mean}`
        if (i < json.length - 1){
            text+= '\\' 
        }
    }
    console.log(`text: ${text}`)
    const res = await fetch('https://clients4.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=vi&q=' + text, 
                            {method:'GET', headers: bypass_headers})
    const data = await res.json();
    text = (data.sentences[0].trans)
    const res_arr = text.split(' \\ ')
    console.log(text)
    console.log(`before fix: ${res_arr}`);
    for (let i = 0; i < res_arr.length; i++) {
        json[i].mean = res_arr[i]
    }
    console.log(json)
}
concat()

