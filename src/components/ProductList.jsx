import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import EditProduct from './EditProduct';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [productToEdit, setProductToEdit] = useState(null);
    const [addedProducts, setAddedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*');
            if (error) {
                console.error('Error fetching products:', error);
            } else {
                setProducts(data);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        const price = parseFloat(newProductPrice);
        if (newProductName && !isNaN(price)) {
            const { data, error } = await supabase
                .from('products')
                .insert([{ name: newProductName, price }])
                .select('*');
            if (error) {
                console.error('Error adding product:', error);
            } else {
                setProducts([...products, ...data]);
                setNewProductName('');
                setNewProductPrice('');
            }
        }
    };

    const handleEditProduct = (product) => {
        setProductToEdit(product);
        setShowEditProduct(true);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProducts([...addedProducts, product.id]);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list">
            <div className="header">
                <h2 style={{ textAlign: 'center', display: 'inline', marginLeft:'20rem', fontSize:'2rem' }}>Products</h2>
                <button 
                    onClick={() => setShowAddProduct(true)} 
                    style={{ float: 'right', marginRight: '1rem', marginTop: '.5rem' }}
                >
                    ADD PRODUCT
                </button>
            </div>
            <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '48.2rem', marginBottom: '1rem', marginTop:'1rem', marginLeft:'-.4rem' }}
            />

            {showAddProduct && (
                <div className="add-product-form">
                    <input
                        type="text"
                        placeholder="Product name"
                        value={newProductName}
                        onChange={e => setNewProductName(e.target.value)}
                        style={{ width: '20rem', marginRight: '1rem', textAlign: 'center' }}
                    />
                    <input
                        type="number"
                        placeholder="Product price"
                        value={newProductPrice}
                        onChange={e => setNewProductPrice(e.target.value)}
                        style={{ width: '20rem', marginRight: '1rem', textAlign: 'center' }}
                    />
                    <div className="button-group" style={{ justifyContent: 'center' }}>
                        <button onClick={handleAddProduct}>Add Product</button>
                        <button onClick={() => setShowAddProduct(false)}>Done</button>
                    </div>
                </div>
            )}

            <ul>
                {filteredProducts.map(product => (
                    <li key={product.id} className="product-item">
                        <span className="product-name">{product.name}</span>
                        <span className="product-price">{product.price.toFixed(2)}</span>
                        <button
                            className={`add-to-cart-btn ${addedProducts.includes(product.id) ? 'added' : ''}`}
                            onClick={() => handleAddToCart(product)}
                            disabled={addedProducts.includes(product.id)}
                        >
                            {addedProducts.includes(product.id) ? 'Added' : 'Add to Cart'}
                        </button>
                        <button className="edit-btn" onClick={() => handleEditProduct(product)}>Edit</button>
                    </li>
                ))}
            </ul>

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
};

export default ProductList;
