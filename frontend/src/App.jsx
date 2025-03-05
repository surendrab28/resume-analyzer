import { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';
import ResumeUploader from './components/ResumeUploader';
import JobDescriptionInput from './components/JobDescriptionInput';
import MatchResults from './components/MatchResults';
import Header from './components/Header';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [jdWarning, setJdWarning] = useState(null);

  const analyzeResume = async () => {
    if (!resumeFile || !jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    setJdWarning(null);
    
    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("jobDescription", jobDescription);
    
    try {
      const { data } = await axios.post("http://localhost:8080/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (data.error) {
        setError("AI Analysis failed: " + data.error);
        setResults(null);
        return;
      }
      
      console.log(data);
      
      if (data.jdClarity !== "clear") {
        setJdWarning({ clarity: data.jdClarity, reason: data.reason });
      }

      setResults({
        matchPercentage: data.matchPercentage || 0,
        matchedSkills: data.matchedSkills || [],
        missingSkills: data.missingSkills || [],
        suggestions: data.suggestions || [],
        resumeSummary: data.resumeSummary || ''
      });
    } catch (err) {
      setError(err.response?.data || "Failed to analyze resume.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setResumeFile(null);
    setJobDescription('');
    setResults(null);
    setError(null);
    setJdWarning(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        <main className="mt-8">
          {!results ? (
            <div className="grid md:grid-cols-2 gap-6">
              <ResumeUploader resumeFile={resumeFile} setResumeFile={setResumeFile} />
              <JobDescriptionInput jobDescription={jobDescription} setJobDescription={setJobDescription} />
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  onClick={analyzeResume}
                  disabled={!resumeFile || !jobDescription.trim() || isAnalyzing}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 ${(!resumeFile || !jobDescription.trim() || isAnalyzing) ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl cursor-pointer'}`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Analyze Resume
                    </>
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
          ) : (
            <div className="animate-fadeIn">
              {jdWarning && (
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-4">
                  <strong>Warning:</strong> The job description is <strong>{jdWarning.clarity}</strong>. Reason: {jdWarning.reason}
                </div>
              )}
              <MatchResults results={results} />
              <div className="flex justify-center mt-8">
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 px-6 py-2 rounded-full text-blue-600 border border-blue-600 font-medium transition-all duration-300 hover:bg-blue-50 cursor-pointer"
                >
                  Analyze Another Resume
                </button>
              </div>
            </div>
          )}
        </main>
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 Resume Assistant.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
