'use client';
import {
    AddressElement,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { CartState, ClearCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, notification } from 'antd';

function CheckoutForm({
    total,
    setShowCheckoutModal,
}: {
    total: number;
    setShowCheckoutModal: any;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const { cartItems }: CartState = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();

    const handleSubmit = async (event: any) => {
        try {
            setLoading(true);
            event.preventDefault();

            if (!stripe || !elements)
                throw new Error(`Stripe.js hasn't loaded yet.`);

            const res = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'http://localhost:3000/cart',
                },
                redirect: 'if_required',
            });

            if (res.error) {
                throw res.error;
            }
            notification.success({
                message: 'Payment successful',
                description: 'Your payment was processed successfully',
            });

            const orderPayload = {
                // user: userId,
                items: cartItems,
                paymentStatus: 'paid',
                orderStatus: 'order placed',
                shippingAddress: res.paymentIntent.shipping,
                transationId: res.paymentIntent.id,
                total,
            };

            // save data to backend
            //don't forget to update stock

            dispatch(ClearCart());
            notification.success({
                message: 'Order placed successful',
                description: 'Your order was processed successfully',
            });
        } catch (error: any) {
            notification.error({
                message: 'Payment failed',
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="h-[350px] overflow-y-scroll pr-5">
                    <PaymentElement />
                    <AddressElement
                        options={{
                            allowedCountries: ['US, BR'],
                            mode: 'shipping',
                        }}
                    />
                </div>

                <div className="flex gap-5">
                    <Button
                        htmlType="button"
                        className="mt-5"
                        block
                        onClick={() => {
                            setShowCheckoutModal(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="mt-5"
                        block
                    >
                        Pay
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CheckoutForm;
