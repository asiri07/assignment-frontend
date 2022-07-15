import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import Salary from '../../assets/images/salary.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = (props) => {

    const [collapsed, onCollapse] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(collapsed) => onCollapse(collapsed)}>
            <div className="logo" >
                <img src={Salary} />
            </div>
            <Menu theme="dark" onClick={props.handleClick} defaultSelectedKeys={[props.current]} mode="inline">
                <Menu.Item key="Dashboard" icon={<PieChartOutlined />}>
                    Dashboard
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="Months" icon={<DesktopOutlined />}>
                    Months
                    <Link to="/monthlist" />
                </Menu.Item>
                <Menu.Item key="Categories" icon={<DesktopOutlined />}>
                    Categories
                    <Link to="/categorylist" />
                </Menu.Item>
                <Menu.Item key="Logout" icon={<LogoutOutlined />}>
                    <a onClick={props.onLogout}>Logout</a>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export { SideBar };