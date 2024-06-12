import React, { useState } from 'react';
import { supabase } from './supabase';

const Checkout = ({ cart, total, clearCart }) => {
    const [payment, setPayment] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const handlePaymentChange = (e) => {
        setPayment(e.target.value ? parseFloat(e.target.value) : '');
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCheckout = async () => {
        if (!payment) {
            setMessage('Purchase Pending');
            const products = cart.map(item => `${item.name} x ${item.quantity}`).join(', ');

            const { error } = await supabase
                .from('purchases')
                .insert([{ name, products, total, paid: payment, change: 0, status: 'Unpaid', amount_to_be_paid: total }]);

            if (error) {
                console.error('Error saving purchase:', error);
                setMessage('Error saving purchase');
            } else {
                clearCart();
                setName('');
            }
        } else {
            const change = payment - total;
            if (change < 0) {
                setMessage('Insufficient payment');
                return;
            }

            const products = cart.map(item => `${item.name} x ${item.quantity}`).join(', ');

            const { error } = await supabase
                .from('purchases')
                .insert([{ name, products, total, paid: payment, change, status: 'Paid', amount_to_be_paid: 0 }]);

            if (error) {
                console.error('Error saving purchase:', error);
                setMessage('Error saving purchase');
            } else {
                setMessage('Purchase successful');
                clearCart();
                setPayment('');
                setName('');
            }
        }
    };

    const handlePayLater = async () => {
        setMessage('Purchase Pending');
        const products = cart.map(item => `${item.name} x ${item.quantity}`).join(', ');
    
        const { error } = await supabase
            .from('purchases')
            .insert([{ name, products, total, paid: 0, change: total, status: 'Unpaid', amount_to_be_paid: total }]);
    
        if (error) {
            console.error('Error saving purchase:', error);
            setMessage('Error saving purchase');
        } else {
            setMessage('Purchase Pending');
            clearCart();
            setName('');
        }
    };
    

    const change = payment - total;

    return (
        <div className="checkout">
            <h2 style={{ textAlign: 'center' }}>Checkout</h2>
            <div className="checkout-total">
                <span>Total: </span>
                <span>{total.toFixed(2)}</span>
            </div>
            <input
                type="text"
                placeholder="Enter buyer's name"
                value={name}
                onChange={handleNameChange}
                style={{ width: '49rem', marginLeft: '-1px' }}
            />
            <input
                type="number"
                placeholder="Enter payment amount"
                value={payment}
                onChange={handlePaymentChange}
                style={{ width: '49rem' }}
            />
            <button onClick={handleCheckout}>Pay</button>
            <button onClick={handlePayLater}>Pay Later</button>
            <div className="checkout-change">
                <span>Change: </span>
                <span>{change >= 0 ? change.toFixed(2) : 'Insufficient payment'}</span>
            </div>
            <div className="checkout-message">
                <span>{message}</span>
            </div>
        </div>
    );
};

export default Checkout;
