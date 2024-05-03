import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../Component/Layouts/Cards";
import Layout from "../Component/Layouts/Layout";
import "../Styles/MenuStyle.css";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3004/api/menu")
      .then(response => {
        console.log(response.data); // Log response data
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);
  

  function Section3() {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>; // Display error message
    }

    if (!Array.isArray(menuItems) || menuItems.length === 0) {
      return <div>No menu items available</div>;
    }

    return (
      <section className="menu_section">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
              <h2>Our speciality</h2>
              <p className="para">
                "Taste the difference in every special bite."
              </p>
            </Col>
          </Row>
          <Row>
            {menuItems.map(menuItem => (
              <Cards
                key={menuItem.id}
                id={menuItem.id}
                image={menuItem.image}
                rating={menuItem.rating}
                title={menuItem.title}
                paragraph={menuItem.paragraph}
                price={menuItem.price}
              />
            ))}
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <Layout>
      <Section3 />
    </Layout>
  );
}

export default Menu;
