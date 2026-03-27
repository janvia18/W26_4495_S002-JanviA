import QuizModule from "../components/QuizModule";
import phishingImg from "../assets/phishing-comic.webp";

const questions = [
  {
    id: 1,
    image: phishingImg,
    question: "Which sign most strongly suggests an email is a phishing attempt?",
    options: [
      "It contains urgent language and a suspicious link",
      "It comes from a team newsletter",
      "It includes a meeting reminder",
      "It has your company logo",
    ],
    correctAnswer: "It contains urgent language and a suspicious link",
    correctNote:
      "Correct. Phishing emails often pressure users into quick action and hide malicious links.",
    incorrectNote:
      "Incorrect. The strongest warning sign here is urgency combined with a suspicious link.",
    takeaway:
      "Pause before you click. Urgency is one of a scammer’s favorite tools.",
  },
  {
    id: 2,
    image: phishingImg,
    question: "What should you do if an email asks you to verify your password?",
    options: [
      "Reply with your password",
      "Click the link and log in",
      "Report the email and delete it",
      "Forward it to everyone",
    ],
    correctAnswer: "Report the email and delete it",
    correctNote:
      "Correct. Legitimate organizations should never ask you to send passwords by email.",
    incorrectNote:
      "Incorrect. Sharing passwords or clicking suspicious verification links puts your account at risk.",
    takeaway:
      "Never provide passwords through email or unverified links.",
  },
  {
    id: 3,
    image: phishingImg,
    question: "Before opening a link in an email, what is the safest first step?",
    options: [
      "Click quickly before the page expires",
      "Hover over the link to inspect the destination",
      "Reply and ask if the sender is real",
      "Open it on your phone instead",
    ],
    correctAnswer: "Hover over the link to inspect the destination",
    correctNote:
      "Correct. Hovering over the link helps you spot fake or misspelled domains.",
    incorrectNote:
      "Incorrect. The safest step is to preview the destination before opening the link.",
    takeaway:
      "Inspect first, click later.",
  },
  {
    id: 4,
    image: phishingImg,
    question: "A phishing email often tries to create which feeling?",
    options: ["Urgency or fear", "Excitement about training", "Calm curiosity", "Trust through detail"],
    correctAnswer: "Urgency or fear",
    correctNote:
      "Correct. Attackers often create panic so users act without thinking.",
    incorrectNote:
      "Incorrect. Phishing messages commonly use urgency or fear to rush victims.",
    takeaway:
      "Strong emotional pressure is a red flag.",
  },
  {
    id: 5,
    image: phishingImg,
    question: "If a sender address looks slightly misspelled, what should you assume?",
    options: [
      "It is probably safe",
      "It may be spoofed or malicious",
      "It is just a typo with no risk",
      "It must be from IT support",
    ],
    correctAnswer: "It may be spoofed or malicious",
    correctNote:
      "Correct. Small spelling changes are a common trick used in phishing campaigns.",
    incorrectNote:
      "Incorrect. A slightly altered address may be deliberate spoofing.",
    takeaway:
      "Read sender addresses carefully, not just display names.",
  },
];

export default function ModulePhishing() {
  return (
    <QuizModule
      title="Phishing Awareness"
      description="Learn how to spot suspicious emails, fake links, and social engineering tricks."
      questions={questions}
    />
  );
}