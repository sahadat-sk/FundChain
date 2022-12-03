import React, { useEffect } from "react";
import "./OngoingPage.css";
import Fund from "../../components/Fund/Fund";
import useEth from "../../contexts/EthContext/useEth";
import Charity from "../../contracts/Charity.json";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const OngoingPage = () => {
    const { state } = useEth();
    const [funds, setFunds] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        let fundArrFiller = async () => {
            if (state.contract) {
                try {
                    let num = await state.contract.methods
                        .availableContracts()
                        .call(); //availvable contracts.
                    let fundsArr = [];
                    //charityOwner = payable(_charityowner);
                    // charityName = _charityname;
                    // requiredAmount = _requiredamount;
                    // description = _funddescription;
                    // minAmount = _minamount;
                    // tags = new string[](0);
                    // isOpen = true;
                    // doners = new address[](0);
                    // amountCollected = 0;
                    for (let i = 0; i < num; i++) {
                        let temp = await state.contract.methods
                            .charities(i)
                            .call();
                        let tempObj = {};
                        let instance = new state.web3.eth.Contract(
                            Charity.abi,
                            temp
                        );
                        tempObj.number = i;
                        tempObj.charityName = await instance.methods
                            .charityName()
                            .call();
                        tempObj.requiredAmount = await instance.methods
                            .requiredAmount()
                            .call();
                        tempObj.amountCollected = await instance.methods
                            .amountCollected()
                            .call();
                        tempObj.charityOwner = await instance.methods
                            .charityOwner()
                            .call();
                        tempObj.isOpen = await instance.methods.isOpen().call();

                        fundsArr.push(tempObj);
                    }
                    setFunds(fundsArr);
                } catch (err) {
                    console.error(err);
                }

                // console.log(temp);
            }
        };
        fundArrFiller();
        console.log(funds);
    }, [state.contract]);

    // amountCollected: "0"
    // ​charityName: "snew"
    // charityOwner: "0x95FA9F30fb02a884b7e87ba770D7C0dCFE3Ca59E"
    // description: "poisa lagbe"
    // isOpen: true
    // minAmount: "10"
    // requiredAmount: "100"

    return (
        <section
            style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height:"100vh",
                width:"100vw"
            }}
        >
            <h2 className="heading">Ongoing funds</h2>
            <div className="all-running-btn-wrapper">
                <button className="donate-btn" onClick={() => setShowAll(true)}>
                    Show All Charities
                </button>
                <button
                    className="donate-btn"
                    onClick={() => setShowAll(false)}
                >
                    Show Running Charities
                </button>
            </div>

            {showAll ? (
                <div className="funds-wrapper">
                    {funds?.map((fund) => {
                        return (
                            <Fund
                                key={fund.number}
                                number={fund.number}
                                amountCollected={fund.amountCollected}
                                charityName={fund.charityName}
                                requiredAmount={fund.requiredAmount}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="funds-wrapper">
                    {funds?.map((fund) => {
                        return fund.isOpen ? (
                            <Fund
                                key={fund.number}
                                number={fund.number}
                                amountCollected={fund.amountCollected}
                                charityName={fund.charityName}
                                requiredAmount={fund.requiredAmount}
                            />
                        ) : null;
                    })}
                </div>
            )}
        </section>
    );
};

export default OngoingPage;
