import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <nav>
          <Link className="me-3" to="/">Home</Link>
          <Link className="me-3" to="/activities">Activities</Link>
          <Link className="me-3" to="/leaderboard">Leaderboard</Link>
          <Link className="me-3" to="/teams">Teams</Link>
          <Link className="me-3" to="/users">Users</Link>
          <Link to="/workouts">Workouts</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
