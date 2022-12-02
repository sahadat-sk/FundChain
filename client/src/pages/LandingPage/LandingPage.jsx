import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const LandingPage = () => {
    return (
        <>
            <section className="landingpage" style={{
                background:`url("/backround.jpg")`,
                backgroundSize:"cover",
                backgroundRepeat:"no-repeat",
                backgroundPosition:"center",
                height:"100vh",
            }}>
                <Navbar path="/logodark.svg"></Navbar>
                <div className="main-heading-wrapper">
                    <span className="main-heading">Your</span>
                    <span className="main-heading1"> Support</span>
                    <span className="main-heading"> Matters</span>
                </div>

                <div className="buttons-wrapper">
                    <Link to="/ongoing">
                        <button className="donate-btn">Ongoing Funds</button>
                    </Link>
                    <Link to="/createfund">
                        <button className="create-own-fund-btn">
                            Create Your Own Fund
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
