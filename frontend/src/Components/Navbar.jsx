import { useState } from 'react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { programmingLanguages, EthicalHackingTypes } from '../data/lists'; // Import the topics

export const Navbar = () => {
  const [showTopics, setShowTopics] = useState(false);

  const handleToggleTopics = () => {
    setShowTopics(!showTopics);
  };

  return (
    <div>
      <div className="navbar navbar-center justify-between p-4 bg-gray-900 text-white">
        <button className="btn text-xl font-bold">elites</button>
        <div className="flex space-x-6">
          <a href="#">
            <button onClick={() => {}} className="btn">projects</button>
          </a>
          <a href="#">
            <button onClick={() => {}} className="btn">chat</button>
          </a>
          <a href="#">
            <button onClick={() => {}} className="btn">game</button>
          </a>
          <div className="relative">
            <button
              onClick={handleToggleTopics}
              className="btn flex items-center space-x-2"
            >
              <span>Topics</span>
              <FaCaretDown />
            </button>
            {showTopics && (
              <div className="absolute z-50 flex flex-col right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg w-64">
                <div className="px-4 py-2 border-b border-gray-600">
                  <h4 className="text-lg font-semibold mb-2">Programming Languages</h4>
                  <ul className="space-y-1">
                    {programmingLanguages.map((lang) => (
                      <li key={lang.code} className="flex items-center mb-2 hover:bg-gray-700 px-2 py-1 rounded">
                        <lang.icon className="text-xl mr-2" />
                        {lang.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-4 py-2">
                  <h4 className="text-lg font-semibold mb-2">Ethical Hacking Types</h4>
                  <ul className="space-y-1">
                    {EthicalHackingTypes.map((type) => (
                      <li key={type.code} className="flex items-center mb-2 hover:bg-gray-700 px-2 py-1 rounded">
                        <type.icon className="text-xl mr-2" />
                        {type.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <FaUserCircle className="text-3xl cursor-pointer" />
      </div>
    </div>
  );
};
