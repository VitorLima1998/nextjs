'use client';
import { CartState } from '@/redux/cartSlice';
import { Badge, Popover, message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LayoutProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathName = usePathname();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
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
                    router.push('/logout');
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
    }, []);

    useEffect(() => {
        console.log(cartItems);
        // when the cartItems changes, we will save cartItem into localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const getCurrentUser = async () => {
        try {
            setLoading(true);
            // get axios in backend
            setCurrentUser('V');
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {isPrivatePage && (
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
                                {currentUser}
                            </div>
                        </Popover>
                    </div>
                </div>
            )}
            <div className="p-5">{children}</div>
        </div>
    );
}

export default LayoutProvider;
