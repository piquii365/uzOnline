const bcrypt = require("bcrypt");
const Admins = require("../../models/auth/Admin.cjs");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res) => {
  try {
    const values = {
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
      IDNumber: req.body.idNumber,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    };
    const check = await Admins.findOne({
      $or: { username: req.body.username, email: req.body.email },
    }).exec();
    if (check) {
      res.status(200).json({
        status: false,
        Result: "User with that email or Username already exist",
      });
    } else {
      await Admins.insertMany([values]);
      res.status(200).json({ status: true });
    }
  } catch (error) {
    res.status(400).json({ status: false, Result: "Internal Server Error" });
    console.error(error);
  }
};
const signAdmin = async (req, res) => {
  try {
    const user = await Admins.findOne({
      $and: [
        { role: req.body.role },
        {
          $or: [{ username: req.body.username }, { email: req.body.username }],
        },
      ],
    }).exec();
    if (!user) {
      res.status(200).json({ status: false, Result: "User not registered" });
    } else {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const payload = {
          username: user.username,
          ID: user._id,
          role: user.role,
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
        await Admins.updateOne(
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
          status: true,
          user: {
            username: user.username,
            id: user._id,
            accessToken: accessToken,
            role: user.role,
          },
        });
      } else {
        res.status(200).json({
          status: false,
          Result: "Incorrect credentials have been provided",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ status: false, Result: "Internal Server Error" });
  }
};
module.exports = { addAdmin, signAdmin };
