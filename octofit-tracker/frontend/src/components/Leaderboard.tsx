import { useEffect, useState } from "react";
import { fetchJson, normalizeListResponse } from "./ApiClient";

interface LeaderboardEntry {
  userId: string;
  teamId?: string;
  rank: number;
  score: number;
  updatedAt: string;
}

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<{ leaderboard?: LeaderboardEntry[]; data?: LeaderboardEntry[] }>("leaderboard")
      .then((data) => setEntries(normalizeListResponse<LeaderboardEntry>(data, "leaderboard")))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading leaderboard...</div>
      ) : entries.length === 0 ? (
        <div>No leaderboard entries available.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Score</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={`${entry.userId}-${entry.rank}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.userId}</td>
                  <td>{entry.teamId || "—"}</td>
                  <td>{entry.score}</td>
                  <td>{new Date(entry.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
