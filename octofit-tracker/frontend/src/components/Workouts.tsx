import { useEffect, useState } from "react";
import { fetchJson, normalizeListResponse } from "./ApiClient";

interface Workout {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: string;
  createdAt: string;
}

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<{ workouts?: Workout[]; data?: Workout[] }>("workouts")
      .then((data) => setWorkouts(normalizeListResponse<Workout>(data, "workouts")))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading workouts...</div>
      ) : workouts.length === 0 ? (
        <div>No workouts found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Difficulty</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.title}>
                  <td>{workout.title}</td>
                  <td>{workout.description}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.difficulty}</td>
                  <td>{new Date(workout.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Workouts;
