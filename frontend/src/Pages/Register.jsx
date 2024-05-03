
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from "../Component/Layouts/Layout";
import { toast } from 'react-toastify'; 
import "../Styles/RegisterStyle.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      username: '',
      email: '',
      password: '',
    });
    console.log('useEffect hook triggered');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formIsValid = true;
      let newErrors = {};

      // Validate username
     // Validate username
     if (!formData.username.trim()) {
      formIsValid = false;
      newErrors['username'] = 'Please enter your username.';
    } 


      // Validate email
      if (!formData.email.trim()) {
        formIsValid = false;
        newErrors['email'] = 'Please enter your email address.';
      } else if (!/^\w+([\.-]?\w+)*@gmail\.com$/.test(formData.email.trim())) {
        formIsValid = false;
        newErrors['email'] = 'Please enter a valid email address ending with @gmail.com.';
      }

      // Validate password
      if (!formData.password.trim()) {
        formIsValid = false;
        newErrors['password'] = 'Please enter your password.';
      } else if (formData.password.trim().length < 6) { // Minimum character length of 6
        formIsValid = false;
        newErrors['password'] = 'Password must be at least 6 characters long.';
      }

      if (!formIsValid) {
        setErrors(newErrors);
        return;
      }

      const response = await axios.post('http://localhost:3004/api/register', formData);
      console.log(response.data);

      setFormData({
        username: '',
        email: '',
        password: '',
      });
  
      toast.success('Registration successful');
      navigate('/Login');
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received. Request details:', error.request);
      } else {
        console.error('Error details:', error.message);
      }
    }
  };

  return (
    <div className="reg" autoComplete="off">
      <form onSubmit={handleSubmit}>
        <h1> Register</h1>
        <h4>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} autoComplete="off"/>
          <span className="error" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{errors.username}</span>

        </h4>
        <br />
        <h4>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="off"/>
          <span className="error" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{errors.email}</span>
        </h4>
        <br />
        <h4>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="off"/>
          <span className="error" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{errors.password}</span>
        </h4>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const RegisterPage =()=>{
  return(
      <Layout>
        <Register />
      </Layout>
  );
}  

export default RegisterPage;
