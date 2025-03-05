import { Bot } from 'lucide-react';

const Header = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Bot size={36} className="text-blue-600" />
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
          Resume Assistant
        </h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Upload your resume and paste a job description to get AI-powered insights on your match, 
        missing skills, and personalized suggestions to improve your chances.
      </p>
    </header>
  );
};

export default Header;