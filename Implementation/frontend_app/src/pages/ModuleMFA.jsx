import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readProfile, readProgress, writeProgress, readPoints, writePoints } from "../lib/storage";

const LESSON = [
  {
    title: "What MFA is",
    body:
      "Multi-Factor Authentication adds another step to login. Instead of relying only on a password, it asks for a second factor such as a code, app approval, or security key.",
  },
  {
    title: "Why MFA matters",
    body:
      "Even if a password is stolen, MFA makes account takeover much harder. It is one of the most effective ways to reduce unauthorized access.",
  },
  {
    title: "Safe MFA habits",
    body:
      "Never share your authentication codes. Be careful of MFA fatigue attacks, where repeated login prompts are sent to pressure you into approving one by mistake.",
  },
];

const SCENARIOS = [
  {
    id: "m1",
    title: "Unexpected approval request",
    prompt:
      "You receive an MFA approval notification on your phone, but you are not trying to log in anywhere.",
    correct: "deny",
    why:
      "An unexpected MFA prompt may mean someone has your password. Deny the request and change your password immediately.",
  },
  {
    id: "m2",
    title: "Text message code request",
    prompt:
      "Someone claiming to be IT asks you to send them the 6-digit code that was just texted to your phone.",
    correct: "never-share",
    why:
      "Authentication codes should never be shared. Legitimate support staff should not ask for them.",
  },
  {
    id: "m3",
    title: "Authenticator app setup",
    prompt:
      "You are choosing between SMS codes and an authenticator app for an important account.",
    correct: "app",
    why:
      "Authenticator apps are generally safer than SMS because they are less vulnerable to SIM swap attacks.",
  },
];

const QUIZ = [
  {
    q: "What is the main purpose of MFA?",
    options: [
      "To replace passwords",
      "To add an extra layer of protection",
      "To speed up login",
      "To remove usernames",
    ],
    a: 1,
    explain:
      "MFA adds another layer of security so a password alone is not enough for an attacker to access an account.",
  },
  {
    q: "If you receive an MFA prompt you did not request, you should:",
    options: [
      "Approve it quickly",
      "Ignore it forever",
      "Deny it and secure your account",
      "Share it with IT",
    ],
    a: 2,
    explain:
      "Unexpected MFA prompts can mean someone is trying to log in using your password. Deny the request and secure the account immediately.",
  },
  {
    q: "Which option is usually safer than SMS MFA?",
    options: ["Authenticator app", "Email login", "Browser history", "Public Wi-Fi"],
    a: 0,
    explain:
      "Authenticator apps are generally safer than SMS because SMS can be vulnerable to SIM swap attacks and message interception.",
  },
  {
    q: "An MFA fatigue attack tries to:",
    options: [
      "Improve your login speed",
      "Pressure you into approving a request",
      "Change your email",
      "Delete your account",
    ],
    a: 1,
    explain:
      "MFA fatigue attacks work by sending repeated login requests until a user becomes annoyed or confused and approves one by mistake.",
  },
  {
    q: "You should share an MFA code when:",
    options: ["Your manager asks", "IT support asks", "A website asks by email", "Never"],
    a: 3,
    explain:
      "MFA codes should never be shared. Legitimate support staff and trusted services should not ask you to send them your code.",
  },
];

