import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readProfile, readProgress, writeProgress, readPoints, writePoints } from "../lib/storage";

const LESSON = [
  {
    title: "What safe browsing means",
    body:
      "Safe browsing means being cautious with websites, downloads, browser prompts, and links. Many threats begin with a single unsafe click.",
  },
  {
    title: "Common warning signs",
    body:
      "Typos in website addresses, unexpected pop-ups, download prompts from unknown sites, insecure links, and requests for unusual permissions are common signs of risk.",
  },
  {
    title: "Safer habits",
    body:
      "Use trusted websites, keep your browser updated, avoid downloading unknown files, and check the web address carefully before entering sensitive information.",
  },
];

const SCENARIOS = [
  {
    id: "b1",
    title: "Download prompt",
    prompt:
      "A website immediately shows a pop-up saying your video player is outdated and asks you to download a file to continue.",
    correct: "avoid-download",
    why:
      "Unexpected download prompts from websites are common malware delivery tricks. Close the page and use only official sources for software updates.",
  },
  {
    id: "b2",
    title: "Look-alike shopping site",
    prompt:
      "You search for a popular store and click a result with a slightly misspelled web address that still looks convincing.",
    correct: "check-url",
    why:
      "Attackers often use look-alike domains to trick users. Always inspect the URL carefully before signing in or entering payment details.",
  },
  {
    id: "b3",
    title: "Browser permission request",
    prompt:
      "A website asks for notification access and camera permission even though you only came to read an article.",
    correct: "deny-unneeded",
    why:
      "Websites should only receive permissions that are necessary for their function. Unnecessary permission requests should be denied.",
  },
];

const QUIZ = [
  {
    q: "Which is a common safe browsing habit?",
    options: [
      "Download files from unknown pop-ups",
      "Check the website address carefully",
      "Ignore browser updates forever",
      "Approve every browser permission",
    ],
    a: 1,
    explain:
      "Checking the website address helps you spot fake or look-alike domains before entering sensitive information.",
  },
  {
    q: "A misspelled website address may indicate:",
    options: [
      "Better performance",
      "A legitimate redesign",
      "A look-alike or malicious website",
      "A faster server",
    ],
    a: 2,
    explain:
      "Look-alike domains are commonly used to trick users into visiting fake websites that steal credentials or payment information.",
  },
  {
    q: "If a page suddenly asks you to install software, you should:",
    options: [
      "Install it immediately",
      "Use only official sources for software",
      "Send it to friends",
      "Turn off antivirus",
    ],
    a: 1,
    explain:
      "Unexpected download prompts are risky. Software updates and downloads should come from official, trusted sources only.",
  },
  {
    q: "A website asking for unnecessary camera or notification access should be:",
    options: [
      "Allowed by default",
      "Denied unless truly needed",
      "Ignored forever",
      "Approved if it looks modern",
    ],
    a: 1,
    explain:
      "Permissions should only be granted when they are clearly necessary for the site’s function. Unneeded permissions increase risk.",
  },
  {
    q: "One good way to reduce browser-based risk is:",
    options: [
      "Using outdated browsers",
      "Keeping browser software updated",
      "Clicking shortened links",
      "Disabling all security warnings",
    ],
    a: 1,
    explain:
      "Browser updates often include security patches that fix known vulnerabilities and reduce the risk of exploitation.",
  },
];

export default function ModuleBrowsing() {
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

    if (!prog.completed?.mfa) {
      navigate("/modules");
      return;
    }

    const already = !!prog.completed?.browsing;

    prog.completed = prog.completed || {};
    prog.completed.browsing = true;
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
            <h1 style={{ margin: 0 }}>Safe Browsing</h1>
            <p style={{ marginTop: 8, color: "#444" }}>
              Learn how to identify risky websites, unsafe downloads, and unnecessary browser permissions.
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
                <div
                  key={c.title}
                  style={{ padding: 16, borderRadius: 14, border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  <div style={{ marginTop: 6, color: "#333" }}>{c.body}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={{ marginTop: 18 }}>
              Start Browsing Scenarios
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
                { value: "avoid-download", label: "Avoid the download and use official sources" },
                { value: "check-url", label: "Check the URL carefully before continuing" },
                { value: "deny-unneeded", label: "Deny unnecessary permissions" },
                { value: "allow-all", label: "Allow everything to continue faster" },
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