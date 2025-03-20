import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form>
          {!isLogin && (
            <div className="mb-4">
              <label>Username</label>
              <div className="flex items-center border rounded p-2">
                <FaUser className="text-gray-400" />
                <input type="text" className="w-full pl-2 border-0 outline-none" placeholder="Enter Username" />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label>Email</label>
            <div className="flex items-center border rounded p-2">
              <FaEnvelope className="text-gray-400" />
              <input type="email" className="w-full pl-2 outline-none" placeholder="Enter Email" />
            </div>
          </div>

          <div className="mb-4">
            <label>Password</label>
            <div className="flex items-center border rounded p-2">
              <FaLock className="text-gray-400" />
              <input type="password" className="w-full pl-2 outline-none" placeholder="Enter Password" />
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={toggleAuthMode} className="text-blue-500 cursor-pointer ml-1">
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
