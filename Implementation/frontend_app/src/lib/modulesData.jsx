export const modulesData = [
  {
    key: "phishing",
    title: "Phishing Awareness",
    route: "/modules/phishing",
    points: 20,
    description: "Learn how to spot fake emails and suspicious links.",
    content: [
      "Phishing tricks users into revealing sensitive information.",
      "Messages often create urgency to pressure you.",
      "Check sender email addresses carefully.",
      "Never click suspicious links.",
      "Report phishing attempts to IT security."
    ],
    scenario: {
      title: "Spot the Phish",
      instructions: "Is this email safe?",
      heading: "URGENT: Verify Your Account Now!",
      body: ["Your account will be locked in 24 hours if you don't verify.", "Click here: http://fake-bank-verify.com"],
      options: ["Safe Email", "Phishing Attempt"],
      correctAnswer: "Phishing Attempt",
      correctText: "✅ Correct! This is phishing - urgent language + suspicious link = danger!",
      incorrectText: "❌ Wrong! This IS phishing. Never click urgent links from unknown senders."
    },
    quiz: [
      { question: "1. What is phishing?", options: ["A computer virus", "A trick to steal your information", "A type of antivirus", "A password manager"], answer: "A trick to steal your information", explanation: "Phishing tricks you into giving away passwords." },
      { question: "2. What's a common phishing sign?", options: ["Professional language", "Urgent request to act NOW", "Known sender", "No links"], answer: "Urgent request to act NOW", explanation: "Phishers create urgency to make you act without thinking." },
      { question: "3. What should you do with suspicious emails?", options: ["Click links to check", "Reply asking questions", "Report to IT security", "Forward to friends"], answer: "Report to IT security", explanation: "Always report suspicious emails." },
      { question: "4. What do real companies NEVER ask for in email?", options: ["Your username", "Your department", "Your password", "Your email address"], answer: "Your password", explanation: "Legitimate companies never ask for passwords via email!" },
      { question: "5. Before clicking a link, what should you do?", options: ["Click quickly", "Hover to see actual URL", "Ignore it", "Forward it"], answer: "Hover to see actual URL", explanation: "Hover over links to see where they REALLY go." }
    ]
  },
  {
    key: "passwords",
    title: "Password Security",
    route: "/modules/passwords",
    points: 20,
    description: "Create and manage strong passwords.",
    content: [
      "Use long, unique passwords for each account.",
      "Never reuse passwords across different sites.",
      "Use a password manager to store them safely.",
      "Enable 2FA whenever possible.",
      "A passphrase is stronger than a short password."
    ],
    scenario: {
      title: "Password Choice",
      instructions: "Which is safer?",
      heading: "Two Employees",
      body: ["Alice uses 'Password123' for all her accounts.", "Bob uses a password manager with unique passwords."],
      options: ["Alice is safer", "Bob is safer"],
      correctAnswer: "Bob is safer",
      correctText: "✅ Correct! Unique passwords + password manager = much safer!",
      incorrectText: "❌ Wrong! Reusing passwords means one breach exposes ALL accounts."
    },
    quiz: [
      { question: "1. Which password is strongest?", options: ["123456", "password", "BlueRiverCoffeeTrain42!", "qwerty"], answer: "BlueRiverCoffeeTrain42!", explanation: "Long passphrases with numbers and symbols are hardest to crack." },
      { question: "2. What is a password manager?", options: ["A tool that steals passwords", "An app that stores and creates strong passwords", "A notebook", "A hacker tool"], answer: "An app that stores and creates strong passwords", explanation: "Password managers securely store all your unique passwords." },
      { question: "3. Why is password reuse dangerous?", options: ["Hard to remember", "One breach compromises multiple accounts", "Takes longer to type", "Websites block it"], answer: "One breach compromises multiple accounts", explanation: "If one site is hacked, criminals try that password everywhere else." },
      { question: "4. What makes a strong password?", options: ["Your birthday", "A short word", "Random words + numbers + symbols", "Your name"], answer: "Random words + numbers + symbols", explanation: "Mix of random words, numbers, and symbols creates unguessable passwords." },
      { question: "5. How often should you change passwords?", options: ["Every day", "Every week", "When suspected breach or annually", "Never"], answer: "When suspected breach or annually", explanation: "Change passwords if you suspect a breach or for annual security updates." }
    ]
  }
];

export default modulesData;