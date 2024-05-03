
// src/components/Contact.js
import Layout from "../Component/Layouts/Layout";
import React, { useState } from 'react';
import "../Styles/contactStyle.css";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submission
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3004/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data from server:', data);

      // Display an alert if data is successfully stored
      alert('Data stored successfully!');

      // Clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('An error occurred while storing data. Please try again later.');
    }
  };

  return (
    <body>
    <div className="contact-form"> 
    <form onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
       <h5>Name: </h5>
        <input type='text' name='name' value={formData.name} onChange={handleChange} />
        <br>

       </br>

        <h5>Email:</h5>
        <input type='email' name='email' value={formData.email} onChange={handleChange} />
        <br>
        </br>
        <h5>Message:</h5>
        <textarea name='message' value={formData.message} onChange={handleChange} />

        <button type='submit'>Submit</button>
      </form>
    </div>
    </body>
  );
};

const ContactPage = () => {
  return (
    <Layout>
      <Contact key={1} />
    </Layout>
  );
};

export default ContactPage;
