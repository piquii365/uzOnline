const bcrypt = require("bcrypt");
const Users = require("../../models/auth/Users.cjs");

const addNewUser = async (req, res) => {
  try {
    const values = {
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      regNumber: req.body.regNumber,
      gender: req.body.gender,
    };
    const checkUser = await Users.findOne({
      $or: [
        { username: values.username },
        { regNumber: values.regNumber },
        { email: values.email },
      ],
    }).exec();
    if (checkUser) {
      res.status(200).json({
        status: false,
        Result: "Your email or username, reg number is already registered",
      });
    } else {
      await Users.insertMany([values]);
      res.status(200).json({ status: true });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ Error: "Internal Server Error" });
  }
};
module.exports = { addNewUser };
