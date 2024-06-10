import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

const App = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Coke', price: 55 },
        { id: 2, name: 'Sprite', price: 50 },
        { id: 3, name: 'Coke Mismo', price: 20 },
        { id: 4, name: 'Cobra', price: 30 },
        { id: 5, name: 'Water', price: 15 },
        { id: 6, name: 'Zesto', price: 12 },
        { id: 7, name: 'Yakult', price: 13 },
        { id: 8, name: 'Chuckie', price: 25 },
    ]);
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    }

    const updateQuantity = (id, quantity) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: quantity } : item
        ));
    }

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }

    const clearCart = () => {
        setCart([]);
    }

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    return (
        <div className="app">
            <h1>MHADIEL STORE</h1>
            <div className="main-content">
                <ProductList products={products} setProducts={setProducts} addToCart={addToCart} />
                <Cart cartItems={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} total={calculateTotal()} />
                <Checkout total={calculateTotal()} />
            </div>
        </div>
    );
}

export default App;





