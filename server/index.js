const http = require("http");

// const fs = require("fs");

// const url = require("url");

const express = require("express");

const app = express();
app.get('/', (req, res) => {
    return res.send("Hello From HomePage!");
})

app.get('/about', (req, res) => {
    return res.send("Hello From AboutPage!");
})
app.get('/signup', (req, res) => {
    return res.send("Hello From SignUp Page!" + " You Have Signed Up " + req.query.name);
})

// function myHandler(req, res) {
    
//     if (req.url === "/favicon.ico") return res.end();
//     const log = `${Date.now()}: ${req.method} ${req.url} New Request Came Up\n`;
//     const myUrl = url.parse(req.url, true);
//     console.log(myUrl);
    
//     fs.appendFile("log.txt", log, (err, data) => {
//         switch (myUrl.pathname) {
//             case '/':
//                 if (req.method === 'GET') return res.end("HomePage");
//                 break;
//             case '/about':
//                 const userName = myUrl.query.myName;
//                 res.end(`Hi, ${userName}`);
//                 res.end("I am Rajeev Ranjan");
//                 break;
//             case '/contact':
//                 res.end("My number is 8360426936");
//                 break;
//             case '/signup':
//                 if (req.method === "GET") res.end("This is a Sign Up Form");
//                 else if (req.method === "POST") {
//                     //DB Query
//                     res.end("Success");
//                 }
//             default:
//                 res.end("404 Not Found!");
//                 break;
//         }
    
//     });

// }    


// const myServer = http.createServer(myHandler);

const myServer = http.createServer(app);
myServer.listen(8000, () => console.log("Server Started!!"));