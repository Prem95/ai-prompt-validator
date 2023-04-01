import React from 'react';

interface OutputBoxProps {
  suggestion: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ suggestion }) => {
  return (
    <div className="w-1/2">
      <h2 className="text-xl font-semibold mb-4">Suggested Prompt</h2>
      <div className="border border-black w-full h-48 p-2 mb-4 rounded-lg shadow">
        {suggestion ? (
          <pre className="whitespace-pre-wrap">{suggestion}</pre>
        ) : (
          <p className="text-gray-400">No output yet</p>
        )}
      </div>
    </div>
  );
};

export default OutputBox;
