import React from 'react'
import "./Description.css"

const Description = () => {

  
  return (
      <section className='main'>
          <div className="div1">
              <h1 className="desc-heading">New Charity</h1>
              {/* <div className="desc"></div> */}
              <input type="text" id="Name" class="charity-desc" name="Name" placeholder='This is a new charity your help will be appreciated.'></input>
          </div>
          <div className="div2">
              <div className="progess">
                  <div className="progress-text">Progress: 10/100;</div>
                  <div className="progress-bar"></div>
              </div>
              <form className='donation'>
                {/* <input type="text" /> */}
                <button className="donate-btn">
                    Donate
                </button>
              </form>
              <div className="past-donors">
                <h1>Past Donors:</h1>
                <div className="donor">0x21dww032f23d23r3f23f32</div>
              </div>
          </div>
      </section>
  );
}

export default Description