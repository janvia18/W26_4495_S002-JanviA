export default function LearnerPage() {
  return (
    <div data-theme="pastel" className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="navbar bg-base-100 rounded-xl shadow-sm">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">CyberAware</h1>
            <span className="text-sm opacity-70">Learner Dashboard</span>
          </div>
          <a className="btn btn-sm btn-secondary" href="/admin">Admin</a>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="card bg-base-100 shadow-sm lg:col-span-2">
            <div className="card-body">
              <h2 className="card-title">Welcome 👋</h2>
              <p className="opacity-70">
                Learn through comic modules, quick activities, and short quizzes.
              </p>

              <div className="flex gap-2 mt-2">
                <a className="btn btn-primary btn-sm" href="/modules">Start Module</a>
                <button className="btn btn-outline btn-sm">Quick Quiz</button>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm opacity-70 mb-1">
                  <span>Progress</span>
                  <span>2/6</span>
                </div>
                <progress className="progress progress-primary w-full" value="2" max="6" />
              </div>
            </div>
          </div>

          <div className="stats bg-base-100 shadow-sm">
            <div className="stat">
              <div className="stat-title">Points</div>
              <div className="stat-value text-primary">215</div>
              <div className="stat-desc">Level 2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
