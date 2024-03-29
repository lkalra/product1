import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

// Sample product data
const products = [
  { id: 1, name: 'Product 1', price: 9.99, image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Product 2', price: 19.99, image: 'https://via.placeholder.com/100' },
];

// Component for displaying the product catalog
const ProductCatalog = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <h1>Product Catalog</h1>
      <>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3 style={{ margin: "auto"}}>{product.name}</h3>
            <p style={{ margin: "auto"}}>${product.price}</p>
            <button style={{ margin: "8px 0px"}} onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </>
      <ul><li>
      <Link to="/cart">
        <span style={{ margin: "0px 3px"}}><FaShoppingCart /> {cart.length}</span>
      </Link>
      </li></ul> 
    </div>
  );
};

// Component for displaying the cart
const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <h1>Cart</h1>
      <>
        {cart.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3 style={{ margin: "auto"}}>{product.name}</h3>
            <p style={{ margin: "auto"}}>${product.price}</p>
          </div>
        ))}
      </>
      <p>Total: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

// Router component
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Product Catalogue</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductCatalog />}/>

          <Route path="/cart" element={<Cart />}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;