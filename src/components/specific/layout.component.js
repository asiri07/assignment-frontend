import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Button, message, Skeleton } from 'antd';
import { confirmAlert } from 'react-confirm-alert';
import { Spinner, SideBar, HeaderComponent, FooterComponent, BreadcrumbComponent } from '../common';
import { signOut, getUserProfile } from '../../services';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function LayoutComponent({ children }, props) {

    const [loading, setLoading] = useState(false);
    const [shimmer, setShimmer] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    const handleRoutes = () => {
        let authenticated = props.authenticated;
        let auth = localStorage.getItem("authenticated");
        let expireTime = localStorage.getItem("expireTime");
        if (typeof auth !== undefined && auth !== null && typeof expireTime !== undefined && expireTime !== null && new Date(expireTime) > new Date()) {
            authenticated = auth;
        }

        if (!authenticated) {
            history.push('/signin')
        }
    }

    const onPressLogout = () => {
        confirmAlert({
            message: "Are you sure you want to logout?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => onConfirmLogout()
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const onConfirmLogout = () => {
        setLoading(true);
        signOut().then(async () => {
            await localStorage.clear();
            handleRoutes();
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            message.error('Oops, error occured while logging out. Please try again');
        });
    }

    const setUserProfile = () => {
        getUserProfile().then((response) => {
            if (response.status === 200) {
                setUser(response.data);
            }
        }).catch((error) => {
            console.log(error);
            message.error('Oops, error occured while getting profile data. Please try again');
        });
    }

    let current;
    let routerPath = window.location.pathname.split('/')[1];

    const handleClick = (e) => {
        console.log('click ', e.key);
        setShimmer(false);
    }

    if (routerPath === '') {
        current = 'Dashboard';
    } else if (routerPath === 'monthlist') {
        current = 'Months';
    } else if (routerPath === 'categorylist' || routerPath === 'category') {
        current = 'Categories';
    }

    useEffect(() => {
        handleRoutes();
        setUserProfile();
        setShimmer(false);
    }, [])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideBar
                onLogout={onPressLogout}
                current={current}
                handleClick={handleClick}
            />
            <Layout className="site-layout">
                <HeaderComponent
                    user={user}
                />
                <Content style={{ margin: '0 16px' }}>
                    <BreadcrumbComponent
                        current={current}
                    />
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {loading ? <div className="spinner_container">
                            < Spinner />
                        </div > :
                            children}
                    </div>
                </Content>
                <FooterComponent />
            </Layout>
        </Layout>
    );
}

export { LayoutComponent };
