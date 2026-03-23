export const modulesData = [
  {
    key: "phishing",
    title: "Phishing Awareness",
    route: "/modules/phishing",
    points: 20,
    description: "Learn how to spot fake emails, suspicious links, and social traps.",
    content: [
      "Always verify the sender's address before trusting an email.",
      "Be cautious of urgent requests asking for passwords or payments.",
      "Hover over links before clicking them.",
      "Report suspicious emails instead of responding."
    ],
    quiz: [
      {
        question: "Which is a common phishing sign?",
        options: [
          "Urgent request for login details",
          "Normal greeting from a known teacher",
          "Expected account notice",
          "A bookmarked safe website"
        ],
        answer: "Urgent request for login details"
      },
      {
        question: "Before clicking an email link, you should:",
        options: [
          "Reply first",
          "Hover over the link",
          "Forward it",
          "Ignore the sender name"
        ],
        answer: "Hover over the link"
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
      "Use long and unique passwords for each account.",
      "Passphrases are easier to remember and harder to crack.",
      "Never reuse passwords across important accounts.",
      "A password manager helps store complex passwords securely."
    ],
    quiz: [
      {
        question: "Which password is strongest?",
        options: [
          "janvi123",
          "Password1",
          "BlueRiverCoffeeTrain!",
          "12345678"
        ],
        answer: "BlueRiverCoffeeTrain!"
      },
      {
        question: "What is the best way to manage many strong passwords?",
        options: [
          "Write them in notes",
          "Use the same password everywhere",
          "Use a password manager",
          "Text them to yourself"
        ],
        answer: "Use a password manager"
      }
    ]
  },
  {
    key: "mfa",
    title: "Multi-Factor Authentication",
    route: "/modules/mfa",
    points: 20,
    description: "Understand why MFA adds a second layer of protection.",
    content: [
      "MFA combines more than one form of verification.",
      "Authenticator apps are generally safer than SMS codes.",
      "MFA limits damage when a password is stolen.",
      "Never approve an MFA request you did not initiate."
    ],
    quiz: [
      {
        question: "Why is MFA helpful?",
        options: [
          "It removes passwords forever",
          "It adds another verification step",
          "It makes scams legal",
          "It disables security alerts"
        ],
        answer: "It adds another verification step"
      },
      {
        question: "If you receive an unexpected MFA prompt, you should:",
        options: [
          "Approve quickly",
          "Deny or ignore it",
          "Send it to a friend",
          "Turn off your phone"
        ],
        answer: "Deny or ignore it"
      }
    ]
  },
  {
    key: "social",
    title: "Social Engineering",
    route: "/modules/social",
    points: 20,
    description: "Recognize manipulation tactics used to trick people.",
    content: [
      "Attackers often use fear, urgency, or authority.",
      "Always verify a person's identity before sharing sensitive data.",
      "Do not break policy just because someone sounds important.",
      "Pause and report suspicious requests."
    ],
    quiz: [
      {
        question: "Social engineering mainly targets:",
        options: ["People", "Only servers", "Printers", "Wi-Fi speed"],
        answer: "People"
      },
      {
        question: "If someone pressures you for confidential information, you should:",
        options: [
          "Share it quickly",
          "Verify first",
          "Post it online",
          "Assume they are genuine"
        ],
        answer: "Verify first"
      }
    ]
  },
  {
    key: "safe-browsing",
    title: "Safe Browsing",
    route: "/modules/safe-browsing",
    points: 20,
    description: "Learn safer habits while browsing websites and downloading files.",
    content: [
      "Check that websites use HTTPS before entering sensitive data.",
      "Avoid downloading files from unknown or suspicious websites.",
      "Be careful with pop-ups asking for urgent action.",
      "Keep your browser and extensions updated."
    ],
    quiz: [
      {
        question: "What does HTTPS usually indicate?",
        options: [
          "The site uses a secure connection",
          "The site is always trustworthy",
          "The page cannot contain scams",
          "The page is government-approved"
        ],
        answer: "The site uses a secure connection"
      },
      {
        question: "If a site prompts a strange file download, you should:",
        options: [
          "Download immediately",
          "Check the source before downloading",
          "Disable antivirus",
          "Open it without scanning"
        ],
        answer: "Check the source before downloading"
      }
    ]
  },
  {
    key: "incident",
    title: "Incident Reporting",
    route: "/modules/incident",
    points: 20,
    description: "Know what to do when something suspicious happens.",
    content: [
      "Report incidents as soon as possible.",
      "Do not hide mistakes or suspicious activity.",
      "Preserve helpful details like screenshots and time stamps.",
      "Fast reporting improves containment and recovery."
    ],
    quiz: [
      {
        question: "When should you report a possible security incident?",
        options: [
          "As soon as possible",
          "At the end of the month",
          "Only if others noticed it",
          "After deleting all evidence"
        ],
        answer: "As soon as possible"
      },
      {
        question: "What is useful in an incident report?",
        options: [
          "A screenshot or timeline",
          "A random guess",
          "Nothing",
          "Only your opinion"
        ],
        answer: "A screenshot or timeline"
      }
    ]
  }
];