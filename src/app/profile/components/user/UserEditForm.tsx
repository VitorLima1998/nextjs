import { getAntdFieldsRequireRule } from '@/helpers/validations';
import { Form, Modal, message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';

type EditUserFormData = {
    name: string;
    email: string;
    password: string;
};

function UserEditForm({
    showUserEditForm,
    setShowUserEditForm,
    reloadData,
    userId,
}: EditUserFormProps) {
    const [form] = Form.useForm();

    const onFinish = async (values: EditUserFormData) => {
        try {
            const res = await axios.patch(
                `http://localhost:3000/users/${userId}`,
                values
            );
            message.success('User edited successfully!');
            reloadData();
            setShowUserEditForm(false);
        } catch (error: any) {
            message.error(error.message);
        }
    };
    useEffect(() => {
        const loadUseryData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/users/${userId}`
                );
                form.setFieldsValue({
                    name: res.data.name,
                    email: res.data.email,
                    password: res.data.password,
                });
            } catch (error) {
                message.error(`Error to get data user`);
            }
        };

        // Carrega os dados quando muda o ID do usuário
        if (showUserEditForm && userId) {
            loadUseryData();
        }
    }, [showUserEditForm, userId, form]);
    return (
        <Modal
            title={
                <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
            }
            open={showUserEditForm}
            onCancel={() => {
                setShowUserEditForm(false);
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
                    label="User Name"
                    name="name"
                    rules={getAntdFieldsRequireRule('User name is required')}
                >
                    <input type="text" />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={getAntdFieldsRequireRule('Email is required')}
                >
                    <input type="email" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={getAntdFieldsRequireRule('Password is required')}
                >
                    <input type="password" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
export default UserEditForm;

interface EditUserFormProps {
    showUserEditForm: boolean;
    setShowUserEditForm: (show: boolean) => void;
    reloadData: () => void;
    userId: string;
}
