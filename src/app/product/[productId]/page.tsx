import { message } from 'antd';
import axios from 'axios';
import { cookies } from 'next/headers';
import React from 'react';

import ProductImages from './ProductImages';
import ProductActionButtons from './ProductActionButtons';

async function getProduct(productId: string) {
    try {
        const cookieStore = cookies().get('token')?.value;

        const res = await axios.get(
            `${process.env.DOMAIN}/product/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${cookieStore}`,
                    Cookie: cookieStore,
                },
            }
        );

        return res.data || [];
    } catch (error: any) {
        console.error(error);
        message.error(error.message);
    }
}

async function ProductInfo({ params }: { params: { productId: string } }) {
    const product = await getProduct(params.productId);
    return (
        <div className="mt-10 px-10">
            {product && (
                <div className="grid grid-cols-2 gap-5 p-5">
                    <ProductImages product={product}></ProductImages>

                    <div className="flex flex-col gap-5">
                        <div>
                            <h1 className="text-3xl font-semibold">
                                {product.name}
                            </h1>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">
                                Description
                            </h1>
                            <p className="text-sm">{product.description}</p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <h1 className="text-5xl font-semibold">
                                $ {product.price}
                            </h1>
                        </div>
                        <ProductActionButtons
                            product={product}
                        ></ProductActionButtons>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductInfo;
