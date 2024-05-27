const Schedule = require("../../models/clinic/schedule.cjs");
const addSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date,
      startTime,
      duration,
      agenda,
      participants,
      administrationParticipants,
      otherParticipants,
    } = req.body;
    const newSchedule = new Schedule({
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
  } catch (error) {
    res.status(500).json({ Result: "Internal Server Error", status: false });
    console.error(error);
  }
};
module.exports = { addSchedule };
