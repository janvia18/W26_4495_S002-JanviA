import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px 20px" }}>
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          background: "rgba(255,255,255,0.92)",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0 }}>About CyberAware</h1>
            <div style={{ marginTop: 8, color: "#555" }}>
              Gamified cybersecurity training for community organizations.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
            <button onClick={() => navigate("/modules")}>View Modules</button>
          </div>
        </div>

        <hr style={{ margin: "18px 0", opacity: 0.2 }} />

        <section style={sectionStyle}>
          <h2 style={h2Style}>Who we are</h2>
          <p style={pStyle}>
            CyberAware is a training platform focused on practical cybersecurity awareness for everyday users. Our goal is to
            help organizations build safer habits through short, engaging learning experiences that are easy to complete and
            easy to remember.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>What the app does</h2>
          <div style={gridStyle}>
            <div style={cardStyle}>
              <div style={cardTitleStyle}>Short Modules</div>
              <div style={cardTextStyle}>
                Learners complete focused lessons on common security topics like phishing, passwords, and social engineering.
              </div>
            </div>

            <div style={cardStyle}>
              <div style={cardTitleStyle}>Interactive Practice</div>
              <div style={cardTextStyle}>
                Activities and quizzes help learners recognize real-world threats and apply safer decision-making.
              </div>
            </div>

            <div style={cardStyle}>
              <div style={cardTitleStyle}>Progress Tracking</div>
              <div style={cardTextStyle}>
                The dashboard shows completion status, points, and recommended next steps so learners stay motivated.
              </div>
            </div>

            <div style={cardStyle}>
              <div style={cardTitleStyle}>Admin-Ready Foundation</div>
              <div style={cardTextStyle}>
                The platform design supports organization-level reporting and analytics, with server sync planned for future
                releases.
              </div>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Who it’s for</h2>
          <ul style={listStyle}>
            <li style={liStyle}>Community organizations that need lightweight, approachable security training</li>
            <li style={liStyle}>Learners who prefer short lessons over long, technical courses</li>
            <li style={liStyle}>Teams that want a simple way to reinforce safe behavior and reduce risk</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>How progress works</h2>
          <p style={pStyle}>
            Learner progress and points are saved locally in the browser for this prototype. The application is designed to
            support secure server synchronization in a future release.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>What’s next</h2>
          <ul style={listStyle}>
            <li style={liStyle}>Additional modules and scenario-based simulations</li>
            <li style={liStyle}>Organization admin dashboard with anonymized cohort analytics</li>
            <li style={liStyle}>Secure server-side storage and authentication integration</li>
          </ul>
        </section>

        <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => navigate("/modules")}>Start Training</button>
          <button onClick={() => navigate("/profile-setup")}>Update Profile</button>
        </div>
      </div>
    </div>
  );
}

const sectionStyle = { marginTop: 18 };

const h2Style = { margin: "0 0 8px 0" };

const pStyle = { margin: 0, color: "#333", lineHeight: 1.6 };

const gridStyle = {
  display: "grid",
  gap: 14,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  marginTop: 10,
};

const cardStyle = {
  padding: 16,
  borderRadius: 16,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.85)",
};

const cardTitleStyle = { fontWeight: 800, marginBottom: 6 };

const cardTextStyle = { color: "#444", lineHeight: 1.5 };

const listStyle = { margin: "8px 0 0 18px", color: "#333", lineHeight: 1.7 };

const liStyle = { marginBottom: 6 };