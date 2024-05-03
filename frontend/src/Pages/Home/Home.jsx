import React from "react";
import Layout from "../../Component/Layouts/Layout";
import "../../Styles/HomeStyle.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";

const Home = () => {
  return (
    <>
      <Layout>
        {/* Home Section Hero Banner */}
        <Section1 />
         {/* Home Section Hero Banner */}
         <Section2 />
          {/* Home Section Hero Banner */}
          <Section3 />
          {/* Home Section Hero Banner */}
          <Section4 />
          {/* Home Section Hero Banner */}
          <Section5 />
          {/* Home Section Hero Banner */}
          <Section6 />
          {/* Home Section Hero Banner */}
          <Section7 />
      </Layout>
    </>
  );
}
export default Home;