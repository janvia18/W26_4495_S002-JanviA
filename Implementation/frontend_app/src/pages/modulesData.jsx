export const modulesData = [
  {
    key: "phishing",
    title: "Phishing Awareness",
    route: "/modules/phishing",
    points: 20,
    description: "Learn how to spot fake emails, suspicious links, and social traps.",
    content: [
      "Always verify the sender's email address carefully.",
      "Be cautious with urgent messages asking for passwords or payments.",
      "Hover over links before clicking them.",
      "Report suspicious emails instead of replying to them."
    ],
    quiz: [
      {
        question: "Which is a common phishing sign?",
        options: ["Clear branding", "Urgent request for login details", "Known coworker email", "Normal grammar"],
        answer: "Urgent request for login details"
      },
      {
        question: "What should you do before clicking a link?",
        options: ["Forward it", "Hover over it", "Reply first", "Ignore the sender"],
        answer: "Hover over it"
      }
    ]
  },
  {
    key: "passwords",
    title: "Password Security",
    route: "/modules/passwords",
    points: 20,
    description: "Build strong passwords and use passphrases safely.",
    content: [
      "Use long passphrases instead of short predictable passwords.",
      "Do not reuse the same password across accounts.",
      "A password manager reduces reuse and weak-password habits.",
      "Enable multi-factor authentication wherever possible."
    ],
    quiz: [
      {
        question: "What is safer?",
        options: ["password123", "Welcome1", "BlueRiverCoffeeTrain!", "Janvi2004"],
        answer: "BlueRiverCoffeeTrain!"
      },
      {
        question: "What helps manage many strong passwords?",
        options: ["Sticky notes", "Password manager", "Reusing one password", "Texting them to yourself"],
        answer: "Password manager"
      }
    ]
  },
  {
    key: "mfa",
    title: "Multi-Factor Authentication",
    route: "/modules/mfa",
    points: 20,
    description: "Understand why MFA adds a second lock on your digital door.",
    content: [
      "MFA combines something you know, have, or are.",
      "Authenticator apps are usually stronger than SMS codes.",
      "MFA reduces the damage from stolen passwords.",
      "Never approve login prompts you did not initiate."
    ],
    quiz: [
      {
        question: "MFA improves security because it adds:",
        options: ["More usernames", "Another verification step", "Faster login only", "Public passwords"],
        answer: "Another verification step"
      },
      {
        question: "What should you do with unexpected MFA prompts?",
        options: ["Approve quickly", "Ignore or deny them", "Share the code", "Change your email signature"],
        answer: "Ignore or deny them"
      }
    ]
  },
  {
    key: "social",
    title: "Social Engineering",
    route: "/modules/social",
    points: 20,
    description: "Recognize manipulation tactics used to trick people into giving access or data.",
    content: [
      "Attackers often exploit trust, urgency, fear, or curiosity.",
      "Always verify identity before sharing sensitive details.",
      "Never bypass policy just because someone sounds important.",
      "When unsure, pause and report the interaction."
    ],
    quiz: [
      {
        question: "Social engineering mainly targets:",
        options: ["Hardware only", "People", "Wi-Fi speed", "Printers"],
        answer: "People"
      },
      {
        question: "If someone pressures you for confidential info, you should:",
        options: ["Comply fast", "Verify first", "Post it publicly", "Ignore all emails forever"],
        answer: "Verify first"
      }
    ]
  },
  {
    key: "incident",
    title: "Incident Reporting",
    route: "/modules/incident",
    points: 20,
    description: "Know what to do when something suspicious or harmful happens.",
    content: [
      "Report incidents as soon as possible.",
      "Do not try to hide mistakes or security events.",
      "Preserve useful details like screenshots, times, and device names.",
      "Fast reporting helps containment and recovery."
    ],
    quiz: [
      {
        question: "When should you report a possible incident?",
        options: ["Next month", "Only if others do", "As soon as possible", "After deleting evidence"],
        answer: "As soon as possible"
      },
      {
        question: "Which detail is useful when reporting?",
        options: ["Random guess", "Screenshot or timeline", "A meme", "Nothing"],
        answer: "Screenshot or timeline"
      }
    ]
  }
];