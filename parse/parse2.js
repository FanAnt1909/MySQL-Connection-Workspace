//This file parse enamdict line by line

const fs = require('fs');
const readline = require('readline');

function log(state){
    console.log(state)
}
async function parse() {
    var c = 0;
  const fileStream = fs.createReadStream('../dict_converted/enamdict.c.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
        var word = line.match(/^[^\s]+/)
        var kana = line.match(/(?<=\[)(.*)(?=\])/g)
        var type = line.match(/(?<=\()(.|..)(?=\))/g)
        var mean = line.match(/(?<=\[)(.|..)(?=\])/g)
        log(line)
        log('___________________________')
        log(`word: ${word}`)
        log(`kana: ${kana}`)
        log(`type: ${type}`)
        log(`mean: ${mean}`)
        log('\n')
  }
}

parse();