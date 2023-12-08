'use client';
import { CartState } from '@/redux/cartSlice';
import { Badge, Popover, message, notification } from 'antd';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../app/constants';
import { SetCurrentUser } from '../redux/userSlice';
import Loader from '../app/components/Loader';

function LayoutProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const pathName = usePathname();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((state: any) => state.user);
    const { cartItems }: CartState = useSelector((state: any) => state.cart);

    const isPrivatePage =
        pathName !== '/auth/login' && pathName !== '/auth/register';

    const content = (
        <div className="flex flex-col gap-2 p-2">
            <div
                className="flex gap-2 items-center cursor-pointer text-md"
                onClick={() => {
                    router.push('/profile');
                }}
            >
                <i className="ri-user-line text-xl"></i>
                <span>Profile</span>
            </div>
            <div
                className="flex gap-2 items-center cursor-pointer text-md"
                onClick={() => {
                    onLogout();
                }}
            >
                <i className="ri-logout-box-r-line"></i>
                <span>Logout</span>
            </div>
        </div>
    );

    useEffect(() => {
        1;
        getCurrentUser();
    }, [isPrivatePage, pathName]);

    useEffect(() => {
        console.log(cartItems);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const onLogout = async () => {
        try {
            setLoading(true);
            removeCookie('token');

            notification.success({ message: 'Logout successful' });
            dispatch(SetCurrentUser(null));
            router.push('auth/login');
        } catch (error: any) {
            notification.error({ message: ' Error logout' });
        } finally {
            setLoading(false);
        }
    };
    const getCurrentUser = async () => {
        try {
            setLoading(true);
            if (cookies.token === 'undefined') {
                throw new Error('Token is not defined! Please login again!');
            }

            const res = await axios.get(`${API_URL}/auth/current`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });

            dispatch(SetCurrentUser(res.data.data));
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <Loader />}
            {isPrivatePage && currentUser && (
                <>
                    <div className="bg-primary py-5 px-5 flex justify-between items-center">
                        <div className="flex">
                            <h1 className="text-2xl font-bold text-white">
                                Frame Shop
                            </h1>
                        </div>
                        <div className="flex gap-5 items-center">
                            <Badge
                                count={cartItems.length}
                                className="cursor-pointer"
                            >
                                <i
                                    className="ri-shopping-cart-line text-white text-2xl"
                                    onClick={() => {
                                        router.push('/cart');
                                    }}
                                ></i>
                            </Badge>
                            <Popover
                                content={content}
                                title="Title"
                                trigger="click"
                            >
                                <div className="flex justify-center items-center rounded-full h-8 w-8 bg-white">
                                    {currentUser.name[0]}
                                </div>
                            </Popover>
                        </div>
                    </div>
                    <div className="p-5">{children}</div>
                </>
            )}

            {!isPrivatePage && children}
        </div>
    );
}

export default LayoutProvider;
