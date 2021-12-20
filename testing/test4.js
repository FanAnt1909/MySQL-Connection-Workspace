
var line = `ＡＢＣ [エービーシー] /(c) American Broadcasting Company/ABC/(o) Audit Bureau of Circulations/ABC/(pr) ABC World Airways Guide/`
var word = line.match(/^[^\s]+/g)
var kana = line.match(/(?<=\[)(.*)(?=\])/g)
var kind = line.match(/(?<=\()(.{1,6})(?=\))/g)
var mean = line.match(/(?<=\(.{1,4}\)\s)(.*)(?=\/$)/g).join()
console.log(`join: ${mean}`)
// var mean = line.match(/(?<=\/\((.{1,4})\)\s)(.*)(?=\/$)/).join()
var split = mean.split(/\/\(.{1,4}\)\s/g)
// console.log(split)

var json = {
    word: word[0],
    kana: kana[0],
    sense: []
  }
for (let i = 0; i < kind.length; i++) {
    var obj = {}
    obj.kind = kind[i]
    obj.mean = split[i]
    json.sense.push(obj) 
}
console.log(json)