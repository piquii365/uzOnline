const bcrypt = require("bcrypt");
const Users = require("../../models/auth/Users.cjs");
const jwt = require("jsonwebtoken");
const History = require("../../models/clinic/history.cjs");
const addNewUser = async (req, res) => {
  try {
    const values = {
      fullName: req.body.fullName,
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
        registered: true,
        Result: "User with email or username, reg number is already registered",
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
const signUser = async (req, res) => {
  try {
    await Users.findOne({
      $or: [
        { username: req.body.email },
        { email: req.body.email },
        { regNumber: req.body.email },
      ],
    })
      .exec()
      .then(async (user) => {
        if (!user || user == null) {
          res.status(200).json({
            error: true,
            Result: "User not found please register",
          });
        } else {
          if (await bcrypt.compare(req.body.password, user.password)) {
            const payload = {
              username: user.username,
              ID: user._id,
              role: user.roles,
            };
            const accessToken = jwt.sign(
              payload,
              process.env.SECRETE_ACCESS_TOKEN,
              {
                expiresIn: "15m",
              }
            );
            const refreshToken = jwt.sign(
              payload,
              process.env.SECRETE_REFRESH_TOKEN,
              {
                expiresIn: "1d",
              }
            );
            await Users.updateOne(
              { _id: user._id },
              {
                $set: {
                  refreshToken: { token: refreshToken, createdAt: Date.now() },
                },
              }
            );
            res.cookie("jwt", refreshToken, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
              username: user.username,
              id: user._id,
              accessToken: accessToken,
            });
          } else {
            res.status(200).json({ error: true, Result: "Incorrect password" });
          }
        }
      });
  } catch (error) {
    console.error(error);
    res.status(404).json({ Result: "Internal Server Error" });
  }
};
const getStudent = async (req, res) => {
  try {
    const student = await Users.findOne(
      {
        regNumber: req.body.regNumber,
      },
      { password: false, refreshToken: false }
    ).exec();
    if (student) {
      const checkHistory = await History.findOne({
        student: student._id,
      }).exec();
      if (checkHistory) {
        res.status(200).json({ registered: true, user: student });
      } else {
        let newHistory = new History({
          student: student._id,
        });
        await Users.findOneAndUpdate(
          { _id: student._id },
          { $addToSet: { medicalHistory: newHistory._id } }
        );
        await newHistory.save();
        res.status(200).json({ registered: true, user: student });
      }
    } else {
      res.status(200).json({ registered: false });
    }
  } catch (error) {
    res.status(400).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};
module.exports = { addNewUser, signUser, getStudent };
