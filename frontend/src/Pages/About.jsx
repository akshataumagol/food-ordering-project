import React from "react";
//import Image1 from "../../Assets/menu/biryani.jpg";
//import { Container, Row, Col } from "react-bootstrap";
//import back from "../../Assets/back.png";
import "../Styles/AboutStyle.css";
import Layout from "../Component/Layouts/Layout";
//import { Link } from "react-router-dom";
const About =()=>{
    return(
        <>
       <div className="section">
            <div className="title">

                
                <br>


                </br>
            </div>
            <div className="SERVICES">
                <div className="cards" >
                    <div className="icon">
                        <i className="fas fa-calendar"></i>

                    </div>
                    <h2>Responsible travel</h2>
                    <p>With grate adventure comes great responsibility , which is why we give back to the local communities we visit and look after the environment by carbon affsetting our trips.</p>
                    <a href="" className="but">Read more</a>

                </div>
                <div className="cards">
                    <div className="icon">
                        <i className="fas fa-wrench"></i>

                    </div>
                    <h2>Creative team</h2>
                    <p>Our dedicated team members in each destination are continuously seeking new adventure and expertise to create a avst collection of varioous activities,ensuring we always have something special to offer our clients.</p>
                    <a href="" className="but">Read more</a>

                </div>
                <div className="cards">
                    <div className="icon">
                        <i className="fas fa-handshake"></i>

                    </div>
                    <h2>persionalized services</h2>
                    <p> We place great emphasis on building strong relationships with our clients.We personalized our services following your particular profile and your travel philosophy to ensure we tailor the trip to your exact needs and preferences.</p>
                    <a href="" className="but">Read more</a>

                </div>
            </div>
        </div>
    </>
    );
}   
const AboutPage =()=>{
    return(
        <Layout>
        {/* Home Section Hero Banner */}
        <About />
        </Layout>
    );
}   
export default AboutPage;
