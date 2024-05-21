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

const getSpecialConditions = async (req, res) => {
  try {
    const conditions = await Users.findOne({ _id: req.params.id }).populate(
      "specialConditions"
    );
    res.status(200).json(conditions.specialConditions);
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.log(error);
  }
};
const getMedication = async (req, res) => {
  try {
    const medications = await Users.findOne({ _id: req.params.id }).populate(
      "medication"
    );
    res.status(200).json(medications.medication);
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};
module.exports = { getProfile, getSpecialConditions, getMedication };
