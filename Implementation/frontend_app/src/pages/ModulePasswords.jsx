import React, { useState } from "react";
import { useProgress } from "../lib/ProgressContext";
import { useBadges } from "../lib/BadgeContext";
import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./modulesData";

const questions = [
  {
    question: "What makes a password strong?",
    options: [
      "It is long, unique, and hard to guess",
      "It uses only your first name",
      "It is the same on every website",
      "It is easy for friends to remember",
    ],
    correctAnswer: "It is long, unique, and hard to guess",
    explanation:
      "A strong password should be long, unique for each account, and difficult for attackers to guess.",
  },
  {
    question: "Why should you avoid reusing passwords?",
    options: [
      "Because if one account is breached, other accounts can also be accessed",
      "Because websites do not allow repeated passwords",
      "Because reused passwords make the internet slower",
      "Because only banks require unique passwords",
    ],
    correctAnswer: "Because if one account is breached, other accounts can also be accessed",
    explanation:
      "If attackers steal one reused password, they often try it on email, shopping, banking, and social media accounts.",
  },
  {
    question: "Which of these is the best example of a passphrase?",
    options: [
      "BlueCoffeeRiver7!Leaves",
      "janvi123",
      "password",
      "abc12345",
    ],
    correctAnswer: "BlueCoffeeRiver7!Leaves",
    explanation:
      "Passphrases use multiple words and are usually longer, making them stronger and easier to remember than short weak passwords.",
  },
  {
    question: "What is a password manager used for?",
    options: [
      "To securely store and generate passwords",
      "To increase Wi-Fi signal strength",
      "To scan for viruses in emails",
      "To disable multi-factor authentication",
    ],
    correctAnswer: "To securely store and generate passwords",
    explanation:
      "A password manager helps create strong unique passwords and stores them securely so you do not need to memorize all of them.",
  },
  {
    question: "Which password is the weakest?",
    options: [
      "123456",
      "Rain!Forest92Moon",
      "TeaHorse!Window44",
      "MapleRiver#Cloud81",
    ],
    correctAnswer: "123456",
    explanation:
      "Simple and common passwords like 123456 are among the first passwords attackers try.",
  },
  {
    question: "What should you do if a website says your password was exposed in a breach?",
    options: [
      "Change it immediately and update any reused versions elsewhere",
      "Ignore it if the password is easy to remember",
      "Keep using it until next year",
      "Send the password to support for verification",
    ],
    correctAnswer: "Change it immediately and update any reused versions elsewhere",
    explanation:
      "A breached password should be changed right away, and any other account using the same password should also be updated.",
  },
];

function ModulePasswords() {
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
        completeModule("password", 10);

        unlockBadge({
          id: "password-badge",
          icon: "🔐",
          title: "Password Pro",
          description: "Completed the Password Security module.",
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
        <h1>Password Security 🔐</h1>
        <h2>Quiz Complete</h2>
        <p>
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.
        </p>
        <p>
          Strong passwords and passphrases are one of the first locks on your
          digital front door. The key idea is simple: long, unique, and never reused.
        </p>

        <div className="answer-note" style={{ marginTop: "1rem" }}>
          <p><strong>Module completed.</strong></p>
          <p>You earned progress and moved one step further in CyberAware.</p>
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
      <h1>Password Security 🔐</h1>
      <p>
        Learn how to build stronger passwords, avoid reuse, and protect your accounts.
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

export default function ModulePasswords() {
  return <ModuleDetail module={modulesData.find((item) => item.key === "passwords")} />;
}