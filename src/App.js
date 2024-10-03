import { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [repos, setRepos] = useState([]);
  
  useEffect(() => {
    // Fetch GitHub repositories
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/reyna2323/repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repos:', error);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 text-gray-900 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <ul className="flex justify-center space-x-10">
            <li
              className={`cursor-pointer transition-all ease-in-out duration-200 py-2 px-4 rounded-full text-lg ${activeTab === 'home' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-purple-100'}`}
              onClick={() => setActiveTab('home')}
            >
              Home
            </li>
            <li
              className={`cursor-pointer transition-all ease-in-out duration-200 py-2 px-4 rounded-full text-lg ${activeTab === 'about' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-purple-100'}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </li>
            <li
              className={`cursor-pointer transition-all ease-in-out duration-200 py-2 px-4 rounded-full text-lg ${activeTab === 'skills' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-purple-100'}`}
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </li>
            <li
              className={`cursor-pointer transition-all ease-in-out duration-200 py-2 px-4 rounded-full text-lg ${activeTab === 'contact' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-purple-100'}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact
            </li>
          </ul>
        </div>
      </nav>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto py-10 px-6">
        {activeTab === 'home' && (
          <div className="text-center">
            <img
              className="h-48 w-48 rounded-full mx-auto mb-6 shadow-lg"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <h1 className="text-6xl font-bold text-purple-700 mb-4">Reyna Patel</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Welcome to my personal website! blah blah
            </p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="text-center">
            <h2 className="text-5xl font-bold text-purple-700 mb-6">About Me</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Hi, I'm Reyna Patel!!! yayyy
            </p>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="text-center">
            <h2 className="text-5xl font-bold text-purple-700 mb-6">My GitHub Repos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.slice(0, 6).map((repo) => (
                <div key={repo.id} className="shadow-md p-6 rounded-lg bg-white hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-purple-600">{repo.name}</h3>
                  <p className="text-gray-700">{repo.description}</p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline mt-2 block"
                  >
                    View Repository
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="text-center">
            <h2 className="text-5xl font-bold text-purple-700 mb-6">Contact</h2>
            <p className="text-lg text-gray-700 mb-6">
              Feel free to reach out to me at: <br />
              <a href="mailto:patelreyna2323@gmail.com" className="text-purple-600 hover:underline">
                patelreyna2323@gmail.com
              </a>
            </p>
            <div className="mt-6">
              <a
                href="https://github.com/reyna2323"
                className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/reynapatelegv/"
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
