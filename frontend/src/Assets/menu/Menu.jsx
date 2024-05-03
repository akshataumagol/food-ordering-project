// MenuPage.js
import React from 'react';
import "../../Styles/MenuStyle.css";
/* <div class="card" style="widrh:18rem;">
              <img src="..." class="card-img-top" alt="..."/>
                <div className="card-body">
               <h5 className="card-title">Card title</h5>
                 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
              </div>*/

import img1 from "../assets/"
const MenuPage = () => {
  return  ( <>  
  <div className="Menu">
 <div className="container">
    <div className="row gx-0">
        <div className="col-md-4">
            <div className="menu_col">
           <img src={img1} alt=""/>
           <h1>hdcjsdh</h1>
           <h6>dsfasfcedshefwbj</h6>
           <p></p>
           <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
           </div>

            </div>
        </div>
        <div className="col-md-4">
            <div className="menu_col"></div>
        </div>
        <div className="col-md-4">
            <div className="menu_col"></div>
        </div>
    </div>
 </div>
    </div>
   </> 
);
  }
export default Menu;
