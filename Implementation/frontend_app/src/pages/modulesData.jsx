export const modulesData = [
  {
    key: "phishing",
    title: "Phishing Awareness",
    route: "/modules/phishing",
    points: 20,
    description: "Learn how to spot fake emails, suspicious links, and messages designed to steal information.",
    content: [
      "Phishing is a cyberattack that tricks users into revealing sensitive information.",
      "Phishing messages often create urgency to push quick action.",
      "Suspicious links and fake sender addresses are common warning signs.",
      "Never submit passwords or personal information through unverified links."
    ],
    scenario: {
      title: "Part 2: Spot the Phish",
      instructions: "Read the message and decide whether it is safe or phishing.",
      heading: "Email: Payroll Update Required",
      from: "Payroll Team <payroll@company-payroll-support.com>",
      subject: "Action Required: Confirm your direct deposit info",
      body: [
        "Hi,",
        "Your payroll will be paused unless you confirm your direct deposit within 2 hours.",
        "Confirm here: http://company-payroll-support.com/verify",
        "Thanks,",
        "Payroll Team"
      ],
      options: ["🚩 Phish", "✅ Safe"],
      correctAnswer: "🚩 Phish",
      correctText:
        "Correct. This message uses urgency, a suspicious domain, and asks for sensitive action through a risky link.",
      incorrectText:
        "Incorrect. The urgency and suspicious link are strong signs of phishing."
    },
    quiz: [
      {
        question: "What is phishing?",
        options: [
          "A cyberattack that tricks users into revealing sensitive information",
          "A method for improving Wi-Fi speed",
          "A secure way to store passwords",
          "A type of antivirus scan"
        ],
        answer:
          "A cyberattack that tricks users into revealing sensitive information"
      },
      {
        question: "Which is a phishing warning sign?",
        options: [
          "Urgent request to verify your account",
          "Saved bookmark to your bank website",
          "Company email from a verified internal domain",
          "A document you expected to receive"
        ],
        answer: "Urgent request to verify your account"
      }
    ]
  },
  {
    key: "passwords",
    title: "Password Security",
    route: "/modules/passwords",
    points: 20,
    description: "Use strong passwords, passphrases, and safer password habits.",
    content: [
      "Strong passwords should be long, unique, and hard to guess.",
      "Passphrases are easier to remember and stronger than short passwords.",
      "Never reuse the same password across multiple important accounts.",
      "Password managers help you store secure passwords safely."
    ],
    scenario: {
      title: "Part 2: Password Choice",
      instructions: "Choose the safer password behavior.",
      heading: "Which practice is safer?",
      body: [
        "Employee A uses the same password for all accounts.",
        "Employee B uses a password manager and a different password for each account."
      ],
      options: ["Employee A", "Employee B"],
      correctAnswer: "Employee B",
      correctText:
        "Correct. Unique passwords stored in a password manager are much safer than reuse.",
      incorrectText:
        "Incorrect. Reusing passwords means one breach can expose multiple accounts."
    },
    quiz: [
      {
        question: "Which password is the strongest?",
        options: ["janvi123", "Password1", "BlueRiverCoffeeTrain!", "12345678"],
        answer: "BlueRiverCoffeeTrain!"
      },
      {
        question: "What helps manage many secure passwords?",
        options: [
          "A password manager",
          "Using one password everywhere",
          "Saving them in plain text",
          "Sharing them with a friend"
        ],
        answer: "A password manager"
      }
    ]
  },
  {
    key: "mfa",
    title: "Multi-Factor Authentication",
    route: "/modules/mfa",
    points: 20,
    description: "Understand how MFA protects accounts by adding another layer of verification.",
    content: [
      "MFA requires more than one form of verification.",
      "Even if a password is stolen, MFA can still block access.",
      "Unexpected MFA prompts can be a sign of an attack attempt.",
      "Authenticator apps are usually safer than SMS codes."
    ],
    scenario: {
      title: "Part 2: MFA Prompt Check",
      instructions: "Decide the safest response.",
      heading: "Unexpected MFA notification",
      body: [
        "You receive a login approval prompt on your phone, but you are not signing in."
      ],
      options: ["Approve", "Deny"],
      correctAnswer: "Deny",
      correctText:
        "Correct. An unexpected MFA prompt may mean someone else has your password.",
      incorrectText:
        "Incorrect. Never approve an MFA request you did not initiate."
    },
    quiz: [
      {
        question: "Why is MFA useful?",
        options: [
          "It adds another verification step",
          "It removes the need for security",
          "It stores passwords publicly",
          "It makes scams impossible"
        ],
        answer: "It adds another verification step"
      },
      {
        question: "What should you do with an unexpected MFA prompt?",
        options: ["Ignore or deny it", "Approve it quickly", "Forward it to a friend", "Disable your phone"],
        answer: "Ignore or deny it"
      }
    ]
  },
  {
    key: "social",
    title: "Social Engineering",
    route: "/modules/social",
    points: 20,
    description: "Recognize how attackers manipulate people using urgency, trust, and fear.",
    content: [
      "Social engineering targets people instead of systems.",
      "Attackers may pretend to be trusted coworkers or IT staff.",
      "Urgency and authority are common manipulation tactics.",
      "Always verify identity before sharing sensitive information."
    ],
    scenario: {
      title: "Part 2: Social Engineering Check",
      instructions: "Choose the safest action.",
      heading: "Urgent call from fake IT support",
      body: [
        "A caller claims to be from IT and asks for your password immediately to prevent account lockout."
      ],
      options: ["Share password", "Verify identity first"],
      correctAnswer: "Verify identity first",
      correctText:
        "Correct. Social engineering often uses urgency and authority. Always verify first.",
      incorrectText:
        "Incorrect. Legitimate support staff should not ask for your password directly."
    },
    quiz: [
      {
        question: "Social engineering usually targets:",
        options: ["People", "Only servers", "Only routers", "Printers"],
        answer: "People"
      },
      {
        question: "If someone urgently asks for confidential information, you should:",
        options: [
          "Verify their identity first",
          "Share it immediately",
          "Post it publicly",
          "Ignore all communication forever"
        ],
        answer: "Verify their identity first"
      }
    ]
  },
  {
    key: "safe-browsing",
    title: "Safe Browsing",
    route: "/modules/safe-browsing",
    points: 20,
    description: "Learn safer habits for browsing websites and downloading files.",
    content: [
      "Use trusted websites and check for HTTPS before entering sensitive data.",
      "Avoid clicking pop-ups that demand urgent action.",
      "Be cautious with unknown downloads and browser prompts.",
      "Keep your browser and security tools updated."
    ],
    scenario: {
      title: "Part 2: Safe Browsing Check",
      instructions: "Choose the safer action.",
      heading: "Strange browser pop-up",
      body: [
        "A site suddenly says your device is infected and asks you to download an unknown tool."
      ],
      options: ["Download it", "Close it and verify"],
      correctAnswer: "Close it and verify",
      correctText:
        "Correct. Unexpected pop-ups and urgent downloads are common web threats.",
      incorrectText:
        "Incorrect. Downloading unknown files from pop-ups can install malware."
    },
    quiz: [
      {
        question: "What does HTTPS usually indicate?",
        options: [
          "A secure connection",
          "The website is always safe",
          "The page cannot contain scams",
          "It is a government site"
        ],
        answer: "A secure connection"
      },
      {
        question: "What should you do with a suspicious download prompt?",
        options: [
          "Close it and verify the source",
          "Download it immediately",
          "Turn off antivirus",
          "Ignore browser warnings"
        ],
        answer: "Close it and verify the source"
      }
    ]
  },
  {
    key: "incident",
    title: "Incident Reporting",
    route: "/modules/incident",
    points: 20,
    description: "Know how and when to report suspicious activity or security issues.",
    content: [
      "Report suspicious incidents as quickly as possible.",
      "Do not hide accidental clicks or unusual activity.",
      "Screenshots, timelines, and details help responders investigate.",
      "Fast reporting helps reduce the damage of an incident."
    ],
    scenario: {
      title: "Part 2: Incident Reporting Check",
      instructions: "Pick the best next step.",
      heading: "Suspicious link clicked",
      body: [
        "You clicked a suspicious link and your browser started behaving strangely."
      ],
      options: ["Report immediately", "Ignore it"],
      correctAnswer: "Report immediately",
      correctText:
        "Correct. Fast reporting helps contain the issue and reduce damage.",
      incorrectText:
        "Incorrect. Ignoring a possible incident can make the situation worse."
    },
    quiz: [
      {
        question: "When should you report a possible security incident?",
        options: ["As soon as possible", "Next month", "Only if someone else noticed", "After deleting evidence"],
        answer: "As soon as possible"
      },
      {
        question: "What is useful in an incident report?",
        options: ["A screenshot or timeline", "A random guess", "Nothing", "Only your opinion"],
        answer: "A screenshot or timeline"
      }
    ]
  }
];