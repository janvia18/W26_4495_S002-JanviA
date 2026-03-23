import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function ModuleDetail({ module }) {
  const { progress, completeModule } = useProgress();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    return module.quiz.reduce((total, item, index) => {
      return total + (answers[index] === item.answer ? 1 : 0);
    }, 0);
  }, [answers, module.quiz]);

  const passed = submitted && score >= Math.ceil(module.quiz.length / 2);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalScore = module.quiz.reduce((total, item, index) => {
      return total + (answers[index] === item.answer ? 1 : 0);
    }, 0);
    setSubmitted(true);

    if (finalScore >= Math.ceil(module.quiz.length / 2)) {
      completeModule(module.key, module.points);
    }
  };

  return (
    <div className="page-shell">
      <div className="card">
        <div className="page-header-row">
          <div>
            <p className="eyebrow">Training Module</p>
            <h1>{module.title}</h1>
            <p>{module.description}</p>
          </div>
          <Link className="secondary-btn" to="/modules">
            Back to modules
          </Link>
        </div>

        <div className="content-list">
          {module.content.map((item) => (
            <div key={item} className="content-item">
              • {item}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Knowledge Check</h2>
        <form onSubmit={handleSubmit} className="quiz-form">
          {module.quiz.map((item, index) => (
            <div key={item.question} className="quiz-card">
              <h3>
                {index + 1}. {item.question}
              </h3>
              <div className="quiz-options">
                {item.options.map((option) => (
                  <label key={option} className="option-row">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => setAnswers((prev) => ({ ...prev, [index]: option }))}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button className="primary-btn" type="submit">
            Submit quiz
          </button>
        </form>

        {submitted && (
          <div className="result-box">
            <p>
              Your score: <strong>{score}/{module.quiz.length}</strong>
            </p>
            {passed ? (
              <>
                <p>Nice work. This module is complete and your points have been added.</p>
                <button className="primary-btn" onClick={() => navigate("/dashboard")}>
                  Go to dashboard
                </button>
              </>
            ) : (
              <p>Almost there. Review the notes and try again.</p>
            )}
          </div>
        )}

        {progress.completed[module.key] && !submitted && (
          <div className="result-box">
            <p>This module is already completed.</p>
          </div>
        )}
      </div>
    </div>
  );
}