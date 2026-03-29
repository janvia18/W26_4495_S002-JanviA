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
      instructions: "Read the message below and decide whether it is safe or phishing.",
      emailTitle: "Account Verification Notice",
      heading: "Immediate action required: verify your account.",
      from: "Security Team <verify@secure-account-alerts.co>",
      subject: "Immediate action required: verify your account.",
      body: [
        "We detected suspicious activity on your account. To avoid suspension, you must verify your identity within 24 hours.",
        "Verify now: http://secure-check-login-now.net"
      ],
      options: ["Phishing", "Safe"],
      correctAnswer: "Phishing",
      correctText: "Correct ✅ This message shows phishing signs: a suspicious sender domain, urgent tone, and a mismatched or unsafe link.",
      incorrectText: "Incorrect. This is phishing: urgent deadlines and links to unknown domains are common red flags."
    },
    quiz: [
      { question: "1. What is phishing?", options: ["A computer virus", "A trick to steal your information", "A type of antivirus", "A password manager"], answer: "A trick to steal your information", explanation: "Phishing tricks you into giving away passwords." },
      { question: "2. What's a common phishing sign?", options: ["Professional language", "Urgent request to act NOW", "Known sender", "No links"], answer: "Urgent request to act NOW", explanation: "Phishers create urgency to make you act without thinking." },
      { question: "3. What should you do with suspicious emails?", options: ["Click links to check", "Reply asking questions", "Report to IT security", "Forward to friends"], answer: "Report to IT security", explanation: "Always report suspicious emails." },
      { question: "4. What do real companies NEVER ask for in email?", options: ["Your username", "Your department", "Your password", "Your email address"], answer: "Your password", explanation: "Legitimate companies never ask for passwords via email!" },
      { question: "5. Before clicking a link, what should you do?", options: ["Click quickly", "Hover to see actual URL", "Ignore it", "Forward it"], answer: "Hover to see actual URL", explanation: "Hover over links to see where they REALLY go." },
      { question: "6. A message asks you to “confirm” login on a page that looks like your bank but the URL is unrelated. What is it?", options: ["A routine update", "Likely phishing", "A speed test", "HTTPS so it is safe"], answer: "Likely phishing", explanation: "Look-alike pages with mismatched domains are a classic phishing trick." },
      { question: "7. Which attachment behavior is riskiest?", options: ["A known colleague’s expected invoice", "Unexpected .exe or macro-enabled file from unknown sender", "PDF from your IT portal", "Blank spreadsheet from finance"], answer: "Unexpected .exe or macro-enabled file from unknown sender", explanation: "Unexpected executables and macros are common malware delivery methods." },
      { question: "8. What helps protect others after you spot phishing?", options: ["Delete quietly only", "Report through official channels (e.g. IT / “Report phishing”)", "Reply to the sender", "Post the link publicly"], answer: "Report through official channels (e.g. IT / “Report phishing”)", explanation: "Reporting lets security teams block campaigns and warn others." },
      { question: "9. Spear phishing often uses what to seem legitimate?", options: ["Random gibberish only", "Generic “Dear user” only", "Personal or work details gathered about you", "No links"], answer: "Personal or work details gathered about you", explanation: "Targeted phishing uses researched details to earn false trust." }
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
      { question: "5. How often should you change passwords?", options: ["Every day", "Every week", "When suspected breach or annually", "Never"], answer: "When suspected breach or annually", explanation: "Change passwords if you suspect a breach or for annual security updates." },
      { question: "6. Writing passwords on a sticky note under your keyboard is:", options: ["Best practice", "Fine if short", "Risky—anyone nearby can read them", "Required by IT"], answer: "Risky—anyone nearby can read them", explanation: "Physical exposure is still a common way credentials get stolen." },
      { question: "7. A passphrase like “correct-horse-battery-staple” is strong mainly because it is:", options: ["All lowercase only", "Long and unpredictable", "Exactly eight characters", "Shared with friends"], answer: "Long and unpredictable", explanation: "Length and unpredictability beat short complex-looking passwords." },
      { question: "8. If a site you use announces a data breach, you should:", options: ["Ignore it if you rarely visit", "Change that site’s password and check reuse elsewhere", "Reuse the same password again", "Email strangers your new password"], answer: "Change that site’s password and check reuse elsewhere", explanation: "Assume leaked passwords are tried on other services." },
      { question: "9. Two-factor authentication (2FA) with your password means:", options: ["You can use a shorter password", "Attackers need another factor even if they steal the password", "You never need to log in again", "Passwords are optional"], answer: "Attackers need another factor even if they steal the password", explanation: "MFA adds a second proof that thieves usually do not have." }
    ]
  },
  {
    key: "mfa",
    title: "Multi-Factor Authentication",
    route: "/modules/mfa",
    points: 20,
    description: "Protect accounts with an extra verification step.",
    content: [
      "MFA requires two or more proofs of identity.",
      "A password alone is not enough when stolen.",
      "Authenticator apps are safer than SMS when possible.",
      "Approve login prompts only when you initiated sign-in.",
      "Enable MFA on email, banking, and work accounts first."
    ],
    scenario: {
      title: "Unexpected Login Prompt",
      instructions: "What should you do if a prompt appears unexpectedly?",
      heading: "Authenticator Notification",
      body: [
        "You receive a login approval request at 2:00 AM.",
        "You are not trying to sign in on any device."
      ],
      options: ["Approve to be safe", "Deny and change password"],
      correctAnswer: "Deny and change password",
      correctText: "✅ Correct! Deny unknown requests and secure your account immediately.",
      incorrectText: "❌ Incorrect. Approving unknown prompts can give attackers account access."
    },
    quiz: [
      { question: "1. What is MFA?", options: ["Multiple email accounts", "Two or more ways to verify identity", "A backup password", "A browser plugin"], answer: "Two or more ways to verify identity", explanation: "MFA combines factors like password + app code to verify identity." },
      { question: "2. Why is MFA important?", options: ["It makes passwords shorter", "It blocks all spam", "It reduces risk if passwords are stolen", "It replaces usernames"], answer: "It reduces risk if passwords are stolen", explanation: "Even if a password leaks, attackers still need the second factor." },
      { question: "3. Which method is generally strongest?", options: ["SMS codes only", "Authenticator app or security key", "Shared email inbox", "PIN written on paper"], answer: "Authenticator app or security key", explanation: "Authenticator apps and security keys are more resistant to interception." },
      { question: "4. What should you do with unexpected MFA prompts?", options: ["Approve quickly", "Ignore forever", "Deny and investigate", "Forward to friends"], answer: "Deny and investigate", explanation: "Unexpected prompts may mean someone has your password." },
      { question: "5. Where should you enable MFA first?", options: ["Games only", "Low-value accounts only", "Critical accounts like email and banking", "Nowhere"], answer: "Critical accounts like email and banking", explanation: "Start with accounts that can reset or control other accounts." },
      { question: "6. SIM-swapping mainly threatens which second factor?", options: ["Hardware security keys", "Authenticator apps with offline codes", "SMS or phone-call codes", "None of the above"], answer: "SMS or phone-call codes", explanation: "Attackers who take over your phone number can intercept SMS-based codes." },
      { question: "7. Backup codes for MFA should be stored:", options: ["In a public repo", "Safely offline or in a password manager", "In your email signature", "On a shared whiteboard"], answer: "Safely offline or in a password manager", explanation: "Treat backup codes like spare keys—private and protected." },
      { question: "8. “Push bombing” means attackers:", options: ["Send many approval prompts hoping you tap yes", "Improve your Wi-Fi", "Back up your photos", "Update your browser"], answer: "Send many approval prompts hoping you tap yes", explanation: "Fatigue or confusion can make people approve a fake login." },
      { question: "9. If you lose your MFA device, you should:", options: ["Share codes with a friend", "Use account recovery / backup codes and re-enroll MFA", "Disable MFA forever", "Post on social media"], answer: "Use account recovery / backup codes and re-enroll MFA", explanation: "Use official recovery paths to regain access securely." }
    ]
  },
  {
    key: "social",
    title: "Social Engineering",
    route: "/modules/social",
    points: 20,
    description: "Recognize manipulation tricks used by attackers.",
    content: [
      "Social engineering exploits trust, fear, and urgency.",
      "Attackers may impersonate managers, IT staff, or vendors.",
      "Always verify unusual requests through a second channel.",
      "Never share passwords, codes, or confidential files casually.",
      "When in doubt, pause and report suspicious behavior."
    ],
    scenario: {
      title: "Urgent CEO Request",
      instructions: "How should you respond?",
      heading: "Message from 'CEO'",
      body: [
        "You receive a chat asking for gift card codes immediately.",
        "The sender says they are in a meeting and cannot call."
      ],
      options: ["Send codes immediately", "Verify identity before action"],
      correctAnswer: "Verify identity before action",
      correctText: "✅ Correct! Always verify high-risk requests through trusted channels.",
      incorrectText: "❌ Incorrect. Urgent requests for money or codes are common social engineering signs."
    },
    quiz: [
      { question: "1. Social engineering mainly attacks what?", options: ["Firewalls", "Human behavior", "Operating systems", "Wi-Fi speed"], answer: "Human behavior", explanation: "Attackers manipulate people into making unsafe decisions." },
      { question: "2. A major warning sign is:", options: ["Clear process", "Urgent secrecy", "Official policy link", "Regular request timing"], answer: "Urgent secrecy", explanation: "Pressure and secrecy are classic manipulation techniques." },
      { question: "3. Best response to unusual financial requests?", options: ["Do it fast", "Verify using another channel", "Ask social media", "Ignore policy"], answer: "Verify using another channel", explanation: "Independent verification helps expose impersonation attempts." },
      { question: "4. Which data should never be shared casually?", options: ["Public job title", "Office location", "Passwords or MFA codes", "Team meeting time"], answer: "Passwords or MFA codes", explanation: "Credentials and codes should never be shared with anyone." },
      { question: "5. If unsure about a message, you should:", options: ["Click links first", "Pause and report", "Forward widely", "Delete evidence"], answer: "Pause and report", explanation: "Reporting helps security teams investigate and protect others." },
      { question: "6. Pretexting is when an attacker:", options: ["Patches your OS", "Builds a false story to extract information", "Encrypts your disk", "Speeds up your PC"], answer: "Builds a false story to extract information", explanation: "Pretexting uses invented scenarios to manipulate you into helping." },
      { question: "7. A caller claims to be IT and asks for your password. You should:", options: ["Give it to fix the issue faster", "Refuse and verify through official support", "Spell it slowly", "Email it instead"], answer: "Refuse and verify through official support", explanation: "Legitimate IT will not ask for your password over the phone." },
      { question: "8. Tailgating at a secure door means:", options: ["Following policy", "Letting a stranger slip in behind you without badging", "Using VPN", "Strong passwords"], answer: "Letting a stranger slip in behind you without badging", explanation: "Physical social engineering often exploits courtesy at entry points." },
      { question: "9. Why do attackers create false urgency?", options: ["To save you time", "To bypass careful thinking and verification", "Because it is polite", "To comply with law"], answer: "To bypass careful thinking and verification", explanation: "Urgency is meant to stop you from double-checking." }
    ]
  },
  {
    key: "safeBrowsing",
    title: "Safe Browsing",
    route: "/modules/safe-browsing",
    points: 20,
    description: "Browse websites safely and avoid web-based threats.",
    content: [
      "Check URLs carefully before entering credentials.",
      "Prefer HTTPS websites for encrypted connections.",
      "Avoid downloading files from unknown sources.",
      "Keep browser and extensions updated.",
      "Be cautious with pop-ups, fake updates, and redirect pages."
    ],
    scenario: {
      title: "Download Warning",
      instructions: "Choose the safest action.",
      heading: "Free Software Website",
      body: [
        "A pop-up says your video player is outdated and must be updated now.",
        "The page redirects repeatedly and asks for admin permission."
      ],
      options: ["Install from pop-up", "Close page and use official site"],
      correctAnswer: "Close page and use official site",
      correctText: "✅ Correct! Only download software from trusted official sources.",
      incorrectText: "❌ Incorrect. Pop-up installers from unknown sites can contain malware."
    },
    quiz: [
      { question: "1. What does HTTPS indicate?", options: ["Site is always legitimate", "Encrypted connection", "No ads", "Fast website"], answer: "Encrypted connection", explanation: "HTTPS protects data in transit, though you should still verify the site." },
      { question: "2. Before entering credentials, check:", options: ["Font style", "URL/domain carefully", "Background color", "Number of images"], answer: "URL/domain carefully", explanation: "Attackers use lookalike domains to trick users." },
      { question: "3. Safest place to download software:", options: ["Random pop-up links", "Official vendor website", "Unknown forum", "Email attachment"], answer: "Official vendor website", explanation: "Official sources reduce risk of tampered installers." },
      { question: "4. Browser updates are important because:", options: ["They remove bookmarks", "They patch security flaws", "They slow down attackers", "They add themes only"], answer: "They patch security flaws", explanation: "Updates often fix vulnerabilities exploited by attackers." },
      { question: "5. If a page looks suspicious, you should:", options: ["Proceed quickly", "Enter test password", "Close and report if needed", "Disable antivirus"], answer: "Close and report if needed", explanation: "Leaving suspicious pages reduces risk and reporting helps others." },
      { question: "6. A padlock icon in the browser mainly tells you:", options: ["The site is trustworthy", "Connection is encrypted—not that the owner is honest", "There are no ads", "The site is government-run"], answer: "Connection is encrypted—not that the owner is honest", explanation: "HTTPS protects the channel; criminals can still use HTTPS sites." },
      { question: "7. Typosquatting means:", options: ["Fixing grammar", "Registering look-alike domains to trick users", "HTTPS only", "Browser updates"], answer: "Registering look-alike domains to trick users", explanation: "Small spelling changes in URLs fool people in a hurry." },
      { question: "8. Before installing a browser extension, you should:", options: ["Install all trending ones", "Check reviews, permissions, and whether you need it", "Disable updates", "Share admin passwords"], answer: "Check reviews, permissions, and whether you need it", explanation: "Malicious extensions can read pages and steal data." },
      { question: "9. Public Wi-Fi without a VPN is riskiest for:", options: ["Reading static news with HTTPS", "Logging into sensitive accounts on untrusted networks", "Viewing offline maps", "Changing phone wallpaper"], answer: "Logging into sensitive accounts on untrusted networks", explanation: "Untrusted networks increase risk of interception or fake hotspots." }
    ]
  },
  {
    key: "incident",
    title: "Incident Reporting",
    route: "/modules/incident",
    points: 20,
    description: "Report security issues quickly and correctly.",
    content: [
      "Early reporting limits damage from security incidents.",
      "Report phishing, malware alerts, data leaks, and suspicious logins.",
      "Do not hide mistakes - quick action helps containment.",
      "Include clear details: time, device, message, and actions taken.",
      "Follow your organization's incident response process."
    ],
    scenario: {
      title: "Clicked a Suspicious Link",
      instructions: "What should you do next?",
      heading: "Potential Security Incident",
      body: [
        "You clicked a suspicious link and entered work credentials.",
        "A minute later, you realize the page looked fake."
      ],
      options: ["Stay silent and monitor", "Report immediately and reset credentials"],
      correctAnswer: "Report immediately and reset credentials",
      correctText: "✅ Correct! Fast reporting and password reset can reduce impact.",
      incorrectText: "❌ Incorrect. Delaying incident reporting increases risk and response time."
    },
    quiz: [
      { question: "1. Why is rapid incident reporting important?", options: ["Avoid paperwork", "Limit damage quickly", "Delay alerts", "Hide mistakes"], answer: "Limit damage quickly", explanation: "The faster teams respond, the better they can contain incidents." },
      { question: "2. Which event should be reported?", options: ["Only confirmed breaches", "Any suspicious security event", "Only hardware issues", "Nothing unless asked"], answer: "Any suspicious security event", explanation: "Potential incidents should be reviewed even if uncertain." },
      { question: "3. Good incident report includes:", options: ["No details", "Only your opinion", "Time, system, and what happened", "Personal guesses only"], answer: "Time, system, and what happened", explanation: "Clear facts help investigators act quickly and accurately." },
      { question: "4. If you made a mistake, you should:", options: ["Hide it", "Report immediately", "Delete evidence", "Wait a week"], answer: "Report immediately", explanation: "Prompt honesty helps contain risk and protect systems." },
      { question: "5. After credential exposure, first step is:", options: ["Ignore it", "Change password and notify security", "Post online", "Turn off monitor"], answer: "Change password and notify security", explanation: "Resetting credentials and alerting security reduces attacker opportunity." },
      { question: "6. Preserving logs and timestamps helps responders:", options: ["Slow things down", "Understand scope and contain the issue", "Assign blame publicly", "Delete evidence"], answer: "Understand scope and contain the issue", explanation: "Facts and timelines guide containment and recovery." },
      { question: "7. If you see ransomware on your screen, you should:", options: ["Pay immediately in secret", "Disconnect from network if safe, report, and follow IR guidance", "Run every unknown “decrypt” tool", "Ignore it"], answer: "Disconnect from network if safe, report, and follow IR guidance", explanation: "Follow organizational incident response—don’t make it worse alone." },
      { question: "8. After a suspected malware infection, reusing the same password on that device is:", options: ["Smart", "Risky until the device is cleaned and credentials rotated", "Required", "Optional forever"], answer: "Risky until the device is cleaned and credentials rotated", explanation: "Assume the device or keystrokes may be compromised until cleared." },
      { question: "9. Post-incident, lessons learned are meant to:", options: ["Punish individuals only", "Improve controls and training for everyone", "Hide failures", "Stop all reporting"], answer: "Improve controls and training for everyone", explanation: "Good IR uses incidents to harden people and systems." }
    ]
  }
];

export default modulesData;