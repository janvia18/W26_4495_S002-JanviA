import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function ModuleDetail({ module }) {
  const { completeModule } = useProgress();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scenarioChoice, setScenarioChoice] = useState("");
  const [scenarioChecked, setScenarioChecked] = useState(false);

  if (!module) return <div style={{ padding: "40px", textAlign: "center" }}>Loading module...</div>;

  const score = submitted ? module.quiz.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0) : 0;
  const passed = submitted && score >= Math.ceil(module.quiz.length / 2);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (passed) {
      completeModule(module.key, module.points);
    }
  };

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
            <h1 style={{ margin: 0 }}>{module.title}</h1>
            <Link to="/modules" className="ghost-btn">← Back to Modules</Link>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <h2>📖 Part 1: Learn the Basics</h2>
            {module.content.map((item, i) => (
              <div key={i} style={{ padding: "12px", margin: "10px 0", background: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #6c63ff" }}>
                {item}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h2>🎭 {module.scenario.title}</h2>
            <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "12px", background: "#fafafa", margin: "10px 0" }}>
              <h3>{module.scenario.heading}</h3>
              {module.scenario.body.map((line, i) => <p key={i}>{line}</p>)}
            </div>
            <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
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
                    borderRadius: "8px"
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            {scenarioChecked && (
              <div style={{ 
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
          <div>
            <h2>📝 Part 3: Knowledge Check ({module.quiz.length} Questions)</h2>
            <form onSubmit={handleSubmit}>
              {module.quiz.map((q, idx) => (
                <div key={idx} style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "12px" }}>
                  <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 15px 0" }}>{q.question}</p>
                  {q.options.map(opt => (
                    <label key={opt} style={{ display: "block", margin: "10px 0", padding: "8px", cursor: "pointer" }}>
                      <input 
                        type="radio" 
                        name={`q${idx}`} 
                        value={opt} 
                        onChange={() => setAnswers({...answers, [idx]: opt})}
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
                <button type="submit" className="primary-btn" style={{ padding: "12px 30px", fontSize: "16px" }}>
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
                <h3>Your Score: {score}/{module.quiz.length} ({Math.round(score/module.quiz.length*100)}%)</h3>
                {passed ? (
                  <>
                    <p>🎉 Congratulations! You passed and earned {module.points} points!</p>
                    <button className="primary-btn" onClick={() => navigate("/dashboard")} style={{ marginTop: "10px" }}>
                      Go to Dashboard
                    </button>
                  </>
                ) : (
                  <>
                    <p>📚 You need {Math.ceil(module.quiz.length/2)} correct to pass. Try again!</p>
                    <button className="secondary-btn" onClick={() => {
                      setSubmitted(false);
                      setAnswers({});
                    }} style={{ marginTop: "10px" }}>
                      Try Again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}