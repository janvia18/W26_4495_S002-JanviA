import React, { useState } from "react";
import { useProgress } from "../lib/ProgressContext";
import { useBadges } from "../lib/BadgeContext";

const questions = [
  {
    question: "What is the first thing you should do if you suspect a cybersecurity incident?",
    options: [
      "Report it immediately to the appropriate person or team",
      "Ignore it and wait a few days",
      "Post about it on social media",
      "Delete all files right away",
    ],
    correctAnswer: "Report it immediately to the appropriate person or team",
    explanation:
      "Early reporting helps contain the incident faster and reduces damage. Waiting can make the problem worse.",
  },
  {
    question: "Which of these could be a sign of a cybersecurity incident?",
    options: [
      "Unexpected pop-ups, strange logins, or missing files",
      "Your computer starting normally",
      "A routine software update you expected",
      "A teacher posting assignment instructions",
    ],
    correctAnswer: "Unexpected pop-ups, strange logins, or missing files",
    explanation:
      "Unusual behavior like unauthorized logins, pop-ups, missing data, or system changes can signal a security incident.",
  },
  {
    question: "Why is it important not to hide a suspected incident?",
    options: [
      "Because quick reporting helps reduce harm and support investigation",
      "Because incidents fix themselves faster when ignored",
      "Because only IT staff are allowed to know passwords",
      "Because hiding it improves device performance",
    ],
    correctAnswer: "Because quick reporting helps reduce harm and support investigation",
    explanation:
      "Reporting promptly allows the organization to investigate, contain the issue, and protect other users or systems.",
  },
  {
    question: "What should you avoid doing during a suspected incident?",
    options: [
      "Tampering with evidence or deleting important information",
      "Following incident reporting procedures",
      "Disconnecting if instructed by your organization",
      "Noting suspicious details you observed",
    ],
    correctAnswer: "Tampering with evidence or deleting important information",
    explanation:
      "Deleting files, clearing logs, or changing too much can make investigation harder and may destroy valuable evidence.",
  },
  {
    question: "If you clicked a suspicious link by mistake, what is a good next step?",
    options: [
      "Report it right away and follow security guidance",
      "Keep it secret and hope nothing happens",
      "Send your password to confirm your identity",
      "Forward the link to others to ask if it is safe",
    ],
    correctAnswer: "Report it right away and follow security guidance",
    explanation:
      "Mistakes happen. Reporting quickly gives your team the best chance to protect your account and devices.",
  },
  {
    question: "What is the goal of incident response?",
    options: [
      "To identify, contain, and recover from security problems",
      "To make passwords shorter",
      "To disable all internet access forever",
      "To remove the need for training",
    ],
    correctAnswer: "To identify, contain, and recover from security problems",
    explanation:
      "Incident response is about recognizing an issue, limiting damage, investigating what happened, and safely recovering.",
  },
];

function ModuleIncident() {
  const { completeModule } = useProgress();
  const { unlockBadge } = useBadges();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [moduleRewarded, setModuleRewarded] = useState(false);

  const handleAnswerClick = (option) => {
    if (answered) return;

    const correct = option === questions[currentQuestion].correctAnswer;
    setSelectedAnswer(option);
    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setIsCorrect(null);
      setAnswered(false);
    } else {
      if (!moduleRewarded) {
        completeModule("incident", 10);

        unlockBadge({
          id: "incident-badge",
          icon: "🚨",
          title: "Incident Reporter",
          description: "Completed the Incident Response module.",
        });

        setModuleRewarded(true);
      }

      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setIsCorrect(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  if (showResult) {
    return (
      <div className="page-container">
        <h1>Incident Response 🚨</h1>
        <h2>Quiz Complete</h2>
        <p>
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.
        </p>
        <p>
          Good incident response is calm, quick, and clear. The goal is not
          panic. It is to contain the problem, protect others, and recover safely.
        </p>

        <div className="answer-note" style={{ marginTop: "1rem" }}>
          <p><strong>Module completed.</strong></p>
          <p>You earned progress and improved your incident response awareness.</p>
        </div>

        <button onClick={handleRestart} className="primary-btn">
          Restart Quiz
        </button>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="page-container">
      <h1>Incident Response 🚨</h1>
      <p>
        Learn what to do when something suspicious happens and how to respond responsibly.
      </p>

      <h2>
        Question {currentQuestion + 1} of {questions.length}
      </h2>

      <div className="quiz-card">
        <h3>{current.question}</h3>

        <div className="options-container">
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={answered}
              className={`option-btn ${
                answered && option === current.correctAnswer
                  ? "correct"
                  : answered && option === selectedAnswer && option !== current.correctAnswer
                  ? "incorrect"
                  : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {answered && (
          <div className="answer-note">
            <p>
              <strong>{isCorrect ? "Correct" : "Incorrect"}</strong>
            </p>
            <p>
              <strong>Why:</strong> {current.explanation}
            </p>
          </div>
        )}

        {answered && (
          <button onClick={handleNext} className="next-btn">
            {currentQuestion + 1 === questions.length ? "Finish" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ModuleIncident;