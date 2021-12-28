//This file parse enamdict line by line

const fs = require('fs');
const readline = require('readline');

function log(state){
    console.log(state)
}

const writeStream = fs.createWriteStream('../output/output.txt')
const removeStream = fs.createWriteStream('./removed')

async function parse() {
    const ref =  ['s','p','u','g','f','m','h','o','pr','c','st','serv','wk','c','ev','myth','leg','fic','ct','ch']
    var tag = []
    const fileStream = fs.createReadStream('../dict_converted/enamdict.c.txt');

    const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    for await (const line of rl) {
        var word = line.match(/^[^\s]+/g)
        var kana = line.match(/(?<=\[)(.*)(?=\])/g)
        var kind = line.match(/(?<=\()(.{1,6})(?=\))/g)

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
                // fs.appendFile('./removed', `${kind[i]}\n`, err => {
                //     if (err) {
                //         console.error(err)
                //         return
                //     } 
                // })

                
                //check if tag are already written in removed file before, if not duplicated, write to file
                // console.log(`before tag check: ${kind[i]}`)
                // console.log(`tag arr: ${tag}`)
                var c = 0
                if(tag.includes(kind[i]) == false){
                    
                    log(`tag: ${tag}`)
                    //push tag to tag exsisted tag array
                    tag.push(kind[i])
                    //add to removed list
                    removeStream.write(`${kind[i]}\n`)
                }

                //remove the tag
                kind.splice(i,1)
            }
        }
        if(kind.length > 1){
            log('muitiple')
            var mean = line.match(/(?<=\/\((.{1,4})\)\s)(.*)(?=\/$)/g).join()
                // log(`transformed mean: ${mean}`)
                mean = mean.split(/\/\(.{1,4}\)\s/g)
                // mean = mean.join('|')
        } else {
            log('single')
            var mean = line.match(/(?<=\/\(.*\)\s)(.*)(?=\/$)/g)
        }

      //init json object to contain fields
        var json = {
            word: word[0],
            kana: '',
            sense: []
        }
        if(kana!=null){
            json.kana = kana[0]
        }
        for (let i = 0; i < kind.length; i++) {
            var obj = {}
            obj.kind = kind[i]
            obj.mean = mean[i]
            json.sense.push(obj) 
        }
        log(line)
        log('___________________________')
        console.log(json)
        // log(`word: ${word}`)
        // log(`kana: ${kana}`)
        // log(`type: ${kind}`)
        // log(`mean: ${mean}`)
        log('\n')
        writeStream.write(`${json.word}\n`)
    }
}

parse()