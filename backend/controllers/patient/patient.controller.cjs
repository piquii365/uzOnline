const Users = require("../../models/auth/Users.cjs");
const Card = require("../../models/clinic/card.cjs");
const History = require("../../models/clinic/history.cjs");

const newPatient = async (req, res) => {
  try {
    const { regNumber, temp, weight, BP } = req.body;
    const user = await Users.findOne({ regNumber: regNumber }).exec();
    if (!user) {
      res.status(200).json({ registered: false });
    } else {
      let card = await Card.findOne({ cardOwnerId: user._id }).exec();
      if (!card) {
        let card = new Card({
          cardOwnerId: user._id,
          visit: { date: Date.now(), temp: temp, weight: weight, BP: BP },
        });
        await card.save();
        res.status(200).json({ registered: true, user: user });
      } else {
        await Card.findOneAndUpdate(
          { cardOwnerId: user._id },
          {
            $addToSet: {
              visit: { date: Date.now(), temp: temp, weight: weight, BP: BP },
            },
          }
        );
        res.status(200).json({ registered: true, user: user });
      }
    }
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.log(error);
  }
};
const getPatientDetails = async (req, res) => {
  const { regNumber } = req.params;
  try {
    const user = await Users.findOne(
      { regNumber: regNumber },
      { password: false },
      { refreshToken: false }
    );
    if (user) {
      res.status(200).json({ registered: true, id: user._id });
    } else res.status(200).json({ registered: false });
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};
const getCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findOne({ cardOwnerId: id })
      .sort({ date: -1 })
      .populate([
        "medications",
        { path: "administrations", select: ["username", "fullName"] },
      ]);
    if (!card) {
      res.status(200).json({ registered: false });
    } else res.status(200).json({ registered: true, card: card });
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};
const getPatient = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne(
      { _id: id },
      { password: false },
      { refreshToken: false }
    ).populate(["specialConditions", { path: "medication", select: "name" }]);
    if (user) {
      res.status(200).json({ registered: true, patient: user });
    } else res.status(200).json({ registered: false });
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};

module.exports = { getPatientDetails, newPatient, getCard, getPatient };
