//This file parse enamdict line by line

const fs = require('fs');
const readline = require('readline');

function log(state){
    console.log(state)
}
async function parse() {
  const fileStream = fs.createReadStream('../dict_converted/enamdict.c.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
    var ref =  ['s','p','u','g','f','m','h','o','pr','c','st','serv','wk','c','ev','myth','leg','fic','ct','ch']
    for await (const line of rl) {
        var word = line.match(/^[^\s]+/)
        var kana = line.match(/(?<=\[)(.*)(?=\])/g)
        var kind = line.match(/(?<=\()(.{1,6})(?=\))/g)
        // log(`kind: ${kind}`)
        //check if type arr contain inappropriate element
        for (let i = 0; i < kind.length; i++) {
                //split type incase it contain comma : ex: (p,cr)
                var split_error = false
                split = kind[i].split(',')
                for (let j = 0; j < split.length; j++) {
                    //if split element doest exsist in ref arr
                            // => set error var to true
                    if(ref.includes(split[j])==false){
                        split_error = true
                    }                    
                }
                if(ref.includes(kind[i]) == false && split_error == true){
                    log('not ref')
                    log(`removed: ${kind[i]}`)
                    fs.appendFile('./removed', `${kind[i]}\n`, err => {
                        if (err) {
                          console.error(err)
                          return
                        } 
                      })
                    kind.splice(i,1)
                }
        }
        if(kind.length > 1){
            log('muitiple')
            var mean = line.match(/(?<=\/\((.{1,4})\)\s)(.*)(?=\/$)/g).join()
                // log(`transformed mean: ${mean}`)
                mean = mean.split(/\/\(.{1,4}\)\s/g)
                mean = mean.join(' | ')
        } else {
            log('single')
            var mean = line.match(/(?<=\/\(.*\)\s)(.*)(?=\/$)/g)
        }
    log(line)
    log('___________________________')
    log(`word: ${word}`)
    log(`kana: ${kana}`)
    log(`type: ${kind}`)
    log(`mean: ${mean}`)
    log('\n')
  }
}

parse()