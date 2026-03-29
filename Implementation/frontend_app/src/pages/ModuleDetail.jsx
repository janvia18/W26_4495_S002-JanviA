import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";
import { getModuleCoverSrc } from "../lib/moduleAssets";
import ModuleComicStrip from "../components/ModuleComicStrip";

function stripQuestionNumber(text) {
  return String(text).replace(/^\s*\d+\.\s*/, "");
}

const ORDER = ["phishing", "passwords", "mfa", "social", "safeBrowsing", "incident"];
const ROUTES = {
  phishing: "/modules/phishing",
  passwords: "/modules/passwords",
  mfa: "/modules/mfa",
  social: "/modules/social",
  safeBrowsing: "/modules/safe-browsing",
  incident: "/modules/incident"
};

function getNextModuleKey(currentKey, completedMap) {
  const currentIndex = ORDER.indexOf(currentKey);
  if (currentIndex < 0) return null;
  for (let i = currentIndex + 1; i < ORDER.length; i++) {
    const key = ORDER[i];
    if (!completedMap?.[key]) return key;
  }
  return null;
}

export default function ModuleDetail({ module }) {
  const { completeModule, progress } = useProgress();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scenarioChoice, setScenarioChoice] = useState("");
  const [scenarioChecked, setScenarioChecked] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const celebrationGate = useRef(false);
  const wasCompletedOnMount = useRef(false);

  const totalQuestions = module ? module.quiz.length : 0;
  const score =
    submitted && module
      ? module.quiz.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0)
      : 0;
  const passed = Boolean(submitted && module && score >= Math.ceil(totalQuestions / 2));

  useEffect(() => {
    if (!module?.key) return;
    celebrationGate.current = false;
    setCelebrate(false);
    wasCompletedOnMount.current = Boolean(progress?.completed?.[module.key]);
  }, [module?.key]);

  useEffect(() => {
    if (!module?.key) return;
    wasCompletedOnMount.current = Boolean(progress?.completed?.[module.key]);
  }, [module?.key, progress?.completed]);

  useEffect(() => {
    if (!submitted || !passed || celebrationGate.current) return;
    if (wasCompletedOnMount.current) return;
    celebrationGate.current = true;
    setCelebrate(true);
    const t = window.setTimeout(() => setCelebrate(false), 3200);
    return () => window.clearTimeout(t);
  }, [submitted, passed]);

  if (!module) {
    return (
      <div className="page-shell">
        <div className="content-wrap">
          <div className="main-card" style={{ textAlign: "center", padding: "2.5rem" }}>
            <h2>Loading module...</h2>
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = Boolean(progress?.completed?.[module.key]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextScore = module.quiz.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0);
    const nextPassed = nextScore >= Math.ceil(module.quiz.length / 2);
    setSubmitted(true);
    if (nextPassed && !isCompleted) {
      completeModule(module.key, module.points);
    }
  };

  const scenario = module.scenario;
  const coverSrc = getModuleCoverSrc(module.key);

  return (
    <div className="page-shell module-page">
      {celebrate && (
        <div className="module-celebration" role="status" aria-live="polite">
          <div className="module-celebration-confetti" aria-hidden="true">
            {Array.from({ length: 20 }, (_, i) => (
              <span
                key={i}
                className="module-celebration-piece"
                style={{
                  animationDelay: `${i * 0.06}s`,
                  left: `${3 + i * 4.7}%`,
                }}
              />
            ))}
          </div>
          <div className="module-celebration-card">
            <p className="module-celebration-kicker">Mission complete</p>
            <p className="module-celebration-xp">+{module.points} XP</p>
            <p className="module-celebration-sub muted-text">Nice work—keep the streak going.</p>
          </div>
        </div>
      )}
      <div className="content-wrap module-page-inner">
        <header className={`module-detail-hero ${coverSrc ? '' : 'module-detail-hero--no-cover'}`}>
          {coverSrc && (
            <div className="module-detail-hero-cover" aria-hidden="true">
              <img src={coverSrc} alt="" className="module-detail-hero-img" width={960} height={280} />
              <div className="module-detail-hero-scrim" />
            </div>
          )}
          <div className="module-detail-hero-bar">
            <div className="module-detail-hero-text">
              <p className="module-detail-mission-kicker">Active mission</p>
              <h1 className="page-title module-page-title module-detail-hero-title">{module.title}</h1>
            </div>
            <Link to="/modules" className="ghost-btn module-back-btn">
              ← Mission board
            </Link>
          </div>
        </header>

        <nav className="module-part-nav" aria-label="Jump to module sections">
          <a className="module-part-nav-link" href="#part-learn">
            <span className="module-part-nav-num">1</span>
            Learn
          </a>
          <a className="module-part-nav-link" href="#part-scenario">
            <span className="module-part-nav-num">2</span>
            Scenario
          </a>
          <a className="module-part-nav-link" href="#part-quiz">
            <span className="module-part-nav-num">3</span>
            Quiz
          </a>
        </nav>

        <section id="part-learn" className="main-card module-detail-section lesson-section">
          <h2 className="lesson-section-title module-detail-section-title">Part 1 · Learn the basics</h2>
          <p className="lesson-intro muted-text">Short ideas to remember before the scenario and quiz.</p>
          <div id="part-comic" className="module-comic-anchor">
            <ModuleComicStrip moduleKey={module.key} />
          </div>
          <h3 className="module-key-points-heading">Key points</h3>
          <div className="lesson-points-grid">
            {module.content.map((item, i) => (
              <div key={i} className="lesson-point-card">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="part-scenario" className="main-card module-detail-section lesson-section">
          <h2 className="lesson-section-title module-detail-section-title">Part 2 · {scenario.title}</h2>
          <p className="lesson-intro muted-text">{scenario.instructions}</p>

          <div className="scenario-card module-email-card">
            {scenario.emailTitle && (
              <p className="module-email-kicker">
                <strong>Email:</strong> {scenario.emailTitle}
              </p>
            )}
            {scenario.from && (
              <p className="scenario-meta-line">
                <strong>From:</strong> {scenario.from}
              </p>
            )}
            {scenario.subject && (
              <p className="scenario-meta-line">
                <strong>Subject:</strong> {scenario.subject}
              </p>
            )}
            {!scenario.from && !scenario.subject && (
              <h3 className="module-scenario-heading">{scenario.heading}</h3>
            )}
            {(scenario.from || scenario.subject) && (
              <h3 className="module-scenario-heading module-scenario-heading--sub">{scenario.heading}</h3>
            )}
            <div className="module-email-body">
              {scenario.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <div className="scenario-actions">
            {scenario.options.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`scenario-btn-pill ${scenarioChoice === opt ? "scenario-btn-pill--selected" : ""}`}
                onClick={() => {
                  setScenarioChoice(opt);
                  setScenarioChecked(true);
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          {scenarioChecked && (
            <div
              className={`scenario-feedback module-scenario-feedback ${
                scenarioChoice === scenario.correctAnswer ? "correct" : "incorrect"
              }`}
            >
              <strong>
                {scenarioChoice === scenario.correctAnswer ? "Correct ✅" : "Not quite"}
              </strong>
              <p>
                {scenarioChoice === scenario.correctAnswer ? scenario.correctText : scenario.incorrectText}
              </p>
            </div>
          )}
        </section>

        <section id="part-quiz" className="main-card module-detail-section lesson-section module-quiz-section">
          <h2 className="lesson-section-title module-quiz-title module-detail-section-title">Part 3 · Knowledge check</h2>
          <p className="module-quiz-intro muted-text">
            Answer the questions below and review the explanation after submission.
          </p>

          <form onSubmit={handleSubmit} className="quiz-form">
            {module.quiz.map((q, idx) => (
              <div key={idx} className="quiz-card module-quiz-card">
                <p className="module-quiz-index">
                  Question {idx + 1} of {totalQuestions}
                </p>
                <p className="module-quiz-question">{stripQuestionNumber(q.question)}</p>
                <div className="quiz-options-column module-quiz-options">
                  {q.options.map((opt) => {
                    const selected = answers[idx] === opt;
                    return (
                      <label
                        key={opt}
                        className={`quiz-option-row ${selected ? "quiz-option-row--selected" : ""} ${
                          submitted
                            ? opt === q.answer
                              ? "quiz-option-row--correct"
                              : selected
                                ? "quiz-option-row--wrong"
                                : ""
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${idx}`}
                          value={opt}
                          checked={selected}
                          onChange={() => setAnswers({ ...answers, [idx]: opt })}
                          disabled={submitted}
                        />
                        <span className="quiz-option-row-text">{opt}</span>
                      </label>
                    );
                  })}
                </div>
                {submitted && (
                  <div
                    className={`feedback-note ${
                      answers[idx] === q.answer ? "feedback-correct" : "feedback-incorrect"
                    }`}
                  >
                    <strong>{answers[idx] === q.answer ? "Correct — " : "Incorrect — "}</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}

            {!submitted && (
              <button type="submit" className="primary-btn module-quiz-submit">
                Submit quiz
              </button>
            )}
          </form>

          {submitted && (
            <div className={`result-box ${passed ? "success-box" : "warning-box"}`}>
              <h3 className="module-score-title">
                Your score: {score}/{totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)
              </h3>
              {passed ? (
                <>
                  <p>You passed and earned {module.points} points.</p>
                  <div className="module-result-actions">
                    <button type="button" className="primary-btn" onClick={() => navigate("/dashboard")}>
                      Go to dashboard
                    </button>
                    {(() => {
                      const nextKey = getNextModuleKey(module.key, progress?.completed);
                      if (!nextKey) {
                        return (
                          <button type="button" className="secondary-btn" onClick={() => navigate("/achievements")}>
                            View achievements
                          </button>
                        );
                      }
                      return (
                        <button
                          type="button"
                          className="primary-btn module-result-actions-secondary"
                          onClick={() => navigate(ROUTES[nextKey] || `/modules/${nextKey}`)}
                        >
                          Next module →
                        </button>
                      );
                    })()}
                  </div>
                </>
              ) : (
                <>
                  <p>You need at least {Math.ceil(totalQuestions / 2)} correct answers to pass.</p>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setAnswers({});
                    }}
                  >
                    Try again
                  </button>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
