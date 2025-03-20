import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState([
    
  ]);

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({ username: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      let isValid = false;
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === formData.email && userData[i].password === formData.password) {
          isValid = true;
          break;
        }
      }
      isValid ? alert('Login successful!') : alert('Invalid credentials');
    } else {
      const newUserData = [...userData, formData];
      setUserData(newUserData);
      console.log('Updated User Data:', newUserData);
      alert('Account created successfully!');
    }

    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label>Username</label>
              <div className="flex items-center border rounded p-2">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  name="username"
                  className="w-full pl-2 border-0 outline-none"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label>Email</label>
            <div className="flex items-center border rounded p-2">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                className="w-full pl-2 outline-none"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label>Password</label>
            <div className="flex items-center border rounded p-2">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                name="password"
                className="w-full pl-2 outline-none"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">
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
