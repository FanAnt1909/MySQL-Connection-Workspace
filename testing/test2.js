function log(state){
    console.log(state)
}

function foo(){
var ref = []
var line=`ＡＢＣ [エービーシー] /(c) American Broadcasting Company/ABC/(o) Audit Bureau of Circulations/ABC/(pr) ABC World Airways Guide/`;
// var match = string.match(/^[^\s]+/)
var word = line.match(/^[^\s]+/)
var kana = line.match(/(?<=\[)(.*)(?=\])/g)
var type = line.match(/(?<=\()(.|..)(?=\))/g)
if (type.length > 1){
    var mean = line.match(/(?<=\/\((.|..)\))(.*)(?=\/$)/g).toString()
        mean = mean.split(/\(.*\)/g)
} else {
    var mean = line.match(/(?<=\/\(.*\))(.*)(?=())/g)
    
}
log(line)
log('___________________________')
log(`word: ${word}`)
log(`kana: ${kana}`)
log(`type: ${type}`)
log(`mean: ${mean}`)
log('\n')
// console.log(match)
}
foo()
// const line =`ＡＢＣ [エービーシー] /(c) American Broadcasting Company/ABC/(o) Audit Bureau of Circulations/ABC/(pr) ABC World Airways Guide/`
// const match = line.match(/(?<=\/\((.|..)\))(.*)(?=$)/g).toString()
// // var arr = match.split(/\((o)\)/g)
// var arr = match.split(/\(.*\)/g)
// log(match)
// log('\n')
// log(arr)

