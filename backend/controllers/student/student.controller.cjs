const Users = require("../../models/auth/Users.cjs");
const getStudentProfile = async (req, res) => {
  const { regNumber } = req.body;
  try {
    const user = await Users.findOne(
      { regNumber: regNumber },
      { password: false },
      { refreshToken: false }
    ).populate(["specialConditions", { path: "medication", select: "name" }]);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};

module.exports = { getStudentProfile };
