import React, { useState } from 'react';
import './App.css';
import PromptInput from './components/PromptInput';
import ApiKeyInput from './components/ApiKeyInput';
import OutputBox from './components/OutputBox';
import axios from 'axios';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [suggestion, setSuggestion] = useState('');

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const callOpenAIAPI = async (apiKey: string, prompt: string) => {
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    const data = {
      prompt: `I want you to act as a ChatGPT prompt validator and suggestor.
      I will send a prompt, you have to generate a better prompt based on the content of the prompt in point form. Give suggested prompts in point form.
      Do not use the same prompt twice.

      ${prompt}`,

      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.8
    };

    try {
      const response = await axios.post(apiUrl, data, { headers });
      return response.data.choices[0].text.trim();
    } catch (error) {
      return 'Error processing prompt. Please check your API key and try again.';
    }
  };


  const handleSubmit = async () => {
    const apiResponse = await callOpenAIAPI(apiKey, prompt);
    setSuggestion(apiResponse);
    setResponses([...responses, apiResponse]);
  };


  const handleDeleteResponse = (index: number) => {
    setResponses(responses.filter((_, i) => i !== index));
  };

  return (
    <div className="App min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center pb-12 md:pb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
            GPT Prompt <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Suggester</span>
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
              Enter your prompt and it will suggest a better prompt for you in an <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-400">instant</span>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <ApiKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
        </div>
        <div className="main-content flex justify-center">
          <div className="content flex-1 flex">
            <PromptInput prompt={prompt} onChange={handlePromptChange} onSubmit={handleSubmit} />
            <OutputBox suggestion={suggestion} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
