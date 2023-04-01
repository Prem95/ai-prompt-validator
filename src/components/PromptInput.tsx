import React from 'react';

interface PromptInputProps {
  prompt: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onChange, onSubmit }) => {
  return (
    <div className="w-1/2">
      <h2 className="text-xl font-semibold mb-4">Enter your prompt</h2>
      <textarea
        className="border border-black w-full h-48 p-2 mb-4 rounded-lg shadow"
        value={prompt}
        onChange={onChange}
        placeholder="Enter your prompt here..."
      />
      <div className="flex justify-center mt-4">
        <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default PromptInput;