import React from 'react';

interface SidebarProps {
  responses: string[];
  onDelete: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ responses, onDelete }) => {
  return (
    <div className="sidebar">
      {/* Add your Tailwind CSS classes for styling */}
      {responses.map((response, index) => (
        <div key={index} className="response-item">
          {/* Add your Tailwind CSS classes for styling */}
          <p>{response}</p>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
