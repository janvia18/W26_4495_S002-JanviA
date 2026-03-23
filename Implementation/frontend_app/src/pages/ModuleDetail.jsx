import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function ModuleDetail({ module }) {
  const { progress, completeModule, profile } = useProgress();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scenarioChoice, setScenarioChoice] = useState("");
  const [scenarioChecked, setScenarioChecked] = useState(false);

  const score = useMemo(() => {
    return module.quiz.reduce((total, item, index) => {
      return total + (answers[index] === item.answer ? 1 : 0);
    }, 0);
  }, [answers, module.quiz]);

  const passedQuiz = submitted && score >= Math.ceil(module.quiz.length / 2);
  const isCompleted = progress.completed[module.key];

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (score >= Math.ceil(module.quiz.length / 2)) {
      completeModule(module.key, module.points);
    }
  };

  const scenarioContent = getScenarioContent(module.key);

  const handleScenarioCheck = (choice) => {
    setScenarioChoice(choice);
    setScenarioChecked(true);
  };

  const scenarioCorrect = scenarioChoice === scenarioContent.correctAnswer;

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card lesson-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">
                {module.title} <span className="module-emoji">{getModuleEmoji(module.key)}</span>
              </h1>
              <p className="lesson-intro">{module.description}</p>
            </div>

            <div className="lesson-user-panel">
              <div className="user-chip">
                <span>{profile.avatar || "🛡️"}</span>
                <span>{profile.name || "Learner"}</span>
              </div>

              <Link className="ghost-btn" to="/modules">
                Back to Modules
              </Link>
            </div>
          </div>

          <div className="subtle-line" />

          <section className="lesson-section">
            <h2 className="lesson-section-title">Part 1: Learn the Basics</h2>
            <p className="muted-text">
              Review the key concepts below before starting the quiz.
            </p>

            <div className="lesson-points-grid">
              {module.content.map((item) => (
                <div key={item} className="lesson-point-card">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="lesson-section">
            <h2 className="lesson-section-title">{scenarioContent.title}</h2>
            <p className="muted-text">{scenarioContent.instructions}</p>

            <div className="scenario-card">
              {scenarioContent.type === "message" ? (
                <>
                  <h3>{scenarioContent.heading}</h3>
                  <div className="scenario-meta">
                    {scenarioContent.from && (
                      <p>
                        <strong>From:</strong> {scenarioContent.from}
                      </p>
                    )}
                    {scenarioContent.subject && (
                      <p>
                        <strong>Subject:</strong> {scenarioContent.subject}
                      </p>
                    )}
                  </div>

                  <div className="scenario-body">
                    {scenarioContent.body.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3>{scenarioContent.heading}</h3>
                  <div className="scenario-body">
                    {scenarioContent.body.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="scenario-actions">
              {scenarioContent.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`scenario-btn ${
                    scenarioChoice === option ? "selected" : ""
                  }`}
                  onClick={() => handleScenarioCheck(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {scenarioChecked && (
              <div className={`scenario-feedback ${scenarioCorrect ? "correct" : "incorrect"}`}>
                <h3>{scenarioCorrect ? "Correct ✅" : "Try Again ⚠️"}</h3>
                <p>{scenarioCorrect ? scenarioContent.correctText : scenarioContent.incorrectText}</p>
              </div>
            )}
          </section>

          <section className="lesson-section">
            <h2 className="lesson-section-title">Part 3: Knowledge Check</h2>
            <p className="muted-text">
              Answer the quiz questions below.
            </p>

            <form onSubmit={handleSubmitQuiz} className="form-grid">
              {module.quiz.map((item, index) => (
                <div key={item.question} className="quiz-card">
                  <h3>
                    Question {index + 1} of {module.quiz.length}
                  </h3>
                  <p className="quiz-question">{item.question}</p>

                  <div className="quiz-options-column">
                    {item.options.map((option) => (
                      <label key={option} className="quiz-option-card">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() =>
                            setAnswers((prev) => ({ ...prev, [index]: option }))
                          }
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="lesson-bottom-actions">
                <button className="primary-btn" type="submit">
                  Submit Quiz
                </button>
                <Link className="secondary-btn" to="/modules">
                  Back to Modules
                </Link>
              </div>
            </form>

            {submitted && (
              <div className={`result-box ${passedQuiz ? "success-box" : "warning-box"}`}>
                <p>
                  Your score: <strong>{score}/{module.quiz.length}</strong>
                </p>

                {passedQuiz ? (
                  <>
                    <p>Nice work. This module is complete and your points have been added.</p>
                    <button
                      className="primary-btn"
                      onClick={() => navigate("/dashboard")}
                    >
                      Go to Dashboard
                    </button>
                  </>
                ) : (
                  <p>Review the lesson and try again.</p>
                )}
              </div>
            )}

            {isCompleted && !submitted && (
              <div className="result-box success-box">
                This module is already completed.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function getModuleEmoji(key) {
  const emojiMap = {
    phishing: "📨",
    passwords: "🔐",
    mfa: "📱",
    social: "🕵️",
    "safe-browsing": "🌐",
    incident: "🚨"
  };

  return emojiMap[key] || "📘";
}

function getScenarioContent(key) {
  const scenarios = {
    phishing: {
      title: "Part 2: Spot the Phish",
      instructions: "Read the message. Decide if it's phishing or safe.",
      type: "message",
      heading: "Email: Payroll Update Required",
      from: "Payroll Team <payroll@company-payroll-support.com>",
      subject: "Action Required: Confirm your direct deposit info",
      body: [
        "Hi,",
        "Your payroll will be paused unless you confirm your direct deposit within 2 hours.",
        "Confirm here: http://company-payroll-support.com/verify",
        "Thanks,",
        "Payroll Team"
      ],
      options: ["🚩 Phish", "✅ Safe"],
      correctAnswer: "🚩 Phish",
      correctText:
        "Correct. This is phishing because it creates urgency, uses a suspicious domain, and asks you to complete a sensitive action through a link.",
      incorrectText:
        "Not quite. Look for signs like urgency, suspicious domains, and requests for sensitive actions."
    },
    passwords: {
      title: "Part 2: Password Check",
      instructions: "Choose the safer password behavior.",
      type: "message",
      heading: "Account Setup Choice",
      body: [
        "A coworker says they use the same password everywhere because it is easier to remember.",
        "Another coworker uses a password manager and different passwords for each account."
      ],
      options: ["Same password everywhere", "Use password manager"],
      correctAnswer: "Use password manager",
      correctText:
        "Correct. A password manager helps create and store strong unique passwords for each account.",
      incorrectText:
        "Not quite. Reusing passwords creates risk because one breach can expose many accounts."
    },
    mfa: {
      title: "Part 2: MFA Prompt Check",
      instructions: "Read the scenario and decide the safest action.",
      type: "message",
      heading: "Unexpected Sign-In Prompt",
      body: [
        "You receive a login approval notification on your phone, but you are not trying to log in.",
        "The prompt asks you to approve access immediately."
      ],
      options: ["Approve it", "Deny it"],
      correctAnswer: "Deny it",
      correctText:
        "Correct. Unexpected MFA prompts may mean someone else has your password and is trying to access your account.",
      incorrectText:
        "Not quite. Never approve an MFA prompt you did not initiate."
    },
    social: {
      title: "Part 2: Social Engineering Check",
      instructions: "Decide the safest response.",
      type: "message",
      heading: "Urgent Caller Request",
      body: [
        "A caller says they are from IT and urgently need your password to fix your account.",
        "They say the CEO needs this done immediately."
      ],
      options: ["Share password", "Verify identity first"],
      correctAnswer: "Verify identity first",
      correctText:
        "Correct. Attackers often use urgency and authority. Always verify identity before sharing anything sensitive.",
      incorrectText:
        "Not quite. Legitimate IT staff should not ask for your password directly."
    },
    "safe-browsing": {
      title: "Part 2: Safe Browsing Check",
      instructions: "Choose the safest action.",
      type: "message",
      heading: "Download Prompt",
      body: [
        "A pop-up claims your device is infected and tells you to download a cleanup file immediately from an unknown site."
      ],
      options: ["Download now", "Close and verify source"],
      correctAnswer: "Close and verify source",
      correctText:
        "Correct. Unexpected pop-ups and urgent download prompts are common attack methods.",
      incorrectText:
        "Not quite. Downloading files from unknown prompts can expose your device to malware."
    },
    incident: {
      title: "Part 2: Incident Response Check",
      instructions: "Choose the best next step.",
      type: "message",
      heading: "Suspicious Activity",
      body: [
        "You accidentally clicked a suspicious link and noticed strange browser behavior afterward."
      ],
      options: ["Report immediately", "Ignore it"],
      correctAnswer: "Report immediately",
      correctText:
        "Correct. Fast reporting helps contain issues and reduces the chance of further damage.",
      incorrectText:
        "Not quite. Delaying a report can make security incidents worse."
    }
  };

  return scenarios[key];
}