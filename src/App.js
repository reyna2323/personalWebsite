import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-purple-100 text-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-purple-300 p-4 shadow-md">
        <ul className="flex justify-center space-x-8">
          <li
            className={`cursor-pointer py-2 px-4 rounded-lg ${activeTab === 'home' ? 'bg-purple-500 text-white' : 'text-purple-600 hover:bg-purple-400 hover:text-white'}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded-lg ${activeTab === 'about' ? 'bg-purple-500 text-white' : 'text-purple-600 hover:bg-purple-400 hover:text-white'}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded-lg ${activeTab === 'skills' ? 'bg-purple-500 text-white' : 'text-purple-600 hover:bg-purple-400 hover:text-white'}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded-lg ${activeTab === 'contact' ? 'bg-purple-500 text-white' : 'text-purple-600 hover:bg-purple-400 hover:text-white'}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </li>
        </ul>
      </nav>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'home' && (
          <div className="text-center">
            <img
              className="h-40 w-40 rounded-full mx-auto mb-4"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <h1 className="text-5xl font-bold text-purple-700 mb-4">Reyna Patel</h1>
            <p className="text-lg text-gray-700">
              Welcome to my personal website! Explore more about me and my skills in the tabs above.
            </p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-700 mb-4">About Me</h2>
            <p className="text-gray-700 text-lg">
              Hi, I'm Reyna Patel, a web developer passionate about creating responsive and visually appealing websites. I enjoy learning new technologies and continuously improving my skills.
            </p>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-700 mb-4">Skills</h2>
            <ul className="list-none text-lg space-y-2">
              <li className="text-gray-700">- HTML, CSS, JavaScript</li>
              <li className="text-gray-700">- React, Tailwind CSS</li>
              <li className="text-gray-700">- Node.js, Express</li>
              <li className="text-gray-700">- MongoDB, MySQL</li>
            </ul>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-700 mb-4">Contact</h2>
            <p className="text-lg text-gray-700 mb-4">
              Feel free to reach out to me at:
              <br />
              <a href="mailto:patelreyna2323@gmail.com" className="text-purple-600 hover:underline">
                patelreyna2323@gmail.com
              </a>
            </p>
            <div className="mt-6">
              <a
                href="https://github.com"
                className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                className="ml-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
              >
                LinkedIn
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
