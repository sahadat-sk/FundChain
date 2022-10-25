import React from "react";
import { Link } from "react-router-dom";
import "./Fund.css";

const Fund = () => {
    return (
        <div className="fund">
            <div className="fund-address-wrapper">
                <div className="fund-heading">New fund</div>
                <div className="fund-address">0x21dww032f23d23r3f23f32</div>
            </div>
            <div className="progess">
                <div className="progess-text">Progress: 10/100;</div>
                <div className="progress-bar"></div>
            </div>
            <Link to="/desc">
                <button className="fund-donate">Donate</button>
            </Link>
        </div>
    );
};

export default Fund;
