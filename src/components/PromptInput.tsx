import React from 'react';

interface PromptInputProps {
  prompt: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onChange, onSubmit }) => {
  return (
    <div className="w-1/2">
      <h2 className="text-xl font-semibold mb-4 text-center">Enter your prompt</h2>
      <textarea
        className="border border-black w-full h-20 p-2 mb-4 rounded-lg shadow"
        value={prompt}
        onChange={onChange}
        placeholder="Enter your prompt here..."
      />
      <div className="flex justify-center mt-4">
        <button onClick={onSubmit} className="bg-green-500 text-white px-4 py-1 rounded ">
          Submit
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
