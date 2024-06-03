const fs  = require("fs");
const os  = require("os");

console.log(os.cpus().length);

// Blocking....

// console.log('1');
// const ans = fs.readFileSync("numbers.txt" , "utf-8");
// console.log(ans);

// console.log('2');


// Non- Blocking....

console.log('3');
fs.readFile("./numbers.txt" , "utf-8" , (err , result) =>{
    if(err){
        console.log("Error is there" , err);
    }else{
        console.log(result);
    }
});
console.log('4');
console.log('5');
console.log('6');
console.log('7');


// Default Thread Pool Size = 4
// Max? 8 core  cpu = 8