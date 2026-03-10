import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readProfile, readProgress, writeProgress, readPoints, writePoints } from "../lib/storage";

const LESSON = [
  {
    title: "What phishing is",
    body:
      "Phishing is when someone pretends to be a trusted person or company to trick you into clicking a link, sharing credentials, or sending money.",
  },
  {
    title: "Common red flags",
    body:
      "Urgency, threats, unexpected attachments, suspicious links, look-alike domains, and requests for passwords or MFA codes.",
  },
  {
    title: "What to do",
    body:
      "Do not click. Verify using the official website or app. Report it to your organization. If you clicked, change passwords and notify IT or security.",
  },
];

const SPOT = [
  {
    id: "p1",
    title: "Email: Payroll Update Required",
    from: "Payroll Team <payroll@company-payroll-support.com>",
    subject: "Action Required: Confirm your direct deposit info",
    body:
      "Hi,\n\nYour payroll will be paused unless you confirm your direct deposit within 2 hours.\n\nConfirm here: http://company-payroll-support.com/verify\n\nThanks,\nPayroll Team",
    answer: "phish",
    why:
      "This is phishing because it creates urgency, uses a suspicious domain, and asks you to complete a sensitive action through a link.",
  },
  {
    id: "p2",
    title: "SMS: Bank Alert",
    from: "+1 (604) 555-0188",
    subject: "Security Alert",
    body:
      "Your account is locked. Verify now: bit.ly/verify-now\nReply with the code you receive to unlock.",
    answer: "phish",
    why:
      "This is phishing because it uses a shortened link and asks for a security code, which should never be shared.",
  },
  {
    id: "p3",
    title: "Email: Shared Document",
    from: "Docs <no-reply@googIe-docs.com>",
    subject: "A document has been shared with you",
    body:
      "A document has been shared with you.\nOpen to view: https://googIe-docs.com/share\n\nIf you weren’t expecting this, ignore.",
    answer: "phish",
    why:
      "This is phishing because the domain is a look-alike. It uses a capital I to imitate a lowercase l in the brand name.",
  },
];

const QUIZ = [
  {
    q: "Which is a strong phishing indicator?",
    options: ["A branded logo", "Urgency + threats", "A friendly greeting", "A long email"],
    a: 1,
    explain:
      "Urgency and threats are common phishing tactics because attackers want you to panic and act without verifying the message.",
  },
  {
    q: "If a message asks for your MFA code, you should:",
    options: ["Share it", "Share only with a manager", "Never share it and report", "Send your password instead"],
    a: 2,
    explain:
      "MFA codes should never be shared. A request for your code is a serious red flag and should be reported.",
  },
  {
    q: "Safest way to verify a suspicious link is:",
    options: ["Click in incognito", "Open on phone", "Type the official site manually", "Forward to friends"],
    a: 2,
    explain:
      "Typing the official site manually is safer because it avoids interacting with the suspicious link entirely.",
  },
  {
    q: "Look-alike domains are used to:",
    options: ["Improve encryption", "Impersonate trusted brands", "Speed up internet", "Block malware"],
    a: 1,
    explain:
      "Look-alike domains are designed to trick users into thinking they are on a trusted site when they are not.",
  },
  {
    q: "If you clicked a suspicious link, best next step is:",
    options: ["Do nothing", "Change passwords and report", "Delete email only", "Restart laptop"],
    a: 1,
    explain:
      "If you clicked a suspicious link, you should act quickly by changing passwords and reporting the incident so it can be investigated.",
  },
];

