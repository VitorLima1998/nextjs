import { Button, Rate } from 'antd';
import axios from 'axios';
import { cookies } from 'next/headers';
import Image from 'next/image';
import AddtoCartBtn from './profile/components/Button/AddtoCartBtn';

async function getProducts() {
    try {
        const cookieStore = cookies().get('token')?.value;

        const res = await axios.get('http://localhost:3000/product', {
            headers: {
                Authorization: `Bearer ${cookieStore}`,
            },
        });

        return res.data;
    } catch (error: any) {
        console.log(error.message);
    }
}

export default async function Home() {
    const products = await getProducts();
    return (
        <div>
            {/* Montar um card dos produtos existentes */}
            <div className="grid grid-cols-4 gap-5 p-5">
                {products.map((product: any) => (
                    <div
                        key={product.id}
                        className="p-4 flex flex-col gap-1 border border-solid border-gray-300"
                    >
                        <div className="text-center">
                            <Image
                                src={product.images[0].url}
                                width={200}
                                height={200}
                                alt=""
                            ></Image>
                        </div>
                        <h1 className="text-sm">{product.name}</h1>
                        <div className="flex justify-between items-center">
                            <Rate disabled defaultValue={product.rating}></Rate>
                            <div className="flex gap-5 items-center">
                                <h1 className="text-xl font-semibold">
                                    ${product.price}
                                </h1>
                                {/* passar como props */}
                                {/* <AddtoCartBtn product={product} /> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
