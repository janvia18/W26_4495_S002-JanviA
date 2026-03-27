import QuizModule from "../components/QuizModule";
import incidentImg from "../assets/incident-reporting-comic.webp";

const questions = [
  {
    id: 1,
    image: incidentImg,
    question: "What should you do first after noticing suspicious activity on your account?",
    options: [
      "Ignore it and wait",
      "Report it through the proper security channel",
      "Post about it online",
      "Delete all your files",
    ],
    correctAnswer: "Report it through the proper security channel",
    correctNote:
      "Correct. Early reporting helps contain damage and allows the right team to respond quickly.",
    incorrectNote:
      "Incorrect. Delays can make an incident larger and harder to investigate.",
    takeaway:
      "Fast reporting is often more important than having every detail.",
  },
  {
    id: 2,
    image: incidentImg,
    question: "Why is incident reporting important even if you are unsure?",
    options: [
      "Because every report is punished",
      "Because small signs may reveal a bigger issue",
      "Because only managers can ignore incidents",
      "Because it replaces technical support",
    ],
    correctAnswer: "Because small signs may reveal a bigger issue",
    correctNote:
      "Correct. What looks minor to one user can be part of a larger pattern.",
    incorrectNote:
      "Incorrect. Security teams would rather investigate early than respond late.",
    takeaway:
      "When in doubt, report it.",
  },
  {
    id: 3,
    image: incidentImg,
    question: "Which example should be reported as a security incident?",
    options: [
      "A suspicious login alert you did not expect",
      "Your coffee getting cold",
      "A delayed lunch break",
      "A missing notebook page",
    ],
    correctAnswer: "A suspicious login alert you did not expect",
    correctNote:
      "Correct. Unexpected login alerts can indicate unauthorized access attempts.",
    incorrectNote:
      "Incorrect. Security incidents involve potential risk to systems, data, or accounts.",
    takeaway:
      "Unusual access behavior is a key warning sign.",
  },
  {
    id: 4,
    image: incidentImg,
    question: "What information is most useful when reporting an incident?",
    options: [
      "Approximate time, what happened, and any screenshots",
      "A random guess about the attacker",
      "Only your job title",
      "A social media link",
    ],
    correctAnswer: "Approximate time, what happened, and any screenshots",
    correctNote:
      "Correct. Clear facts help responders investigate efficiently.",
    incorrectNote:
      "Incorrect. Useful reporting includes what happened, when it happened, and supporting evidence if available.",
    takeaway:
      "Good reporting is factual, clear, and timely.",
  },
  {
    id: 5,
    image: incidentImg,
    question: "If you clicked a suspicious link by mistake, what is the best next step?",
    options: [
      "Hide it and hope nothing happens",
      "Immediately report it and follow guidance",
      "Delete your browser forever",
      "Tell only one friend",
    ],
    correctAnswer: "Immediately report it and follow guidance",
    correctNote:
      "Correct. Quick reporting can help contain the issue before it spreads.",
    incorrectNote:
      "Incorrect. Hiding the mistake makes response slower and riskier.",
    takeaway:
      "Reporting mistakes quickly is a security strength, not a weakness.",
  },
];

export default function ModuleIncident() {
  return (
    <QuizModule
      title="Incident Reporting"
      description="Learn when and how to report suspicious activity so issues can be contained quickly."
      questions={questions}
    />
  );
}