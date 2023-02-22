import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div>
        <ul>

          <Link exact to="/">
            <li style={{display:"inline", color:"black",marginRight:"50px", marginLeft:"10px"}}>
              Home
            </li>
          </Link>

          <Link to="/About">
            <li style={{display:"inline", color:"black"}}>
              About
            </li>
          </Link>
        </ul>
      </div>
      <hr style={{width:"160px"}}/>
    </div>
  );
};

export default NavBar;