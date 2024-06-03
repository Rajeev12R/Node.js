const { log } = require("console");
const fs = require("fs");

// Sync means This was a Syncronous call. It is a Blocking request.

// fs.writeFileSync("./test.txt" , "Hey This is a Demo Txt File");


// Async - Non- Blocking Request

// fs.writeFile("./test.txt" , "Hey This is a Demo Txt File" , (err) => {});



// Sync read method 

// const read = fs.readFileSync("./numbers.txt" , "utf-8");
// console.log(read);


// Async read method = It always expects a callback function from us to get executed first should be err . 

/* 
fs.readFile("./numbers.txt", "utf-8" , (err, result) => {
    if(err){
        console.log("An Error Occured" , err);
    }
    else{
        console.log(result);
    }
});

*/

// fs.appendFileSync("./test.txt" , "My name is Anthony \n")

// fs.cpSync("./test.txt" , "./copy.txt")

// Unlink is used to delete a created file.

// fs.unlinkSync("./copy.txt")

console.log(fs.statSync("./numbers.txt"));
console.log(fs.statSync("./numbers.txt").isFile());

// We can also make our own directory.

fs.mkdirSync("my-docs/a/b/" , {recursive: true})