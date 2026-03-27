import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "20px", color: "#6c63ff", textDecoration: "none" }}>← Back Home</Link>
      <h1>About CyberAware</h1>
      <p>CyberAware is a cybersecurity awareness learning app built to help users understand practical digital safety in a simple, engaging, and professional way.</p>

      <h2>What You'll Learn</h2>
      <ul>
        <li><strong>Phishing Awareness</strong> - Spot fake emails and suspicious links</li>
        <li><strong>Password Security</strong> - Create and manage strong passwords</li>
        <li><strong>Multi-Factor Authentication</strong> - Add extra security layers</li>
        <li><strong>Social Engineering</strong> - Recognize manipulation tactics</li>
        <li><strong>Safe Browsing</strong> - Browse the web securely</li>
        <li><strong>Incident Reporting</strong> - Know when and how to report issues</li>
      </ul>

      <h2>Features</h2>
      <ul>
        <li>6 interactive modules with 5 questions each</li>
        <li>Real-world scenarios with detailed feedback</li>
        <li>Points system and level progression</li>
        <li>Achievement badges for milestones</li>
        <li>Progress tracking dashboard</li>
      </ul>
    </div>
  );
}