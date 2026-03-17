import React from "react";

function About() {
  return (
    <div className="page-container">
      <h1>About CyberAware</h1>

      <p>
        CyberAware is a cybersecurity awareness training platform designed to
        help users recognize and prevent common online threats. The platform
        provides short training modules and interactive quizzes to improve
        security knowledge in an engaging and accessible way.
      </p>

      <div className="card">
        <h2>Project Goal</h2>
        <p>
          The goal of CyberAware is to educate users about common cybersecurity
          risks such as phishing, weak passwords, social engineering, and
          unsafe browsing practices. By completing the modules, users build
          practical skills that help them stay safe online.
        </p>
      </div>

      <div className="card">
        <h2>Key Features</h2>
        <ul>
          <li>Interactive cybersecurity training modules</li>
          <li>Quiz-based learning</li>
          <li>Progress tracking dashboard</li>
          <li>Achievement and badge system</li>
          <li>Gamified learning experience</li>
        </ul>
      </div>

      <div className="card">
        <h2>Technology Used</h2>
        <ul>
          <li>Frontend: React</li>
          <li>Routing: React Router</li>
          <li>State Management: React Context</li>
          <li>Styling: CSS</li>
        </ul>
      </div>
    </div>
  );
}

export default About;