const Users = require("../../models/auth/Users.cjs");
const SpecialConditions = require("../../models/clinic/specialConditions.cjs");
const Medications = require("../../models/clinic/medication.cjs");
const updateProfilePicture = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.file) {
      const path = req.file.filename;
      await Users.findOneAndUpdate(
        { _id: id },
        { $set: { profilePicture: path } }
      );
      res.status(200).json({ Result: "Profile picture updated successfully" });
    } else {
      res.status(203);
    }
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};
const updateEmail = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.email) {
      await Users.findOneAndUpdate(
        { _id: id },
        { $set: { email: req.body.email } }
      );
      res.status(200).json({ Result: "Email updated successfully" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(404).json({ Result: "Internal Server Error" });
    console.error(error);
  }
};
const updateSpecialConditions = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.specialConditions) {
      let specialConditions = req.body.specialConditions;
      specialConditions.forEach(async (condition) => {
        let foundCondition = await SpecialConditions.findOne({
          name: condition,
        });
        if (foundCondition) {
          await Users.findOneAndUpdate(
            { _id: id },
            { $addToSet: { specialConditions: foundCondition._id } }
          );
        } else {
          let newSpecialCondition = new SpecialConditions({
            name: condition,
          });
          await newSpecialCondition.save();
          await Users.findOneAndUpdate(
            { _id: id },
            { $addToSet: { specialConditions: newSpecialCondition._id } }
          );
        }
      });
      res.status(200).json({ status: true });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ Result: "Internal Server Error" });
  }
};
const updateMedication = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.medications) {
      let medications = req.body.medications;
      medications.forEach(async (medication) => {
        let availableDrug = await Medications.findOne({
          name: medication,
        }).exec();
        if (availableDrug) {
          await Users.findOneAndUpdate(
            { _id: id },
            { $addToSet: { medication: availableDrug._id } }
          );
        } else {
          let newDrug = new Medications({ name: medication });
          await newDrug.save();
          await Users.findOneAndUpdate(
            { _id: id },
            { $addToSet: { medication: newDrug._id } }
          );
        }
      });
      res.status(200).json({ status: 200 });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(404).status({ Result: "Internal server error" });
    console.error(error);
  }
};
const updatePersonalInfo = async (req, res) => {
  const { id } = req.params;
  try {
    await Users.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          age: req.body.age,
          address: req.body.address,
          nextOfKin: {
            name: req.body.nextOfKin.name,
            address: req.body.nextOfKin.address,
            phoneNumber: req.body.nextOfKin.phoneNumber,
            relationship: req.body.nextOfKin.relationship,
          },
        },
      }
    );
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(200).json({ Result: "Internal Server error" });
  }
};
module.exports = {
  updateProfilePicture,
  updateEmail,
  updateSpecialConditions,
  updateMedication,
  updatePersonalInfo,
};
