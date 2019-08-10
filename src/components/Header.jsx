import React from 'react';
import currencies  from './../supported-currencies.json'

function Header(){
    return(
        <div className="header-container">
            <h3>Select Country</h3>
            <select>
              {currencies.map((obj, index) =>
                <option key={`${index}-${obj.country}`} value={obj.currency}> {obj.country} </option>
              )}
            </select>
        </div>
    );
}

export default Header;
