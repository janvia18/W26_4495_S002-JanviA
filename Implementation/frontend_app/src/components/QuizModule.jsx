import React, { useMemo, useState } from "react";

export default function QuizModule({ title, description, questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="module-card">
          <h1 className="page-title">{title}</h1>
          <p className="muted-text">{description}</p>

          <div className="subtle-line" />

          {questions.map((question, index) => {
            const selected = answers[question.id];
            const isCorrect = selected === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="quiz-card"
                style={{
                  marginBottom: "28px",
                  padding: "18px",
                  borderRadius: "18px",
                  background: "#fff",
                  border: "1px solid #e6e8f0",
                  boxShadow: "0 8px 24px rgba(30, 30, 40, 0.06)",
                }}
              >
                <img
                  src={question.image}
                  alt={`${title} visual ${index + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: "240px",
                    objectFit: "cover",
                    borderRadius: "14px",
                    marginBottom: "14px",
                  }}
                />

                <h2 style={{ marginBottom: "10px" }}>Question {index + 1}</h2>
                <p style={{ fontWeight: 600, marginBottom: "14px" }}>
                  {question.question}
                </p>

                <div className="form-grid">
                  {question.options.map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "block",
                        padding: "12px 14px",
                        border: "1px solid #d9dce8",
                        borderRadius: "12px",
                        marginBottom: "10px",
                        cursor: "pointer",
                        background: selected === option ? "#eef3ff" : "#ffffff",
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={selected === option}
                        onChange={() => handleSelect(question.id, option)}
                        style={{ marginRight: "10px" }}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {submitted && (
                  <div
                    style={{
                      marginTop: "14px",
                      padding: "14px",
                      borderRadius: "14px",
                      background: "#f8faff",
                      border: "1px solid #e4e9f7",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        marginBottom: "8px",
                      }}
                    >
                      {isCorrect ? "✅ Correct" : "❌ Incorrect"}
                    </p>

                    <p style={{ marginBottom: "8px" }}>
                      {isCorrect
                        ? question.correctNote
                        : question.incorrectNote}
                    </p>

                    <p className="muted-text">
                      <strong>Takeaway:</strong> {question.takeaway}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            className="primary-btn"
            onClick={() => setSubmitted(true)}
          >
            Submit Answers
          </button>

          {submitted && (
            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                borderRadius: "16px",
                background: "#eef7ff",
                border: "1px solid #d7e7ff",
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>Your Score</h3>
              <p>
                You got <strong>{score}</strong> out of{" "}
                <strong>{questions.length}</strong> correct.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}