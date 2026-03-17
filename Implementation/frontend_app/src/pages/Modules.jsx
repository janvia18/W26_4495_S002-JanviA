import React from "react";
import { useNavigate } from "react-router-dom";

function Modules() {
  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      title: "Phishing Awareness 📧",
      description: "Learn how to spot fake emails, suspicious links, and scam messages.",
      route: "/modules/phishing",
    },
    {
      id: 2,
      title: "Password Security 🔐",
      description: "Understand strong passwords, passphrases, and password safety habits.",
      route: "/modules/passwords",
    },
    {
      id: 3,
      title: "Multi-Factor Authentication 🛡️",
      description: "See how MFA adds an extra layer of protection to your accounts.",
      route: "/modules/mfa",
    },
    {
      id: 4,
      title: "Social Engineering 🕵️",
      description: "Learn how attackers manipulate people using trust, fear, and urgency.",
      route: "/modules/social",
    },
    {
      id: 5,
      title: "Incident Response 🚨",
      description: "Know what to do when you suspect a cyber incident or data breach.",
      route: "/modules/incident",
    },
  ];

  return (
    <div className="page-container">
      <h1>Training Modules</h1>
      <p>
        Choose a module to start building your cybersecurity awareness skills.
      </p>

      <div className="modules-grid">
        {modules.map((module) => (
          <div
            key={module.id}
            className="module-card"
            onClick={() => navigate(module.route)}
          >
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modules;