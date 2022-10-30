import React, { useEffect } from "react";
import "./OngoingPage.css";
import Fund from "../../components/Fund/Fund";
import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";

const OngoingPage = () => {
    const { state } = useEth();
    const [funds, setFunds] = useState([]);
    useEffect(() => {
        let fundArrFiller = async () => {
            if (state.contract) {
                let num = await state.contract.methods
                    .availableContracts()
                    .call();
                let fundsArr = [];
                for (let i = 0; i < num; i++) {
                   let temp = await state.contract.methods.charities(i).call();
                   console.log("temp is ",temp);
                    fundsArr.push(temp);
                }

                setFunds(fundsArr);
                
                // console.log(funds);
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
        <>
            <h2 className="heading">Ongoing funds</h2>
            { funds?.map((fund) => {
                return (
                    <Fund
                        amountCollected={fund.ammountCollected}
                        charityName={fund.charityName}
                        charityOwner={fund.charityOwner}
                        description={fund.description}
                        isOpen={fund.isOpen}
                        minAmount={fund.minAmount}
                        requiredAmount={fund.requiredAmount}
                    />
                );
            })}
            <div className="funds-wrapper">
                <Fund />
            </div>
        </>
    );
};

export default OngoingPage;
