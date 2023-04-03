// App.tsx

import React, { useState } from 'react';
import './App.css';
import ApiKeyInput from './components/ApiKeyInput';
import PromptInput from './components/PromptInput';
import OutputBox from './components/OutputBox';
import axios from 'axios';
import { initGA, trackPageView } from './GoogleAnalytics';
import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

initGA('G-H5HZ0XPVSZ');

const PageViewTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

function App() {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    trackPageView(window.location.pathname + window.location.search);
  }, []);




  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handlePromptChangeMidjourney = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const callOpenAIAPIFor_Prompt_Suggestor = async (apiKey: string, prompt: string) => {
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    const data = {
      prompt: `I want you to act as a ChatGPT prompt generator, I will send a topic, you have to generate a ChatGPT prompt based on the content of the topic,
      the prompt should start with "I want you to act as,
      and guess what I might do, and expand the prompt accordingly.
      Give suggested prompts in point form. Do not use the same prompt twice. Remove the words 'Suggested Prompts' and 'Do not use the same prompt twice.' Only return 5 bullet points.

      ${prompt}`,

      max_tokens: 100,
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

  const callOpenAIAPIFor_Midjourney_Prompt_Suggestor = async (apiKey: string, prompt: string) => {
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    const data = {
      prompt: `I want you to act as a prompt generator for Midjourney's artificial intelligence program.
      Your job is to provide detailed and creative descriptions that will inspire unique and interesting images from the AI.
      Keep in mind that the AI is capable of understanding a wide range of language and can interpret abstract concepts,
      so feel free to be as imaginative and descriptive as possible. For example, you could describe a scene from a futuristic city,
      or a surreal landscape filled with strange creatures. The more detailed and imaginative your description,
      the more interesting the resulting image will be. Remove the words 'Suggested Prompts' and 'Do not use the same prompt twice.'

      ${prompt}`,

      max_tokens: 100,
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

  const handleSubmit_Prompt_Suggester = async () => {
    const apiResponse = await callOpenAIAPIFor_Prompt_Suggestor(apiKey, prompt);
    setSuggestion(apiResponse);
    setResponses([...responses, apiResponse]);
  };

  const handleSubmit_Midjourney_Prompt_Suggester = async () => {
    const apiResponse = await callOpenAIAPIFor_Midjourney_Prompt_Suggestor(apiKey, prompt);
    setSuggestion(apiResponse);
    setResponses([...responses, apiResponse]);
  };

  return (
  <div className="App min-h-screen bg-gray-100">

    <Router>
        <PageViewTracker />
    </Router>
    <div className="container mx-auto px-4 py-8">
      <div className="text-center pb-12 md:pb-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
          GPT Prompt <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Suggester</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-md md:text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
           Enhance your prompts using <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">GPT-powered</span> suggestions in 1 click
          </p>
        </div>
      </div>

      <div className="mb-8">
        <ApiKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
      </div>
      <div className="main-content flex flex-col md:flex-row justify-center">
        <div className="content flex-1 flex flex-col md:flex-row">
          <PromptInput prompt={prompt} onChange={handlePromptChange} onSubmit={handleSubmit_Prompt_Suggester} />
          <OutputBox suggestion={suggestion} />
        </div>
      </div>

      {/* <div className="text-center pb-22 md:pb-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
          GPT Midjourney <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Suggester</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-md md:text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
            Create accurate <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-teal-400">Midjourney</span> prompts suggestions in 1 click
          </p>
        </div>
      </div>

      <div className="content flex-1 flex flex-col md:flex-row">
        <PromptInput prompt={prompt} onChange={handlePromptChangeMidjourney} onSubmit={handleSubmit_Midjourney_Prompt_Suggester} />
        <OutputBox suggestion={suggestion} />
      </div> */}


    </div>
  </div>
);

}

export default App;
