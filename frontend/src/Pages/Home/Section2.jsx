// Section2.jsx
import React from 'react';
import SearchBar from './SearchBar';
//import "../../Styles/Section2.css"; // Import CSS for styling

// Importing images
import Image1 from "../../Assets/menu/p5.jpg";
import Image2 from "../../Assets/menu/p8.jpg";
import Image3 from "../../Assets/menu/p6.jpg";
import Image4 from "../../Assets/menu/chi.jpg";
import Image5 from "../../Assets/menu/momos.jpg";
import Image6 from"../../Assets/menu/sushi.jpg";
import Image7 from "../../Assets/menu/cake.jpg";
import Image8 from "../../Assets/menu/bre.jpg";
import Image9 from "../../Assets/menu/pasta.jpg";
import Image10 from "../../Assets/menu/paneer.jpg";


function Section2() {
  const data = [
    { name: "Pavbhaji", image: Image1 },
    { name: "burger", image: Image2 },
    { name: "Samosa", image: Image3 },
    { name: "Biryani", image: Image4 },
    { name: "Momos", image: Image5 },
    { name: "Sushi", image: Image6 },
    { name: "rabdi", image: Image7 },
    { name: "sandwich", image: Image8},
    { name: "Pasta", image: Image9},
    { name: "Noodles", image: Image10}
  
  ];

  return (
    <div className="section-container">
      <SearchBar data={data} />
    </div>
  );
}

export default Section2;
