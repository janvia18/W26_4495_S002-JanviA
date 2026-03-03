import { useMemo, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { modules } from "../data/content";
import { getModuleProgress, setModuleProgress } from "../utils/progress";

export default function ModuleDetail() {
  const { id } = useParams();

  const module = useMemo(() => modules.find((m) => m.id === id), [id]);
  const [progress, setProgress] = useState(() => getModuleProgress(id));

  if (!module) {
    return (
      <div className="page">
        <h1>Module not found</h1>
        <NavLink to="/modules">Back to Modules</NavLink>
      </div>
    );
  }

  const startOrContinue = () => {
    const next = setModuleProgress(id, { status: "in_progress" });
    setProgress(next);
  };

  const markComplete = () => {
    const next = setModuleProgress(id, { status: "completed", score: 100 });
    setProgress(next);
  };

  return (
    <div className="page">
      <NavLink to="/modules">← Back</NavLink>

      <h1>{module.title}</h1>
      <p>{module.description}</p>

      <div className="meta">
        <span>⏱ {module.estimatedMinutes} min</span>
        <span>📈 {module.difficulty}</span>
        <span>⭐ {module.points} pts</span>
        <span className="badge">{progress.status.replace("_", " ")}</span>
      </div>

      <h3>What you’ll learn</h3>
      <ul>
        {module.outcomes.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>

      <div className="row">
        <button className="btn" onClick={startOrContinue}>
          {progress.status === "not_started" ? "Start Module" : "Continue Module"}
        </button>

        <button className="btn secondary" onClick={markComplete}>
          Mark Complete (demo)
        </button>
      </div>
    </div>
  );
}