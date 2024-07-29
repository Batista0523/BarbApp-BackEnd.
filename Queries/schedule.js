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

const updateSchedule = async (id, schedule) => {
  try {
    const { barber_id, day_of_week, start_time, end_time } = schedule;
    const updatedSchedule = await db.one(
      "UPDATE barber_schedules SET barber_id=$1,day_of_week=$2,start_time=$3,end_time=$4 WHERE id=$5 RETURNING *"[
        (barber_id, day_of_week, start_time, end_time, id)
      ]
    );
    return updatedSchedule;
  } catch (error) {
    console.error("Error updating Schedule", error);
    throw error;
  }
};

const createSchedule = async (schedule) => {
  try {
    const createdSchedule = await db.one(
      "INSERT INTO barber_schedules(barber_id, day_of_week , start_time , end_time) VALUES ($1,$2,$3,$4) RETURNING *",
      [
        schedule.barber_id,
        schedule.day_of_week,
        schedule.start_time,
        schedule.end_time,
      ]
    );
    return createdSchedule;
  } catch (err) {
    console.error("Error creating Schedule", err);
    throw err;
  }
};
module.exports = {
  getAllSchedule,
  getOneSchedule,
  deleteSchedule,
  createSchedule,
  updateSchedule
};
