import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [repos, setRepos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [commonTracks, setCommonTracks] = useState([]);
  const [similarity, setSimilarity] = useState(0);
  const [spotifyAuth, setSpotifyAuth] = useState('');
  const [userTopTracks, setUserTopTracks] = useState([]); // Store user's top tracks

  // GitHub Repositories Fetch
  useEffect(() => {
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

  // Fetch Spotify playlists
  useEffect(() => {
    const fetchSpotifyPlaylists = async () => {
      if (!spotifyAuth) return;

      const specificPlaylists = [
        '4WHec1JTioPdBPzE6idWhk?si=9825e8d765f74e86',
        '4JsXZ6HCe04LGy3mHxPP3j?si=d0e9d3c5081d4b95',
        '0zCvrhxojDNUJNyGlfnzNJ?si=d1889200458b4800',
      ];

      try {
        const playlistPromises = specificPlaylists.map(id =>
          axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
              Authorization: `Bearer ${spotifyAuth}`,
            },
          })
        );

        const responses = await Promise.all(playlistPromises);
        setPlaylists(responses.map(response => response.data));
      } catch (error) {
        console.error('Error fetching Spotify playlists:', error);
      }
    };

    fetchSpotifyPlaylists();
  }, [spotifyAuth]);
  
  // Fetch top tracks and calculate similarity
  useEffect(() => {
    const fetchTopTracks = async () => {
      if (!spotifyAuth) return;

      try {
        // Fetch your top tracks
        const yourTopTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            Authorization: `Bearer ${spotifyAuth}`,
          },
        });

        setUserTopTracks(yourTopTracks.data.items);

        // Find common tracks (for now we compare your top tracks to themselves for testing)
        const commonTracks = yourTopTracks.data.items.filter(track =>
          yourTopTracks.data.items.some(yourTrack => yourTrack.id === track.id)
        );

        const similarity = (commonTracks.length / yourTopTracks.data.items.length) * 100;

        setCommonTracks(commonTracks.slice(0, 3)); // Top 3 common tracks
        setSimilarity(similarity);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    fetchTopTracks();
  }, [spotifyAuth]);

  // Spotify Authentication
  const authenticateSpotify = () => {
    const clientId = '6f79de496f2a4540ab5b44ad7c274fd2'; // Replace with your Spotify Client ID
    const redirectUri = 'http://localhost:3001/callback'; // Replace with your app's redirect URI
    const scopes = 'playlist-read-private user-top-read';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;

    window.location.href = authUrl;
  };

  // Capture the Spotify token from the URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      const token = hash.split('&')[0].split('=')[1];
      setSpotifyAuth(token);
    }
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
        className={`cursor-pointer transition-all ease-in-out duration-200 py-2 px-4 rounded-full text-lg ${activeTab === 'spotify' ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-purple-100'}`}
        onClick={() => setActiveTab('spotify')}
      >
        Spotify
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
            <h1 className="text-6xl font-bold text-purple-700 mb-4">Reyna Patel</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">Welcome to my personal website!</p>
          </div>
        )}

        {activeTab === 'spotify' && (
          <div className="text-center">
            <h2 className="text-5xl font-bold text-purple-700 mb-6">My Spotify</h2>
            
            {!spotifyAuth && (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600"
                onClick={authenticateSpotify}
              >
                Connect with Spotify
              </button>
            )}

            {spotifyAuth && (
              <>
                <h2 className="text-3xl font-bold text-purple-700 mb-6">My Summative Playlists</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {playlists.map((playlist) => (
                    <div key={playlist.id} className="shadow-md p-4 rounded-lg bg-white hover:shadow-lg transition-shadow">
                      {playlist.images.length > 0 && (
                        <img src={playlist.images[0].url} alt={playlist.name} className="mb-4 rounded" />
                      )}
                      <h3 className="text-lg font-semibold text-purple-600">{playlist.name}</h3>
                      <p className="text-gray-600">{playlist.tracks.total} songs</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl font-bold text-purple-700 mb-6 mt-10">Our Top 3 Common Tracks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {commonTracks.map((track) => (
                    <div key={track.id} className="shadow-md p-4 rounded-lg bg-white hover:shadow-lg transition-shadow">
                      {track.album.images.length > 0 && (
                        <img src={track.album.images[0].url} alt={track.name} className="mb-4 rounded" />
                      )}
                      <h3 className="text-lg font-semibold text-purple-600">{track.name}</h3>
                      <p className="text-gray-600">{track.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-3xl font-bold text-purple-700 mb-6">Music Taste Similarity: {similarity.toFixed(2)}%</h3>
              </>
            )}
          </div>
        )}
        {activeTab === 'skills' && (
          <div className="text-center">
            <h2 className="text-5xl font-bold text-purple-700 mb-6">Public GitHub Repositories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.slice(0, 6).map((repo) => (
                <div key={repo.id} className="shadow-md p-6 rounded-lg bg-white hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-purple-600">{repo.name}</h3>
                  <p className="text-gray-700">{repo.description}</p>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline mt-2 block">
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
