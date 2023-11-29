import { getAntdFieldsRequireRule } from '@/helpers/validations';
import { Button, Form, Modal, Upload, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ProductEditFormProps {
    showProductEditForm: boolean;
    setShowProductEditForm: (show: boolean) => void;
    reloadData: () => void;
    productId: string;
}

function ProductEditForm({
    showProductEditForm,
    setShowProductEditForm,
    reloadData,
    productId,
}: ProductEditFormProps) {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const getCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3000/category');
            setCategories(res.data);
        } catch (error: any) {
            message.error(error.message);
        }
    };

    const onSave = async (values: any) => {
        try {
            await axios.patch(
                `http://localhost:3000/product/${productId}`,
                values
            );
            message.success('Product edited successfully!');
            setShowProductEditForm(false);
            reloadData();
        } catch (error: any) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        const loadProductData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/product/${productId}`
                );
                form.setFieldsValue({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    categoryId: res.data.categoryId,
                    stock: res.data.stock,
                });
            } catch (error) {
                message.error(`Error getting product data`);
            }
        };

        if (showProductEditForm && productId) {
            loadProductData();
        }
    }, [showProductEditForm, productId, form]);

    return (
        <Modal
            title={
                <h1 className="text-2xl font-bold text-gray-800">
                    Edit Product
                </h1>
            }
            visible={showProductEditForm}
            onCancel={() => setShowProductEditForm(false)}
            centered
            closable={false}
            okText="Save"
            onOk={() => form.submit()}
        >
            <Form
                layout="vertical"
                className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
                form={form}
                onFinish={onSave}
            >
                <div className="col-span-3">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={getAntdFieldsRequireRule(
                            'Please input product name'
                        )}
                    >
                        <input type="text" />
                    </Form.Item>
                </div>
                <div className="col-span-3">
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={getAntdFieldsRequireRule(
                            'Please input description'
                        )}
                    >
                        <textarea />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={getAntdFieldsRequireRule(
                        'Please input product price'
                    )}
                >
                    <input type="number" />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="categoryId"
                    rules={getAntdFieldsRequireRule('Please select category')}
                >
                    <select>
                        <option value="">Select Category</option>
                        {categories.map((category: any) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </Form.Item>
                <Form.Item
                    label="Count In Stock"
                    name="stock"
                    rules={getAntdFieldsRequireRule(
                        'Please input count in stock'
                    )}
                >
                    <input type="number" />
                </Form.Item>

                <div className="col-span-3">
                    <Upload
                        listType="picture-card"
                        multiple
                        beforeUpload={(file) => {
                            // Implement your file handling logic here
                            return false;
                        }}
                    >
                        Upload
                    </Upload>
                </div>
            </Form>
        </Modal>
    );
}

export default ProductEditForm;
