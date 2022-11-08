import React from "react";
import { Link } from "react-router-dom";
import "./Fund.css";

const Fund = ({ number,amountCollected,charityName,charityOwner,description,isOpen,minAmount,requiredAmount }) => {
    // amountCollected: "0"
    // ​charityName: "snew"
    // charityOwner: "0x95FA9F30fb02a884b7e87ba770D7C0dCFE3Ca59E"
    // description: "poisa lagbe"
    // isOpen: true
    // minAmount: "10"
    // requiredAmount: "100"
    const LINK_URL = "/desc/"+number;

    return (
        <div className="fund">
            <div className="fund-address-wrapper">
                <div className="fund-heading">{charityName}</div>
                {/* <div className="fund-address">{charityOwner}</div> */}
            </div>
            <div className="progess">
                <div className="progess-text">Progress: {amountCollected?amountCollected:0}/{requiredAmount};</div>
                <div className="progress-bar">
                    <div className="progress" style={{
                        width:`{amountCollected}/{requiredAmount}%`,
                        bakcgroundColor:"green"
                    }}></div>
                </div>
            </div>

            <Link to={LINK_URL}>
                <button className="fund-donate">Donate</button>
            </Link>
          
        </div>
    );
};

export default Fund;
