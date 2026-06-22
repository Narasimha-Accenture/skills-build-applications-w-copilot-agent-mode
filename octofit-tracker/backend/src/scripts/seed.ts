import mongoose from "mongoose";
import User from "../models/user";
import Team from "../models/team";
import Activity from "../models/activity";
import Leaderboard from "../models/leaderboard";
import Workout from "../models/workout";

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/octofit_db";

async function seedDatabase() {
  console.log("Seed the octofit_db database with test data");

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB for seeding.");

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { firstName: "Asha", lastName: "Patel", email: "asha.patel@example.com", role: "athlete", teamId: "team-001", createdAt: new Date() },
    { firstName: "Maya", lastName: "Nguyen", email: "maya.nguyen@example.com", role: "coach", teamId: "team-001", createdAt: new Date() },
    { firstName: "Jordan", lastName: "Reed", email: "jordan.reed@example.com", role: "athlete", teamId: "team-002", createdAt: new Date() }
  ]);

  const teams = await Team.create([
    { name: "Coastal Runners", description: "A motivated running squad focused on endurance and race prep.", members: [users[0]._id.toString(), users[1]._id.toString()], createdAt: new Date() },
    { name: "Peak Performers", description: "A mixed team specializing in strength and mobility training.", members: [users[2]._id.toString()], createdAt: new Date() }
  ]);

  const workouts = await Workout.create([
    { title: "Morning Run", description: "30-minute tempo run for building aerobic capacity.", durationMinutes: 30, difficulty: "Intermediate", createdAt: new Date() },
    { title: "Strength Circuit", description: "45-minute full-body strength workout with moderate intensity.", durationMinutes: 45, difficulty: "Advanced", createdAt: new Date() },
    { title: "Recovery Flow", description: "20-minute mobility and stretching session for active recovery.", durationMinutes: 20, difficulty: "Beginner", createdAt: new Date() }
  ]);

  const activities = await Activity.create([
    { userId: users[0]._id.toString(), type: "Run", durationMinutes: 35, distanceKm: 6.2, caloriesBurned: 420, recordedAt: new Date() },
    { userId: users[2]._id.toString(), type: "Strength Training", durationMinutes: 50, caloriesBurned: 520, recordedAt: new Date() },
    { userId: users[0]._id.toString(), type: "Yoga", durationMinutes: 25, caloriesBurned: 140, recordedAt: new Date() }
  ]);

  const leaderboard = await Leaderboard.create([
    { userId: users[0]._id.toString(), teamId: teams[0]._id.toString(), rank: 1, score: 1450, updatedAt: new Date() },
    { userId: users[2]._id.toString(), teamId: teams[1]._id.toString(), rank: 2, score: 1320, updatedAt: new Date() }
  ]);

  console.log(`Seeded ${users.length} users, ${teams.length} teams, ${workouts.length} workouts, ${activities.length} activities, and ${leaderboard.length} leaderboard entries.`);

  await mongoose.disconnect();
  console.log("MongoDB seed complete and disconnected.");
}

seedDatabase()
  .catch((error) => {
    console.error("Failed to seed octofit_db:", error);
    process.exit(1);
  });
