import React, { useState } from "react";
import { useProgress } from "../lib/ProgressContext";
import { useBadges } from "../lib/BadgeContext";

const questions = [
  {
    question: "What is phishing?",
    options: [
      "A cyberattack that tricks users into revealing sensitive information",
      "A method for improving Wi-Fi speed",
      "A secure way to store passwords",
      "A type of antivirus scan",
    ],
    correctAnswer: "A cyberattack that tricks users into revealing sensitive information",
    explanation:
      "Phishing is a form of cyberattack where attackers pretend to be trustworthy in order to steal passwords, banking details, or other sensitive information.",
  },
  {
    question: "Which of these is a common sign of a phishing email?",
    options: [
      "Urgent language asking you to act immediately",
      "A normal school reminder from a known teacher",
      "A saved contact email you often use",
      "A calendar invite you were expecting",
    ],
    correctAnswer: "Urgent language asking you to act immediately",
    explanation:
      "Phishing emails often create panic or urgency so people click before thinking carefully.",
  },
  {
    question: "What should you check before clicking a link in an email?",
    options: [
      "Whether the URL matches the official website",
      "Whether the email uses nice colors",
      "Whether the message has an emoji",
      "Whether it was sent in the morning",
    ],
    correctAnswer: "Whether the URL matches the official website",
    explanation:
      "Attackers often hide fake links behind text. Always inspect the real URL before clicking.",
  },
  {
    question: "Why do phishing attacks often pretend to be banks or popular companies?",
    options: [
      "Because people trust familiar brands",
      "Because logos make emails load faster",
      "Because it improves screen brightness",
      "Because browsers require company names",
    ],
    correctAnswer: "Because people trust familiar brands",
    explanation:
      "Attackers use trusted names and logos to make fake messages look convincing.",
  },
  {
    question: "What is the safest action if you think an email may be phishing?",
    options: [
      "Do not click links and verify through an official source",
      "Reply with your information to confirm",
      "Click the attachment first to test it",
      "Forward it to strangers online",
    ],
    correctAnswer: "Do not click links and verify through an official source",
    explanation:
      "Use the company’s real website, app, or phone number to verify. Do not trust the suspicious email itself.",
  },
  {
    question: "Which of these is most likely to be dangerous in a phishing email?",
    options: [
      "Unexpected attachment or login link",
      "A school timetable you asked for",
      "A receipt from a purchase you made yourself",
      "A message you expected from your professor",
    ],
    correctAnswer: "Unexpected attachment or login link",
    explanation:
      "Unexpected files and login links are common phishing tools used to steal data or install malware.",
  },
];

function ModulePhishing() {
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
        completeModule("phishing", 10);

        unlockBadge({
          id: "phishing-badge",
          icon: "📧",
          title: "Phishing Spotter",
          description: "Completed the Phishing Awareness module.",
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
        <h1>Phishing Awareness 📧</h1>
        <h2>Quiz Complete</h2>
        <p>
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.
        </p>
        <p>
          Phishing works by pretending to be something trustworthy. Slow down,
          check links carefully, and verify requests before taking action.
        </p>

        <div className="answer-note" style={{ marginTop: "1rem" }}>
          <p><strong>Module completed.</strong></p>
          <p>You earned progress toward your CyberAware journey.</p>
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
      <h1>Phishing Awareness 📧</h1>
      <p>
        Learn how to spot fake emails, suspicious links, and messages designed
        to steal information.
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

export default ModulePhishing;