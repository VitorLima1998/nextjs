'use client';
import React from 'react';
import { Tabs } from 'antd';
import CategoriesList from './components/category/CategoriesList';
import UsersList from './components/user/UsersList';

function Profile() {
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Products" key="1">
                    Products
                </Tabs.TabPane>
                <Tabs.TabPane tab="Categories" key="2">
                    <CategoriesList />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Orders" key="3">
                    Orders
                </Tabs.TabPane>

                <Tabs.TabPane tab="Users" key="4">
                    <UsersList />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Profile;
