const express = require("express");

const fs = require("fs");

// const users = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000

const mongoose = require("mongoose");

//Schema 

const newSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,

    },
    gender: {
        type: String,
    },

});

// Model

const User = mongoose.model('user', newSchema);

// Connection

mongoose.connect('mongodb://127.0.0.1:27017/app-1')
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error", err));


//MIddleware - Assume as a plugin
app.use(express.urlencoded({ extended: "false" }))

app.use((req, res, next) => {
    fs.appendFile(
        "log.txt",
        `\n ${Date.now()}: ${req.ip} ${req.method} : ${req.path}\n`,
        (err, date) => {
            next();
        }
    );
    // console.log("Hello I am MIddleware. ");
    // return res.json({mgs: "Hello This is Middleware"})
    // next();
});

//Routes 
app.get("/users", async (req, res) => {

    const allDbUsers = await User.find({});
    const html = `
    <ol>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ol>  
    `;
    res.send(html);
});

// REST API

app.get("/api/users", async (req, res) => {

    const allDbUsers = await User.find({});
    // res.setHeader("X-MyName", "Rajeev Ranjan"); // Custom header
    // Always add X to custom header
    return res.json(allDbUsers);
})

app
    .route("/api/users/:id")
    .get(async (req, res) => {
        const allDbUsers = await User.findById(req.params.id);
        // const id = Number(req.params.id);
        // const user = users.find((user) => user.id === id);

        if (!allDbUsers) return res.status(404).json({ error: "user not found" })
        return res.json(allDbUsers);
    })
    .patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
        //Edit the user with id
        // res.json({ statue: 'Pending' })
        res.json({ statue: 'Success' })
    })
    .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
        //Delete the user with id
        // res.json({ status: 'Pending' });
        res.json({ statue: 'Success' })

    });


app.post("/api/users", async (req, res) => {

    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title

    ) {
        return res.status(400).json({ msg: "All Fields Are Required.." });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    console.log("Result ", result);

    return res.status(201).json({ msg: "success" });



    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./MOCK-DATA.json", JSON.stringify(users), (err, data) => {

    //     return res.status(200).json({ status: "pending" });
    // })

});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));

