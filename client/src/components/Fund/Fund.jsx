import React from "react";
import { Link } from "react-router-dom";
import "./Fund.css";

const Fund = ({ amountCollected,charityName,charityOwner,description,isOpen,minAmount,requiredAmount }) => {
    // amountCollected: "0"
    // ​charityName: "snew"
    // charityOwner: "0x95FA9F30fb02a884b7e87ba770D7C0dCFE3Ca59E"
    // description: "poisa lagbe"
    // isOpen: true
    // minAmount: "10"
    // requiredAmount: "100"

    return (
        <div className="fund">
            <div className="fund-address-wrapper">
                <div className="fund-heading">{charityName}</div>
                <div className="fund-address">{charityOwner}</div>
            </div>
            <div className="progess">
                <div className="progess-text">Progress: {amountCollected}/{requiredAmount};</div>
                <div className="progress-bar"></div>
            </div>
            <Link to="/desc">
                <button className="fund-donate">Donate</button>
            </Link>
        </div>
    );
};

export default Fund;
