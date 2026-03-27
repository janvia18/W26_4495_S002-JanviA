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
      "Never submit passwords or personal information through unverified links.",
      "Always check the sender's email address carefully before responding."
    ],
    scenario: {
      title: "Scenario: Spot the Phish",
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
      options: ["This is a legitimate email", "This is a phishing attempt"],
      correctAnswer: "This is a phishing attempt",
      correctText: "Correct! This is a phishing attempt. The sender address is suspicious, it creates urgency, and the link doesn't match the company's domain.",
      incorrectText: "Incorrect! This is actually a phishing attempt. Always verify the sender's email address and never click links in urgent messages."
    },
    quiz: [
      {
        question: "What is phishing?",
        options: [
          "A type of computer virus",
          "A cyberattack that tricks users into revealing sensitive information",
          "A method for improving Wi-Fi speed",
          "A secure way to store passwords"
        ],
        answer: "A cyberattack that tricks users into revealing sensitive information",
        explanation: "Phishing is a social engineering attack where attackers trick victims into revealing sensitive information."
      },
      {
        question: "Which is a common phishing warning sign?",
        options: [
          "Urgent request to verify your account",
          "Saved bookmark to your bank website",
          "Company email from a verified internal domain",
          "A document you expected to receive"
        ],
        answer: "Urgent request to verify your account",
        explanation: "Phishing emails often create a sense of urgency to pressure you into acting without thinking."
      },
      {
        question: "What should you do if you receive a suspicious email?",
        options: [
          "Click the link to verify",
          "Reply and ask for more information",
          "Report it to your IT security team",
          "Forward it to all your colleagues"
        ],
        answer: "Report it to your IT security team",
        explanation: "Always report suspicious emails to your security team so they can investigate and protect others."
      },
      {
        question: "What does a legitimate company typically NOT ask for in an email?",
        options: [
          "Your username",
          "Your password or verification codes",
          "Your department name",
          "Your company email address"
        ],
        answer: "Your password or verification codes",
        explanation: "Legitimate companies never ask for passwords or verification codes via email."
      },
      {
        question: "What should you check before clicking a link in an email?",
        options: [
          "Hover over the link to see the actual URL",
          "The email's color scheme",
          "The number of recipients",
          "The email's file size"
        ],
        answer: "Hover over the link to see the actual URL",
        explanation: "Hovering reveals the actual destination URL, which may be different from the displayed text."
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
      "Password managers help you store secure passwords safely.",
      "Enable 2FA whenever possible for an extra layer of security."
    ],
    scenario: {
      title: "Scenario: Password Choice",
      instructions: "Choose the safer password behavior.",
      heading: "Which practice is safer?",
      body: [
        "Employee A uses the same password for all accounts.",
        "Employee B uses a password manager and a different password for each account."
      ],
      options: ["Employee A", "Employee B"],
      correctAnswer: "Employee B",
      correctText: "Correct! Unique passwords stored in a password manager are much safer than reuse. If one account gets breached, others remain secure.",
      incorrectText: "Incorrect! Reusing passwords means one breach can expose multiple accounts. Always use unique passwords for each account."
    },
    quiz: [
      {
        question: "Which password is the strongest?",
        options: ["janvi123", "Password1", "BlueRiverCoffeeTrain", "12345678"],
        answer: "BlueRiverCoffeeTrain",
        explanation: "Long passphrases with multiple words are much harder to crack than short passwords."
      },
      {
        question: "What is a password manager?",
        options: [
          "A tool that steals passwords",
          "A secure application that stores and generates strong passwords",
          "A physical device to write down passwords",
          "A website that shares passwords"
        ],
        answer: "A secure application that stores and generates strong passwords",
        explanation: "Password managers securely store your credentials and can generate strong, unique passwords."
      },
      {
        question: "Why should you avoid password reuse?",
        options: [
          "It's hard to remember",
          "One breached account can compromise multiple accounts",
          "It takes too long to type",
          "Websites don't allow it"
        ],
        answer: "One breached account can compromise multiple accounts",
        explanation: "If attackers get your password from one site, they'll try it on other sites too."
      },
      {
        question: "What is a good practice for creating strong passwords?",
        options: [
          "Using your birthday",
          "Using a combination of random words with numbers and symbols",
          "Using 'password123'",
          "Using the same password for all accounts"
        ],
        answer: "Using a combination of random words with numbers and symbols",
        explanation: "Random words with numbers and symbols create strong, memorable passwords."
      },
      {
        question: "How often should you change your passwords?",
        options: [
          "Every day",
          "Only when you suspect a breach or annually",
          "Never",
          "Every week"
        ],
        answer: "Only when you suspect a breach or annually",
        explanation: "Regular changes aren't necessary unless there's a suspected breach, but annual updates are good practice."
      }
    ]
  },
  {
    key: "mfa",
    title: "Multi-Factor Authentication",
    route: "/modules/mfa",
    points: 20,
    description: "Add an extra layer of security to your accounts with MFA.",
    content: [
      "MFA requires two or more verification methods to access an account.",
      "Common factors: something you know (password), something you have (phone), something you are (biometrics).",
      "Even if your password is stolen, MFA can prevent unauthorized access.",
      "Use authenticator apps instead of SMS when possible for better security.",
      "Always set up MFA on your most important accounts: email, banking, social media."
    ],
    scenario: {
      title: "Scenario: MFA Decision",
      instructions: "Choose the most secure option.",
      heading: "You just enabled MFA on your work account. Which option provides the best security?",
      body: [
        "Option 1: SMS text message codes",
        "Option 2: Authenticator app codes",
        "Option 3: Email verification codes"
      ],
      options: ["SMS codes", "Authenticator app", "Email codes"],
      correctAnswer: "Authenticator app",
      correctText: "Correct! Authenticator apps are more secure than SMS, which can be intercepted via SIM swapping attacks.",
      incorrectText: "Incorrect! Authenticator apps provide the best security. SMS can be vulnerable to SIM swapping attacks."
    },
    quiz: [
      {
        question: "What does MFA stand for?",
        options: [
          "Multiple File Access",
          "Multi-Factor Authentication",
          "Main Frame Authorization",
          "Manual Form Authentication"
        ],
        answer: "Multi-Factor Authentication",
        explanation: "MFA is an authentication method that requires two or more verification factors."
      },
      {
        question: "Which of these is NOT a typical authentication factor?",
        options: [
          "Something you know (password)",
          "Something you have (phone)",
          "Something you are (fingerprint)",
          "Something you want (desire)"
        ],
        answer: "Something you want (desire)",
        explanation: "Authentication factors are: knowledge, possession, and inherence. Desire is not a security factor."
      },
      {
        question: "Why is MFA important?",
        options: [
          "It makes login slower",
          "It protects accounts even if passwords are compromised",
          "It remembers your passwords for you",
          "It automatically logs you out"
        ],
        answer: "It protects accounts even if passwords are compromised",
        explanation: "MFA adds a critical layer of security that attackers can't bypass without the second factor."
      },
      {
        question: "What's the most secure MFA method?",
        options: [
          "SMS text codes",
          "Email verification",
          "Hardware security key or authenticator app",
          "Security questions"
        ],
        answer: "Hardware security key or authenticator app",
        explanation: "Hardware keys and authenticator apps are more secure than SMS, which can be intercepted."
      },
      {
        question: "What should you do if you lose your MFA device?",
        options: [
          "Panic and create new accounts",
          "Use backup codes or contact support immediately",
          "Wait for someone to find it",
          "Disable all your accounts"
        ],
        answer: "Use backup codes or contact support immediately",
        explanation: "Always save backup codes when setting up MFA. If you lose your device, use these codes to regain access."
      }
    ]
  },
  {
    key: "social",
    title: "Social Engineering",
    route: "/modules/social",
    points: 20,
    description: "Recognize and defend against psychological manipulation tactics.",
    content: [
      "Social engineering exploits human psychology rather than technical vulnerabilities.",
      "Attackers use manipulation to gain access to information or systems.",
      "Common tactics: pretexting, baiting, tailgating, and phishing.",
      "Always verify identities before sharing sensitive information.",
      "Be suspicious of unsolicited requests, even from seemingly trusted sources."
    ],
    scenario: {
      title: "Scenario: Phone Call",
      instructions: "Choose the best response.",
      heading: "You receive a call from someone claiming to be IT support. They ask for your password to 'fix an issue.'",
      body: [
        "They sound professional and know your name."
      ],
      options: ["Give them your password", "Ask for their ID and verify through official channels", "Ignore and hang up"],
      correctAnswer: "Ask for their ID and verify through official channels",
      correctText: "Correct! Never give passwords over the phone. Always verify the caller's identity through official company channels.",
      incorrectText: "Incorrect! IT support will never ask for your password. Always verify before sharing any information."
    },
    quiz: [
      {
        question: "What is social engineering?",
        options: [
          "Building social networks",
          "Psychological manipulation to gain information or access",
          "Engineering social media platforms",
          "A type of software development"
        ],
        answer: "Psychological manipulation to gain information or access",
        explanation: "Social engineering uses psychological tricks to manipulate people into revealing information."
      },
      {
        question: "What is 'pretexting'?",
        options: [
          "Creating a false scenario to obtain information",
          "Writing a document",
          "Testing software",
          "Building websites"
        ],
        answer: "Creating a false scenario to obtain information",
        explanation: "Pretexting involves creating a fabricated scenario to trick victims into sharing information."
      },
      {
        question: "If someone urgently asks for confidential information, you should:",
        options: [
          "Verify their identity first",
          "Share it immediately",
          "Post it publicly",
          "Ignore all communication forever"
        ],
        answer: "Verify their identity first",
        explanation: "Always verify identity through official channels before sharing any sensitive information."
      },
      {
        question: "What is 'tailgating' in security terms?",
        options: [
          "Following someone into a secure area without proper authentication",
          "Following someone on social media",
          "Driving too close to another car",
          "A type of email tracking"
        ],
        answer: "Following someone into a secure area without proper authentication",
        explanation: "Tailgating is when someone follows an authorized person into a secure area without badging in themselves."
      },
      {
        question: "How can you protect against social engineering?",
        options: [
          "Share information freely",
          "Trust everyone by default",
          "Verify identities and be skeptical of unsolicited requests",
          "Click all links in emails"
        ],
        answer: "Verify identities and be skeptical of unsolicited requests",
        explanation: "Always verify who you're talking to and be cautious about unsolicited requests for information."
      }
    ]
  },
  {
    key: "safeBrowsing",
    title: "Safe Browsing",
    route: "/modules/safe-browsing",
    points: 20,
    description: "Learn safer habits for browsing websites and downloading files.",
    content: [
      "Use trusted websites and check for HTTPS before entering sensitive data.",
      "Avoid clicking pop-ups that demand urgent action.",
      "Be cautious with unknown downloads and browser prompts.",
      "Keep your browser and security tools updated.",
      "Use ad-blockers and privacy extensions for added protection."
    ],
    scenario: {
      title: "Scenario: Safe Browsing Check",
      instructions: "Choose the safer action.",
      heading: "Strange browser pop-up",
      body: [
        "A site suddenly says your device is infected and asks you to download an unknown tool."
      ],
      options: ["Download it", "Close it and verify"],
      correctAnswer: "Close it and verify",
      correctText: "Correct! Unexpected pop-ups and urgent downloads are common web threats. Close the pop-up and run a legitimate security scan.",
      incorrectText: "Incorrect! Downloading unknown files from pop-ups can install malware. Never trust these scare tactics."
    },
    quiz: [
      {
        question: "What does HTTPS usually indicate?",
        options: [
          "A secure, encrypted connection",
          "The website is always safe",
          "The page cannot contain scams",
          "It is a government site"
        ],
        answer: "A secure, encrypted connection",
        explanation: "HTTPS encrypts data between your browser and the website, protecting it from interception."
      },
      {
        question: "What should you do with a suspicious download prompt?",
        options: [
          "Close it and verify the source",
          "Download it immediately",
          "Turn off antivirus",
          "Ignore browser warnings"
        ],
        answer: "Close it and verify the source",
        explanation: "Always close suspicious prompts and verify downloads from official sources only."
      },
      {
        question: "What is a browser extension and why be careful?",
        options: [
          "They're always safe to install",
          "Small programs that can access your browsing data; only install from trusted sources",
          "They automatically protect you",
          "They speed up your internet"
        ],
        answer: "Small programs that can access your browsing data; only install from trusted sources",
        explanation: "Browser extensions can have permissions to read your data. Only install from official stores and trusted developers."
      },
      {
        question: "What does a 'man-in-the-middle' attack do?",
        options: [
          "Intercepts communication between you and a website",
          "Steals your physical mail",
          "Hacks your computer remotely",
          "Creates fake websites"
        ],
        answer: "Intercepts communication between you and a website",
        explanation: "MITM attacks intercept communications to steal data. HTTPS helps prevent this."
      },
      {
        question: "What should you look for in a legitimate website?",
        options: [
          "Fancy design and animations",
          "HTTPS, correct domain spelling, and contact information",
          "Many pop-up ads",
          "Requests to install software immediately"
        ],
        answer: "HTTPS, correct domain spelling, and contact information",
        explanation: "Legitimate websites have security indicators like HTTPS and proper contact information."
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
      "Fast reporting helps reduce the damage of an incident.",
      "Know your organization's incident response procedures."
    ],
    scenario: {
      title: "Scenario: Incident Reporting Check",
      instructions: "Pick the best next step.",
      heading: "Suspicious link clicked",
      body: [
        "You clicked a suspicious link and your browser started behaving strangely."
      ],
      options: ["Report immediately", "Ignore it"],
      correctAnswer: "Report immediately",
      correctText: "Correct! Fast reporting helps contain the issue and reduce damage. Security teams can investigate and mitigate quickly.",
      incorrectText: "Incorrect! Ignoring a possible incident can make the situation worse. Always report suspicious activity immediately."
    },
    quiz: [
      {
        question: "When should you report a security incident?",
        options: [
          "Only if you're sure it's serious",
          "As soon as you suspect something is wrong",
          "After you fix it yourself",
          "Never, it's not your responsibility"
        ],
        answer: "As soon as you suspect something is wrong",
        explanation: "Early reporting allows security teams to respond quickly and minimize potential damage."
      },
      {
        question: "What information should you include in an incident report?",
        options: [
          "Just 'something happened'",
          "Time, date, description, screenshots, and what you observed",
          "Only your personal opinion",
          "Blame colleagues"
        ],
        answer: "Time, date, description, screenshots, and what you observed",
        explanation: "Detailed information helps security teams investigate and resolve incidents effectively."
      },
      {
        question: "What should you NOT do after a security incident?",
        options: [
          "Report to IT",
          "Document what happened",
          "Hide it or try to fix it alone",
          "Take screenshots"
        ],
        answer: "Hide it or try to fix it alone",
        explanation: "Don't hide incidents or attempt to fix them alone. This can make the situation worse."
      },
      {
        question: "What's the primary goal of incident reporting?",
        options: [
          "To blame someone",
          "To quickly contain and mitigate damage",
          "To create paperwork",
          "To avoid responsibility"
        ],
        answer: "To quickly contain and mitigate damage",
        explanation: "Quick reporting enables fast response to minimize damage and protect the organization."
      },
      {
        question: "What is a 'false positive' in incident reporting?",
        options: [
          "A real threat that was ignored",
          "A reported incident that turns out to be harmless",
          "A positive outcome from an incident",
          "An automated response"
        ],
        answer: "A reported incident that turns out to be harmless",
        explanation: "False positives are incidents that are reported but turn out to be harmless. It's still better to report and confirm."
      }
    ]
  }
];