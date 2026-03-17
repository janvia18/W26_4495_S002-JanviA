import React, { useState } from "react";
import { useProgress } from "../lib/ProgressContext";
import { useBadges } from "../lib/BadgeContext";

const questions = [
  {
    question: "What does MFA stand for?",
    options: [
      "Multi-Factor Authentication",
      "Main Firewall Access",
      "Managed File Approval",
      "Multiple Form Application",
    ],
    correctAnswer: "Multi-Factor Authentication",
    explanation:
      "MFA stands for Multi-Factor Authentication. It adds extra verification beyond just a password.",
  },
  {
    question: "Why is MFA important?",
    options: [
      "It adds another layer of security even if a password is stolen",
      "It makes passwords unnecessary forever",
      "It speeds up internet browsing",
      "It removes the need for antivirus software",
    ],
    correctAnswer: "It adds another layer of security even if a password is stolen",
    explanation:
      "If an attacker gets your password, MFA can still block access by requiring a second factor like a code or approval prompt.",
  },
  {
    question: "Which of these is an example of a second authentication factor?",
    options: [
      "A one-time code from an authenticator app",
      "Your favorite color",
      "Your browser history",
      "A website logo",
    ],
    correctAnswer: "A one-time code from an authenticator app",
    explanation:
      "Authenticator app codes are a common second factor because they change regularly and are tied to your device.",
  },
  {
    question: "Which MFA method is generally safer than SMS codes?",
    options: [
      "Authenticator app or hardware security key",
      "Writing the password on paper",
      "Using the same password twice",
      "Emailing yourself the password",
    ],
    correctAnswer: "Authenticator app or hardware security key",
    explanation:
      "Authenticator apps and hardware keys are generally safer than SMS because text messages can be intercepted or targeted through SIM-swap attacks.",
  },
  {
    question: "What should you do if someone asks for your MFA code?",
    options: [
      "Never share it and verify the request independently",
      "Share it if they sound urgent",
      "Post it in a group chat",
      "Send it if they know your name",
    ],
    correctAnswer: "Never share it and verify the request independently",
    explanation:
      "MFA codes are private security credentials. Legitimate support staff should not need you to reveal them.",
  },
  {
    question: "What is the main idea behind MFA?",
    options: [
      "Use more than one proof of identity",
      "Use the shortest password possible",
      "Login from multiple browsers",
      "Turn off account recovery options",
    ],
    correctAnswer: "Use more than one proof of identity",
    explanation:
      "MFA works by combining two or more factors such as something you know, something you have, or something you are.",
  },
];

function ModuleMFA() {
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
        completeModule("mfa", 10);

        unlockBadge({
          id: "mfa-badge",
          icon: "🛡️",
          title: "MFA Defender",
          description: "Completed the Multi-Factor Authentication module.",
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
        <h1>Multi-Factor Authentication 🛡️</h1>
        <h2>Quiz Complete</h2>
        <p>
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.
        </p>
        <p>
          MFA is like a second lock on your account. Even if one door opens,
          the extra layer can still keep attackers out.
        </p>

        <div className="answer-note" style={{ marginTop: "1rem" }}>
          <p><strong>Module completed.</strong></p>
          <p>You earned progress and unlocked stronger account protection knowledge.</p>
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
      <h1>Multi-Factor Authentication 🛡️</h1>
      <p>
        Learn how MFA strengthens account security by requiring more than just a password.
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

export default ModuleMFA;