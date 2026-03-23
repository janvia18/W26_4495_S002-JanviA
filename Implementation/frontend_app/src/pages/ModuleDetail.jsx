import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

const emojiMap = {
  phishing: "📨",
  passwords: "🔐",
  mfa: "📱",
  social: "🕵️",
  "safe-browsing": "🌐",
  incident: "🚨"
};

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
  const scenarioCorrect = scenarioChoice === module.scenario.correctAnswer;

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (score >= Math.ceil(module.quiz.length / 2)) {
      completeModule(module.key, module.points);
    }
  };

  const handleScenarioCheck = (choice) => {
    setScenarioChoice(choice);
    setScenarioChecked(true);
  };

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card lesson-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">
                {module.title} <span className="module-emoji">{emojiMap[module.key]}</span>
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
            <p className="muted-text">Review the key concepts below before starting the quiz.</p>

            <div className="lesson-points-grid">
              {module.content.map((item) => (
                <div key={item} className="lesson-point-card">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="lesson-section">
            <h2 className="lesson-section-title">{module.scenario.title}</h2>
            <p className="muted-text">{module.scenario.instructions}</p>

            <div className="scenario-card">
              <h3>{module.scenario.heading}</h3>

              {module.scenario.from && (
                <div className="scenario-meta">
                  <p>
                    <strong>From:</strong> {module.scenario.from}
                  </p>
                  <p>
                    <strong>Subject:</strong> {module.scenario.subject}
                  </p>
                </div>
              )}

              <div className="scenario-body">
                {module.scenario.body.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            <div className="scenario-actions">
              {module.scenario.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`scenario-btn ${scenarioChoice === option ? "selected" : ""}`}
                  onClick={() => handleScenarioCheck(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {scenarioChecked && (
              <div className={`scenario-feedback ${scenarioCorrect ? "correct" : "incorrect"}`}>
                <h3>{scenarioCorrect ? "Correct ✅" : "Incorrect ❌"}</h3>
                <p>{scenarioCorrect ? module.scenario.correctText : module.scenario.incorrectText}</p>
              </div>
            )}
          </section>

          <section className="lesson-section">
            <h2 className="lesson-section-title">Part 3: Knowledge Check</h2>
            <p className="muted-text">Answer the quiz questions below.</p>

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
                    <button className="primary-btn" onClick={() => navigate("/dashboard")}>
                      Go to Dashboard
                    </button>
                  </>
                ) : (
                  <p>Review the lesson and try again.</p>
                )}
              </div>
            )}

            {isCompleted && !submitted && (
              <div className="result-box success-box">This module is already completed.</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}