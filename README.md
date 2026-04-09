# CyberAware — CSIS 4495 S002 (Winter 2026)

**Student / Team Lead:** Janvi Arora  
**Student ID:** 300383801  

---

## 📌 Project Overview

CyberAware is a web-based cybersecurity awareness and training platform designed to help users understand and defend against common online threats. The system combines structured learning, real-world scenarios, and interactive quizzes to improve user awareness and promote safe online behavior.

---

## 🎯 Objectives

- Improve cybersecurity awareness among users  
- Provide interactive and engaging learning  
- Simulate real-world cyber threats  
- Track user progress and performance  

---

## 🧱 Tech Stack

- **Frontend:** React + Vite  
- **Backend:** Supabase  
- **Database:** PostgreSQL  
- **Security:** Row-Level Security (RLS)  

---

## 🚀 Final Application Location
Implementation/frontend_app/


This is the **only final version of the project**.

---

## 🧩 Implemented Features

- User authentication (sign up, login, logout)  
- Protected routes and session handling  
- Six cybersecurity modules:
  - Phishing  
  - Password Security  
  - Multi-Factor Authentication (MFA)  
  - Social Engineering  
  - Safe Browsing  
  - Incident Reporting  
- Scenario-based learning  
- Quiz system with feedback  
- XP system, levels, and achievements  
- User profile and progress tracking  
- Sequential module unlocking  
- Secure per-user data access using RLS  

---

## ⚙️ How to Run the Project

### 1. Prerequisites
- Node.js (LTS)
- npm
- Supabase account

---

### 2. Clone the Repository
```bash
git clone https://github.com/janvia18/W26_4495_S002-JanviA.git
cd W26_4495_S002-JanviA/Implementation/frontend_app

### 3. Install Dependencies
npm install

---

### 4. Configure Environment Variables

Create a .env file inside:

Implementation/frontend_app/

Add:VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

###5. Database Setup

Run the SQL file:

Implementation/frontend_app/supabase/schema.sql

###6. Run the App
npm run dev

### 7. Build for Production
npm run build
npm run preview
📘 User Guide

Available in:

DocumentsAndReports/
📂 Submission Files

All required submission documents are located in:

ReportsAndDocuments/

Includes:

Final Report
Presentation Slides

