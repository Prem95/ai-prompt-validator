import React from 'react';

interface ApiKeyInputProps {
  apiKey: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onChange }) => {
  return (
    <div className="api-key-input w-full flex justify-center mb-6">
      <div className="relative flex items-center max-w-xs">
        <input
          id="apiKey"
          type="text"
          value={apiKey}
          onChange={onChange}
          className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm"
          placeholder="Enter your OpenAI API key"
          required
        />
        <button type="submit" className="absolute inset-0 left-auto">
          <span className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300" aria-hidden="true"></span>
          <svg className="w-3 h-3 fill-current text-blue-600 mx-3 flex-shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ApiKeyInput;
