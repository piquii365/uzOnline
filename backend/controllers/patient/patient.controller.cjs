const Users = require("../../models/auth/Users.cjs");
const Card = require("../../models/clinic/card.cjs");
const History = require("../../models/clinic/history.cjs");

const newPatient = async (req, res) => {
  try {
    const { regNumber, temp, weight, BP } = req.body;
    const user = await Users.findOne(
      { regNumber: regNumber },
      { password: 0, refreshToken: 0, roles: 0, username: 0, profilePicture: 0 }
    ).exec();
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
        await Card.findOneAndUpdate(
          { cardOwnerId: user._id },
          { $set: { currentCard: card.visit[0]._id } }
        );
        res.status(200).json({
          registered: true,
          user: user,
          currentRecord: card.visit[0]._id,
        });
      } else {
        const currentVisit = card.visit.find((visit) => {
          return (visit._id = card.currentCard);
        });
        const checkDates = (d1, d2) => {
          return (
            d1.getUTCFullYear() == d2.getUTCFullYear() &&
            d1.getUTCMonth() == d2.getUTCMonth() &&
            d1.getUTCDate() == d2.getUTCDate()
          );
        };
        if (checkDates(new Date(currentVisit.date), new Date())) {
          const newOne = await Card.findOneAndUpdate(
            {
              $and: [
                { cardOwnerId: user._id },
                { "visit._id": card.currentCard },
              ],
            },
            {
              $set: {
                "visit.$": {
                  date: Date.now(),
                  temp: temp,
                  weight: weight,
                  BP: BP,
                  _id: card.currentCard,
                },
              },
            },
            { upsert: true, new: true }
          );
          res.status(200).json({
            registered: true,
            Card: newOne,
            user: user,
            currentVisit: card.currentCard,
          });
        } else {
          let newCard = await Card.findOneAndUpdate(
            { cardOwnerId: user._id },
            {
              $addToSet: {
                visit: { date: Date.now(), temp: temp, weight: weight, BP: BP },
              },
            }
          );
          const currentCardRecord = newCard.visit[0]._id;
          console.log("current card:" + currentCardRecord);
          const updatedCard = await Card.findOneAndUpdate(
            { cardOwnerId: user._id },
            { $set: { currentCard: currentCardRecord } }
          );
          console.log(updatedCard);
          res.status(200).json({
            registered: true,
            user: user,
            Card: newCard,
            currentVisit: currentCardRecord,
          });
        }
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
      { password: 0, refreshToken: 0 }
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
      .sort({ date: 1 })
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
      { password: 0, refreshToken: 0, roles: 0, username: 0, profilePicture: 0 }
    ).populate(["specialConditions", { path: "medication", select: "name" }]);
    if (user) {
      res.status(200).json({ registered: true, patient: user });
    } else res.status(200).json({ registered: false });
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};
const prescription = async (req, res) => {
  try {
    const { id, currentCard } = req.params;
    const { prescription, description, recommendation } = req.body;
    const result = await Card.findOneAndUpdate(
      { $and: [{ cardOwnerId: id }, { "visit._id": currentCard }] },
      {
        $addToSet: {
          "visit.$.purposeOfVisit": { $each: description },
          "visit.$.prescription": {
            $each: prescription,
          },
          "visit.$.recommendations": recommendation,
        },
      }
    );
    if (result) {
      let prescription = result.visit.find((visit) => {
        return visit._id == currentCard;
      });
      res.status(200).json({ status: true, FullPrescription: prescription });
    } else {
      res.status(200).json({
        status: false,
        Result: "Error while saving prescription recommended action re-save",
      });
    }
  } catch (error) {
    res.status(400).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};
const getPrescription = async (req, res) => {
  try {
    const { regNumber } = req.body;
    const user = await Users.findOne({ regNumber: regNumber }, { _id: 1 });
    if (user) {
      const prescription = await Card.findOne({ cardOwnerId: user._id });
      if (prescription) {
        res.status(200).json({ status: true, Prescription: prescription });
      } else {
        res.status(200).json({ status: false });
      }
    } else {
      res.status(200).json({ status: false, Result: "Patient not found " });
    }
  } catch (error) {
    res
      .status(404)
      .json({ Result: "The Server Responded With Page Not Found" });
    console.error(error);
  }
};
const completePrescription = async (req, res) => {
  try {
    const { currentCard, drugs } = req.body;
    const card = await Card.findOneAndUpdate(
      { visit: { $elemMatch: { _id: currentCard } } },
      {
        $set: {
          "visit.$.collectedDrugs.drugs": drugs,
          "visit.$.collectedDrugs.date": Date.now(),
        },
      }
    );
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(404).json({
      status: false,
      Result: "The Server responded with code 404 page not found",
    });
    console.log(error);
  }
};
module.exports = {
  getPatientDetails,
  newPatient,
  getCard,
  getPatient,
  prescription,
  getPrescription,
  completePrescription,
};
