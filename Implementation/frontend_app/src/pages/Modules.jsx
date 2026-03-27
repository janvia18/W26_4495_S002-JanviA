import QuizModule from "../components/QuizModule";
import socialImg from "../assets/social-engineering-comic.webp";

const questions = [
  {
    id: 1,
    image: socialImg,
    question: "What is social engineering?",
    options: [
      "Manipulating people into giving information or access",
      "Designing social media pages",
      "Building office networks",
      "Repairing damaged hardware",
    ],
    correctAnswer: "Manipulating people into giving information or access",
    correctNote:
      "Correct. Social engineering targets human trust, fear, or helpfulness.",
    incorrectNote:
      "Incorrect. Social engineering is about manipulating people, not technology alone.",
    takeaway:
      "Attackers often hack people before they hack systems.",
  },
  {
    id: 2,
    image: socialImg,
    question: "Which situation is most likely a social engineering attempt?",
    options: [
      "A caller pressures you to share login details immediately",
      "A coworker books a meeting",
      "A manager sends a regular agenda",
      "A calendar reminder appears",
    ],
    correctAnswer: "A caller pressures you to share login details immediately",
    correctNote:
      "Correct. Pressure, urgency, and requests for credentials are classic manipulation tactics.",
    incorrectNote:
      "Incorrect. Social engineering attempts often involve pressure and requests for sensitive information.",
    takeaway:
      "Urgent requests for secrets should always trigger caution.",
  },
  {
    id: 3,
    image: socialImg,
    question: "If someone claims to be IT support and asks for your password, what should you do?",
    options: [
      "Share it because they sound official",
      "Verify independently and refuse to share the password",
      "Text it later",
      "Write it down and hand it over",
    ],
    correctAnswer: "Verify independently and refuse to share the password",
    correctNote:
      "Correct. Real support staff should not need your password directly.",
    incorrectNote:
      "Incorrect. Never share passwords with someone just because they sound convincing.",
    takeaway:
      "Verify identity through trusted channels before acting.",
  },
  {
    id: 4,
    image: socialImg,
    question: "Why do attackers sometimes pretend to be authority figures?",
    options: [
      "To pressure people into compliance",
      "To improve Wi-Fi speed",
      "To shorten security policies",
      "To reset passwords faster",
    ],
    correctAnswer: "To pressure people into compliance",
    correctNote:
      "Correct. People are more likely to comply when they believe the request comes from authority.",
    incorrectNote:
      "Incorrect. Pretending to be an authority figure is a manipulation tactic, not a technical requirement.",
    takeaway:
      "Authority can be faked. Verify before you trust.",
  },
  {
    id: 5,
    image: socialImg,
    question: "What is the best defense against social engineering?",
    options: [
      "Blind trust in familiar names",
      "Verification, caution, and reporting suspicious requests",
      "Sharing extra information to be helpful",
      "Ignoring all coworkers",
    ],
    correctAnswer: "Verification, caution, and reporting suspicious requests",
    correctNote:
      "Correct. Social engineering is best stopped by slowing down, verifying, and escalating concerns.",
    incorrectNote:
      "Incorrect. The safest response is to verify requests and report suspicious behavior.",
    takeaway:
      "A short pause can prevent a very long problem.",
  },
];

export default function ModuleSocial() {
  return (
    <QuizModule
      title="Social Engineering"
      description="Understand how attackers manipulate trust, urgency, and authority to trick people."
      questions={questions}
    />
  );
}