import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import img1 from "../../Assets/rlogo.png";
import { useCart } from "../../Pages/CartContext.jsx";
// Assuming HeaderStyle.css is in the styles folder relative to Header.jsx
//import "../../styles/HeaderStyle.css";
import "../../Styles/HeaderStyle.css";

const Header = () => {
  const { cart } = useCart();
  const [nav, setNav] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  // Scroll Navbar
  const changeValueOnScroll = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    scrollValue > 100 ? setNav(true) : setNav(false);
  };

  window.addEventListener("scroll", changeValueOnScroll);

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${nav === true ? "sticky" : ""}`}
      >
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className="logo">
              <img src={img1} alt="Logo" className="img-fluid" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/About">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/menu">
                Our Menu
              </Nav.Link>
              <Nav.Link as={Link} to="/Contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/Login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/Register">
              Register
              </Nav.Link>
             
              <Nav.Link as={Link} to="/Cart">
                <div className="cart">
                  <i className="bi bi-bag fs-5"></i>
                  {cartCount > 0 && <em className="roundpoint">{cartCount}</em>}
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;