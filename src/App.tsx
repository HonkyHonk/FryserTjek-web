import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import { LogIn, LogOut, User } from 'lucide-react';

// Initialize Parse
Parse.initialize("r3TKrBxscy7P1c7UF670quOOWdJVEU3YSLnQNNiA");
Parse.serverURL = 'https://pg-app-q2lyq74v5e55eyhzp4eq7xtzs9e55u.scalabl.cloud/';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);

  useEffect(() => {
    const user = Parse.User.current();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await Parse.User.logIn(username, password);
      setCurrentUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to sign in. Please check your credentials.');
    }
  };

  const handleSignOut = async () => {
    try {
      await Parse.User.logOut();
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Parse Platform Auth</h1>
        {currentUser ? (
          <div className="text-center">
            <User className="inline-block mb-4 w-16 h-16 text-blue-500" />
            <p className="mb-4">Welcome, {currentUser.getUsername()}!</p>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center justify-center w-full"
            >
              <LogOut className="mr-2" /> Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center w-full"
            >
              <LogIn className="mr-2" /> Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;