# AI Resume Assistant

## 📌 Overview
AI Resume Assistant is a web application that analyzes resumes and job descriptions using AI to provide valuable insights. It helps job seekers optimize their resumes by comparing skills, identifying missing skills, and suggesting improvements to increase job match potential.

## 🚀 Features
- **AI-Powered Resume Analysis**: Extracts key information from resumes.
- **Job Match Percentage**: Compares resume skills with job descriptions.
- **Matched & Missing Skills**: Highlights relevant and lacking skills.
- **AI-Generated Suggestions**: Provides recommendations for resume improvement.
- **User-Friendly Interface**: Built with React (Vite, Tailwind CSS) for a seamless experience.

## 🛠 Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Spring Boot
- **AI Integration**: Gemini AI API


## 📂 Project Structure
```
AI-Resume-Assistant/
│── backend/                # Spring Boot backend
│── frontend/               # React frontend
│── README.md               # Project documentation
│── .gitignore              # Git ignored files
```

## ⚙️ Installation & Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/surendrab28/ai-resume-assistant.git
cd ai-resume-assistant
```

### 2️⃣ Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
_Backend will run on `http://localhost:8080`._

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
_Frontend will run on `http://localhost:3000`._

## 🖥 Usage
1. Upload a resume file (PDF or DOCX).
2. Enter a job description.
3. Click "Analyze Resume" to get results.
4. Review the match percentage, skills comparison, and AI suggestions.

## 📌 API Endpoints
| Method | Endpoint       | Description                        |
|--------|--------------|------------------------------------|
| POST   | `/upload`    | Upload resume & job description   |