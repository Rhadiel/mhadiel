import React, { useState } from 'react';
import EditProduct from './EditProduct';

const ProductList = ({ products, setProducts, addToCart }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [productToEdit, setProductToEdit] = useState(null);
    const [displayList, setDisplayList] = useState(false); // New state for controlling product list display

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        const price = parseFloat(newProductPrice);
        if (newProductName && !isNaN(price)) {
            const newProduct = { id: Date.now(), name: newProductName, price };
            setProducts([...products, newProduct]);
            setNewProductName('');
            setNewProductPrice('');
            setShowAddProduct(false);
        }
    }

    const handleEditProduct = (product) => {
        setProductToEdit(product);
        setShowEditProduct(true);
    }

    return (
        <div className="product-list">
            <h2>Products</h2>
            <input 
                type="text" 
                placeholder="Search products" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
            />
            <div className="button-group" style={{justifyContent:'center'}}>
                <button onClick={() => setShowAddProduct(true)} >ADD PRODUCT</button>
                <button onClick={() => setDisplayList(!displayList)}>DISPLAY LIST</button>
            </div>

            {showAddProduct && (
                <div className="add-product-form">
                    <input 
                        type="text" 
                        placeholder="Product name" 
                        value={newProductName} 
                        onChange={e => setNewProductName(e.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder="Product price" 
                        value={newProductPrice} 
                        onChange={e => setNewProductPrice(e.target.value)} 
                    />
                    <div className="button-group" style={{justifyContent:'center'}}>
                        <button onClick={handleAddProduct}>Add Product</button>
                        <button onClick={() => setShowAddProduct(false)}>Done</button>
                    </div>
                </div>
            )}

            {/* Display the list of products only if displayList state is true */}
            {displayList && (
                <ul>
                    {filteredProducts.map(product => (
                        <li key={product.id} className="product-item">
                            <span className="product-name">{product.name}</span>
                            <span className="product-price">{product.price.toFixed(2)}</span>
                            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                            <button className="edit-btn" onClick={() => handleEditProduct(product)}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}

            {showEditProduct && (
                <EditProduct 
                    product={productToEdit} 
                    setProducts={setProducts} 
                    products={products}
                    setShowEditProduct={setShowEditProduct}
                />
            )}
        </div>
    );
}

export default ProductList;
