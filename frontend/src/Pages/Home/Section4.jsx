import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PromotionImage from "../../Assets/promotion/pro.jpg";

function Section4() {
  return (
    <>
      <section className="promotion_section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center mb-5 mb-lg-0">
              <img src={PromotionImage} className="img-fluid" alt="Promotion" />
            </Col>
            <Col lg={6} className="px-5">
              <h2>Nothing brings people together like a good Food</h2>
              <p>
              "Where originality meets the plate, our speciality dishes redefine culinary delight. Each creation is a unique journey of flavors, crafted with passion and innovation. Experience the authenticity, savor the originality – because exceptional taste begins with the extraordinary."
              </p>
              <ul>
                <li>
                  <p>
                  "With our user-friendly app, you can easily browse through a diverse range of cuisines, place orders, and track your delivery in real-time for a hassle-free mealtime."
                  </p>
                </li>
                <li>
                  <p>"Trust our secure and efficient payment system for a hassle-free transaction with each order, ensuring a smooth and enjoyable journey from selection to savoring."</p>
                </li>
                <li>
                  <p>
                  "Say goodbye to long waiting times! Our state-of-the-art food delivery platform guarantees prompt and reliable service, making sure your favorite dishes are delivered piping hot to your door."
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* BG Parallax Scroll */}
      <section className="bg_parallax_scroll"></section>
    </>
  );
}

export default Section4;