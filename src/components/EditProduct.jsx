import React, { useState } from 'react';

const EditProduct = ({ product, products, setProducts, setShowEditProduct }) => {
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);

    const handleSave = () => {
        const updatedProducts = products.map(p => 
            p.id === product.id ? { ...p, name: editedName, price: parseFloat(editedPrice) } : p
        );
        setProducts(updatedProducts);
        setShowEditProduct(false);
    }

    return (
        <div className="edit-product">
            <h2>Edit Product</h2>
            <input 
                type="text" 
                value={editedName} 
                onChange={e => setEditedName(e.target.value)} 
            />
            <input 
                type="number" 
                value={editedPrice} 
                onChange={e => setEditedPrice(e.target.value)} 
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setShowEditProduct(false)}>Cancel</button>
        </div>
    );
}

export default EditProduct;
