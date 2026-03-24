import phishingImage from "../assets/phishing-comic.webp";
import passwordsImage from "../assets/passwords-comic.webp";
import mfaImage from "../assets/mfa-comic.webp";
import socialImage from "../assets/social-engineering-comic.webp";
import safeBrowsingImage from "../assets/safe-browsing-comic.webp";
import incidentImage from "../assets/incident-reporting-comic.webp";

export const modulesData = [
  {
    key: "phishing",
    title: "Phishing Awareness",
    route: "/modules/phishing",
    points: 20,
    image: phishingImage,
    description:
      "Learn how to identify fake emails, suspicious links, and urgency tactics used to steal personal information.",
    content: [
      "Phishing is a cyberattack where attackers pretend to be trusted organizations or people.",
      "Attackers often use urgency, fear, or rewards to pressure users into acting quickly.",
      "Suspicious links, unknown sender addresses, and generic greetings are major warning signs.",
      "Never enter passwords or personal details on pages reached through unexpected emails or messages.",
      "Hovering over links helps reveal the real destination before clicking.",
      "Unexpected attachments can contain malware or redirect users to fake login pages."
    ],
    scenario: {
      title: "Part 2: Spot the Phish",
      instructions:
        "Read the message below and decide whether it is safe or phishing.",
      heading: "Email: Account Verification Notice",
      from: "Security Team <verify@secure-account-alerts.co>",
      subject: "Immediate action required: verify your account",
      body: [
        "Dear User,",
        "Your account has been flagged for suspicious activity.",
        "To avoid account suspension, verify your information immediately using the link below.",
        "http://secure-check-login-now.net",
        "Regards,",
        "Support Team"
      ],
      options: ["Phishing", "Safe"],
      correctAnswer: "Phishing",
      correctText:
        "Correct. The sender address is suspicious, the tone is urgent, and the link does not match a trusted official domain.",
      incorrectText:
        "Incorrect. This message contains common phishing signs such as urgency, a suspicious sender, and an unsafe-looking link."
    },
    extraScenario: {
      title: "Part 2.1: Real-World Situation",
      instructions: "Choose the safest response in this workplace scenario.",
      heading: "Calendar Invite Attack",
      body: [
        "An employer notices a strange event automatically added to the calendar.",
        "At first, it looks like a glitch or random meeting request.",
        "The event includes a link that says 'unsubscribe' or 'remove this event'.",
        "After clicking it, a login page opens asking for account details."
      ],
      options: ["Safe to continue", "Suspicious - avoid the link"],
      correctAnswer: "Suspicious - avoid the link",
      correctText:
        "Correct. Attackers can abuse calendar invitations and fake unsubscribe links to steal login details.",
      incorrectText:
        "Incorrect. Unexpected calendar links should be treated carefully because they may be part of a phishing campaign."
    },
    realWorld: {
      title: "Part 4: Real-Life Threat Story",
      story: [
        "An employer noticed an unfamiliar calendar event and assumed it was only a glitch.",
        "The event contained a link to unsubscribe or remove future events.",
        "After opening the link, a page appeared asking for login credentials.",
        "The website looked real, but it was fake and designed to steal account details.",
        "This is an example of calendar phishing, where attackers use calendar tools instead of normal email messages."
      ],
      takeaway:
        "Unexpected calendar events, unsubscribe links, and login prompts should always be verified before interaction."
    },
    quiz: [
      {
        question: "Which sign most strongly suggests a phishing email?",
        options: [
          "An urgent request to click a link and verify your account",
          "A normal message from your instructor",
          "A calendar reminder you created",
          "A saved bookmark opening your bank website"
        ],
        answer: "An urgent request to click a link and verify your account",
        explanation:
          "Phishing emails commonly create pressure and push users to click links without thinking carefully."
      },
      {
        question: "What should you do before clicking a link in an unexpected email?",
        options: [
          "Hover over the link and verify the sender/domain",
          "Click quickly before it expires",
          "Reply with your password",
          "Forward it to everyone"
        ],
        answer: "Hover over the link and verify the sender/domain",
        explanation:
          "Checking the destination link and sender identity helps you spot fake or misleading messages."
      },
      {
        question: "Why do attackers often use urgent language in phishing messages?",
        options: [
          "To pressure people into acting quickly",
          "To improve grammar",
          "To make the email shorter",
          "To help IT support"
        ],
        answer: "To pressure people into acting quickly",
        explanation:
          "Urgency reduces the chance that the target will pause and inspect the message carefully."
      },
      {
        question: "Which greeting is more suspicious in a phishing email?",
        options: [
          "Dear Customer",
          "Hi Janvi, regarding your class schedule",
          "Hello Professor",
          "Thank you for your recent order from a store you used"
        ],
        answer: "Dear Customer",
        explanation:
          "Generic greetings are common in phishing campaigns because attackers often do not know the recipient personally."
      },
      {
        question: "What is the safest response to a suspicious message asking for credentials?",
        options: [
          "Delete or report it without entering information",
          "Send your password to confirm identity",
          "Click the link to check first",
          "Reply with banking details"
        ],
        answer: "Delete or report it without entering information",
        explanation:
          "You should not interact with suspicious requests for credentials. Reporting it is the safest step."
      }
    ]
  },

  {
    key: "passwords",
    title: "Password Security",
    route: "/modules/passwords",
    points: 20,
    image: passwordsImage,
    description:
      "Understand how strong, unique passwords and password managers protect your accounts.",
    content: [
      "Strong passwords should be long, unique, and difficult to guess.",
      "Password reuse is dangerous because one breach can affect multiple accounts.",
      "Passphrases are often easier to remember and stronger than short predictable passwords.",
      "Password managers help users store and generate secure passwords safely.",
      "Weak passwords are easier for attackers to crack using guessing or automated tools.",
      "Private passwords should never be shared casually with friends or co-workers."
    ],
    scenario: {
      title: "Part 2: Password Safety Decision",
      instructions:
        "Choose which employee is following better password practices.",
      heading: "Office Account Security",
      body: [
        "Employee A uses Password123 for several accounts because it is easy to remember.",
        "Employee B uses a password manager and stores a different strong password for each account."
      ],
      options: ["Employee A", "Employee B"],
      correctAnswer: "Employee B",
      correctText:
        "Correct. Using unique passwords with a password manager is much safer than reusing weak passwords.",
      incorrectText:
        "Incorrect. Reusing weak passwords increases the risk of multiple accounts being compromised."
    },
    extraScenario: {
      title: "Part 2.1: Real-World Situation",
      instructions: "Decide the safer password choice in this case.",
      heading: "Shared Team Access",
      body: [
        "A team member writes the shared password on a sticky note near the monitor.",
        "Another employee suggests storing the credentials in a secure password manager instead."
      ],
      options: ["Sticky note is fine", "Use a password manager"],
      correctAnswer: "Use a password manager",
      correctText:
        "Correct. Password managers are safer than visible written notes that anyone can access.",
      incorrectText:
        "Incorrect. Sticky notes expose credentials to anyone nearby and increase the risk of misuse."
    },
    realWorld: {
      title: "Part 4: Real-Life Threat Story",
      story: [
        "A user reused the same simple password on multiple websites.",
        "One of those sites experienced a data breach.",
        "Attackers tested the same password on email and banking services.",
        "Because the password had been reused, more than one account became vulnerable.",
        "This is why unique passwords are important for every account."
      ],
      takeaway:
        "One weak reused password can open several doors for an attacker."
    },
    quiz: [
      {
        question: "Which password is strongest?",
        options: [
          "password123",
          "Janvi2026",
          "BlueRiverCoffeeTrain!",
          "12345678"
        ],
        answer: "BlueRiverCoffeeTrain!",
        explanation:
          "Longer passwords or passphrases with variation are much harder to guess or crack."
      },
      {
        question: "What is the safest way to manage many strong passwords?",
        options: [
          "Use a password manager",
          "Reuse one easy password",
          "Write them on sticky notes",
          "Share them with a friend"
        ],
        answer: "Use a password manager",
        explanation:
          "Password managers help generate unique passwords and reduce the temptation to reuse weak ones."
      },
      {
        question: "Why is password reuse risky?",
        options: [
          "One leaked password can affect multiple accounts",
          "It makes typing slower",
          "It improves security too much",
          "It blocks websites from loading"
        ],
        answer: "One leaked password can affect multiple accounts",
        explanation:
          "If one reused password is exposed in a breach, attackers may try it on other services."
      },
      {
        question: "Which is the best example of a strong passphrase?",
        options: [
          "SunsetTrainCoffeeRiver92",
          "abcd1234",
          "password",
          "qwerty"
        ],
        answer: "SunsetTrainCoffeeRiver92",
        explanation:
          "A longer passphrase with unrelated words and variation is much stronger than common passwords."
      },
      {
        question: "Where should you store important passwords?",
        options: [
          "In a trusted password manager",
          "On a sticky note under your keyboard",
          "In a public group chat",
          "Shared with classmates"
        ],
        answer: "In a trusted password manager",
        explanation:
          "A password manager is the safest practical tool for storing many unique passwords."
      }
    ]
  },

  {
    key: "mfa",
    title: "Multi-Factor Authentication",
    route: "/modules/mfa",
    points: 20,
    image: mfaImage,
    description:
      "Learn how MFA adds an extra layer of security even when passwords are compromised.",
    content: [
      "Multi-factor authentication requires more than one proof of identity.",
      "MFA can protect accounts even if a password is stolen.",
      "Unexpected approval prompts may signal unauthorized login attempts.",
      "Authenticator apps are often safer than relying only on SMS codes.",
      "MFA does not replace good passwords, it strengthens them.",
      "Users should never approve an authentication request they did not initiate."
    ],
    scenario: {
      title: "Part 2: MFA Prompt Check",
      instructions:
        "Decide what to do when you receive a login prompt you did not request.",
      heading: "Unexpected sign-in alert",
      body: [
        "You receive an authentication approval request on your phone, but you are not trying to log in."
      ],
      options: ["Approve", "Deny"],
      correctAnswer: "Deny",
      correctText:
        "Correct. Unexpected MFA prompts should always be denied because they may be part of an unauthorized login attempt.",
      incorrectText:
        "Incorrect. Approving a login you did not initiate could give an attacker access to your account."
    },
    extraScenario: {
      title: "Part 2.1: Real-World Situation",
      instructions: "Choose the safest action.",
      heading: "Repeated Approval Requests",
      body: [
        "A user keeps receiving repeated MFA approval pop-ups late at night.",
        "They feel annoyed and consider pressing approve just to stop the notifications."
      ],
      options: ["Approve to stop them", "Deny and change password"],
      correctAnswer: "Deny and change password",
      correctText:
        "Correct. Repeated prompts may indicate that an attacker already knows the password and is trying to get approval.",
      incorrectText:
        "Incorrect. Approving an unknown request may allow an attacker to enter the account."
    },
    realWorld: {
      title: "Part 4: Real-Life Threat Story",
      story: [
        "An attacker obtained a user's password from a previous data breach.",
        "They attempted to sign in repeatedly, causing constant MFA prompts on the victim's phone.",
        "The victim became frustrated and finally approved one request to stop the notifications.",
        "That single approval allowed the attacker into the account.",
        "This attack method is sometimes called MFA fatigue."
      ],
      takeaway:
        "Unexpected MFA prompts should be denied, and the account password should be changed immediately."
    },
    quiz: [
      {
        question: "Why is MFA effective?",
        options: [
          "It adds another verification step",
          "It removes all cyber risks",
          "It replaces passwords completely",
          "It makes websites load faster"
        ],
        answer: "It adds another verification step",
        explanation:
          "MFA strengthens security by requiring something more than just a password."
      },
      {
        question: "What should you do with an unexpected MFA prompt?",
        options: [
          "Deny or ignore it and review account activity",
          "Approve it to stop notifications",
          "Send the code to someone else",
          "Disable MFA permanently"
        ],
        answer: "Deny or ignore it and review account activity",
        explanation:
          "Unexpected prompts can indicate an attacker is trying to log in using your credentials."
      },
      {
        question: "What does MFA stand for?",
        options: [
          "Multi-Factor Authentication",
          "Maximum Firewall Access",
          "Main File Authorization",
          "Managed Frequency Access"
        ],
        answer: "Multi-Factor Authentication",
        explanation:
          "MFA means users must prove identity using more than one factor."
      },
      {
        question: "Which option is usually safer than SMS for MFA?",
        options: [
          "Authenticator app",
          "No verification",
          "Writing the code on paper only",
          "Sharing the code with others"
        ],
        answer: "Authenticator app",
        explanation:
          "Authenticator apps are generally safer because they are less vulnerable to some SMS-based attacks."
      },
      {
        question: "What is the biggest benefit of MFA?",
        options: [
          "It protects accounts even if a password is stolen",
          "It guarantees no malware can exist",
          "It speeds up the internet",
          "It removes the need for updates"
        ],
        answer: "It protects accounts even if a password is stolen",
        explanation:
          "MFA reduces the damage a stolen password can cause by requiring a second proof of identity."
      }
    ]
  },

  {
    key: "social",
    title: "Social Engineering",
    route: "/modules/social",
    points: 20,
    image: socialImage,
    description:
      "Recognize manipulation tactics attackers use to gain trust and extract sensitive information.",
    content: [
      "Social engineering attacks target human decisions rather than only technical systems.",
      "Attackers may pretend to be support staff, co-workers, banks, or delivery services.",
      "Urgency, fear, trust, and curiosity are common manipulation tactics.",
      "Unexpected requests for confidential information should always be verified.",
      "Attackers often use believable stories to lower suspicion.",
      "Verification through official channels is one of the best defenses."
    ],
    scenario: {
      title: "Part 2: Verify Before Trusting",
      instructions:
        "Decide whether the request below should be trusted immediately.",
      heading: "Unexpected help desk call",
      body: [
        "A caller says they are from IT support and urgently need your login details to fix a system issue before your account is locked."
      ],
      options: ["Share details", "Verify identity first"],
      correctAnswer: "Verify identity first",
      correctText:
        "Correct. Identity should always be verified before sharing sensitive information.",
      incorrectText:
        "Incorrect. Attackers often impersonate support teams and use urgency to pressure users."
    },
    extraScenario: {
      title: "Part 2.1: Real-World Situation",
      instructions: "Choose the safest response.",
      heading: "Delivery Message",
      body: [
        "A message claims your package cannot be delivered until you confirm personal details.",
        "It includes a link and says the issue must be fixed within one hour."
      ],
      options: ["Click and confirm", "Verify through the official company site"],
      correctAnswer: "Verify through the official company site",
      correctText:
        "Correct. Social engineering often uses trusted brands and urgency to push users into unsafe actions.",
      incorrectText:
        "Incorrect. Clicking a rushed verification link from an unexpected message can expose personal information."
    },
    realWorld: {
      title: "Part 4: Real-Life Threat Story",
      story: [
        "An attacker called an employee pretending to be from internal IT support.",
        "They sounded professional and said the company network had an urgent issue.",
        "The employee was asked to share login information for verification.",
        "Because the request felt urgent and official, the employee almost complied.",
        "This is a classic social engineering technique using impersonation and pressure."
      ],
      takeaway:
        "Even when a request sounds professional, verify identity through a trusted channel before sharing anything sensitive."
    },
    quiz: [
      {
        question: "What is a key sign of social engineering?",
        options: [
          "Someone pressures you to act quickly without verification",
          "A bookmarked trusted website",
          "A scheduled class announcement",
          "A browser autofill suggestion"
        ],
        answer: "Someone pressures you to act quickly without verification",
        explanation:
          "Manipulation and pressure are major warning signs in social engineering attacks."
      },
      {
        question: "What should you do if someone requests confidential information unexpectedly?",
        options: [
          "Verify their identity through a trusted channel",
          "Provide it immediately",
          "Ignore all security rules",
          "Post it in a group chat"
        ],
        answer: "Verify their identity through a trusted channel",
        explanation:
          "Verification through an official or known channel reduces the risk of impersonation attacks."
      },
      {
        question: "Social engineering mainly targets what?",
        options: [
          "Human behavior",
          "Only firewalls",
          "Only website colors",
          "Printer speed"
        ],
        answer: "Human behavior",
        explanation:
          "Social engineering works by manipulating people, not just technology."
      },
      {
        question: "Which tactic is commonly used by social engineers?",
        options: [
          "Pretending to be someone trustworthy",
          "Fixing your password safely",
          "Upgrading your antivirus for free",
          "Teaching coding classes"
        ],
        answer: "Pretending to be someone trustworthy",
        explanation:
          "Impersonation helps attackers gain trust and convince victims to share information."
      },
      {
        question: "Why should you avoid sharing sensitive details over an unexpected call?",
        options: [
          "The caller may be impersonating someone",
          "Phones cannot carry sound",
          "It automatically deletes accounts",
          "It always causes malware instantly"
        ],
        answer: "The caller may be impersonating someone",
        explanation:
          "Unexpected callers can pretend to be staff, banks, or support teams to steal information."
      }
    ]
  },

  {
    key: "safe-browsing",
    title: "Safe Browsing",
    route: "/modules/safe-browsing",
    points: 20,
    image: safeBrowsingImage,
    description:
      "Practice safer internet use by identifying risky websites, downloads, and browser behavior.",
    content: [
      "Safe browsing means avoiding suspicious websites, downloads, and pop-ups.",
      "HTTPS is a good sign, but it does not guarantee that a site is trustworthy.",
      "Random download links and cracked software websites often carry malware risks.",
      "Browser and extension updates help fix known security weaknesses.",
      "Unexpected redirects and aggressive alerts can be warning signs of malicious pages.",
      "Users should prefer official websites and trusted sources for downloads."
    ],
    scenario: {
      title: "Part 2: Website Safety Check",
      instructions: "Decide whether the browsing action below is safe.",
      heading: "Free software download page",
      body: [
        "You land on a website full of pop-ups offering a free cracked version of premium software.",
        "The page asks you to disable your antivirus before downloading."
      ],
      options: ["Safe", "Unsafe"],
      correctAnswer: "Unsafe",
      correctText:
        "Correct. Suspicious downloads, pop-ups, and requests to disable antivirus are major red flags.",
      incorrectText:
        "Incorrect. A website that pushes cracked software and asks you to disable security tools is unsafe."
    },
    extraScenario: {
      title: "Part 2.1: Real-World Situation",
      instructions: "Pick the safest browsing choice.",
      heading: "Browser Security Warning",
      body: [
        "A browser shows a warning that a website may be deceptive.",
        "The user is tempted to continue anyway because the page promises a free prize."
      ],
      options: ["Ignore the warning", "Leave the site immediately"],
      correctAnswer: "Leave the site immediately",
      correctText:
        "Correct. Browser warnings exist to protect users from deceptive or unsafe pages.",
      incorrectText:
        "Incorrect. Ignoring browser warnings can lead to scams, malware, or stolen information."
    },
    realWorld: {
      title: "Part 4: Real-Life Threat Story",
      story: [
        "A user searched for free software and clicked a top result that looked convincing.",
        "The page showed urgent pop-ups and fake scan alerts saying the device was infected.",
        "The site encouraged the user to download a cleanup tool immediately.",
        "That download was actually malicious software.",
        "This is a common safe-browsing failure involving fake alerts and unsafe downloads."
      ],
      takeaway:
        "Do not trust pop-up warnings or downloads from suspicious pages. Use official sources only."
    },
    quiz: [
      {
        question: "Which website is safer to trust?",
        options: [
          "A site with HTTPS and a legitimate domain",
          "A site with many pop-ups and redirects",
          "A page asking you to disable antivirus",
          "A random download mirror"
        ],
        answer: "A site with HTTPS and a legitimate domain",
        explanation:
          "HTTPS and a trusted domain are positive signs, though users should still stay cautious."
      },
      {
        question: "What should you do before downloading software?",
        options: [
          "Check the source is official and trustworthy",
          "Disable antivirus immediately",
          "Ignore file warnings",
          "Download from random ad links"
        ],
        answer: "Check the source is official and trustworthy",
        explanation:
          "Downloading only from official or trusted sources reduces the risk of malware infection."
      },
      {
        question: "Why are repeated pop-ups on a website suspicious?",
        options: [
          "They can be used to trick users into clicking unsafe content",
          "They always improve security",
          "They make websites load faster",
          "They confirm the site is official"
        ],
        answer: "They can be used to trick users into clicking unsafe content",
        explanation:
          "Aggressive pop-ups are often used to mislead users into unsafe downloads or scams."
      },
      {
        question: "What does HTTPS usually indicate?",
        options: [
          "The connection is encrypted",
          "The website is fake",
          "The browser is broken",
          "The page is offline"
        ],
        answer: "The connection is encrypted",
        explanation:
          "HTTPS means the connection is protected, though users should still verify the website itself."
      },
      {
        question: "Which browsing habit is safest?",
        options: [
          "Keeping browsers and extensions updated",
          "Ignoring updates forever",
          "Downloading every free tool you see",
          "Turning off all warnings"
        ],
        answer: "Keeping browsers and extensions updated",
        explanation:
          "Updates often patch security flaws and reduce exposure to known threats."
      }
    ]
  },

  {
    key: "incident",
    title: "Incident Reporting",
    route: "/modules/incident",
    points: 20,
    image: incidentImage,
    description:
      "Learn why early reporting matters when something suspicious happens online.",
    content: [
      "A security incident can include malware alerts, suspicious emails, unauthorized access, or device loss.",
      "Quick reporting helps reduce damage and supports faster response.",
      "People should not hide incidents because of fear or embarrassment.",
      "Good incident reporting includes what happened, when it happened, and what actions were taken.",
      "Delays in reporting can allow threats to spread further.",
      "Even uncertain situations should be reported if they appear suspicious."
    ],
    scenario: {
      title: "Part 2: Report or Ignore?",
      instructions: "Decide what the safest action is in this situation.",
      heading: "Suspicious attachment opened",
      body: [
        "An employee opens an attachment from an unknown sender and notices unusual system behavior afterward."
      ],
      options: ["Ignore it", "Report it immediately"],
      correctAnswer: "Report it immediately",
      correctText:
        "Correct. Prompt reporting helps contain the issue and reduces the chance of greater damage.",
      incorrectText:
        "Incorrect. Ignoring a possible incident can allow malware or unauthorized access to spread."
    },
    extraScenario: {
      title: "Part 2.1: Real-World Situation",
      instructions: "Choose the best next step.",
      heading: "Accidental Click",
      body: [
        "A worker clicks a suspicious link by mistake.",
        "Nothing obvious happens immediately, so they think maybe it is fine.",
        "They feel embarrassed and consider staying silent."
      ],
      options: ["Stay silent", "Report the incident immediately"],
      correctAnswer: "Report the incident immediately",
      correctText:
        "Correct. Reporting early is important even when the impact is not immediately visible.",
      incorrectText:
        "Incorrect. Many threats do not show instant visible damage, so silence can make the situation worse."
    },
    realWorld: {
      title: "Part 4: Real-Life Threat Story",
      story: [
        "An employee clicked a malicious link and noticed unusual behavior on the device.",
        "They hesitated to report it because they felt embarrassed.",
        "By the time the issue was reported, suspicious activity had spread further.",
        "Security teams had to spend more time containing the damage than they would have with earlier notice.",
        "This shows why prompt reporting is a critical part of cybersecurity."
      ],
      takeaway:
        "Reporting quickly is more important than hiding a mistake. Early action reduces damage."
    },
    quiz: [
      {
        question: "Why is incident reporting important?",
        options: [
          "It helps contain security risks quickly",
          "It guarantees nothing bad happened",
          "It removes the need for passwords",
          "It hides mistakes automatically"
        ],
        answer: "It helps contain security risks quickly",
        explanation:
          "Early reporting gives the organization a chance to respond before the damage grows."
      },
      {
        question: "What should a good incident report include?",
        options: [
          "What happened, when it happened, and relevant details",
          "Only emotions and guesses",
          "Nothing unless damage is confirmed",
          "Just the file name"
        ],
        answer: "What happened, when it happened, and relevant details",
        explanation:
          "Clear details help support teams investigate and respond effectively."
      },
      {
        question: "What is an example of a security incident?",
        options: [
          "A suspicious email attachment causing unusual behavior",
          "A normal school announcement",
          "A friend sending a meme",
          "Typing a correct password"
        ],
        answer: "A suspicious email attachment causing unusual behavior",
        explanation:
          "Unexpected behavior after interacting with suspicious content is a strong sign of an incident."
      },
      {
        question: "Why should users report incidents quickly?",
        options: [
          "To reduce damage and support fast response",
          "To make the issue look worse",
          "To avoid using the internet forever",
          "To automatically erase all files"
        ],
        answer: "To reduce damage and support fast response",
        explanation:
          "Fast reporting improves the chance of containing threats before they spread."
      },
      {
        question: "What should you avoid after noticing a possible incident?",
        options: [
          "Ignoring it out of embarrassment",
          "Reporting what happened",
          "Giving clear details",
          "Following proper response steps"
        ],
        answer: "Ignoring it out of embarrassment",
        explanation:
          "Hiding a problem delays the response and may allow the impact to become much worse."
      }
    ]
  }
];