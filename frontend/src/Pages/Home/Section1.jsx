import React from "react";
import { Container, Row, Col } from "react-bootstrap";
//import back from "../../Assets/back.png";
import "../../Styles/HomeStyle.css";
import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <section className="hero_section">
      <Container>
        <Row>
          <Col lg={7} className="mb-5 mb-lg-0">
            <div className="position-relative">
              <div className="price_badge">
                <div className="badge_text">
                  
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="hero_text text-center">
            {/*loggedInUserName && <span>Welcome, {loggedInUserName}!</span>*/}
            <h1 className="text-white">NEW OFFER</h1>
              <h2 className="text-white">"Indulge in a burst of flavors with our Tikka to Kabab special!</h2>
              <h3 className="text-white pt-2 pb-4">
              "Turn hunger into happiness with a click. Order now.!!!
              </h3>
              <Link to="/" className="btn order_now">
                Order Now
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Section1;