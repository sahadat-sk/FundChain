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
    const [pastDonors, setPastDonors] = useState([]);
    const [width, setWidth] = useState(5);
    const [refresh, setRefresh] = useState(true);

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
                    
                    console.log(await instance.methods.getDonors().call());

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
                    setPastDonors(await instance.methods.getDonors().call());
                    setWidth((amountCollected / requiredAmount) * 100);
                    console.log((amountCollected / requiredAmount) * 100);
                    // console.log(
                    //     await instance.methods.getCollectionPercentage().call()
                    // );
                    setIsLoading(false);
                } catch (err) {
                    console.error(err  );
                }
            }
        };

        setState();
    }, [state.contract, id, amountCollected, requiredAmount, refresh]);

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
            await instance.methods
                .pay()
                .send({ from: state.accounts[0], value: amount });
            setAmount("");
            setRefresh(!refresh);
        } catch (err) {
            console.error(err);
            setAmount("");
            setRefresh(!refresh);
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
                    <div className="progress-bar">
                        <div
                            className="fullfilled"
                            style={{
                                backgroundColor: "green",
                                width: `${width}%`,
                                height: "100%",
                                borderRadius: "16rem",
                            }}
                        ></div>
                    </div>
                </div>
                <form>
                    <input
                        type="text"
                        value={amount}
                        placeholder= {"Minimum amount to donate is "+minAmount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                </form>
                <button className="donate-btn" onClick={handleDonate}>
                    Donate
                </button>
                
                <div className="past-donors">
                    <h1>Past Donors:</h1>
                    {pastDonors?.map((pastDonor) => {
                        return (
                            <div key="pastDonor" className="donor">
                                {pastDonor}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    ) : (
        <p>Loading</p>
    );
};

export default Description;
