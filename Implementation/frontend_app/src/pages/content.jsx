export const company = {
  name: "ICRC / CCBI",
  industry: "Non-profit / Humanitarian",
  region: "Canada / Global",
  description:
    "This training platform helps staff build everyday cybersecurity habits. Modules focus on real-world risks like phishing, password safety, and safe browsing, with progress tracking to support continuous learning.",
  supportEmail: "security@company.org",
};

export const modules = [
  {
    id: "phishing",
    title: "Phishing Awareness",
    description: "Learn how to spot suspicious emails, urgent requests, and unsafe links.",
    estimatedMinutes: 6,
    difficulty: "Beginner",
    points: 10,
    outcomes: [
      "Identify urgency and pressure tactics",
      "Check sender address and suspicious links",
      "Report phishing instead of clicking",
    ],
    route: "/modules/phishing",
    unlockAfter: null,
  },
  {
    id: "password",
    title: "Passwords & Passphrases",
    description: "Create strong passphrases and avoid password reuse across accounts.",
    estimatedMinutes: 5,
    difficulty: "Beginner",
    points: 10,
    outcomes: [
      "Use long passphrases",
      "Avoid reuse across sites",
      "Use a password manager safely",
    ],
    route: "/modules/password",
    unlockAfter: "phishing",
  },
  {
    id: "social",
    title: "Social Engineering",
    description: "Recognize manipulation tactics used to trick people into revealing sensitive information.",
    estimatedMinutes: 5,
    difficulty: "Beginner",
    points: 10,
    outcomes: [
      "Recognize pretexting and impersonation",
      "Pause and verify identity requests",
      "Follow safe reporting steps",
    ],
    route: "/modules/social",
    unlockAfter: "password",
  },
];