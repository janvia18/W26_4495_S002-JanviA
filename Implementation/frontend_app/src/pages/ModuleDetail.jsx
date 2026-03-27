import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function ModuleDetail({ module }) {
  const { completeModule, profile } = useProgress();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scenarioChoice, setScenarioChoice] = useState("");
  const [scenarioChecked, setScenarioChecked] = useState(false);

  if (!module) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px", textAlign: "center" }}>
        <h2>Loading module...</h2>
      </div>
    );
  }

  const totalQuestions = module.quiz.length;
  const score = submitted ? module.quiz.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0) : 0;
  const passed = submitted && score >= Math.ceil(totalQuestions / 2);
  const isCompleted = false; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (passed && !isCompleted) {
      completeModule(module.key, module.points);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ margin: 0 }}>{module.title}</h1>
        <Link to="/modules" style={{ padding: "8px 16px", background: "#f0f0f0", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
          ← Back to Modules
        </Link>
      </div>
      <div style={{ marginBottom: "40px" }}>
        <h2>📖 Part 1: Learn the Basics</h2>
        <div style={{ display: "grid", gap: "12px", marginTop: "15px" }}>
          {module.content.map((item, i) => (
            <div key={i} style={{ padding: "12px", background: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #6c63ff" }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>🎭 {module.scenario.title}</h2>
        <p style={{ color: "#666", marginBottom: "15px" }}>{module.scenario.instructions}</p>
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "12px", background: "#fafafa", marginBottom: "15px" }}>
          <h3 style={{ marginBottom: "10px" }}>{module.scenario.heading}</h3>
          {module.scenario.from && (
            <div style={{ marginBottom: "10px", padding: "8px", background: "#fff", borderRadius: "5px" }}>
              <p><strong>From:</strong> {module.scenario.from}</p>
              <p><strong>Subject:</strong> {module.scenario.subject}</p>
            </div>
          )}
          {module.scenario.body.map((line, i) => <p key={i}>{line}</p>)}
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {module.scenario.options.map(opt => (
            <button
              key={opt}
              onClick={() => { setScenarioChoice(opt); setScenarioChecked(true); }}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                background: scenarioChoice === opt ? "#6c63ff" : "white",
                color: scenarioChoice === opt ? "white" : "black",
                border: "1px solid #ddd",
                borderRadius: "8px",
                transition: "all 0.2s"
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        {scenarioChecked && (
          <div style={{
            marginTop: "15px",
            padding: "15px",
            background: scenarioChoice === module.scenario.correctAnswer ? "#d4edda" : "#f8d7da",
            borderRadius: "8px",
            borderLeft: `4px solid ${scenarioChoice === module.scenario.correctAnswer ? "#28a745" : "#dc3545"}`
          }}>
            <strong>{scenarioChoice === module.scenario.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}</strong>
            <p style={{ margin: "8px 0 0 0" }}>
              {scenarioChoice === module.scenario.correctAnswer ? module.scenario.correctText : module.scenario.incorrectText}
            </p>
          </div>
        )}
      </div>
      <div style={{ marginBottom: "40px" }}>
        <h2>📝 Part 3: Knowledge Check ({totalQuestions} Questions)</h2>
        <form onSubmit={handleSubmit}>
          {module.quiz.map((q, idx) => (
            <div key={idx} style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "12px", background: "white" }}>
              <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 15px 0" }}>{q.question}</p>
              {q.options.map(opt => (
                <label key={opt} style={{ display: "block", margin: "10px 0", padding: "8px", cursor: "pointer", borderRadius: "5px", transition: "background 0.2s" }}>
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value={opt}
                    onChange={() => setAnswers({ ...answers, [idx]: opt })}
                    disabled={submitted}
                    style={{ marginRight: "10px" }}
                  />
                  <span>{opt}</span>
                </label>
              ))}
              {submitted && (
                <div style={{
                  marginTop: "15px",
                  padding: "12px",
                  background: answers[idx] === q.answer ? "#d4edda" : "#f8d7da",
                  borderRadius: "8px",
                  borderLeft: `4px solid ${answers[idx] === q.answer ? "#28a745" : "#dc3545"}`
                }}>
                  <strong>{answers[idx] === q.answer ? "✓ Correct! " : "✗ Incorrect. "}</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
          {!submitted && (
            <button type="submit" style={{ padding: "12px 30px", fontSize: "16px", background: "#6c63ff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
              Submit Quiz
            </button>
          )}
        </form>

        {submitted && (
          <div style={{
            marginTop: "25px",
            padding: "20px",
            background: passed ? "#d4edda" : "#fff3cd",
            borderRadius: "12px",
            textAlign: "center",
            border: `2px solid ${passed ? "#28a745" : "#ffc107"}`
          }}>
            <h3>Your Score: {score}/{totalQuestions} ({Math.round(score / totalQuestions * 100)}%)</h3>
            {passed ? (
              <>
                <p>🎉 Congratulations! You passed and earned {module.points} points!</p>
                <button
                  onClick={() => navigate("/dashboard")}
                  style={{ padding: "10px 20px", marginTop: "10px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                  Go to Dashboard
                </button>
              </>
            ) : (
              <>
                <p>📚 You need {Math.ceil(totalQuestions / 2)} correct to pass. Try again!</p>
                <button
                  onClick={() => { setSubmitted(false); setAnswers({}); }}
                  style={{ padding: "10px 20px", marginTop: "10px", background: "#ffc107", color: "#333", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}