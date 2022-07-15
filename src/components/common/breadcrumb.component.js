import { Component } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button } from 'antd';

const BreadcrumbComponent = (props) => {
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{props.current}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export { BreadcrumbComponent };