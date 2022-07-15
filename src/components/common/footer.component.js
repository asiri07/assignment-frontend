import { Component } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const FooterComponent = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>Engineered by Buwaneka Sudheera</Footer>
    )
}

export { FooterComponent };