import React from 'react'
import "./OngoingPage.css";
import Fund from '../../components/Fund/Fund';

const OngoingPage = () => {
  return (
    <>
    <h2 className="heading">
        Ongoing funds
    </h2>
    <div className="funds-wrapper">
        <Fund/>
    </div>
    </>
  )
}

export default OngoingPage