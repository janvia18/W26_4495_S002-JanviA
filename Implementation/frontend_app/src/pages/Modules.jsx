import React from 'react';
import { Link } from 'react-router-dom';
import { modulesData } from '../lib/modulesData';

export default function Modules() {
  return React.createElement("div", { className: "page-shell" },
    React.createElement("div", { className: "content-wrap" },
      React.createElement("div", { className: "main-card" },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "20px" } },
          React.createElement("h1", null, "Learning Modules"),
          React.createElement(Link, { to: "/dashboard", className: "ghost-btn" }, "← Dashboard")
        ),
        React.createElement("p", null, "Complete all modules to earn points and badges!"),
        modulesData.map((module) => 
          React.createElement("div", { key: module.key, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", margin: "15px 0", border: "1px solid #ddd", borderRadius: "12px", background: "white" } },
            React.createElement("div", null,
              React.createElement("h3", { style: { margin: "0 0 8px 0" } }, module.title),
              React.createElement("p", { style: { margin: "0 0 8px 0", color: "#666" } }, module.description),
              React.createElement("small", null, module.quiz.length + " questions • " + module.points + " points")
            ),
            React.createElement(Link, { to: module.route, className: "primary-btn", style: { padding: "10px 20px" } }, "Start Module →")
          )
        )
      )
    )
  );
}