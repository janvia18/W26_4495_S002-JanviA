import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readProfile, readProgress, writeProgress, readPoints, writePoints } from "../lib/storage";

const LESSON = [
  {
    title: "What social engineering is",
    body:
      "Social engineering is when attackers manipulate people to reveal information, approve actions, or bypass normal security steps. The goal is to trigger trust, fear, urgency, or curiosity.",
  },
  {
    title: "Common tactics",
    body:
      "Impersonation, pretexting, urgency, authority pressure, fake support calls, baiting with attachments, and requests for codes or access.",
  },
  {
    title: "Safe response",
    body:
      "Pause, verify identity using official channels, never share passwords or MFA codes, and report suspicious requests to your organization’s security team.",
  },
];

const SCENARIOS = [
  {
    id: "s1",
    title: "IT Support Call",
    prompt:
      "Someone calls claiming to be IT. They say your laptop is infected and ask for your MFA code to “confirm your identity” while they fix it.",
    safe: "refuse_report",
    why:
      "IT should never ask for MFA codes or passwords. Verify using official support channels and report the attempt.",
  },
  {
    id: "s2",
    title: "Urgent Manager Request",
    prompt:
      "You receive a message: “I’m in a meeting. Buy gift cards right now and send me the codes. Don’t tell anyone.” The sender name matches your manager.",
    safe: "verify",
    why:
      "Urgency + secrecy + gift cards are classic fraud signals. Verify via a trusted channel using known contact info.",
  },
  {
    id: "s3",
    title: "Visitor Tailgating",
    prompt:
      "A person behind you says: “My badge isn’t working, can you hold the door? I’m late.” They look stressed and friendly.",
    safe: "policy",
    why:
      "Tailgating bypasses physical security. Follow policy: ask them to badge in or escort them to reception.",
  },
];

const QUIZ = [
  { q: "Social engineering mainly targets:", options: ["Firewalls", "People and behavior", "Encryption algorithms", "Wi-Fi speed"], a: 1 },
  { q: "Which is a strong red flag in a request?", options: ["Clear verification steps", "Urgency + secrecy", "Official ticket number", "Normal tone"], a: 1 },
  { q: "If someone asks for your MFA code, you should:", options: ["Share it if they sound official", "Share it only once", "Never share it and verify identity", "Text it later"], a: 2 },
  { q: "Best way to verify an unusual request is:", options: ["Reply to the same email thread", "Use a trusted official channel", "Click the link they sent", "Ask a stranger"], a: 1 },
  { q: "Tailgating is when:", options: ["Someone follows you through a secure door", "You forget your password", "A device runs out of battery", "A link is shortened"], a: 0 },
];

export default function ModuleSocial() {
  const navigate = useNavigate();
  const profile = useMemo(() => readProfile(), []);

  const [step, setStep] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState({});
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [msg, setMsg] = useState("");

  const results = useMemo(() => {
    let scenarioCorrect = 0;
    for (const s of SCENARIOS) {
      if (scenarioAnswers[s.id] === s.safe) scenarioCorrect += 1;
    }
    const scenarioPct = Math.round((scenarioCorrect / SCENARIOS.length) * 100);

    let quizCorrect = 0;
    for (let i = 0; i < QUIZ.length; i++) {
      if (quizAnswers[i] === QUIZ[i].a) quizCorrect += 1;
    }
    const quizPct = Math.round((quizCorrect / QUIZ.length) * 100);

    const totalPct = Math.round(0.5 * scenarioPct + 0.5 * quizPct);
    const pointsEarned = 100 + Math.round(totalPct * 1.0);

    return { scenarioCorrect, scenarioPct, quizCorrect, quizPct, totalPct, pointsEarned };
  }, [scenarioAnswers, quizAnswers]);

  function answerScenario(value) {
    const s = SCENARIOS[scenarioIndex];
    setScenarioAnswers((p) => ({ ...p, [s.id]: value }));
    if (scenarioIndex < SCENARIOS.length - 1) setScenarioIndex((i) => i + 1);
    else setStep(2);
  }

  function nextQuiz() {
    if (quizAnswers[quizIndex] === undefined) {
      setMsg("Please select an answer to continue.");
      return;
    }
    setMsg("");
    if (quizIndex < QUIZ.length - 1) setQuizIndex((i) => i + 1);
    else setStep(3);
  }

  function finishModule() {
    const prog = readProgress();

    if (!prog.completed?.password) {
      navigate("/modules");
      return;
    }

    const already = !!prog.completed?.social;

    prog.completed = prog.completed || {};
    prog.completed.social = true;
    writeProgress(prog);

    if (!already) {
      const current = readPoints();
      writePoints(current + results.pointsEarned);
    }

    navigate("/modules");
  }

  return (
    <div style={{ padding: "40px 20px" }}>
      <div
        style={{
          background: "rgba(255,255,255,0.92)",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          maxWidth: 980,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0 }}>Social Engineering</h1>
            <p style={{ marginTop: 8, color: "#444" }}>Practice safe responses to manipulation tactics.</p>
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
              Start Scenarios
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2>Part 2: Choose the safest response</h2>
            <p style={{ color: "#444" }}>Pick the best action. Focus on verifying identity and following policy.</p>

            <div style={{ padding: 16, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
              <div style={{ fontWeight: 800 }}>{SCENARIOS[scenarioIndex].title}</div>
              <div style={{ marginTop: 10, color: "#222", lineHeight: 1.6 }}>{SCENARIOS[scenarioIndex].prompt}</div>
            </div>

            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <button onClick={() => answerScenario("refuse_report")}>Refuse, report, and verify through official support</button>
              <button onClick={() => answerScenario("verify")}>Verify identity using a trusted channel before acting</button>
              <button onClick={() => answerScenario("policy")}>Follow policy and route the person to the proper process</button>
              <button onClick={() => answerScenario("comply")}>Comply quickly to avoid trouble</button>
            </div>

            <div style={{ marginTop: 10, color: "#666" }}>
              Scenario {scenarioIndex + 1} / {SCENARIOS.length}
            </div>
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
                <div style={{ fontWeight: 700 }}>Scenarios</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{results.scenarioPct}%</div>
                <div style={{ color: "#555" }}>{results.scenarioCorrect} / {SCENARIOS.length} correct</div>
              </div>

              <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
                <div style={{ fontWeight: 700 }}>Quiz</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{results.quizPct}%</div>
                <div style={{ color: "#555" }}>{results.quizCorrect} / {QUIZ.length} correct</div>
              </div>

              <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
                <div style={{ fontWeight: 700 }}>Total Score</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{results.totalPct}%</div>
                <div style={{ color: "#555" }}>Points earned: +{results.pointsEarned}</div>
              </div>
            </div>

            <h3 style={{ marginTop: 16 }}>What to remember</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {SCENARIOS.map((s) => (
                <div key={s.id} style={{ padding: 12, borderRadius: 14, border: "1px solid rgba(0,0,0,0.08)" }}>
                  <div style={{ fontWeight: 800 }}>{s.title}</div>
                  <div style={{ marginTop: 6, color: "#333" }}>{s.why}</div>
                </div>
              ))}
            </div>

            <button onClick={finishModule} style={{ marginTop: 18 }}>
              Save & Mark Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}