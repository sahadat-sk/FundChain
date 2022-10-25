import React from 'react'
import "./CreateFundPage.css"
const CreateFundPage = () => {
  return (
      <>
          <h1 className="create-fund-heading">Create Your Own Fund</h1>
          <form>
              <label>
                  Charity Name:
                  <input type="text" />
              </label>
              <label>
                  Owner Address:
                  <input type="text" />
              </label>
              <label>
                  Amount Required:
                  <input type="text" />
              </label>
              <label>
                  Min amount to donate:
                  <input type="text" />
              </label>
              <label>
                Description:
                <input type="text" />
              </label>

              <button className='create-fund-btn'>Create</button>
          </form>

      </>
  );
}

export default CreateFundPage