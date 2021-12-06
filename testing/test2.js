
function foo(word){
var q = word.replace(/\n/g, "")
var q2 = q.replace(/\s{2,10}/g, " ")
var q3 = q2.replace(/^\s/g, "")
console.log(`q:${q}`);
console.log(`q2:${q2}`)
console.log(`q3:${q3}`)
}

foo(`
    select * from javi
    where id like 5;
`)