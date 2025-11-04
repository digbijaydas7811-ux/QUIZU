import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';

interface SettingsScreenProps {
  onGoHome: () => void;
}

const gradeLevels = Array.from({ length: 12 }, (_, i) => `${i + 1}${['st', 'nd', 'rd'][i] || 'th'} Grade`);

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onGoHome }) => {
  const { user, setUser } = useUser();
  const [settings, setSettings] = useState({
    name: user.name,
    class: user.class,
    language: user.language,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSaved(false);
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setUser({ ...user, ...settings });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000); // Hide message after 2 seconds
  };

  return (
    <div className="w-full max-w-md mx-auto text-center animate-fade-in">
      <h2 className="text-4xl font-bold mb-8">Settings</h2>
      <div className="bg-neutral p-6 rounded-xl shadow-lg space-y-6">
        <div>
          <label htmlFor="name" className="block text-left text-gray-300 font-semibold mb-2">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={settings.name}
            onChange={handleChange}
            className="w-full p-3 bg-base-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="class" className="block text-left text-gray-300 font-semibold mb-2">Your Class</label>
          <select
            id="class"
            name="class"
            value={settings.class}
            onChange={handleChange}
            className="w-full p-3 bg-base-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {gradeLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="language" className="block text-left text-gray-300 font-semibold mb-2">Quiz Language</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full p-3 bg-base-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="English">English</option>
            <option value="Hinglish">Hinglish</option>
          </select>
        </div>
        <button
          onClick={handleSave}
          className="w-full py-3 bg-accent hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-colors duration-300"
        >
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
      <button
        onClick={onGoHome}
        className="mt-8 px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-lg transition-colors duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default SettingsScreen;
