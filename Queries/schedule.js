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
   getOneSchedule
  };