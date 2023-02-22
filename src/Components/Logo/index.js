import React from "react";
import "./style.css";
import reactIcon from "../Assets/React.png";

const Logo = () => {

    return (
        <div className="header">
            <div className="container_Top">
              <img
                src={reactIcon}
                alt="Logo"
              />
              <h5>React World</h5>
            </div>
        </div>
    );

}

export default Logo;