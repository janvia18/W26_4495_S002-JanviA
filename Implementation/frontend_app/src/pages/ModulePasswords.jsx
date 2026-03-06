import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readProfile, readProgress, writeProgress, readPoints, writePoints } from "../lib/storage";

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

const LESSON = [
  {
    title: "Strong password basics",
    body: "Use long passphrases. Length and uniqueness matter more than trying to make a very short password look complicated.",
  },
  {
    title: "Never reuse passwords",
    body: "If one site is breached, reused passwords can be tried on your other accounts. This is called credential stuffing.",
  },
  {
    title: "Password managers and MFA",
    body: "A password manager helps create unique passwords. MFA adds another layer of protection if a password is stolen.",
  },
];

const QUIZ = [
  {
    q: "What is the best general approach for passwords?",
    options: ["Short and complex", "Long and unique passphrases", "Same password everywhere", "Only symbols"],
    a: 1,
  },
  {
    q: "Why is password reuse dangerous?",
    options: ["It is not dangerous", "It makes login faster", "A breach on one site can affect other accounts", "It improves security"],
    a: 2,
  },
  {
    q: "A password manager helps by:",
    options: ["Sharing passwords", "Generating and storing unique passwords", "Removing MFA", "Making passwords shorter"],
    a: 1,
  },
  {
    q: "MFA is useful because:",
    options: ["It protects if a password is stolen", "It makes passwords optional", "It replaces usernames", "It hides your email"],
    a: 0,
  },
  {
    q: "Which passphrase is strongest?",
    options: ["Password123!", "janvi2001", "Blue Train Mango River 2026!", "qwerty!"],
    a: 2,
  },
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

  return {
    score,
    length,
    words,
    hasUpper,
    hasNumber,
    hasSymbol,
    looksCommon,
  };
}

