import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEth } from "../../contexts/EthContext";
import "./Description.css";

const Description = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fund, setFund] = useState({});
    const [amount, setAmount] = useState(0);

    const { id } = useParams();
    const { state } = useEth();

    useEffect(() => {
        const setState = async () => {
            setIsLoading(true);
            if (state.contract) {
                setFund(await state.contract.methods.charities(id).call());
                setIsLoading(false);
                console.log(fund);
            }
        };

        setState();
    }, [state.contract]);

    const handleDonate = async () => {
        // function donate(uint256 _amount, uint256 _id) public payable

        await state.contract.methods
            .donate(amount, id)
            .send({ from: state.accounts[0] });
    };

    // amountCollected: "0"
    // ​charityName: "snew"
    // charityOwner: "0x95FA9F30fb02a884b7e87ba770D7C0dCFE3Ca59E"
    // description: "poisa lagbe"
    // isOpen: true
    // minAmount: "10"
    // requiredAmount: "100"

    return !isLoading ? (
        <>
            <div className="div1">
                <h1 className="desc-heading">{fund.charityName}</h1>
                <h2 className="owner">{fund.charityOwner}</h2>
                <div className="desc">{fund.description}</div>
            </div>
            <div className="div2">
                <div className="progess">
                    <div className="progess-text">
                        Progress:{" "}
                        {fund.amountCollected ? fund.amountCollected : 0}/
                        {fund.requiredAmount};
                    </div>
                    <div className="progress-bar"></div>
                </div>
                <form>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                </form>
                <button className="donate-btn" onClick={handleDonate}>
                    Donate
                </button>
                <div className="min-amount">
                    Min amount to donate is {fund.minAmount}
                </div>
                <div className="past-donors">
                    <h1>Past Donors:</h1>
                    <div className="donor">0x21dww032f23d23r3f23f32</div>
                </div>
            </div>
        </>
    ) : (
        <p>Loading</p>
    );
};

export default Description;
