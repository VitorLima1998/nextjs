'use client';

import { Button, Form, message, notification } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAntdFieldsRequireRule } from '@/helpers/validations';

interface UserType {
    name: string;
    email: string;
    password: string;
}

function Login() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onLogin = async (values: UserType) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                'http://localhost:3000/auth/login',
                values
            );
            // console.log(data);
            if (data.statusCode !== 200) {
                notification.error({
                    message: 'Error',
                    description: data.message,
                });
                return;
            }

            // administrar o token
            document.cookie = `token=${data.token}; path=/;`;

            // console.log(data.name);

            notification.success({
                message: 'Success',
                description: `Login successfully! Welcome ${data.name}`,
            });
            router.push('/');
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.message,
            });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="h-full bg-primary hidden md:flex items-center justify-center">
                <h1 className="text-7xl font-bold text-white">
                    Kaizoku - Shop
                </h1>
            </div>
            <div>
                <div className="flex items-center justify-center h-full">
                    <Form
                        onFinish={onLogin}
                        className="w-[400px] flex flex-col gap-5"
                        layout="vertical"
                        initialValues={{ name: '', email: '', password: '' }}
                    >
                        <h1 className="text-2xl font-bold">Login</h1>
                        <hr />

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={getAntdFieldsRequireRule(
                                'Please input your email!'
                            )}
                        >
                            <input type="email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={getAntdFieldsRequireRule(
                                'Please input your password!'
                            )}
                        >
                            <input type="password" />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            Login
                        </Button>

                        <Link href="/auth/register" className="text-primary">
                            Dont have an account? Register
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
