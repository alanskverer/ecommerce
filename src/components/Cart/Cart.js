import React, { Fragment } from 'react'

import { Container, Grid, Button, Typography } from '@material-ui/core';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

import { Link } from 'react-router-dom';


const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {


    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart yet,
            <Link to='/' className={classes.link}> start adding some items!</Link>
        </Typography>
    )

    const FilledCart = () => (
        <Fragment>
            <Grid container spacing={3}>

                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />

                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={onEmptyCart}>
                        Empty Cart
                    </Button>
                    <Button className={classes.checkOut} size="large" type="button" variant="contained" color="primary">
                        Checkout
                    </Button>
                </div>

            </div>
        </Fragment>

    )

    if (!cart.line_items) return "Loading..."


    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h4" gutterBottom >Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart