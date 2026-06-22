import { startServer } from "./index";

startServer().catch((error) => {
  console.error("Failed to start OctoFit Tracker server:", error);
  process.exit(1);
});
