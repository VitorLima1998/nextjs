import { Button, Popconfirm, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import UserForm from './UserForm';
import UserEditForm from './UserEditForm';

function UsersList() {
    const [showUserForm, setShowUserForm] = useState(false);
    const [showUserEditForm, setShowUserEditForm] = useState(false);
    const [selectedUserId, setselectedUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:3000/users');
            setUsers(res.data);
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId: any) => {
        try {
            await axios.delete(`http://localhost:3000/users/${userId}`);
            message.success('User deleted successfully');
            getUsers();
        } catch (error) {
            message.error('Error deleting user');
        }
    };

    const handleEdit = (userId: any) => {
        setselectedUserId(userId);
        setShowUserEditForm(true);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

            // criar o render com as ações
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
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
            render: (_: any, user: any) => (
                <div className="flex gap-1">
                    <Button type="primary" onClick={() => handleEdit(user.id)}>
                        <i className="ri-edit-line text-xl"></i>
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this user?"
                        onConfirm={() => handleDelete(user.id)}
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
                        setShowUserForm(true);
                    }}
                >
                    Add User
                </Button>
            </div>

            <div className="mt-5">
                <Table
                    dataSource={users}
                    columns={columns}
                    loading={loading}
                    pagination={false}
                ></Table>
            </div>

            {showUserForm && (
                <UserForm
                    showUserForm={showUserForm}
                    setshowUserForm={setShowUserForm}
                    reloadData={() => {}}
                ></UserForm>
            )}

            {showUserEditForm && (
                <UserEditForm
                    showUserEditForm={showUserEditForm}
                    setShowUserEditForm={setShowUserEditForm}
                    reloadData={getUsers}
                    userId={selectedUserId || ''}
                ></UserEditForm>
            )}
        </div>
    );
}
export default UsersList;
