import { Button } from 'antd';
import Register from './auth/register/page';

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <Button type="primary">Primary ANT</Button>
            <Button type="default">Primary ANT default</Button>
        </div>
    );
}
