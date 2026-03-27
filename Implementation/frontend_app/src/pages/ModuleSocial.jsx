import QuizModule from "../components/QuizModule";
import safeBrowsingImg from "../assets/safe-browsing-comic.webp";

const questions = [
  {
    id: 1,
    image: safeBrowsingImg,
    question: "Which website sign is a strong indicator of risk?",
    options: [
      "Strange URL spelling and unexpected redirects",
      "Clear navigation menu",
      "Company contact page",
      "Consistent branding",
    ],
    correctAnswer: "Strange URL spelling and unexpected redirects",
    correctNote:
      "Correct. Misspelled domains and redirects are common warning signs of unsafe sites.",
    incorrectNote:
      "Incorrect. Suspicious URLs and redirects are stronger red flags than normal site features.",
    takeaway:
      "Check the URL carefully before entering any information.",
  },
  {
    id: 2,
    image: safeBrowsingImg,
    question: "Why should you avoid downloading files from unknown websites?",
    options: [
      "They may contain malware",
      "They always open slowly",
      "They reduce screen brightness",
      "They remove bookmarks instantly",
    ],
    correctAnswer: "They may contain malware",
    correctNote:
      "Correct. Unknown sources may deliver malicious files disguised as useful downloads.",
    incorrectNote:
      "Incorrect. The biggest risk is malware or malicious software hidden in the file.",
    takeaway:
      "Download only from trusted and verified sources.",
  },
  {
    id: 3,
    image: safeBrowsingImg,
    question: "What is the safest response to a pop-up saying your device is infected?",
    options: [
      "Click it immediately",
      "Call the number shown in the pop-up",
      "Close the tab and use trusted security tools",
      "Enter your card details",
    ],
    correctAnswer: "Close the tab and use trusted security tools",
    correctNote:
      "Correct. Scareware pop-ups often try to push fake support services or malicious downloads.",
    incorrectNote:
      "Incorrect. Unexpected infection pop-ups can be scams designed to frighten users into bad decisions.",
    takeaway:
      "Do not trust fear-based pop-ups. Use official tools instead.",
  },
  {
    id: 4,
    image: safeBrowsingImg,
    question: "Why is keeping your browser updated important?",
    options: [
      "It improves old scams",
      "It helps patch known security vulnerabilities",
      "It makes passwords shorter",
      "It removes the need for antivirus",
    ],
    correctAnswer: "It helps patch known security vulnerabilities",
    correctNote:
      "Correct. Updates often close security gaps attackers try to exploit.",
    incorrectNote:
      "Incorrect. Browser updates are important because they patch weaknesses and improve protection.",
    takeaway:
      "Updates are security maintenance, not just cosmetic changes.",
  },
  {
    id: 5,
    image: safeBrowsingImg,
    question: "What should you check before entering sensitive information on a site?",
    options: [
      "The site URL and whether it matches the real organization",
      "Only the page colors",
      "Whether the font looks modern",
      "How many ads are present",
    ],
    correctAnswer: "The site URL and whether it matches the real organization",
    correctNote:
      "Correct. The domain name is one of the best clues for whether a site is legitimate.",
    incorrectNote:
      "Incorrect. Design can be copied, but the URL often reveals the truth.",
    takeaway:
      "Trust the address bar more than the page design.",
  },
];

export default function ModuleSafeBrowsing() {
  return (
    <QuizModule
      title="Safe Browsing"
      description="Practice recognizing unsafe websites, risky downloads, and deceptive browser tricks."
      questions={questions}
    />
  );
}