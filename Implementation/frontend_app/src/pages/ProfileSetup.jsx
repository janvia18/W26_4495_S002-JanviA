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
  if (pts === null) localStorage.setItem("points", "0");

  const prog = safeJson(localStorage.getItem("progress"), null);
  if (!prog) {
    localStorage.setItem(
      "progress",
      JSON.stringify({ completed: { phishing: false, password: false, social: false } })
    );
  }
}

export default function ProfileSetup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("cat");

  useEffect(() => {
    const saved = safeJson(localStorage.getItem("profile"), null);
    if (saved?.name && saved?.avatar) {
      ensureDefaults();
      nav("/dashboard");
      return;
    }
    ensureDefaults();
  }, [nav]);

  const handleSave = (e) => {
    e.preventDefault();

    const profile = { name: name.trim(), avatar };
    localStorage.setItem("profile", JSON.stringify(profile));

    ensureDefaults();
    nav("/dashboard");
  };

  const handleReset = () => {
    localStorage.removeItem("profile");
    setName("");
    setAvatar("cat");
  };

  return (
    <div className="shell">
      <div className="heroCard">
        <div className="cardWide" style={{ maxWidth: 520 }}>
          <h1 className="title">Create Your Profile</h1>
          <p className="text">Profile and progress are saved locally for this prototype. Server sync is planned.</p>

          <form onSubmit={handleSave} style={{ marginTop: 16 }}>
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Janvi"
                required
              />
            </div>

            <div className="field">
              <label className="label">Avatar</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {Object.keys(avatarEmoji).map((key) => {
                  const selected = avatar === key;
                  return (
                    <button
                      type="button"
                      key={key}
                      className={selected ? "btnPrimary" : "btnSecondary"}
                      onClick={() => setAvatar(key)}
                      style={{ padding: 10 }}
                    >
                      <span style={{ fontSize: 20 }}>{avatarEmoji[key]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="btnRow" style={{ marginTop: 14 }}>
              <button className="btnPrimary" type="submit">
                Save Profile
              </button>

              <button className="btnSecondary" type="button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>

          <p style={{ marginTop: 12 }} className="mutedText">
            Preview: {avatarEmoji[avatar]} {name || "Your Name"}
          </p>
        </div>
      </div>
    </div>
  );
}