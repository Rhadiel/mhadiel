import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const PurchaseHistory = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            const { data, error } = await supabase
                .from('purchases')
                .select('*');
            if (error) {
                console.error('Error fetching purchases:', error);
            } else {
                setPurchases(data);
            }
        };
        fetchPurchases();
    }, []);

    const handleStatusChange = async (id, status) => {
        const { data, error } = await supabase
            .from('purchases')
            .update({ status })
            .eq('id', id)
            .select('*');
        if (error) {
            console.error('Error updating status:', error);
        } else {
            setPurchases(purchases.map(purchase => purchase.id === id ? data[0] : purchase));
        }
    };

    return (
        <div className="purchase-history">
            <h2 style={{ textAlign: 'center' }}>Purchase History</h2>

            <ul>
                {purchases.map(purchase => (
                    <li key={purchase.id}>
                        <div className="purchase-details">
                            <div className="purchase-detail">
                                <span className="detail-label">Name:</span>
                                <span className="detail-value">{purchase.name}</span>
                            </div>
                            <div className="purchase-detail">
                                <span className="detail-label">Products:</span>
                                <span className="detail-value">{purchase.products}</span>
                            </div>
                            <div className="purchase-detail">
                                <span className="detail-label">Total:</span>
                                <span className="detail-value">{purchase.total.toFixed(2)}</span>
                            </div>
                            <div className="purchase-detail">
                                <span className="detail-label">Paid:</span>
                                <span className="detail-value">{purchase.paid.toFixed(2)}</span>
                            </div>
                            <div className="purchase-detail">
                                <span className="detail-label">Status:</span>
                                <span className={`detail-value ${purchase.status === 'Paid' ? 'paid' : 'unpaid'}`}>
                                    {purchase.status}
                                </span>
                                <button className="status-button" onClick={() => handleStatusChange(purchase.id, purchase.status === 'Paid' ? 'Unpaid' : 'Paid')}>
                                    {purchase.status === 'Paid' ? 'Mark as Unpaid' : 'Mark as Paid'}
                                </button>
                            </div>
                            {purchase.status === 'Paid' && (
                                <div className="purchase-detail">
                                    <span className="detail-label">Change:</span>
                                    <span className="detail-value">{purchase.change.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="purchase-detail">
                                <span className="detail-label">Amount to be Paid:</span>
                                <span className="detail-value">{purchase.amount_to_be_paid.toFixed(2)}</span>
                            </div>
                            <hr className="purchase-divider" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PurchaseHistory;
