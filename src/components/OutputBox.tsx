import React from 'react';
import { useRef } from 'react';

interface OutputBoxProps {
  suggestion: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ suggestion }) => {
  const suggestionRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Text copied to clipboard');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      },
    );
  };

  const suggestions = suggestion.split('\n');

  return (
    <div className="w-1/2">
      <h2 className="text-xl font-semibold mb-4 text-center">Suggested Prompts</h2>
      <div ref={suggestionRef} className="p-2">
        {suggestions.length > 0 && suggestions[0] !== '' ? (
          <ul className="list-disc pl-5">
            {suggestions.map((item, index) => (
              <li key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <span>{item}</span>
                  <button
                    onClick={() => copyToClipboard(item)}
                    className="bg-blue-500 text-white px-2 py-1 ml-2 rounded"
                  >
                    Copy
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No output yet</p>
        )}
      </div>
    </div>
  );
};

export default OutputBox;

