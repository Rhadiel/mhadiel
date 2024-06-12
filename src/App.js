
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import PurchaseHistory from './components/PurchaseHistory';
import './App.css';



const App = () => {
    const [cart, setCart] = useState([]);
    const [view, setView] = useState('products');

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

  

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="app">
        <nav className="nav-bar">
          <button className={`nav-item ${view === 'products' ? 'active' : ''}`} onClick={() => setView('products')}>Products</button>
          <button className={`nav-item ${view === 'cart' ? 'active' : ''}`} onClick={() => setView('cart')}>Cart</button>
          <button className={`nav-item ${view === 'checkout' ? 'active' : ''}`} onClick={() => setView('checkout')}>Checkout</button>
          <button className={`nav-item ${view === 'history' ? 'active' : ''}`} onClick={() => setView('history')}>Purchase History</button>
        </nav>
        <div className="content">
          {view === 'products' && <ProductList addToCart={addToCart} />}
          {view === 'cart' && <Cart cart={cart} setCart={setCart} />}
          {view === 'checkout' && <Checkout cart={cart} total={total} clearCart={clearCart} />}
          {view === 'history' && <PurchaseHistory />}
        </div>
      </div>
      
    );
};

export default App;



