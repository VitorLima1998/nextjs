/* eslint-disable @next/next/no-img-element */
import { Button, Popconfirm, Table, message } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ProductEditForm from './ProductEditForm';

function ProductsList() {
    const router = useRouter();
    const [showProductEditForm, setShowProductEditForm] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(
        null
    );
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:3000/product');
            setProducts(res.data);
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId: string) => {
        try {
            await axios.delete(`http://localhost:3000/product/${productId}`);
            message.success('Product deleted successfully!');
            getProducts();
        } catch (error) {
            message.error('Error deleting product');
        }
    };

    const handleEdit = async (productId: string) => {
        setSelectedProductId(productId);
        setShowProductEditForm(true);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <img
                    src={record.images[0].url || ''}
                    alt={record.name}
                    className="w-20 h-20 object-cover rounded-full"
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => <span>{name}</span>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => <span>{price}</span>,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock: number) => <span>{stock}</span>,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => (
                <span>{moment(createdAt).format('DD MMM YYYY hh:mm A')}</span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, product: any) => (
                <div className="flex gap-1">
                    <Button
                        type="primary"
                        onClick={() => handleEdit(product.id)}
                    >
                        <i className="ri-edit-line text-xl"></i>
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(product.id)}
                    >
                        <Button type="primary">
                            <i className="ri-delete-bin-line text-xl"></i>
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-end">
                <Button
                    type="primary"
                    onClick={() => {
                        router.push('/profile/add_product');
                    }}
                >
                    Add Product
                </Button>
            </div>
            <Table
                dataSource={products}
                columns={columns}
                loading={loading}
                rowKey="id"
            />

            {showProductEditForm && (
                <ProductEditForm
                    showProductEditForm={showProductEditForm}
                    setShowProductEditForm={setShowProductEditForm}
                    reloadData={getProducts}
                    productId={selectedProductId || ''}
                />
            )}
        </div>
    );
}

export default ProductsList;
