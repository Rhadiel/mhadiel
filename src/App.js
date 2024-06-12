// import React, { useState } from 'react';
// import ProductList from './components/ProductList';
// import Cart from './components/Cart';
// import Checkout from './components/Checkout';
// import './App.css';

// const App = () => {
//     const [products, setProducts] = useState([
//         { id: 1, name: 'Coke', price: 55 },
//         { id: 2, name: 'Sprite', price: 50 },
//         { id: 3, name: 'Coke Mismo', price: 20 },
//         { id: 4, name: 'Cobra', price: 30 },
//         { id: 5, name: 'Water', price: 15 },
//         { id: 6, name: 'Zesto', price: 12 },
//         { id: 7, name: 'Yakult', price: 13 },
//         { id: 8, name: 'Chuckie', price: 25 },
//     ]);
//     const [cart, setCart] = useState([]);

//     const addToCart = (product) => {
//         const existingProduct = cart.find(item => item.id === product.id);
//         if (existingProduct) {
//             setCart(cart.map(item =>
//                 item.id === product.id
//                     ? { ...item, quantity: item.quantity + 1 }
//                     : item
//             ));
//         } else {
//             setCart([...cart, { ...product, quantity: 1 }]);
//         }
//     }

//     const updateQuantity = (id, quantity) => {
//         setCart(cart.map(item =>
//             item.id === id ? { ...item, quantity: quantity } : item
//         ));
//     }

//     const removeFromCart = (id) => {
//         setCart(cart.filter(item => item.id !== id));
//     }

//     const clearCart = () => {
//         setCart([]);
//     }

//     const calculateTotal = () => {
//         return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     }

//     return (
//         <div className="app">
//             <h1>MHADIEL STORE</h1>
//             <div className="main-content">
//                 <ProductList products={products} setProducts={setProducts} addToCart={addToCart} />
//                 <Cart cartItems={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} total={calculateTotal()} />
//                 <Checkout total={calculateTotal()} />
//             </div>
//         </div>
//     );
// }

// export default App;



// src/App.js

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

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
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



