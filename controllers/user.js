const User = require("../models/user")

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});

    return res.json(allDbUsers);
}

async function getUserById(req, res) {
    const allDbUsers = await User.findById(req.params.id);

    if (!allDbUsers) return res.status(404).json({ error: "user not found" })
    return res.json(allDbUsers);
}

async function patchUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })

    res.json({ statue: 'Success' })
}

async function deleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id)

    res.json({ statue: 'Success' })
}

async function handleCreateNewUser(req, res) {

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

    console.log("Result ", result)
    return res.status(201).json({ msg: "success" , id: result._id });

}


module.exports = {
    handleGetAllUsers,
    getUserById,
    patchUserById,
    deleteUserById,
    handleCreateNewUser
}
