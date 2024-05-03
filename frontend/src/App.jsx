// App.js
/*import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./Pages/CartContext.jsx";
import Home from "../src/Pages/Home/Home";
import About from "./Pages/About.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Menu from "./Pages/menu.jsx";
import Contact from "./Pages/Contact.jsx";
import Payment from "./Pages/Payment.jsx";
import Cart from "./Pages/Cart.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";

function App(){
  const [cart, setCart] = React.useState([]);
  return (
    <Router>
      <CartProvider>
        <Routes>
        <Route path="/" element={<Home addToCart={(itemId) => setCart((prevCart) => [...prevCart, { id: itemId, title: `Item ${itemId}`, price: 10, quantity: 1 }])} />} />
        <Route path="/cart" element={<Cart cartItems={cart} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;*/
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import default styles
import { CartProvider } from "./Pages/CartContext.jsx";
import Home from "../src/Pages/Home/Home";
import About from "./Pages/About.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Menu from "./Pages/menu.jsx";
import Contact from "./Pages/Contact.jsx";
import Payment from "./Pages/Payment.jsx";
import Cart from "./Pages/Cart.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";

function App(){
  const [cart, setCart] = React.useState([]);
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home addToCart={(itemId) => setCart((prevCart) => [...prevCart, { id: itemId, title: `Item ${itemId}`, price: 10, quantity: 1 }])} />} />
          <Route path="/cart" element={<Cart cartItems={cart} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        </Routes>
      </CartProvider>
      <ToastContainer /> {/* Include ToastContainer at the root level of your application */}
    </Router>
  );
}

export default App;

