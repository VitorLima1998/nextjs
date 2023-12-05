'use client';
import { ProductInterface } from '@/interfaces';
import { AddProductToCart, CartState } from '@/redux/cartSlice';
import { Button, message, notification } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddtoCartBtn({ product }: { product: ProductInterface }) {
    const { cartItems }: CartState = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();

    return (
        <div>
            <Button
                type="primary"
                onClick={(e) => {
                    dispatch(
                        AddProductToCart({
                            ...product,
                            quantity: 1,
                        })
                    );
                    notification.success({
                        message: 'Added to cart',
                        description: `${product.name} has been added to cart`,
                    });
                }}
                disabled={cartItems.some(
                    (item: ProductInterface) => item.id === product.id
                )}
            >
                Add Cart
            </Button>
        </div>
    );
}

export default AddtoCartBtn;
