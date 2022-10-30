import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <section className="landingpage">
                <div className="main-heading-wrapper">
                    <div className="main-heading">Your</div>
                    <div className="main-heading1">Support</div>
                    <div className="main-heading">is Powerful</div>
                </div>
                    
                
                <img src="/heropic.png" alt="children" className="main-img" />
            </section>
            <div className="buttons-wrapper">
                        <Link to="/ongoing">
                            <button className="donate-btn">Donate</button>
                        </Link>
                        <Link to="/createfund">
                            <button className="create-own-fund-btn">Create fund</button>
                        </Link>
                    </div>
        </>
    );
};

export default LandingPage;
