import { useEffect, useState } from "react";
import { fetchJson, normalizeListResponse } from "./ApiClient";

interface Team {
  name: string;
  description: string;
  members: string[];
  createdAt: string;
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<{ teams?: Team[]; data?: Team[] }>("teams")
      .then((data) => setTeams(normalizeListResponse<Team>(data, "teams")))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading teams...</div>
      ) : teams.length === 0 ? (
        <div>No teams found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.name}>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{team.members.length}</td>
                  <td>{new Date(team.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Teams;
