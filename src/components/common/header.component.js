import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Header } = Layout;

const HeaderComponent = ({ user }) => {
    return (
        <Header className="site-layout-background" style={{ padding: 0 }} >
            <div className="header__text__container">
                {user !== null ? user.name : ''}
            </div>
        </Header>
    )
}

export { HeaderComponent };