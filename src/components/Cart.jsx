import React from 'react';

const Cart = ({ cartItems, updateQuantity, removeFromCart, clearCart, total }) => {
    return (
        <div className="cart">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id} className="cart-item">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-price">{item.price.toFixed(2)}</span>
                            <input 
                                type="number" 
                                min="1" 
                                value={item.quantity} 
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))} 
                            />
                            <span className="cart-item-total">{(item.price * item.quantity).toFixed(2)}</span>
                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>X</button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="cart-total">
                <h3 >Total: {total.toFixed(2)}</h3>
                <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
            </div>
        </div>
    );
}

export default Cart;
