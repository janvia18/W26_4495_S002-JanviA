import React, { useState } from "react";
import { useProgress } from "../lib/ProgressContext";
import { useBadges } from "../lib/BadgeContext";

const questions = [
  {
    question: "What is social engineering in cybersecurity?",
    options: [
      "A method attackers use to manipulate people into giving information",
      "A software update process",
      "A type of computer hardware repair",
      "A secure network protocol",
    ],
    correctAnswer: "A method attackers use to manipulate people into giving information",
    explanation:
      "Social engineering targets human behavior, not just systems. Attackers try to trick people into revealing sensitive information or taking unsafe actions.",
  },
  {
    question: "Which of the following is an example of social engineering?",
    options: [
      "A fake email asking you to reset your password",
      "Installing antivirus software",
      "Updating your browser",
      "Encrypting a hard drive",
    ],
    correctAnswer: "A fake email asking you to reset your password",
    explanation:
      "Fake emails are a classic social engineering trick. They often create urgency and try to steal passwords or other sensitive details.",
  },
  {
    question: "Why do attackers often create a sense of urgency?",
    options: [
      "To make people act quickly without thinking carefully",
      "To improve internet speed",
      "To help users remember passwords",
      "To increase device battery life",
    ],
    correctAnswer: "To make people act quickly without thinking carefully",
    explanation:
      "Urgency pressures people into reacting fast. That makes them less likely to verify links, requests, or identities.",
  },
  {
    question: "What should you do if someone asks for your MFA code?",
    options: [
      "Share it if they say they are from IT",
      "Share it only by email",
      "Never share it and verify the request",
      "Post it in the team chat",
    ],
    correctAnswer: "Never share it and verify the request",
    explanation:
      "MFA codes are private and should not be shared. Real support teams should not need your one-time verification code from you.",
  },
  {
    question: "Which sign can suggest a phishing or social engineering attempt?",
    options: [
      "Unexpected request for sensitive information",
      "A normal message from a known teacher about class timing",
      "A bookmarked official website",
      "A saved password manager prompt",
    ],
    correctAnswer: "Unexpected request for sensitive information",
    explanation:
      "Unexpected requests for passwords, codes, banking details, or confidential files are major warning signs.",
  },
  {
    question: "What is the safest action if you receive a suspicious message?",
    options: [
      "Click the link to check if it looks real",
      "Reply and ask for more details",
      "Verify through an official source and report it",
      "Forward it to friends for opinions",
    ],
    correctAnswer: "Verify through an official source and report it",
    explanation:
      "Use trusted contact methods such as the official website, company number, or your security team. Do not rely on the suspicious message itself.",
  },
];

function ModuleSocial() {
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
        completeModule("social", 10);

        unlockBadge({
          id: "social-badge",
          icon: "🕵️",
          title: "Social Sleuth",
          description: "Completed the Social Engineering module.",
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
        <h1>Social Engineering 🕵️</h1>
        <h2>Quiz Complete</h2>
        <p>
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.
        </p>
        <p>
          Social engineering attacks work by exploiting trust, fear, urgency,
          and curiosity. Slow down, verify requests, and never share sensitive information casually.
        </p>

        <div className="answer-note" style={{ marginTop: "1rem" }}>
          <p><strong>Module completed.</strong></p>
          <p>You earned progress and strengthened your people-focused security awareness.</p>
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
      <h1>Social Engineering 🕵️</h1>
      <p>
        Learn how attackers manipulate people into revealing passwords,
        verification codes, or confidential information.
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

export default ModuleSocial;