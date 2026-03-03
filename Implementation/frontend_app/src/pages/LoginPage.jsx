import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

async function getSupabase() {
  try {
    const mod = await import("../lib/supabaseClient");
    return mod?.supabase || null;
  } catch {
    return null;
  }
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [supabaseReady, setSupabaseReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      const supabase = await getSupabase();
      if (!supabase) {
        setSupabaseReady(false);
        return;
      }
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session) navigate("/dashboard");
        setSupabaseReady(true);
      } catch {
        setSupabaseReady(false);
      }
    };
    check();
  }, [navigate]);

  const handleAuth = async () => {
    setMsg("");
    setLoading(true);

    const supabase = await getSupabase();
    if (!supabase) {
      setLoading(false);
      setMsg("Login is unavailable right now. Use Offline Mode.");
      return;
    }

    try {
      if (!email.trim() || !password) {
        setMsg("Enter email and password.");
        setLoading(false);
        return;
      }

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setMsg(error.message || "Login failed.");
        } else {
          setMsg("Logged in ✅");
          navigate("/dashboard");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) {
          setMsg(error.message || "Sign up failed.");
        } else {
          setMsg("Account created. Check your email if confirmation is required.");
          setMode("login");
        }
      }
    } catch {
      setMsg("Authentication is unavailable right now. Use Offline Mode.");
    } finally {
      setLoading(false);
    }
  };

  const goOffline = () => {
    navigate("/profile-setup");
  };

  return (
    <div style={{ padding: "40px 20px" }}>
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: 24,
          borderRadius: 18,
          background: "rgba(255,255,255,0.92)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>CyberAware</h1>
        <div style={{ marginTop: 6, color: "#555" }}>
          {mode === "login" ? "Log in to sync your progress." : "Create an account to sync your progress."}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button
            onClick={() => setMode("login")}
            style={{ opacity: mode === "login" ? 1 : 0.65 }}
            disabled={loading}
          >
            Log In
          </button>
          <button
            onClick={() => setMode("signup")}
            style={{ opacity: mode === "signup" ? 1 : 0.65 }}
            disabled={loading}
          >
            Sign Up
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.2)" }}
            disabled={loading}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.2)" }}
            disabled={loading}
          />
        </div>

        <button
          onClick={handleAuth}
          style={{ marginTop: 16, width: "100%", height: 44 }}
          disabled={loading}
        >
          {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
        </button>

        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <button onClick={goOffline} style={{ opacity: 0.9 }}>
            Continue in Offline Mode
          </button>

          <div style={{ color: supabaseReady ? "#1a7f37" : "#b00020", fontWeight: 700 }}>
            {supabaseReady ? "Sync Available" : "Sync Unavailable"}
          </div>
        </div>

        {msg && <div style={{ marginTop: 12, color: "#444" }}>{msg}</div>}

        <div style={{ marginTop: 18, color: "#666", fontSize: 14, lineHeight: 1.5 }}>
          Offline Mode saves your profile, progress, and points locally in your browser. If sync becomes available, you can log
          in later to connect your account.
        </div>
      </div>
    </div>
  );
}