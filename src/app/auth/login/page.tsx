/* eslint-disable react/no-unescaped-entities */
'use client';
import { getAntdFieldsRequireRule } from '@/helpers/validations';
import { Button, Form, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UserType {
    name: string;
    email: string;
    password: string;
}

export default function Login() {
    const [loading, setloading] = useState(false);
    const router = useRouter();
    const onLogin = async (values: UserType) => {
        try {
            setloading(true);
            const res = await axios.post(
                `http://localhost:3000/auth/login`,
                values
            );
            console.log(res);

            if (res.data.status !== 201) {
                message.error(res.data.message);
            }

            message.success('Login Sucessfully!');
            router.push('/');
        } catch (error: any) {
            message.error(error.response.data.message);
            setloading(false);
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            {/* logo aqui */}
            <div className="h-full bg-primary hidden md:flex items-center justify-center">
                <h1 className="text-7xl font-bold text-white">Frame</h1>
                <h1 className="text-7xl font-bold text-white">-</h1>
                <h1 className="text-7xl font-bold text-white">Shop</h1>
            </div>
            {/* campos de register */}
            <div>
                <div className="flex items-center justify-center h-full">
                    <Form
                        className="w-[500px] flex flex-col gap-5"
                        layout="vertical"
                        onFinish={onLogin}
                    >
                        <h1 className="text-2xl font-bold">Login</h1>
                        <hr />

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={getAntdFieldsRequireRule(
                                'Please, type your email!'
                            )}
                        >
                            <input type="text" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={getAntdFieldsRequireRule(
                                'Please, type your password!'
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
                            Don't have an account? Register
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
}
