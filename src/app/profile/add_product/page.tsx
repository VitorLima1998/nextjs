'use client';

import React, { useEffect, useState } from 'react';
import ProductForm from '../components/product/ProductForm';
import { useRouter } from 'next/navigation';
import { uploadImageAndReturnUrls } from '@/helpers/ImageHandling';
import { message } from 'antd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function AddProduct() {
    const [selectedFiles = [], setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    interface AddFormProps {
        name: string;
        description: string;
        price: number;
        stock: number;
        categoryId: string;
    }

    interface ImgFormProps {
        url: string;
        productId: string;
    }
    // save product with images
    const onSave = async (values: AddFormProps) => {
        try {
            setLoading(true);
            const imgUrls = await uploadImageAndReturnUrls(selectedFiles);
            values.stock = Number(values.stock);
            const resProduct = await axios.post(
                'http://localhost:3000/product',
                values
            );
            message.success('Product created sucessfully');
            const productId = resProduct.data.id;
            const imageObjects = imgUrls.map((url, index) => ({
                id: uuidv4(),
                url: url,
                productId: productId,
            }));
            await axios.post('http://localhost:3000/image', imageObjects);
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-10">
            <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
            <hr />

            <ProductForm
                setSelectedFiles={setSelectedFiles}
                loading={loading}
                onSave={onSave}
            />
        </div>
    );
}

export default AddProduct;
