import { Button, Popconfirm, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import CategoryForm from './CategoryForm';
import axios from 'axios';
import moment from 'moment';
import CategoryEditForm from './CategoryEditForm';

function CategoriesList() {
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showCategoryEditForm, setShowCategoryEditForm] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:3000/category');
            setCategories(res.data);
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (categoryId: any) => {
        try {
            await axios.delete(`http://localhost:3000/category/${categoryId}`);
            message.success('Category deleted successfully!');
            getCategories();
        } catch (error) {
            message.error('Error deleting category');
        }
    };

    const handleEdit = (categoryId: any) => {
        setSelectedCategoryId(categoryId);
        setShowCategoryEditForm(true);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) =>
                moment(createdAt).format('DD MMM YYYY'),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (createdAt: string) =>
                moment(createdAt).format('DD MMM YYYY'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, category: any) => (
                <div className="flex gap-1">
                    <Button
                        type="primary"
                        onClick={() => handleEdit(category.id)}
                    >
                        <i className="ri-edit-line text-xl"></i>
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => handleDelete(category.id)}
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
                        setShowCategoryForm(true);
                    }}
                >
                    Add Category
                </Button>
            </div>

            <div className="mt-5">
                <Table
                    dataSource={categories}
                    columns={columns}
                    loading={loading}
                    pagination={false}
                ></Table>
            </div>

            {showCategoryForm && (
                <CategoryForm
                    showCategoryForm={showCategoryForm}
                    setShowCategoryForm={setShowCategoryForm}
                    reloadData={getCategories}
                />
            )}

            {showCategoryEditForm && (
                <CategoryEditForm
                    showCategoryEditForm={showCategoryEditForm}
                    setShowCategoryEditForm={setShowCategoryEditForm}
                    reloadData={getCategories}
                    categoryId={selectedCategoryId || ''}
                />
            )}
        </div>
    );
}

export default CategoriesList;
