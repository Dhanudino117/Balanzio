import React, { useState } from 'react';
import { FaSun, FaMoon, FaBell, FaExclamationTriangle, FaSync, FaSignOutAlt } from 'react-icons/fa';
import Header from '../Components/Header';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  // Toggle component
  const ToggleSwitch = ({ isChecked, onToggle }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 rounded-full p-1 flex items-center transition-all ${
          isChecked ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all ${
            isChecked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </label>
  );

  return (
  <div className='p-6 bg-gray-50 min-h-screen'>
    <div>
      <Header/>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 pl-9" >Settings</h1>
    </div>
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        

        <h2 className="text-lg font-semibold mb-4">Preferences</h2>

        {/* Appearance */}
        <div className="flex items-center justify-between py-4 border-b">
          <div>
            <div className="flex items-center mb-1">
              <FaSun className="text-yellow-500 mr-2" />
              <span className="font-semibold">Appearance</span>
            </div>
            <p className="text-gray-500">Choose between light and dark theme</p>
          </div>
          <div className='flex gap-2'>
            <button
              className={`px-4 py-1 rounded-lg ${!darkMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setDarkMode(false)}
            >
              Light
            </button>
            <button
              className={`ml-2 px-4 py-1 rounded-lg ${darkMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setDarkMode(true)}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between py-4 border-b">
          <div>
            <div className="flex items-center mb-1">
              <FaBell className="text-blue-500 mr-2" />
              <span className="font-semibold">Push Notifications</span>
            </div>
            <p className="text-gray-500">Get notified about transaction updates</p>
          </div>
          <ToggleSwitch
            isChecked={pushNotifications}
            onToggle={() => setPushNotifications((prev) => !prev)}
          />
        </div>

        {/* Budget Alerts */}
        <div className="flex items-center justify-between py-4 border-b">
          <div>
            <div className="flex items-center mb-1">
              <FaExclamationTriangle className="text-red-500 mr-2" />
              <span className="font-semibold">Budget Alerts</span>
            </div>
            <p className="text-gray-500">Get warned when approaching budget limits</p>
          </div>
          <ToggleSwitch
            isChecked={budgetAlerts}
            onToggle={() => setBudgetAlerts((prev) => !prev)}
          />
        </div>

        {/* Device Sync */}
        <div className="flex items-center justify-between py-4 border-b">
          <div>
            <div className="flex items-center mb-1">
              <FaSync className="text-green-500 mr-2" />
              <span className="font-semibold">Device Sync</span>
            </div>
            <p className="text-gray-500">Keep your data in sync across devices</p>
          </div>
          <button className="text-blue-500">Manage Devices</button>
        </div>

        {/* Log Out */}
        <button className="w-full bg-white text-red-500 py-2 rounded-lg flex items-center justify-center border-2 border-red-500 hover:bg-red-50 mt-6">
          <FaSignOutAlt className="mr-2" /> Log Out
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Budget Buddy v1.0.0
          <br />© 2023 Budget Buddy. All rights reserved.
        </p>
      </div>
    </div>
  </div>
    
  );
};

export default SettingsPage;
