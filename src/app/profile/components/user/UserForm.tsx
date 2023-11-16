import { getAntdFieldsRequireRule } from '@/helpers/validations';
import { Form, Modal, message } from 'antd';
import axios from 'axios';

type UserFormData = {
    name: string;
    description: string;
};

function UserForm({
    showUserForm,
    setshowUserForm,
    reloadData,
}: UserFormProps) {
    const [form] = Form.useForm();
    const onFinish = async (values: UserFormData) => {
        try {
            const res = await axios.post('http://localhost:3000/users', values);
            message.success('User added successfully!');
            reloadData();
            setshowUserForm(false);
        } catch (error: any) {
            message.error(error.message);
        }
    };

    return (
        <Modal
            title={
                <h1 className="text-2xl font-bold text-gray-800">Add User</h1>
            }
            open={showUserForm}
            onCancel={() => {
                setshowUserForm(false);
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
export default UserForm;

interface UserFormProps {
    showUserForm: boolean;
    setshowUserForm: (show: boolean) => void;
    reloadData: () => void;
}
