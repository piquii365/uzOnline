const Appointment = require("../../models/clinic/appointment.cjs");
const Schedule = require("../../models/clinic/schedule.cjs");
const addSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const newSchedule = new Appointment({
      date: req.body.date,
      startTime: req.body.startTime,
      duration: req.body.duration,
      agenda: req.body.agenda,
      participants: {
        studentParticipants: req.body.students ? req.body.students : [],
        administrationParticipants: req.body.administrationParticipants
          ? [...req.body.administrationParticipants, id]
          : [],
        otherParticipants: req.body.otherParticipants
          ? req.body.otherParticipants
          : [],
      },
    });
    if (newSchedule) {
      await newSchedule.save();
      const checkSchedule = await Schedule.findOne({ scheduler: id });
      if (checkSchedule) {
        await Schedule.updateOne(
          { scheduler: id },
          { $push: { appointment: newSchedule._id } }
        );
        res.status(200).json({ status: true, Scheduled: newSchedule });
      }
    }
  } catch (error) {
    res.status(500).json({ Result: "Internal Server Error", status: false });
    console.error(error);
  }
};
module.exports = { addSchedule };
