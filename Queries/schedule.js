const db = require("../db/db.Config.js");

const getAllSchedule = async () => {
  try {
    const allSchedule = await db.any("SELECT * FROM barber_schedules");
    return allSchedule;
  } catch (error) {
    console.error("Error retrieving the schedule", error);
    throw error;
  }
};

const deleteSchedule = async (id) => {
  try {
    const deletedSchedule = await db.one(
      "DELETE FROM barber_schedules WHERE id=$1",
      [id]
    );
    return deletedSchedule;
  } catch (err) {
    console.error("internal error in delete", err);
  }
};

const getOneSchedule = async (id) => {
  try {
    const oneSchedule = await db.one(
      "SELECT * FROM barber_schedules WHERE id=$1",
      [id]
    );
    return oneSchedule;
  } catch (error) {
    console.error("Error retrieving the  one schedule", error);
    throw error;
  }
};

module.exports = {
  getAllSchedule,
  getOneSchedule,
  deleteSchedule
};
