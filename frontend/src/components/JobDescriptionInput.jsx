import { Briefcase } from 'lucide-react';

const JobDescriptionInput = ({ jobDescription, setJobDescription }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">Job Description</h2>
      </div>
      
      <div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
        />
        
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>Paste the full job description for best results</span>
          <span>{jobDescription.length} characters</span>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput;