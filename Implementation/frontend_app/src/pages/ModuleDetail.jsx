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

  const [extraScenarioChoice, setExtraScenarioChoice] = useState("");
  const [extraScenarioChecked, setExtraScenarioChecked] = useState(false);

  const score = useMemo(() => {
    return module.quiz.reduce((total, item, index) => {
      return total + (answers[index] === item.answer ? 1 : 0);
    }, 0);
  }, [answers, module.quiz]);

  const passMark = Math.ceil(module.quiz.length * 0.7);
  const passedQuiz = submitted && score >= passMark;
  const isCompleted = progress.completed[module.key];
  const scenarioCorrect = scenarioChoice === module.scenario.correctAnswer;
  const extraScenarioCorrect =
    extraScenarioChoice === module.extraScenario?.correctAnswer;

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (score >= passMark && !isCompleted) {
      completeModule(module.key, module.points);
    }
  };

  const handleScenarioCheck = (choice) => {
    setScenarioChoice(choice);
    setScenarioChecked(true);
  };

  const handleExtraScenarioCheck = (choice) => {
    setExtraScenarioChoice(choice);
    setExtraScenarioChecked(true);
  };

  if (!module) {
    return (
      <div className="page-shell">
        <div className="content-wrap">
          <div className="main-card">
            <h1 className="page-title">Module not found</h1>
            <p className="muted-text">The requested module could not be loaded.</p>
            <Link className="primary-btn" to="/modules">
              Back to Modules
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                <span>{profile?.avatar || "🛡️"}</span>
                <span>{profile?.name || "Learner"}</span>
              </div>

              <Link className="ghost-btn" to="/modules">
                Back to Modules
              </Link>
            </div>
          </div>

          <div className="subtle-line" />

          {module.image && (
            <section className="lesson-section">
              <img
                src={module.image}
                alt={module.title}
                style={{
                  width: "100%",
                  maxHeight: "380px",
                  objectFit: "cover",
                  borderRadius: "18px",
                  border: "1px solid #e7ebf0"
                }}
              />
            </section>
          )}

          <section className="lesson-section">
            <h2 className="lesson-section-title">Part 1: Key Concepts</h2>
            <p className="muted-text">
              Review these important notes before moving to scenarios and quiz questions.
            </p>

            <div className="lesson-points-grid">
              {module.content.map((item, index) => (
                <div key={index} className="lesson-point-card">
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
                  {module.scenario.subject && (
                    <p>
                      <strong>Subject:</strong> {module.scenario.subject}
                    </p>
                  )}
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
                <p>
                  {scenarioCorrect
                    ? module.scenario.correctText
                    : module.scenario.incorrectText}
                </p>
              </div>
            )}
          </section>

          {module.extraScenario && (
            <section className="lesson-section">
              <h2 className="lesson-section-title">{module.extraScenario.title}</h2>
              <p className="muted-text">{module.extraScenario.instructions}</p>

              <div className="scenario-card">
                <h3>{module.extraScenario.heading}</h3>

                <div className="scenario-body">
                  {module.extraScenario.body.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="scenario-actions">
                {module.extraScenario.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`scenario-btn ${
                      extraScenarioChoice === option ? "selected" : ""
                    }`}
                    onClick={() => handleExtraScenarioCheck(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {extraScenarioChecked && (
                <div
                  className={`scenario-feedback ${
                    extraScenarioCorrect ? "correct" : "incorrect"
                  }`}
                >
                  <h3>{extraScenarioCorrect ? "Correct ✅" : "Incorrect ❌"}</h3>
                  <p>
                    {extraScenarioCorrect
                      ? module.extraScenario.correctText
                      : module.extraScenario.incorrectText}
                  </p>
                </div>
              )}
            </section>
          )}

          <section className="lesson-section">
            <h2 className="lesson-section-title">Part 3: Knowledge Check</h2>
            <p className="muted-text">
              Answer the questions below and review the explanation after submission.
            </p>

            <form onSubmit={handleSubmitQuiz} className="form-grid">
              {module.quiz.map((item, index) => (
                <div key={item.question} className="quiz-card">
                  <h3>
                    Question {index + 1} of {module.quiz.length}
                  </h3>

                  <p className="quiz-question">{item.question}</p>

                  <div className="quiz-options-column">
                    {item.options.map((option) => {
                      const isSelected = answers[index] === option;
                      const isCorrect = item.answer === option;

                      return (
                        <label
                          key={option}
                          className={`quiz-option-card ${
                            submitted
                              ? isCorrect
                                ? "correct"
                                : isSelected
                                ? "incorrect"
                                : ""
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={isSelected}
                            onChange={() =>
                              setAnswers((prev) => ({ ...prev, [index]: option }))
                            }
                            disabled={submitted}
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div style={{ marginTop: "12px" }}>
                      {answers[index] === item.answer ? (
                        <div className="result-box success-box">
                          <p>
                            <strong>Correct.</strong> {item.explanation}
                          </p>
                        </div>
                      ) : (
                        <div className="result-box warning-box">
                          <p>
                            <strong>Incorrect.</strong> {item.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="lesson-bottom-actions">
                {!submitted ? (
                  <button className="primary-btn" type="submit">
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={() => {
                      setAnswers({});
                      setSubmitted(false);
                    }}
                  >
                    Try Again
                  </button>
                )}

                <Link className="ghost-btn" to="/modules">
                  Back to Modules
                </Link>
              </div>
            </form>

            {submitted && (
              <div className={`result-box ${passedQuiz ? "success-box" : "warning-box"}`}>
                <p>
                  Your score: <strong>{score}/{module.quiz.length}</strong>
                </p>
                <p>
                  Pass mark: <strong>{passMark}/{module.quiz.length}</strong>
                </p>

                {passedQuiz ? (
                  <>
                    <p>
                      Great job. You successfully demonstrated understanding of this topic.
                      Your points have been added.
                    </p>
                    <button className="primary-btn" onClick={() => navigate("/dashboard")}>
                      Go to Dashboard
                    </button>
                  </>
                ) : (
                  <p>
                    Review the notes, scenarios, and explanations, then try again.
                  </p>
                )}
              </div>
            )}

            {isCompleted && !submitted && (
              <div className="result-box success-box">
                This module is already completed. You can still review the content anytime.
              </div>
            )}
          </section>

          {module.realWorld && (
            <section className="lesson-section">
              <h2 className="lesson-section-title">{module.realWorld.title}</h2>
              <p className="muted-text">
                This example shows how the topic can appear in real life.
              </p>

              <div className="lesson-points-grid">
                {module.realWorld.story.map((line, index) => (
                  <div key={index} className="lesson-point-card">
                    {line}
                  </div>
                ))}
              </div>

              <div className="result-box warning-box" style={{ marginTop: 16 }}>
                <p>
                  <strong>Key Takeaway:</strong> {module.realWorld.takeaway}
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}