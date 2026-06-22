import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <nav>
          <Link className="me-3" to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to OctoFit</h2>
      <p>Track workouts, manage your team, and monitor your fitness progress.</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Coming soon: activity logs, leaderboards, and personalized guidance.</p>
    </div>
  );
}

export default App;
