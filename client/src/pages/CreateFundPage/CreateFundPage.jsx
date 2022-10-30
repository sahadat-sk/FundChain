import React, { useEffect } from "react";
import { useState } from "react";
import "./CreateFundPage.css";
import useEth from "../../contexts/EthContext/useEth";

const CreateFundPage = () => {
    const [charityName, setCharityName] = useState("");
    const [ownerAddress, setOwnerAddress] = useState("");
    const [amountRequired, setAmountRequired] = useState("");
    const [minAmountToDonate, setMinAmountToDonate] = useState("");
    const [discription, setDiscription] = useState("");
    const { state } = useEth();
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      if(state.contract){
        setIsLoading(false);
      }
    }, [state.contract])
    


    const handleSubmit = async (event) => {
        // let availContract = await state.contract.methods
        //     .availableContracts()
        //     .call();
        // console.log("available contracts: ", availContract);

        //  address payable _charityowner,
        // string memory _charityname,
        // uint256 _requiredamount,
        // string memory _funddescription,
        // uint256 _minamount

        await state.contract.methods
            .createFund(
                ownerAddress,
                charityName,
                amountRequired,
                discription,
                minAmountToDonate
            )
            .send({ from: state.accounts[0] });

        setCharityName("");
        setOwnerAddress("");
        setAmountRequired("");
        setMinAmountToDonate("");
        setDiscription("");
    };

    return (
        <>
            <h1 className="create-fund-heading">Create Your Own Fund</h1>
            <form>
                <label>
                    Charity Name:
                    <input
                        type="text"
                        value={charityName}
                        onChange={(e) => setCharityName(e.target.value)}
                    />
                </label>
                <label>
                    Owner Address:
                    <input
                        type="text"
                        value={ownerAddress}
                        onChange={(e) => setOwnerAddress(e.target.value)}
                    />
                </label>
                <label>
                    Amount Required:
                    <input
                        type="text"
                        value={amountRequired}
                        onChange={(e) => setAmountRequired(e.target.value)}
                    />
                </label>
                <label>
                    Min amount to donate:
                    <input
                        type="text"
                        value={minAmountToDonate}
                        onChange={(e) => setMinAmountToDonate(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={discription}
                        onChange={(e) => setDiscription(e.target.value)}
                    />
                </label>
            </form>
           {!isLoading? <button className="create-fund-btn" onClick={handleSubmit}>
                Create
            </button>:<p>Loading...</p>}
        </>
    );
};

export default CreateFundPage;
