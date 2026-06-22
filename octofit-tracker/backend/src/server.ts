import { startServer } from "./index";

const codespaceName = process.env.CODESPACE_NAME;
const host = codespaceName ? `${codespaceName}-8000.app.github.dev` : "localhost";
const apiUrl = codespaceName ? `https://${host}` : `http://${host}:8000`;

startServer(apiUrl).catch((error) => {
  console.error("Failed to start OctoFit Tracker server:", error);
  process.exit(1);
});
