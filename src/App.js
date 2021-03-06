import React, { useState, useEffect } from 'react'
// import Products from './components/Products/Products';
// import NavBar from './components/NavBar/NavBar';

import { Products, NavBar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { commerce } from './lib/commerce' // this is like backend with my API key;



const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({})


    const fetchProducts = async () => {
        const res = await commerce.products.list();
        // console.log(res.data)
        setProducts(res.data);
    }

    const fetchProductsQuery = async (productName) => {

        if (productName.length == 0) {
            return fetchProducts();
        }
        else if (productName.length < 2) {
            return null;
        }

        const res = await commerce.products.list(({
            query: productName,
        }));


        if (!res.data) {
            let noRes = {
                id: 'noResults'
            }
            let arr = [];
            arr.push(noRes)
            // console.log(arr)
            setProducts(arr)
            // console.log(noRes)
        }
        else {
            setProducts(res.data);
        }

    }

    const fetchCart = async () => {
        const res = await commerce.cart.retrieve();
        // console.log(res)
        // alert(1)
        setCart(res);
    }

    const handleAddToCart = async (productId, quantity) => {
        const res = await commerce.cart.add(productId, quantity);

        setCart(res.cart)
    }


    const handleUpdateCartQty = async (lineItemId, quantity) => {
        const res = await commerce.cart.update(lineItemId, { quantity });

        setCart(res.cart);
    };

    const handleRemoveFromCart = async (lineItemId) => {
        const res = await commerce.cart.remove(lineItemId);

        setCart(res.cart);
    };


    const handleEmptyCart = async () => {
        const res = await commerce.cart.empty();

        setCart(res.cart);
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    // console.log(cart)

    return (
        <Router>
            <NavBar totalItems={cart.total_items} fetchProductsQuery={(productsQuery) => fetchProductsQuery(productsQuery)} />
            <Switch>
                <Route exact path='/'>
                    <Products products={products} onAddToCart={handleAddToCart} fetchProducts={fetchProducts} />

                </Route>
                <Route exact path='/cart'>
                    <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
                </Route>
                <Route exact path='/checkout'>
                    <Checkout cart={cart} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
