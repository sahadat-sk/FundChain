import React from 'react'
import "./Description.css"

const Description = () => {
  return (
      <>
          <div className="div1">
              <h1 className="desc-heading">New Charity</h1>
              <div className="desc"></div>
          </div>
          <div className="div2">
              <div className="progess">
                  <div className="progess-text">Progress: 10/100;</div>
                  <div className="progress-bar"></div>
              </div>
              <form>
                <input type="text" />
                <button className="donate-btn">
                    Donate
                </button>
              </form>
              <div className="past-donors">
                <h1>Past Donors:</h1>
                <div className="donor">0x21dww032f23d23r3f23f32</div>
              </div>
          </div>
      </>
  );
}

export default Description