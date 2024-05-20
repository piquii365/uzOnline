const Users = require("../../models/auth/Users.cjs");
const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne(
      { _id: id },
      { password: false },
      { refreshToken: false }
    ).exec();
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};
module.exports = { getProfile };
