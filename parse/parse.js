const fs = require('fs')

let data = fs.readFileSync('./JMdict_e_examp.json')
let item = JSON.parse(data)
function foo(){
// console.log(item[19300].k_ele)
// console.log('\n')
// console.log(item[19300].r_ele)
// console.log('\n')
console.log(item[19300].sense[0].example[0].ex_sent[0])
console.log('\n')
}

foo()
// console.log(item[19300])

// console.log(item[0].sense)
// for(let i =0, found = 0; i < item.length && found == 0 ; i++){
//     if(item[i].ent_seq == '1210360'){
//         console.log(item[i].sense)
//         found = 1
//         console.log('i=' + i)
//     }
// }