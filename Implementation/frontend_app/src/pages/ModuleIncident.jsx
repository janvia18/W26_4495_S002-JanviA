import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readProfile, readProgress, writeProgress, readPoints, writePoints } from "../lib/storage";

const LESSON = [
  {
    title: "Why reporting matters",
    body:
      "Security incidents should be reported quickly so damage can be contained. Early reporting can prevent data loss, account compromise, and wider impact on the organization.",
  },
  {
    title: "What should be reported",
    body:
      "Suspicious emails, unusual login prompts, lost devices, malware warnings, accidental data sharing, and unauthorized access attempts should all be reported.",
  },
  {
    title: "What good reporting looks like",
    body:
      "Report what happened, when it happened, what device or account was involved, and what action you already took. Clear details help security teams respond faster.",
  },
];

const SCENARIOS = [
  {
    id: "i1",
    title: "Clicked suspicious link",
    prompt:
      "You clicked a suspicious email link before realizing it might be phishing. Nothing obvious happened on screen.",
    correct: "report-now",
    why:
      "Even if nothing seems wrong, report it immediately. Quick reporting gives security teams a chance to investigate and reduce damage.",
  },
  {
    id: "i2",
    title: "Lost work device",
    prompt:
      "You cannot find your work laptop after commuting home. You are not sure whether it was misplaced or stolen.",
    correct: "report-device",
    why:
      "Lost devices may contain sensitive data and should be reported right away so protective steps can be taken.",
  },
  {
    id: "i3",
    title: "Wrong attachment sent",
    prompt:
      "You accidentally emailed a file containing sensitive information to the wrong external recipient.",
    correct: "report-data",
    why:
      "Accidental data disclosure is still a security incident. Report it quickly so the organization can respond appropriately.",
  },
];

const QUIZ = [
  {
    q: "What is the best reason to report a security incident quickly?",
    options: ["To create more paperwork", "To contain damage and respond sooner", "To avoid logging out", "To improve internet speed"],
    a: 1,
  },
  {
    q: "Which of the following should be reported?",
    options: ["Only confirmed attacks", "Only large incidents", "Suspicious activity and accidental mistakes", "Only phishing emails"],
    a: 2,
  },
  {
    q: "A useful incident report should include:",
    options: ["Only your opinion", "What happened, when, and what was affected", "Just a screenshot with no context", "A guess about who caused it"],
    a: 1,
  },
  {
    q: "If you clicked a suspicious link but nothing happened, you should:",
    options: ["Ignore it", "Wait a week", "Report it anyway", "Delete your browser"],
    a: 2,
  },
  {
    q: "A lost work laptop should be:",
    options: ["Reported immediately", "Ignored until tomorrow", "Mentioned only if found", "Reset remotely by guessing"],
    a: 0,
  },
];

export default function ModuleIncident() {
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
      if (scenarioAnswers[s.id] === s.correct) scenarioCorrect += 1;
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
    const item = SCENARIOS[scenarioIndex];
    setScenarioAnswers((prev) => ({ ...prev, [item.id]: value }));
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

    if (!prog.completed?.browsing) {
      navigate("/modules");
      return;
    }

    const already = !!prog.completed?.incident;

    prog.completed = prog.completed || {};
    prog.completed.incident = true;
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
            <h1 style={{ margin: 0 }}>Incident Reporting</h1>
            <p style={{ marginTop: 8, color: "#444" }}>
              Learn when to report suspicious activity and what details help security teams respond.
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
              Start Incident Scenarios
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2>Part 2: Choose the safest action</h2>
            <p style={{ color: "#444" }}>Read the scenario and pick the best response.</p>

            <div style={{ padding: 16, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
              <div style={{ fontWeight: 800 }}>{SCENARIOS[scenarioIndex].title}</div>
              <div style={{ marginTop: 10, color: "#222", lineHeight: 1.6 }}>
                {SCENARIOS[scenarioIndex].prompt}
              </div>
            </div>

            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <button onClick={() => answerScenario("report-now")}>Report it immediately</button>
              <button onClick={() => answerScenario("report-device")}>Report the lost device right away</button>
              <button onClick={() => answerScenario("report-data")}>Report the accidental data disclosure</button>
              <button onClick={() => answerScenario("ignore")}>Wait and see if it becomes serious</button>
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
              {SCENARIOS.map((item) => (
                <div key={item.id} style={{ padding: 12, borderRadius: 14, border: "1px solid rgba(0,0,0,0.08)" }}>
                  <div style={{ fontWeight: 800 }}>{item.title}</div>
                  <div style={{ marginTop: 6, color: "#333" }}>{item.why}</div>
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