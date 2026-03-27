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

  if (!module) {
    return React.createElement("div", { style: { padding: "40px", textAlign: "center" } }, "Loading module...");
  }

  const totalQuestions = module.quiz.length;
  const score = submitted ? module.quiz.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0) : 0;
  const passed = submitted && score >= Math.ceil(totalQuestions / 2);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (passed) {
      completeModule(module.key, module.points);
    }
  };

  return React.createElement("div", { className: "page-shell" },
    React.createElement("div", { className: "content-wrap" },
      React.createElement("div", { className: "main-card" },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" } },
          React.createElement("h1", { style: { margin: 0 } }, module.title),
          React.createElement(Link, { to: "/modules", className: "ghost-btn" }, "← Back to Modules")
        ),
        React.createElement("div", { style: { marginBottom: "30px" } },
          React.createElement("h2", null, "Part 1: Learn the Basics"),
          module.content.map((item, i) => 
            React.createElement("div", { key: i, style: { padding: "12px", margin: "10px 0", background: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #6c63ff" } }, item)
          )
        ),
        React.createElement("div", { style: { marginBottom: "30px" } },
          React.createElement("h2", null, module.scenario.title),
          React.createElement("div", { style: { padding: "20px", border: "1px solid #ddd", borderRadius: "12px", background: "#fafafa", margin: "10px 0" } },
            React.createElement("h3", null, module.scenario.heading),
            module.scenario.body.map((line, i) => React.createElement("p", { key: i }, line))
          ),
          React.createElement("div", { style: { display: "flex", gap: "10px", margin: "15px 0" } },
            module.scenario.options.map(opt => 
              React.createElement("button", {
                key: opt,
                onClick: () => { setScenarioChoice(opt); setScenarioChecked(true); },
                style: { padding: "10px 20px", cursor: "pointer", background: scenarioChoice === opt ? "#6c63ff" : "white", color: scenarioChoice === opt ? "white" : "black", border: "1px solid #ddd", borderRadius: "8px" }
              }, opt)
            )
          ),
          scenarioChecked && React.createElement("div", { style: { padding: "15px", background: scenarioChoice === module.scenario.correctAnswer ? "#d4edda" : "#f8d7da", borderRadius: "8px", borderLeft: `4px solid ${scenarioChoice === module.scenario.correctAnswer ? "#28a745" : "#dc3545"}` } },
            React.createElement("strong", null, scenarioChoice === module.scenario.correctAnswer ? "Correct!" : "Incorrect"),
            React.createElement("p", { style: { margin: "8px 0 0 0" } }, scenarioChoice === module.scenario.correctAnswer ? module.scenario.correctText : module.scenario.incorrectText)
          )
        ),
        React.createElement("div", null,
          React.createElement("h2", null, "Part 3: Knowledge Check (5 Questions)"),
          React.createElement("form", { onSubmit: handleSubmit },
            module.quiz.map((q, idx) => 
              React.createElement("div", { key: idx, style: { margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "12px" } },
                React.createElement("p", { style: { fontSize: "16px", fontWeight: "bold", margin: "0 0 15px 0" } }, q.question),
                q.options.map(opt => 
                  React.createElement("label", { key: opt, style: { display: "block", margin: "10px 0", padding: "8px", cursor: "pointer" } },
                    React.createElement("input", { type: "radio", name: `q${idx}`, value: opt, onChange: () => setAnswers({...answers, [idx]: opt}), disabled: submitted, style: { marginRight: "10px" } }),
                    React.createElement("span", null, opt)
                  )
                ),
                submitted && React.createElement("div", { style: { marginTop: "15px", padding: "12px", background: answers[idx] === q.answer ? "#d4edda" : "#f8d7da", borderRadius: "8px", borderLeft: `4px solid ${answers[idx] === q.answer ? "#28a745" : "#dc3545"}` } },
                  React.createElement("strong", null, answers[idx] === q.answer ? "Correct! " : "Incorrect. "),
                  q.explanation
                )
              )
            ),
            !submitted && React.createElement("button", { type: "submit", className: "primary-btn", style: { padding: "12px 30px", fontSize: "16px" } }, "Submit Quiz")
          ),
          submitted && React.createElement("div", { style: { marginTop: "25px", padding: "20px", background: passed ? "#d4edda" : "#fff3cd", borderRadius: "12px", textAlign: "center", border: `2px solid ${passed ? "#28a745" : "#ffc107"}` } },
            React.createElement("h3", null, `Your Score: ${score}/${totalQuestions} (${Math.round(score/totalQuestions*100)}%)`),
            passed ? React.createElement(React.Fragment, null,
              React.createElement("p", null, "Congratulations! You passed and earned " + module.points + " points!"),
              React.createElement("button", { className: "primary-btn", onClick: () => navigate("/dashboard"), style: { marginTop: "10px" } }, "Go to Dashboard")
            ) : React.createElement(React.Fragment, null,
              React.createElement("p", null, `You need ${Math.ceil(totalQuestions/2)} correct to pass. Try again!`),
              React.createElement("button", { className: "secondary-btn", onClick: () => { setSubmitted(false); setAnswers({}); }, style: { marginTop: "10px" } }, "Try Again")
            )
          )
        )
      )
    )
  );
}