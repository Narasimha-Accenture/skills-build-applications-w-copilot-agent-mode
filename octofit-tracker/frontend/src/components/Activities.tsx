import { useEffect, useState } from "react";
import { fetchJson, normalizeListResponse } from "./ApiClient";

interface Activity {
  userId: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  recordedAt: string;
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<{ activities?: Activity[]; data?: Activity[] }>("activities")
      .then((data) => setActivities(normalizeListResponse<Activity>(data, "activities")))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading activities...</div>
      ) : activities.length === 0 ? (
        <div>No activities found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Recorded</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={`${activity.userId}-${index}`}>
                  <td>{activity.userId}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.distanceKm != null ? `${activity.distanceKm} km` : "—"}</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{new Date(activity.recordedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
