import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEth } from "../../contexts/EthContext";
import Charity from "../../contracts/Charity.json";
import "./Description.css";

const Description = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [amountCollected, setAmountCollected] = useState("");
    const [charityName, setCharityName] = useState("");
    const [description, setDescription] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [requiredAmount, setRequiredAmount] = useState("");

    const [amount, setAmount] = useState("");

    const { id } = useParams();
    const { state } = useEth();

    useEffect(() => {
        const setState = async () => {
            setIsLoading(true);
            if (state.contract) {
                try {
                    let contractAddress = await state.contract.methods
                        .charities(id)
                        .call();

                    let instance = new state.web3.eth.Contract(
                        Charity.abi,
                        contractAddress
                    );

                    // amountCollected: "0"
                    // ​charityName: "snew"
                    // charityOwner: "0x95FA9F30fb02a884b7e87ba770D7C0dCFE3Ca59E"
                    // description: "poisa lagbe"
                    // isOpen: true
                    // minAmount: "10"
                    // requiredAmount: "100"
                    setAmountCollected(
                        await instance.methods.amountCollected().call()
                    );
                    setCharityName(await instance.methods.charityName().call());
                    setDescription(await instance.methods.description().call());
                    setMinAmount(await instance.methods.minAmount().call());
                    setRequiredAmount(
                        await instance.methods.requiredAmount().call()
                    );
                    setIsLoading(false);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        setState();
    }, [state.contract,id]);

    const handleDonate = async () => {
        // function donate(uint256 _amount, uint256 _id) public payable
        try {
            let contractAddress = await state.contract.methods
                .charities(id)
                .call();

            let instance = new state.web3.eth.Contract(
                Charity.abi,
                contractAddress
            );
            instance.methods.pay().send({from:state.accounts[0],value:amount});
            setAmount("");
        } catch (err) {
            console.error(err);
            setAmount("");

        }
    };

    return !isLoading ? (
        <section className="main">
            <div className="div1">
                <h1 className="desc-heading">{charityName}</h1>
                <div className="desc">{description}</div>
            </div>
            <div className="div2">
                <div className="progess">
                    <div className="progess-text">
                        Progress: {amountCollected ? amountCollected : 0}/
                        {requiredAmount};
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
                    Min amount to donate is {minAmount}
                </div>
                <div className="past-donors">
                    <h1>Past Donors:</h1>
                    <div className="donor">0x21dww032f23d23r3f23f32</div>
                </div>
            </div>
        </section>
    ) : (
        <p>Loading</p>
    );
};

export default Description;
