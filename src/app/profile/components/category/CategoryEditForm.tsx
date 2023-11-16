import { getAntdFieldsRequireRule } from '@/helpers/validations';
import { Form, Modal, message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';

type EditCategoryFormData = {
    name: string;
    description: string;
};

function CategoryEditForm({
    showCategoryEditForm,
    setShowCategoryEditForm,
    reloadData,
    categoryId,
}: EditCategoryFormProps) {
    const [form] = Form.useForm();

    const onFinish = async (values: EditCategoryFormData) => {
        try {
            const res = await axios.patch(
                `http://localhost:3000/category/${categoryId}`,
                values
            );
            message.success('Category edited successfully!');
            reloadData();
            setShowCategoryEditForm(false);
        } catch (error: any) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        const loadCategoryData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/category/${categoryId}`
                );
                form.setFieldsValue({
                    name: res.data.name,
                    description: res.data.description,
                });
            } catch (error) {
                message.error(`Error to get data category`);
            }
        };

        // Carrega os dados quando muda o ID da categoria
        if (showCategoryEditForm && categoryId) {
            loadCategoryData();
        }
    }, [showCategoryEditForm, categoryId, form]);
    return (
        <Modal
            title={
                <h1 className="text-2xl font-bold text-gray-800">
                    Edit Category
                </h1>
            }
            open={showCategoryEditForm}
            onCancel={() => {
                setShowCategoryEditForm(false);
            }}
            centered
            closable={false}
            okText="Save"
            onOk={() => {
                form.submit();
            }}
        >
            <Form
                layout="vertical"
                className="flex flex-col gap-3"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={getAntdFieldsRequireRule(
                        'category name is required'
                    )}
                >
                    <input type="text" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={getAntdFieldsRequireRule('Description is required')}
                >
                    <textarea />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CategoryEditForm;

interface EditCategoryFormProps {
    showCategoryEditForm: boolean;
    setShowCategoryEditForm: (show: boolean) => void;
    reloadData: () => void;
    categoryId: string;
}
