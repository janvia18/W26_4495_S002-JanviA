import QuizModule from "../components/QuizModule";
import passwordsImg from "../assets/passwords-comic.webp";

const questions = [
  {
    id: 1,
    image: passwordsImg,
    question: "Which password is the strongest?",
    options: [
      "Password123",
      "Janvi2004",
      "Blue!River7&Glass92",
      "12345678",
    ],
    correctAnswer: "Blue!River7&Glass92",
    correctNote:
      "Correct. Long, unique passwords with mixed characters are much harder to crack.",
    incorrectNote:
      "Incorrect. Weak or predictable passwords are easier for attackers to guess or brute-force.",
    takeaway:
      "Strong passwords are long, unique, and hard to predict.",
  },
  {
    id: 2,
    image: passwordsImg,
    question: "Why is reusing the same password across sites risky?",
    options: [
      "It makes logging in slower",
      "If one site is breached, other accounts can be accessed too",
      "It is only risky for social media",
      "It affects your Wi-Fi speed",
    ],
    correctAnswer: "If one site is breached, other accounts can be accessed too",
    correctNote:
      "Correct. Password reuse turns one breach into many compromised accounts.",
    incorrectNote:
      "Incorrect. Reusing passwords is dangerous because attackers test stolen credentials on multiple sites.",
    takeaway:
      "One password per account is the safer rule.",
  },
  {
    id: 3,
    image: passwordsImg,
    question: "What is the best use of a password manager?",
    options: [
      "Store and generate strong unique passwords",
      "Share passwords with friends",
      "Replace all security tools",
      "Bypass login systems",
    ],
    correctAnswer: "Store and generate strong unique passwords",
    correctNote:
      "Correct. Password managers help users create and store complex passwords safely.",
    incorrectNote:
      "Incorrect. A password manager is meant to securely store and generate strong credentials.",
    takeaway:
      "Password managers reduce reuse and improve password quality.",
  },
  {
    id: 4,
    image: passwordsImg,
    question: "Which habit improves password security the most?",
    options: [
      "Writing passwords on sticky notes",
      "Using the same password everywhere",
      "Using unique passwords for each account",
      "Sharing passwords with coworkers",
    ],
    correctAnswer: "Using unique passwords for each account",
    correctNote:
      "Correct. Unique passwords prevent one leak from becoming a full domino collapse.",
    incorrectNote:
      "Incorrect. Sharing or reusing passwords increases exposure across accounts.",
    takeaway:
      "Unique passwords create separation between accounts.",
  },
  {
    id: 5,
    image: passwordsImg,
    question: "What should you do if you think your password was exposed?",
    options: [
      "Ignore it if nothing happened yet",
      "Change it immediately and enable MFA",
      "Wait for IT to notice",
      "Only log out once",
    ],
    correctAnswer: "Change it immediately and enable MFA",
    correctNote:
      "Correct. Immediate action limits damage and MFA adds another layer of protection.",
    incorrectNote:
      "Incorrect. Waiting gives attackers more time to misuse the account.",
    takeaway:
      "Fast response matters after a suspected credential leak.",
  },
];

export default function ModulePasswords() {
  return (
    <QuizModule
      title="Password Security"
      description="Build safer password habits and protect accounts from common attacks."
      questions={questions}
    />
  );
}