// src/Cart.jsx
import React from 'react';

const Cart = ({ cart, setCart }) => {
    const handleRemove = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleQuantityChange = (id, quantity) => {
        setCart(cart.map(item => (item.id === id ? { ...item, quantity } : item)));
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        />
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
        </div>
    );
};

export default Cart;
