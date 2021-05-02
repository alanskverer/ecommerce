import React, { useEffect } from 'react'
import { Typography, Divider, Button } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const stripePromise = loadStripe("...");

const PaymentForm = ({ shippingData, checkoutToken, backStep, nextStep }) => {

    useEffect(() => {
        console.log(shippingData)

    }, [])

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>{({ elements, stripe }) => (
                    //   <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                    <form >
                        <CardElement />
                        <br /> <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={backStep}>Back</Button>
                            <Button type="submit" variant="contained" disabled={!stripe} color="primary" onClick={nextStep} >
                                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                            </Button>
                        </div>
                    </form>
                )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
