import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readProgress, writeProgress, readPoints, writePoints } from "../lib/storage";

function finishPassword(pointsEarned = 140) {
  const navigate = useNavigate();

  const prog = readProgress();

  if (!prog.completed?.phishing) {
    navigate("/modules");
    return;
  }

  const already = !!prog.completed?.password;

  prog.completed.password = true;
  writeProgress(prog);

  if (!already) {
    const current = readPoints();
    writePoints(current + pointsEarned);
  }

  navigate("/modules");
}

import { readProfile, readProgress, writeProgress, readPoints, writePoints } from "../lib/storage";

function safeJson(raw, fallback) {
  try { return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
function readProfile() {
  return safeJson(localStorage.getItem(LS_PROFILE), { name: "Learner", avatar: "horse" });
}
function defaultProgress() {
  return { points: 0, completed: {}, quizScores: {}, lastCompletedAt: {} };
}
function readProgress() {
  return safeJson(localStorage.getItem(LS_PROGRESS), defaultProgress());
}
function writeProgress(next) {
  localStorage.setItem(LS_PROGRESS, JSON.stringify(next));
}

const LESSON = [
  { title: "Strong password basics", body: "Best practice: use long passphrases (14+ characters). Length beats complexity when it’s meaningful and unique." },
  { title: "Never reuse passwords", body: "If one site is breached, reused passwords let attackers access your other accounts (credential stuffing)." },
  { title: "Password managers + MFA", body: "A password manager creates and stores unique passwords. MFA adds a second check so a stolen password alone isn’t enough." },
];

function scorePassphrase(text) {
  const t = (text || "").trim();
  const length = t.length;
  const words = t.split(/\s+/).filter(Boolean).length;

  const hasNumber = /\d/.test(t);
  const hasSymbol = /[^a-zA-Z0-9\s]/.test(t);
  const hasUpper = /[A-Z]/.test(t);

  const looksCommon = /(password|qwerty|12345|letmein)/i.test(t);

  let score = 0;
  if (length >= 14) score += 40;
  else score += Math.max(0, Math.round((length / 14) * 40));

  if (words >= 4) score += 25;
  else score += Math.round((words / 4) * 25);

  if (hasUpper) score += 10;
  if (hasNumber) score += 10;
  if (hasSymbol) score += 10;

  if (looksCommon) score -= 25;

  score = Math.max(0, Math.min(100, score));
  return { score, length, words, hasUpper, hasNumber, hasSymbol, looksCommon };
}

const QUIZ = [
  {
    q: "What is the best general approach for passwords?",
    options: ["Short and complex", "Long and unique (passphrases)", "Same password everywhere", "Only symbols"],
    a: 1,
    explain: "Long + unique is easiest to remember and hardest to crack when done as a passphrase.",
  },
  {
    q: "Why is password reuse dangerous?",
    options: ["It isn’t", "It makes login faster", "Breaches on one site can unlock your other accounts", "It improves encryption"],
    a: 2,
    explain: "Attackers try leaked passwords on many services (credential stuffing).",
  },
  {
    q: "A password manager helps by:",
    options: ["Sharing passwords with friends", "Generating and storing unique passwords", "Removing MFA", "Making passwords shorter"],
    a: 1,
    explain: "It reduces reuse and makes strong passwords practical.",
  },
  {
    q: "MFA protects you when:",
    options: ["Your password is stolen", "Your laptop is fast", "You use emojis", "You click every link"],
    a: 0,
    explain: "MFA adds an extra factor, so a password alone is not enough.",
  },
  {
    q: "Which passphrase is strongest?",
    options: ["Password123!", "Janvi2001", "Correct Horse Battery Staple", "qwerty!"],
    a: 2,
    explain: "Long, multi-word passphrases are strong and memorable.",
  },
];

export default function PasswordModule() {
  const navigate = useNavigate();
  const profile = useMemo(() => readProfile(), []);

  const [step, setStep] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [msg, setMsg] = useState("");

  const analysis = useMemo(() => scorePassphrase(phrase), [phrase]);

  function nextQuiz() {
    if (quizAnswers[quizIndex] === undefined) {
      setMsg("Please select an answer to continue.");
      return;
    }
    setMsg("");
    if (quizIndex < QUIZ.length - 1) setQuizIndex((i) => i + 1);
    else setStep(3);
  }

  const results = useMemo(() => {
    let quizCorrect = 0;
    for (let i = 0; i < QUIZ.length; i++) {
      if (quizAnswers[i] === QUIZ[i].a) quizCorrect += 1;
    }
    const quizPct = Math.round((quizCorrect / QUIZ.length) * 100);

    const builderPct = analysis.score;
    const totalPct = Math.round(0.5 * quizPct + 0.5 * builderPct);
    const pointsEarned = 110 + Math.round(totalPct * 1.1);

    return { quizCorrect, quizPct, builderPct, totalPct, pointsEarned };
  }, [quizAnswers, analysis.score]);

  function finishModule() {
    const prev = readProgress();

    if (!prev?.completed?.phishing) {
      alert("Complete Phishing Awareness first.");
      navigate("/modules");
      return;
    }

    const alreadyCompleted = !!prev.completed?.password;

    const next = { ...prev };
    next.completed = { ...(prev.completed || {}), password: true };
    next.quizScores = { ...(prev.quizScores || {}), password: results.totalPct };
    next.lastCompletedAt = { ...(prev.lastCompletedAt || {}), password: new Date().toISOString() };

    if (!alreadyCompleted) next.points = (prev.points || 0) + results.pointsEarned;

    writeProgress(next);
    navigate("/modules");
  }

  return (
    <div style={{ padding: "40px 20px" }}>
      <div style={{
        background: "rgba(255,255,255,0.92)",
        borderRadius: 18,
        padding: 24,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        maxWidth: 980,
        margin: "0 auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0 }}>Password Security</h1>
            <p style={{ marginTop: 8, color: "#444" }}>
              Build safer passwords, avoid reuse, and use MFA like a pro.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600 }}>Hi, {profile?.name || "Learner"}</div>
            <button onClick={() => navigate("/modules")} style={{ marginTop: 8 }}>
              Back to Modules
            </button>
          </div>
        </div>

        <hr style={{ margin: "18px 0", opacity: 0.2 }} />

        {step === 0 && (
          <div>
            <h2>Part 1: Learn</h2>
            <div style={{ display: "grid", gap: 14 }}>
              {LESSON.map((c) => (
                <div key={c.title} style={{ padding: 16, borderRadius: 14, border: "1px solid rgba(0,0,0,0.08)" }}>
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  <div style={{ marginTop: 6, color: "#333" }}>{c.body}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={{ marginTop: 18 }}>
              Start Passphrase Builder
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2>Part 2: Passphrase Builder</h2>
            <p style={{ color: "#444" }}>
              Create a passphrase (4+ words). Avoid names, birthdays, and common patterns.
            </p>

            <input
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="Example: Blue train mango river 2026!"
              style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.2)" }}
            />

            <div style={{ display: "grid", gap: 10, marginTop: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
                <div style={{ fontWeight: 700 }}>Strength Score</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{analysis.score}%</div>
                <div style={{ color: "#555" }}>Length: {analysis.length} chars</div>
                <div style={{ color: "#555" }}>Words: {analysis.words}</div>
              </div>

              <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
                <div style={{ fontWeight: 700 }}>Checklist</div>
                <div style={{ color: analysis.words >= 4 ? "#1a7f37" : "#555" }}>• 4+ words</div>
                <div style={{ color: analysis.length >= 14 ? "#1a7f37" : "#555" }}>• 14+ characters</div>
                <div style={{ color: analysis.hasNumber ? "#1a7f37" : "#555" }}>• Includes a number</div>
                <div style={{ color: analysis.hasSymbol ? "#1a7f37" : "#555" }}>• Includes a symbol</div>
                <div style={{ color: analysis.looksCommon ? "#b00020" : "#1a7f37" }}>
                  • Avoid common patterns
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              style={{ marginTop: 16 }}
              disabled={analysis.score < 50}
              title={analysis.score < 50 ? "Try making it longer (4+ words)" : "Continue"}
            >
              Continue to Quiz
            </button>

            {analysis.score < 50 && (
              <div style={{ marginTop: 10, color: "#666" }}>
                Tip: aim for 4+ words and 14+ characters. Length is your superpower.
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Part 3: Quick Quiz</h2>

            <div style={{ padding: 16, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
              <div style={{ fontWeight: 700 }}>
                Q{quizIndex + 1}. {QUIZ[quizIndex].q}
              </div>

              <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                {QUIZ[quizIndex].options.map((opt, idx) => (
                  <label key={opt} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <input
                      type="radio"
                      name={`q-${quizIndex}`}
                      checked={quizAnswers[quizIndex] === idx}
                      onChange={() => setQuizAnswers((p) => ({ ...p, [quizIndex]: idx }))}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              {msg && <div style={{ marginTop: 10, color: "#b00020" }}>{msg}</div>}

              <button onClick={nextQuiz} style={{ marginTop: 14 }}>
                {quizIndex < QUIZ.length - 1 ? "Next" : "Finish Quiz"}
              </button>

              <div style={{ marginTop: 10, color: "#666" }}>
                Question {quizIndex + 1} / {QUIZ.length}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Results</h2>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
                <div style={{ fontWeight: 700 }}>Builder</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{results.builderPct}%</div>
              </div>

              <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
                <div style={{ fontWeight: 700 }}>Quiz</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{results.quizPct}%</div>
                <div style={{ color: "#555" }}>
                  {results.quizCorrect} / {QUIZ.length} correct
                </div>
              </div>

              <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
                <div style={{ fontWeight: 700 }}>Total</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{results.totalPct}%</div>
                <div style={{ color: "#555" }}>Points earned: +{results.pointsEarned}</div>
              </div>
            </div>

            <button onClick={() => finishPassword(160)}>Save & Mark Completed</button>
          </div>
        )}
      </div>
    </div>
  );
}