function Home() {
  return (
    <div className="container py-4">
      <h2>Welcome to OctoFit</h2>
      <p>Track workouts, manage your team, and monitor your fitness progress.</p>
      <p>
        Use the navigation links to browse activities, leaderboard, teams, users, and workouts.
      </p>
      <div className="alert alert-info">
        <strong>Note:</strong> Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when running this app in GitHub Codespaces.
      </div>
    </div>
  );
}

export default Home;