export default function ModulePhishing() {
  const navigate = useNavigate();
  const profile = useMemo(() => readProfile(), []);

  const [step, setStep] = useState(0);
  const [spotIndex, setSpotIndex] = useState(0);
  const [spotAnswers, setSpotAnswers] = useState({});
  const [selectedSpotAnswer, setSelectedSpotAnswer] = useState(null);
  const [showSpotFeedback, setShowSpotFeedback] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);

  const [msg, setMsg] = useState("");

  const results = useMemo(() => {
    let spotCorrect = 0;
    for (const item of SPOT) {
      if (spotAnswers[item.id] === item.answer) spotCorrect += 1;
    }
    const spotPct = Math.round((spotCorrect / SPOT.length) * 100);

    let quizCorrect = 0;
    for (let i = 0; i < QUIZ.length; i++) {
      if (quizAnswers[i] === QUIZ[i].a) quizCorrect += 1;
    }
    const quizPct = Math.round((quizCorrect / QUIZ.length) * 100);

    const totalPct = Math.round(0.45 * spotPct + 0.55 * quizPct);
    const pointsEarned = 120 + Math.round(totalPct * 1.2);

    return { spotCorrect, spotPct, quizCorrect, quizPct, totalPct, pointsEarned };
  }, [spotAnswers, quizAnswers]);

  function handleSpotAnswer(value) {
    const item = SPOT[spotIndex];
    setSpotAnswers((prev) => ({ ...prev, [item.id]: value }));
    setSelectedSpotAnswer(value);
    setShowSpotFeedback(true);
  }

  function nextSpot() {
    if (selectedSpotAnswer === null) {
      setMsg("Please select an answer to continue.");
      return;
    }

    setMsg("");
    setSelectedSpotAnswer(null);
    setShowSpotFeedback(false);

    if (spotIndex < SPOT.length - 1) {
      setSpotIndex((i) => i + 1);
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
    const already = !!prog.completed?.phishing;

    prog.completed = prog.completed || {};
    prog.completed.phishing = true;
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
            <h1 style={{ margin: 0 }}>Phishing Awareness</h1>
            <p style={{ marginTop: 8, color: "#444" }}>
              Learn the red flags, spot suspicious messages, and pass a quick quiz.
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
              Start Spot the Phish
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2>Part 2: Spot the Phish</h2>
            <p style={{ color: "#444" }}>Read the message. Decide if it’s phishing or safe.</p>

            <div style={{ padding: 16, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
              <div style={{ fontWeight: 700 }}>{SPOT[spotIndex].title}</div>
              <div style={{ marginTop: 8, fontSize: 14, color: "#444" }}>
                <div><b>From:</b> {SPOT[spotIndex].from}</div>
                <div><b>Subject:</b> {SPOT[spotIndex].subject}</div>
              </div>
              <pre style={{ marginTop: 12, whiteSpace: "pre-wrap", fontFamily: "inherit", color: "#222" }}>
                {SPOT[spotIndex].body}
              </pre>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {[
                { value: "phish", label: "🚩 Phish" },
                { value: "safe", label: "✅ Safe" },
              ].map((option) => {
                const isSelected = selectedSpotAnswer === option.value;
                const isCorrect = option.value === SPOT[spotIndex].answer;

                let borderStyle = "1px solid rgba(0,0,0,0.12)";
                if (showSpotFeedback && isSelected && isCorrect) borderStyle = "2px solid #1a7f37";
                if (showSpotFeedback && isSelected && !isCorrect) borderStyle = "2px solid #b00020";

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSpotAnswer(option.value)}
                    style={{
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

            {showSpotFeedback && selectedSpotAnswer && (
              <div
                style={{
                  marginTop: 14,
                  padding: 12,
                  borderRadius: 12,
                  background:
                    selectedSpotAnswer === SPOT[spotIndex].answer
                      ? "rgba(26,127,55,0.10)"
                      : "rgba(176,0,32,0.10)",
                  border:
                    selectedSpotAnswer === SPOT[spotIndex].answer
                      ? "1px solid rgba(26,127,55,0.25)"
                      : "1px solid rgba(176,0,32,0.25)",
                }}
              >
                <div style={{ fontWeight: 800 }}>
                  {selectedSpotAnswer === SPOT[spotIndex].answer ? "Correct ✅" : "Incorrect ❌"}
                </div>
                <div style={{ marginTop: 6, color: "#333", lineHeight: 1.5 }}>
                  {selectedSpotAnswer === SPOT[spotIndex].answer
                    ? `Correct. ${SPOT[spotIndex].why}`
                    : `The correct answer is: ${SPOT[spotIndex].answer === "phish" ? "Phish" : "Safe"}. ${SPOT[spotIndex].why}`}
                </div>
              </div>
            )}

            <button onClick={nextSpot} style={{ marginTop: 14 }}>
              {spotIndex < SPOT.length - 1 ? "Next Message" : "Continue to Quiz"}
            </button>

            <div style={{ marginTop: 10, color: "#666" }}>
              Item {spotIndex + 1} / {SPOT.length}
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
                <div style={{ fontWeight: 700 }}>Spot the Phish</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{results.spotPct}%</div>
                <div style={{ color: "#555" }}>{results.spotCorrect} / {SPOT.length} correct</div>
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
              {SPOT.map((it) => (
                <div key={it.id} style={{ padding: 12, borderRadius: 14, border: "1px solid rgba(0,0,0,0.08)" }}>
                  <div style={{ fontWeight: 700 }}>{it.title}</div>
                  <div style={{ marginTop: 6, color: "#333" }}>{it.why}</div>
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