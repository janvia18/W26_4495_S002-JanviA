import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const avatars = [
  { id: "bear", label: "Bear", emoji: "🐻" },
  { id: "horse", label: "Horse", emoji: "🐴" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "dog", label: "Dog", emoji: "🐶" },
  { id: "fox", label: "Fox", emoji: "🦊" },
  { id: "panda", label: "Panda", emoji: "🐼" },
  { id: "rabbit", label: "Rabbit", emoji: "🐰" },
  { id: "tiger", label: "Tiger", emoji: "🐯" },
  { id: "lion", label: "Lion", emoji: "🦁" },
  { id: "monkey", label: "Monkey", emoji: "🐵" },
  { id: "koala", label: "Koala", emoji: "🐨" },
  { id: "penguin", label: "Penguin", emoji: "🐧" },
  { id: "frog", label: "Frog", emoji: "🐸" },
  { id: "owl", label: "Owl", emoji: "🦉" },
  { id: "unicorn", label: "Unicorn", emoji: "🦄" },
  { id: "dragon", label: "Dragon", emoji: "🐲" },
];

function safeJson(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

async function getSupabase() {
  try {
    const mod = await import("../lib/supabaseClient");
    return mod?.supabase || null;
  } catch {
    return null;
  }
}

export default function Home() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const saved = safeJson(localStorage.getItem("profile"), null);
    if (saved) {
      setName(saved?.name || "");
      setAvatar(saved?.avatar || "");
    }

    const loadRemote = async () => {
      const supabase = await getSupabase();
      if (!supabase) return;

      try {
        const { data } = await supabase.auth.getSession();
        const session = data?.session;
        if (!session) return;

        const { data: row } = await supabase
          .from("profiles")
          .select("name, avatar")
          .eq("user_id", session.user.id)
          .single();

        if (row) {
          setName(row.name || "");
          setAvatar(row.avatar || "");
          localStorage.setItem("profile", JSON.stringify({ name: row.name || "", avatar: row.avatar || "" }));
        }
      } catch {
        return;
      }
    };

    loadRemote();
  }, []);

  const handleSave = async () => {
    if (!name.trim() || !avatar) return;

    const profileData = { name: name.trim(), avatar };
    localStorage.setItem("profile", JSON.stringify(profileData));

    setMsg("Saved locally ✅");

    const supabase = await getSupabase();
    if (supabase) {
      try {
        const { data } = await supabase.auth.getSession();
        const session = data?.session;

        if (session) {
          const { error } = await supabase.from("profiles").upsert(
            {
              user_id: session.user.id,
              name: profileData.name,
              avatar: profileData.avatar,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );

          if (error) setMsg("Saved locally (sync failed)");
          else setMsg("Saved and synced ✅");
        } else {
          setMsg("Saved locally (login to sync)");
        }
      } catch {
        setMsg("Saved locally (sync unavailable)");
      }
    } else {
      setMsg("Saved locally (sync unavailable)");
    }

    navigate("/dashboard");
  };

  const handleReset = async () => {
    setName("");
    setAvatar("");
    setMsg("");
    localStorage.removeItem("profile");

    const supabase = await getSupabase();
    if (supabase) {
      try {
        const { data } = await supabase.auth.getSession();
        const session = data?.session;
        if (session) {
          await supabase.from("profiles").delete().eq("user_id", session.user.id);
        }
      } catch {
        return;
      }
    }
  };

  return (
    <div className="shell">
      <div className="heroCard">
        <div className="cardWide">
          <h1 className="title">Create your profile</h1>

          <div className="field">
            <label className="label">Your name</label>
            <input
              className="input"
              placeholder="e.g., Janvi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Pick a character</label>

            <div className="grid">
              {avatars.map((a) => (
                <button
                  key={a.id}
                  className={avatar === a.id ? "avatarCard selected" : "avatarCard"}
                  onClick={() => setAvatar(a.id)}
                  type="button"
                >
                  <div className="emoji">{a.emoji}</div>
                  <div className="avatarLabel">{a.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="btnRow">
            <button className="btnPrimary" onClick={handleSave} disabled={!name.trim() || !avatar}>
              Save
            </button>

            <button className="btnSecondary" onClick={handleReset}>
              Reset
            </button>
          </div>

          {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}