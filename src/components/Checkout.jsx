import React, { useState } from 'react';

const Checkout = ({ total }) => {
    const [money, setMoney] = useState(0);
    const [change, setChange] = useState(0);

    const handleCheckout = () => {
        const changeAmount = parseFloat(money) - total;
        setChange(changeAmount);
    }

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <input 
                type="number" 
                placeholder="Money given" 
                value={money} 
                onChange={e => setMoney(e.target.value)} 
            />
            <button onClick={handleCheckout} style={{marginBottom:'2rem'}}>Calculate Change</button>
            <h3>Change: {change.toFixed(2)}</h3>
        </div>
    );
}

export default Checkout;
