import React, { useState } from 'react';
import { supabase } from './supabase';

const EditProduct = ({ product, setProducts, products, setShowEditProduct }) => {
    const [editedProductName, setEditedProductName] = useState(product.name);
    const [editedProductPrice, setEditedProductPrice] = useState(product.price);

    const handleSave = async () => {
        const { data, error } = await supabase
            .from('products')
            .update({ name: editedProductName, price: editedProductPrice })
            .eq('id', product.id)
            .select('*');
        
        if (error) {
            console.error('Error updating product:', error);
            return;
        }

        // Update the products state with the updated product
        const updatedProducts = products.map((p) => 
            p.id === product.id ? data[0] : p
        );

        setProducts(updatedProducts);
        setShowEditProduct(false);
    };

    return (
        <div className="edit-product">
            <h2 style={{textAlign:'center'}}>Edit Product</h2>
            <input
                type="text"
                placeholder="Product name"
                value={editedProductName}
                onChange={(e) => setEditedProductName(e.target.value)}
                style={{ width: '20rem', marginRight: '1rem', textAlign: 'center' }}
                />
            <input
                type="number"
                placeholder="Product price"
                value={editedProductPrice}
                onChange={(e) => setEditedProductPrice(e.target.value)}
                style={{ width: '20rem', marginRight: '1rem', textAlign: 'center' }}

            />
            <div className="button-group">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setShowEditProduct(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default EditProduct;
