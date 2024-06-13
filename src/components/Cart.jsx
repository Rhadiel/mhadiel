import React from 'react';

const Cart = ({ cart, setCart, setView }) => {
    const handleRemove = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id, quantity) => {
        setCart(cart.map(item => (item.id === id ? { ...item, quantity } : item)));
    };

    const handleFractionalQuantityChange = (id, fractionalQuantity) => {
        setCart(cart.map(item => (item.id === id ? { ...item, quantity: parseFloat(fractionalQuantity) } : item)));
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const proceedToCheckout = () => {
        setView('checkout');
    };

    return (
        <div className="cart">
            <h2 style={{ textAlign: 'center' }}>Cart</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.id} className="cart-item">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-price">{item.price.toFixed(2)}</span>
                        <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseFloat(e.target.value))}
                        />
                        <select
                            value={item.quantity}
                            onChange={(e) => handleFractionalQuantityChange(item.id, e.target.value)}
                        >
                            <option value="0.25">0.25 kg (1/4 kilo)</option>
                            <option value="0.5">0.5 kg (1/2 kilo)</option>
                            <option value="0.75">0.75 kg (3/4 kilo)</option>
                            <option value="1">1 kg</option>
                            <option value="1.25">1.25 kg</option>
                            <option value="1.5">1.5 kg</option>
                            <option value="2">2 kg</option>
                            {/* Add more options as needed */}
                        </select>
                        <span className="cart-item-total">{(item.price * item.quantity).toFixed(2)}</span>
                        <button className="remove-btn" onClick={() => handleRemove(item.id)}>X</button>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                <span>Total: </span>
                <span>{total.toFixed(2)}</span>
            </div>
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
    );
};

export default Cart;