export default function ModuleMFA() {
  const navigate = useNavigate();
  const profile = useMemo(() => readProfile(), []);

  const [step, setStep] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState({});
  const [selectedScenarioAnswer, setSelectedScenarioAnswer] = useState(null);
  const [showScenarioFeedback, setShowScenarioFeedback] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);

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

  function handleScenarioAnswer(value) {
    const item = SCENARIOS[scenarioIndex];
    setScenarioAnswers((prev) => ({ ...prev, [item.id]: value }));
    setSelectedScenarioAnswer(value);
    setShowScenarioFeedback(true);
  }

  function nextScenario() {
    if (selectedScenarioAnswer === null) {
      setMsg("Please select an answer to continue.");
      return;
    }

    setMsg("");
    setSelectedScenarioAnswer(null);
    setShowScenarioFeedback(false);

    if (scenarioIndex < SCENARIOS.length - 1) {
      setScenarioIndex((i) => i + 1);
    } else {
      setStep(2);
    }
  }

  function handleQuizAnswer(idx) {
    setQuizAnswers((prev) => ({ ...prev, [quizIndex]: idx }));
    setSelectedQuizAnswer(idx);
    setShowQuizFeedback(true);
  }

  function nextQuiz() {
    if (selectedQuizAnswer === null) {
      setMsg("Please select an answer to continue.");
      return;
    }

    setMsg("");
    setSelectedQuizAnswer(null);
    setShowQuizFeedback(false);

    if (quizIndex < QUIZ.length - 1) {
      setQuizIndex((i) => i + 1);
    } else {
      setStep(3);
    }
  }

  function finishModule() {
    const prog = readProgress();

    if (!prog.completed?.social) {
      navigate("/modules");
      return;
    }

    const already = !!prog.completed?.mfa;

    prog.completed = prog.completed || {};
    prog.completed.mfa = true;
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
            <h1 style={{ margin: 0 }}>Multi-Factor Authentication</h1>
            <p style={{ marginTop: 8, color: "#444" }}>
              Learn how MFA protects accounts and how to use it safely.
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
              Start MFA Scenarios
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
              {[
                { value: "deny", label: "Deny the request and secure the account" },
                { value: "never-share", label: "Never share the code" },
                { value: "app", label: "Choose an authenticator app" },
                { value: "approve", label: "Approve it to make it stop" },
              ].map((option) => {
                const isSelected = selectedScenarioAnswer === option.value;
                const isCorrect = option.value === SCENARIOS[scenarioIndex].correct;

                let borderStyle = "1px solid rgba(0,0,0,0.12)";
                if (showScenarioFeedback && isSelected && isCorrect) borderStyle = "2px solid #1a7f37";
                if (showScenarioFeedback && isSelected && !isCorrect) borderStyle = "2px solid #b00020";

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleScenarioAnswer(option.value)}
                    style={{
                      textAlign: "left",
                      padding: 12,
                      borderRadius: 12,
                      border: borderStyle,
                      background: "rgba(255,255,255,0.9)",
                      cursor: "pointer",
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {msg && <div style={{ marginTop: 10, color: "#b00020" }}>{msg}</div>}

            {showScenarioFeedback && selectedScenarioAnswer && (
              <div
                style={{
                  marginTop: 14,
                  padding: 12,
                  borderRadius: 12,
                  background:
                    selectedScenarioAnswer === SCENARIOS[scenarioIndex].correct
                      ? "rgba(26,127,55,0.10)"
                      : "rgba(176,0,32,0.10)",
                  border:
                    selectedScenarioAnswer === SCENARIOS[scenarioIndex].correct
                      ? "1px solid rgba(26,127,55,0.25)"
                      : "1px solid rgba(176,0,32,0.25)",
                }}
              >
                <div style={{ fontWeight: 800 }}>
                  {selectedScenarioAnswer === SCENARIOS[scenarioIndex].correct ? "Correct ✅" : "Incorrect ❌"}
                </div>
                <div style={{ marginTop: 6, color: "#333", lineHeight: 1.5 }}>
                  {selectedScenarioAnswer === SCENARIOS[scenarioIndex].correct
                    ? `Correct. ${SCENARIOS[scenarioIndex].why}`
                    : `The safest answer is different for this situation. ${SCENARIOS[scenarioIndex].why}`}
                </div>
              </div>
            )}

            <button onClick={nextScenario} style={{ marginTop: 14 }}>
              {scenarioIndex < SCENARIOS.length - 1 ? "Next Scenario" : "Continue to Quiz"}
            </button>

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
                {QUIZ[quizIndex].options.map((opt, idx) => {
                  const isSelected = selectedQuizAnswer === idx;
                  const isCorrect = idx === QUIZ[quizIndex].a;

                  let borderStyle = "1px solid rgba(0,0,0,0.12)";
                  if (showQuizFeedback && isSelected && isCorrect) borderStyle = "2px solid #1a7f37";
                  if (showQuizFeedback && isSelected && !isCorrect) borderStyle = "2px solid #b00020";

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleQuizAnswer(idx)}
                      style={{
                        textAlign: "left",
                        padding: 12,
                        borderRadius: 12,
                        border: borderStyle,
                        background: "rgba(255,255,255,0.9)",
                        cursor: "pointer",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {msg && <div style={{ marginTop: 10, color: "#b00020" }}>{msg}</div>}

              {showQuizFeedback && selectedQuizAnswer !== null && (
                <div
                  style={{
                    marginTop: 14,
                    padding: 12,
                    borderRadius: 12,
                    background:
                      selectedQuizAnswer === QUIZ[quizIndex].a
                        ? "rgba(26,127,55,0.10)"
                        : "rgba(176,0,32,0.10)",
                    border:
                      selectedQuizAnswer === QUIZ[quizIndex].a
                        ? "1px solid rgba(26,127,55,0.25)"
                        : "1px solid rgba(176,0,32,0.25)",
                  }}
                >
                  <div style={{ fontWeight: 800 }}>
                    {selectedQuizAnswer === QUIZ[quizIndex].a ? "Correct ✅" : "Incorrect ❌"}
                  </div>

                  <div style={{ marginTop: 6, color: "#333", lineHeight: 1.5 }}>
                    {selectedQuizAnswer === QUIZ[quizIndex].a
                      ? `Good choice. ${QUIZ[quizIndex].explain}`
                      : `The correct answer is: ${QUIZ[quizIndex].options[QUIZ[quizIndex].a]}. ${QUIZ[quizIndex].explain}`}
                  </div>
                </div>
              )}

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