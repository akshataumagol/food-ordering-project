import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../Component/Layouts/Layout";
import "../Styles/LoginStyle.css";
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Clear previous errors
    setErrors({});

    // Check if username or password is empty
    if (!username.trim() || !password.trim()) {
      setErrors({
        username: !username.trim() ? 'Please enter your username.' : '',
        password: !password.trim() ? 'Please enter your password.' : '',
      });
      return;
    }

    try {
      console.log('Attempting to log in...');
      const response = await fetch('http://localhost:3004/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log('Login successful. Navigating to the home page.');
        toast.success('Login successful');
        navigate('/'); // Redirect to home page
        console.log('Navigation completed.');
      } else {
        setErrors({ username: 'Invalid username or password.', password: 'Invalid username or password.' });
      }      

    } catch (error) {
      console.error('Error during login:', error);
      setErrors({ username: 'An error occurred during login. Please try again later.', password: 'An error occurred during login. Please try again later.' });
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h2>Login Page</h2>
        <div>
          <h5>Username:</h5>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='off'/>
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <br /> {/* Use <br> for line break*/ }
          <h5>Password:</h5>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Login = () => {
  return (
    <Layout>
      {/* Home Section Hero Banner */}
      <LoginPage />
    </Layout>
  );
};

export default Login;



