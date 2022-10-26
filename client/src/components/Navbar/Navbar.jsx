import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';

const Navbar = () => {
  const [address,setAddress] = useState("none");
  const {state} = useEth();
  useEffect(() => {
    let curraddress = "none";
    if(state.accounts) curraddress =  state.accounts[0];
    setAddress(curraddress);
    // console.log(state.accounts);
  }, [state.accounts])
  
  return (
      <nav className="navbar">
          <img src="/logo.png" alt="eth-raiser" className="logo" />
          <div className="account">{address}</div>
      </nav>
  );
}

export default Navbar