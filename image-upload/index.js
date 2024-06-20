const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

const upload = multer({ dest: 'uploads/' })
const link = "http://localhost:8000"

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) =>{
    return res.render("homepage");
})
app.post("/upload", (req, res) =>{

})

app.listen(PORT, ()=> console.log(`Server started at port ${PORT} \n ${link}`));