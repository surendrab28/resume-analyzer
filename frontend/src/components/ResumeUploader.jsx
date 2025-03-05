import { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

const ResumeUploader = ({ resumeFile, setResumeFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || 
          file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
      } else {
        alert('Please upload a PDF or Word document');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">Resume Upload</h2>
      </div>
      
      {!resumeFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-300 flex flex-col items-center justify-center min-h-[200px]
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={40} className={`mb-3 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className="text-gray-600 mb-2">Drag & drop your resume here</p>
          <p className="text-sm text-gray-500 mb-4">Supports PDF, DOC, DOCX</p>
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
            Browse Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800 truncate max-w-[180px]">
                  {resumeFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(resumeFile.size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>
            <button 
              onClick={handleRemoveFile}
              className="p-1.5 rounded-full hover:bg-blue-100 text-gray-500 hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;