import React, { useState } from 'react';
import { useCart } from './CartContext';
import Layout from '../Component/Layouts/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/PaymentStyle.css';

const PaymentPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    email: '',
    address: '',
    zip: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, category) => {
    const { name, value } = e.target;
    if (category === 'billingAddress') {
      setBillingAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    } else if (category === 'paymentDetails') {
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
    // Clear error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const calculateOverallTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      if (!isNaN(price)) {
        return total + price * item.quantity;
      } else {
        console.warn(`Invalid price value: ${item.price}`);
        return total;
      }
    }, 0);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Billing address validation
    for (let field in billingAddress) {
      if (!billingAddress[field].trim()) {
        formIsValid = false;
        errors[field] = `Please enter your ${getFieldLabel(field)}.`;
      } else if (field === 'fullName' && !/^[A-Za-z\s]+$/.test(billingAddress[field])) {
        formIsValid = false;
        errors[field] = 'Please enter a valid full name.';
      }
    }

    // Email validation
    if (billingAddress.email.trim()) {
      let pattern = new RegExp(/^\w+([\.-]?\w+)*@gmail\.com$/);
      if (!pattern.test(billingAddress.email)) {
        formIsValid = false;
        errors["email"] = "Please enter a valid email address ending with @gmail.com.";
      }
    }

    // Zip code validation
    if (billingAddress.zip.trim() && !/^\d{6}$/.test(billingAddress.zip)) {
      formIsValid = false;
      errors["zip"] = "Please enter a valid 6-digit zip code.";
    }

    // Payment details validation
    for (let field in paymentDetails) {
      if (!paymentDetails[field].trim()) {
        formIsValid = false;
        errors[field] = `Please enter your ${getFieldLabel(field)}.`;
      } else if ((field === 'cardNumber') && !/^\d+$/.test(paymentDetails[field])) {
        formIsValid = false;
        errors[field] = `Please enter a valid ${getFieldLabel(field)}.`;
      } else if (field === 'cardName' && !/^[A-Za-z\s]+$/.test(paymentDetails[field])) {
        formIsValid = false;
        errors[field] = 'Please enter a valid name on card.';
      } else if (field === 'cvv' && !/^\d{3}$/.test(paymentDetails[field])) {
        formIsValid = false;
        errors[field] = 'CVV must be a 3-digit number.';
      }
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formattedCartItems = cart.map(item => ({
          title: item.title,
          price: item.price
        }));

        if (formattedCartItems.length === 0) {
          console.error('Cart is empty');
          return;
        }

        const formData = {
          billingAddress,
          paymentDetails: {
            ...paymentDetails,
            cartItems: formattedCartItems,
          },
          totalAmount: calculateOverallTotal(),
        };

        const response = await axios.post('http://localhost:3004/api/checkout', formData);
        console.log('Server response:', response.data);
        if (response.status === 200) {
          const paymentSuccessState = {
            success: true,
            fullName: billingAddress.fullName,
            totalAmount: calculateOverallTotal(),
          };
          navigate('/PaymentSuccess', {
            state: paymentSuccessState,
          });
        } else {
          console.log("unsuccessful");
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  return (
    <div className='payForm'>
      <form onSubmit={handleSubmit} className='payform'>
        <div className="payment-container">
          <div className="billing-section">
            <h3>Billing Address</h3>
            {['fullName', 'email', 'address', 'zip'].map((field) => (
              <div key={field}>
                <label htmlFor={field}>{getFieldLabel(field)}</label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                  value={billingAddress[field]}
                  onChange={(e) => handleChange(e, 'billingAddress')}
                  required
                />
                <span className="error">{errors[field]}</span>
              </div>
            ))}
          </div>
          <div className="payment-section">
            <h3>Payment</h3>
            {['cardName', 'cardNumber', 'cvv'].map((field) => (
              <div key={field}>
                <label htmlFor={field}>{getFieldLabel(field)}</label>
                <input
                  type={field.includes('Number') ? 'text' : 'password'}
                  id={field}
                  name={field}
                  placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                  value={paymentDetails[field]}
                  onChange={(e) => handleChange(e, 'paymentDetails')}
                  required
                />
                <span className="error">{errors[field]}</span>

              </div>
              
            ))}
            <div className='checkbox-container'>
             {/*<label>
                <input
                  type="checkbox"
                  checked={true}
                  name="sameadr"
                  onChange={() => {}}  // Add an empty onChange handler to satisfy the warning
                />
                Shipping address same as billing
          </label>*/}
                <input type="submit" value="Continue to checkout" className="button" />
            
            </div>
          </div>
        </div>
      </form>      
    </div>
  );
};

// Helper function to get a more user-friendly label for each field
const getFieldLabel = (field) => {
  switch (field) {
    case 'fullName':
      return 'Full Name';
    case 'email':
      return 'Email';
    case 'address':
      return 'Address';
    case 'zip':
      return 'Zip Code';
    case 'cardName':
      return 'Name on Card';
    case 'cardNumber':
      return 'Credit Card Number';
    case 'cvv':
      return 'CVV';
    default:
      return '';
  }
};

const Payment = () => {
  return (
    <Layout>
      <PaymentPage />
    </Layout>
  );
};

export default Payment;

