import QuizModule from "../components/QuizModule";
import mfaImg from "../assets/mfa-comic.webp";

const questions = [
  {
    id: 1,
    image: mfaImg,
    question: "What is the main purpose of multi-factor authentication?",
    options: [
      "To replace your username",
      "To add another layer of verification",
      "To speed up hacking attempts",
      "To remove the need for passwords forever",
    ],
    correctAnswer: "To add another layer of verification",
    correctNote:
      "Correct. MFA adds another check beyond the password, making unauthorized access harder.",
    incorrectNote:
      "Incorrect. MFA exists to add another layer of identity verification.",
    takeaway:
      "A second factor makes stolen passwords less useful.",
  },
  {
    id: 2,
    image: mfaImg,
    question: "Which of these is an example of MFA?",
    options: [
      "Password only",
      "Username and password",
      "Password plus one-time code from an authenticator app",
      "Email address and username",
    ],
    correctAnswer: "Password plus one-time code from an authenticator app",
    correctNote:
      "Correct. That combines something you know with something you have.",
    incorrectNote:
      "Incorrect. MFA requires more than one factor, not just more than one field.",
    takeaway:
      "Different factors provide better protection than repeated passwords.",
  },
  {
    id: 3,
    image: mfaImg,
    question: "Why are authenticator apps often safer than SMS codes?",
    options: [
      "They use fewer numbers",
      "They can reduce SIM-swap and message interception risks",
      "They never expire",
      "They do not require devices",
    ],
    correctAnswer: "They can reduce SIM-swap and message interception risks",
    correctNote:
      "Correct. Authenticator apps are generally more resilient against phone-number hijacking.",
    incorrectNote:
      "Incorrect. Authenticator apps are preferred partly because SMS can be intercepted or redirected.",
    takeaway:
      "Choose stronger MFA methods when possible.",
  },
  {
    id: 4,
    image: mfaImg,
    question: "If an unexpected MFA prompt appears on your phone, what should you do?",
    options: [
      "Approve it quickly",
      "Ignore it and report suspicious activity",
      "Approve it if it looks familiar",
      "Forward the code to support",
    ],
    correctAnswer: "Ignore it and report suspicious activity",
    correctNote:
      "Correct. An unexpected prompt may mean someone is trying to access your account.",
    incorrectNote:
      "Incorrect. Approving unexpected prompts can hand attackers the final key they need.",
    takeaway:
      "Never approve an MFA request you did not initiate.",
  },
  {
    id: 5,
    image: mfaImg,
    question: "What happens if an attacker steals your password but MFA is enabled?",
    options: [
      "They automatically gain access",
      "They still need the second factor to log in",
      "The password becomes stronger",
      "Your email disappears",
    ],
    correctAnswer: "They still need the second factor to log in",
    correctNote:
      "Correct. MFA reduces the damage caused by stolen passwords.",
    incorrectNote:
      "Incorrect. MFA is designed to stop access even when a password is compromised.",
    takeaway:
      "MFA is one of the strongest everyday defenses for accounts.",
  },
];

export default function ModuleMFA() {
  return (
    <QuizModule
      title="Multi-Factor Authentication"
      description="Understand how MFA works and why it is one of the best defenses against account compromise."
      questions={questions}
    />
  );
}