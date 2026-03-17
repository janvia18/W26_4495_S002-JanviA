import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const avatarEmoji = {
  bear: "🐻",
  horse: "🐴",
  cat: "🐱",
  dog: "🐶",
  fox: "🦊",
  panda: "🐼",
  rabbit: "🐰",
  tiger: "🐯",
  lion: "🦁",
  monkey: "🐵",
  koala: "🐨",
  penguin: "🐧",
  frog: "🐸",
  owl: "🦉",
  unicorn: "🦄",
  dragon: "🐲",
};

function safeJson(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function ensureDefaults() {
  const pts = localStorage.getItem("points");
  if (pts === null) {
    localStorage.setItem("points", "0");
  }

  const prog = safeJson(localStorage.getItem("progress"), null);
  if (!prog) {
    localStorage.setItem(
      "progress",
      JSON.stringify({
        completed: {
          phishing: false,
          password: false,
          mfa: false,
          social: false,
          incident: false,
        },
      })
    );
  }
}

function ProfileSetup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("cat");

  useEffect(() => {
    const saved = safeJson(localStorage.getItem("profile"), null);

    if (saved?.name && saved?.avatar) {
      ensureDefaults();
      navigate("/dashboard");
      return;
    }

    ensureDefaults();
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();

    const profile = {
      name: name.trim(),
      avatar,
    };

    localStorage.setItem("profile", JSON.stringify(profile));
    ensureDefaults();
    navigate("/dashboard");
  };

  const handleReset = () => {
    localStorage.removeItem("profile");
    setName("");
    setAvatar("cat");
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Create Your Profile</h1>
        <p>
          Set up your name and avatar to personalize your CyberAware experience.
        </p>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Janvi"
              required
            />
          </div>

          <div className="form-group">
            <label>Choose an Avatar</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {Object.keys(avatarEmoji).map((key) => {
                const selected = avatar === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAvatar(key)}
                    className={selected ? "primary-btn" : "secondary-btn"}
                    style={{ padding: "10px" }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>{avatarEmoji[key]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
            <button className="primary-btn" type="submit">
              Save Profile
            </button>

            <button className="secondary-btn" type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>

        <p style={{ marginTop: "16px" }}>
          <strong>Preview:</strong> {avatarEmoji[avatar]} {name || "Your Name"}
        </p>
      </div>
    </div>
  );
}

export default ProfileSetup;