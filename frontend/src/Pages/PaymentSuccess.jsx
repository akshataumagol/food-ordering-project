import React, { useEffect } from 'react';
import Layout from '../Component/Layouts/Layout';
//import "../public/payment.png"
import { useNavigate, useLocation } from 'react-router-dom';
//import '../../Styles/PaymentSuccess.css';
import '../Styles/PaymentSuccess.css';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  useEffect(() => {
    console.log('State in PaymentSuccessPage:', state);
  
    if (!state || !state.success) {
      // Redirect to the payment page if the state or success flag is not provided
      navigate('/Payment');
    }
  }, [state, navigate]);
  

  console.log('State after redirect:', state);

  if (!state || !state.success) {
    // If the redirect is performed, this component won't be rendered
    return null;
  }

  const { fullName, totalAmount } = state;

  return (
      
      <div className='paysuccess'>
        
    
        <h2>Payment Successful!</h2>
        <img src="/payment.png" alt="Payment Image"/>
        <p>Thank you, <br></br>{fullName} for your purchase.</p>
        <p>Total Amount:   Rs {totalAmount}</p>
        {/* Add additional details or components as needed */}
      </div>
  
  );
};

const PaymentSuccess = () => {
  return (
    <Layout>
      <PaymentSuccessPage />
    </Layout>
  );
};

export default PaymentSuccess;