export default function ModulePasswords() {
  const navigate = useNavigate();
  const profile = useMemo(() => readProfile(), []);

  const [step, setStep] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [msg, setMsg] = useState("");

  const analysis = useMemo(() => scorePassphrase(phrase), [phrase]);

  const results = useMemo(() => {
    let quizCorrect = 0;
    for (let i = 0; i < QUIZ.length; i++) {
      if (quizAnswers[i] === QUIZ[i].a) quizCorrect += 1;
    }

    const quizPct = Math.round((quizCorrect / QUIZ.length) * 100);
    const builderPct = analysis.score;
    const totalPct = Math.round((quizPct + builderPct) / 2);
    const pointsEarned = 110 + Math.round(totalPct * 1.1);

    return {
      quizCorrect,
      quizPct,
      builderPct,
      totalPct,
      pointsEarned,
    };
  }, [quizAnswers, analysis.score]);

  function nextQuiz() {
    if (quizAnswers[quizIndex] === undefined) {
      setMsg("Please select an answer to continue.");
      return;
    }

    setMsg("");

    if (quizIndex < QUIZ.length - 1) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setStep(3);
    }
  }

  function finishModule() {
    const prog = readProgress();

    if (!prog.completed?.phishing) {
      navigate("/modules");
      return;
    }

    const alreadyCompleted = !!prog.completed?.password;

    prog.completed.password = true;
    writeProgress(prog);

    if (!alreadyCompleted) {
      const current = readPoints();
      writePoints(current + results.pointsEarned);
    }

    navigate("/modules");
  }

  const emoji = avatarEmoji[profile?.avatar] || "🙂";

  return (
    <div style={{ padding: "40px 20px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          margin: "0 auto",
          background: "rgba(255,255,255,0.92)",
          borderRadius: 22,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 420px", minWidth: 280 }}>
            <h1 style={{ margin: 0 }}>Passwords & Passphrases</h1>
            <p style={{ marginTop: 8, color: "#444", lineHeight: 1.6 }}>
              Learn how to create stronger passwords, avoid reuse, and protect accounts with better habits.
            </p>
          </div>

          <div style={{ textAlign: "right", minWidth: 180 }}>
            <div style={{ fontWeight: 700 }}>
              {emoji} Hi, {profile?.name || "Learner"}
            </div>
            <button onClick={() => navigate("/modules")} style={{ marginTop: 10 }}>
              Back to Modules
            </button>
          </div>
        </div>

        <hr style={{ margin: "20px 0", opacity: 0.2 }} />

        {step === 0 && (
          <div>
            <h2 style={{ marginTop: 0 }}>Part 1: Learn</h2>

            <div style={{ display: "grid", gap: 14 }}>
              {LESSON.map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: 16,
                    borderRadius: 16,
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "rgba(255,255,255,0.85)",
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{item.title}</div>
                  <div style={{ marginTop: 6, color: "#333", lineHeight: 1.6 }}>{item.body}</div>
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
            <h2 style={{ marginTop: 0 }}>Part 2: Passphrase Builder</h2>
            <p style={{ color: "#444", lineHeight: 1.6 }}>
              Create a passphrase with at least 4 words. Avoid names, birthdays, and common patterns.
            </p>

            <input
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="Example: Blue Train Mango River 2026!"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.2)",
                fontSize: 16,
              }}
            />

            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                marginTop: 16,
              }}
            >
              <div
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "rgba(255,255,255,0.85)",
                }}
              >
                <div style={{ fontWeight: 800 }}>Strength Score</div>
                <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8 }}>{analysis.score}%</div>
                <div style={{ color: "#555", marginTop: 6 }}>Length: {analysis.length} characters</div>
                <div style={{ color: "#555" }}>Words: {analysis.words}</div>
              </div>

              <div
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "rgba(255,255,255,0.85)",
                }}
              >
                <div style={{ fontWeight: 800 }}>Checklist</div>
                <div style={{ marginTop: 8, color: analysis.words >= 4 ? "#1a7f37" : "#555" }}>• 4 or more words</div>
                <div style={{ color: analysis.length >= 14 ? "#1a7f37" : "#555" }}>• 14 or more characters</div>
                <div style={{ color: analysis.hasUpper ? "#1a7f37" : "#555" }}>• Includes uppercase letters</div>
                <div style={{ color: analysis.hasNumber ? "#1a7f37" : "#555" }}>• Includes a number</div>
                <div style={{ color: analysis.hasSymbol ? "#1a7f37" : "#555" }}>• Includes a symbol</div>
                <div style={{ color: analysis.looksCommon ? "#b00020" : "#1a7f37" }}>• Avoid common patterns</div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              style={{ marginTop: 18 }}
              disabled={analysis.score < 50}
            >
              Continue to Quiz
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ marginTop: 0 }}>Part 3: Quick Quiz</h2>

            <div
              style={{
                padding: 16,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "rgba(255,255,255,0.85)",
              }}
            >
              <div style={{ fontWeight: 800 }}>
                Q{quizIndex + 1}. {QUIZ[quizIndex].q}
              </div>

              <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                {QUIZ[quizIndex].options.map((opt, idx) => (
                  <label key={opt} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <input
                      type="radio"
                      name={`q-${quizIndex}`}
                      checked={quizAnswers[quizIndex] === idx}
                      onChange={() => setQuizAnswers((prev) => ({ ...prev, [quizIndex]: idx }))}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              {msg && <div style={{ marginTop: 12, color: "#b00020" }}>{msg}</div>}

              <button onClick={nextQuiz} style={{ marginTop: 16 }}>
                {quizIndex < QUIZ.length - 1 ? "Next" : "Finish Quiz"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ marginTop: 0 }}>Results</h2>

            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              <div
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "rgba(255,255,255,0.85)",
                }}
              >
                <div style={{ fontWeight: 800 }}>Builder</div>
                <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8 }}>{results.builderPct}%</div>
              </div>

              <div
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "rgba(255,255,255,0.85)",
                }}
              >
                <div style={{ fontWeight: 800 }}>Quiz</div>
                <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8 }}>{results.quizPct}%</div>
                <div style={{ color: "#555", marginTop: 6 }}>
                  {results.quizCorrect} / {QUIZ.length} correct
                </div>
              </div>

              <div
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "rgba(255,255,255,0.85)",
                }}
              >
                <div style={{ fontWeight: 800 }}>Total</div>
                <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8 }}>{results.totalPct}%</div>
                <div style={{ color: "#555", marginTop: 6 }}>Points earned: +{results.pointsEarned}</div>
              </div>
            </div>

            <button onClick={finishModule} style={{ marginTop: 18 }}>
              Save & Mark Completed
            </button>
            <button type="button" onClick={() => navigate("/modules")}>
               Back to Modules
            </button>
          </div>
        )}
      </div>
    </div>
  );
}