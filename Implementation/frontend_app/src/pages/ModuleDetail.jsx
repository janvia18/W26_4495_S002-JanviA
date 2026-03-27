import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function ModuleDetail({ module }) {
  const { progress, completeModule, profile, loading } = useProgress();
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scenarioChoice, setScenarioChoice] = useState("");
  const [scenarioChecked, setScenarioChecked] = useState(false);
  const [showFeedback, setShowFeedback] = useState({});
  
  if (loading || !module) {
    return (
      <div className="page-shell">
        <div className="content-wrap">
          <div className="main-card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading module...
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const score = useMemo(() => {
    if (!submitted) return 0;
    return module.quiz.reduce((total, item, index) => {
      return total + (answers[index] === item.answer ? 1 : 0);
    }, 0);
  }, [answers, module.quiz, submitted]);
  
  const passedQuiz = submitted && score >= Math.ceil(module.quiz.length / 2);
  const isCompleted = progress?.completed?.[module.key] || false;
  const scenarioCorrect = scenarioChoice === module.scenario?.correctAnswer;
  
  const handleQuizSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Show feedback for each question
    const newFeedback = {};
    module.quiz.forEach((item, index) => {
      newFeedback[index] = {
        isCorrect: answers[index] === item.answer,
        explanation: item.explanation
      };
    });
    setShowFeedback(newFeedback);
    
    if (score >= Math.ceil(module.quiz.length / 2) && !isCompleted) {
      completeModule(module.key, module.points);
    }
  };
  
  const handleScenarioCheck = (choice) => {
    setScenarioChoice(choice);
    setScenarioChecked(true);
  };
  
  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
    if (submitted) {
      setSubmitted(false);
      setShowFeedback({});
    }
  };
  
  const getOptionClass = (index, option) => {
    if (!submitted) return "";
    if (answers[index] === option && answers[index] === module.quiz[index].answer) {
      return "correct-option";
    }
    if (answers[index] === option && answers[index] !== module.quiz[index].answer) {
      return "incorrect-option";
    }
    if (option === module.quiz[index].answer && showFeedback[index]?.isCorrect === false) {
      return "correct-answer-show";
    }
    return "";
  };
  
  // Safe profile access
  const userName = profile?.name || "Learner";
  const userAvatar = profile?.avatar || "🛡️";
  
  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card lesson-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">
                {module.title}
                <span className="module-emoji">{module.emoji || "📚"}</span>
              </h1>
              <p className="lesson-intro">{module.description}</p>
            </div>
            <div className="lesson-user-panel">
              <div className="user-chip">
                <span>{userAvatar}</span>
                <span>{userName}</span>
              </div>
              <Link className="ghost-btn" to="/modules">
                ← Back to Modules
              </Link>
            </div>
          </div>
          
          {/* Part 1: Learn the Basics */}
          <section className="lesson-section">
            <h2 className="lesson-section-title">📖 Part 1: Learn the Basics</h2>
            <p className="muted-text">Review the key concepts below before starting the quiz.</p>
            <div className="lesson-points-grid">
              {module.content?.map((item, idx) => (
                <div key={idx} className="lesson-point-card">
                  {item}
                </div>
              ))}
            </div>
          </section>
          
          {/* Part 2: Scenario */}
          {module.scenario && (
            <section className="lesson-section">
              <h2 className="lesson-section-title">🎭 {module.scenario.title}</h2>
              <p className="muted-text">{module.scenario.instructions}</p>
              <div className="scenario-card">
                <h3>{module.scenario.heading}</h3>
                {module.scenario.from && (
                  <div className="scenario-meta">
                    <p><strong>From:</strong> {module.scenario.from}</p>
                    <p><strong>Subject:</strong> {module.scenario.subject}</p>
                  </div>
                )}
                <div className="scenario-body">
                  {module.scenario.body?.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="scenario-actions">
                {module.scenario.options?.map((option) => (
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
                  <h3>{scenarioCorrect ? "✓ Correct!" : "✗ Incorrect"}</h3>
                  <p>{scenarioCorrect ? module.scenario.correctText : module.scenario.incorrectText}</p>
                </div>
              )}
            </section>
          )}
          
          {/* Part 3: Knowledge Check */}
          <section className="lesson-section">
            <h2 className="lesson-section-title">📝 Part 3: Knowledge Check</h2>
            <p className="muted-text">Answer all {module.quiz?.length || 0} questions below.</p>
            
            <form onSubmit={handleQuizSubmit} className="quiz-form">
              {module.quiz?.map((item, index) => (
                <div key={item.question} className="quiz-card">
                  <h3>Question {index + 1} of {module.quiz.length}</h3>
                  <p className="quiz-question">{item.question}</p>
                  <div className="quiz-options-column">
                    {item.options?.map((option) => (
                      <label key={option} className={`quiz-option-card ${getOptionClass(index, option)}`}>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() => handleAnswerChange(index, option)}
                          disabled={submitted && !showFeedback[index]?.isCorrect}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {submitted && showFeedback[index] && (
                    <div className={`feedback-note ${showFeedback[index].isCorrect ? "feedback-correct" : "feedback-incorrect"}`}>
                      {showFeedback[index].isCorrect ? (
                        <span>✓ Correct! {showFeedback[index].explanation}</span>
                      ) : (
                        <span>✗ Incorrect. {showFeedback[index].explanation}</span>
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
                  <button className="secondary-btn" type="button" onClick={() => {
                    setSubmitted(false);
                    setShowFeedback({});
                  }}>
                    Try Again
                  </button>
                )}
                <Link className="secondary-btn" to="/modules">
                  Back to Modules
                </Link>
              </div>
            </form>
            
            {submitted && (
              <div className={`result-box ${passedQuiz ? "success-box" : "warning-box"}`}>
                <p>
                  <strong>Your score: {score}/{module.quiz?.length || 0}</strong> ({Math.round((score / (module.quiz?.length || 1)) * 100)}%)
                </p>
                {passedQuiz ? (
                  <>
                    <p>🎉 Nice work! You've earned {module.points} points for completing this module.</p>
                    <button className="primary-btn" onClick={() => navigate("/dashboard")}>
                      Go to Dashboard
                    </button>
                  </>
                ) : (
                  <p>📚 You need at least {Math.ceil((module.quiz?.length || 0) / 2)} correct answers to pass. Review the lesson and try again!</p>
                )}
              </div>
            )}
            
            {isCompleted && !submitted && (
              <div className="result-box success-box">
                ✅ This module is already completed! Great job!
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}