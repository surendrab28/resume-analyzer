import { CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

const MatchResults = ({ results }) => {
  const { resumeSummary, matchPercentage, matchedSkills, missingSkills, suggestions } = results;
  
  // Determine color based on match percentage
  const getMatchColor = () => {
    if (matchPercentage >= 80) return 'text-green-500';
    if (matchPercentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Determine progress bar color
  const getProgressColor = () => {
    if (matchPercentage >= 80) return 'bg-green-500';
    if (matchPercentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Resume Analysis Results</h2>

      {/* Resume Summary */}
      {resumeSummary && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Resume Summary</h3>
          <p className="text-gray-700">{resumeSummary}</p>
        </div>
      )}
      
      {/* Match Percentage */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-blue-100 mb-4">
          <span className={`text-3xl font-bold ${getMatchColor()}`}>
            {matchPercentage}%
          </span>
        </div>
        <h3 className="text-xl font-semibold">Overall Match</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 max-w-md mx-auto">
          <div 
            className={`h-2.5 rounded-full ${getProgressColor()} transition-all duration-1000 ease-out`} 
            style={{ width: `${matchPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-blue-50 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-500" size={20} />
            <h3 className="text-lg font-semibold">Matched Skills</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, index) => (
              <span key={index} className="font-medium text-blue-700 bg-white px-3 py-1 rounded-full border border-blue-300">
                {skill}
              </span>
            ))}
          </div>

        </div>        
        {/* Missing Skills */}
        <div className="bg-blue-50 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-red-500" size={20} />
            <h3 className="text-lg font-semibold">Missing Skills</h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {missingSkills.map((skill, index) => (
              <span 
                key={index}  // ✅ Ensure React handles unique elements
                className="px-3 py-1 bg-white text-red-600 rounded-full text-sm border border-red-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Suggestions */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-yellow-500" size={20} />
          <h3 className="text-lg font-semibold">AI Suggestions</h3>
        </div>
        
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MatchResults;