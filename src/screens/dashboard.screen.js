import Salary from '../assets/images/logo512.png';
import { uploadFile,signOut } from '../services';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    InboxOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Form, Input, Button, message, Upload, Spin } from 'antd';
import JSZip from 'jszip';
const { Header, Content, Footer, Sider } = Layout;

const { Dragger } = Upload;

const Dashboard = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const history = useHistory();

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const onUploadDoc = (info) => {
        var zip = new JSZip();
        console.log("File", info.file);

        if (info.file.status === 'uploading') {
            console.log("File 2");
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            console.log("File 3");
            setLoading(false);
            zip.loadAsync(info.file.originFileObj).then(async (response) => {
                console.log("Extracted", response.files);

                for (let filename in response.files) {
                    // if (!response.files.hasOwnProperty(filename)) {
                    //     continue;
                    // }
                    // Object key is the filename
                    var match = filename.match(/REGEX.json$/);
                    // if (match) {
                        var blob = await zip.file(filename).async("blob");
                        var file = new File([blob], filename, { type: 'application/json' });
                        //    flist.push(file);
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            let text = e.target.result;
                            console.log("Extracted text", text);
                            setFile(text);
                        };
                        reader.readAsText(file);
                    // }
                }
            });
            return;
            // Get this url from response in real world.
            //   getBase64(info.file.originFileObj, (url) => {
            //     setLoading(false);
            //     setImageUrl(url);
            //   });
        }
    }

    const onFinishForm = (values) => {
        let req = {
            fileName: `${values.name}.json`,
            body: file
        }
        uploadFile(req).then((response) => {
            if (response.status === 200) {
                message.success('You have successfully uploaded your file');
                history.push('/dashboard');
            }
        }).catch((error) => {
            console.log('error:', error);
            message.error('Oops, error occured while loggin in. Please try again');
        });
    }

    const onPressLogout = () => {
        signOut().then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              history.push('/signout');
            }
          }).catch((error) => {
            message.error('Oops, error occured while loggin in. Please try again');
            
          });
    }

    useEffect(() => {
        // setMonthSummary();
    }, []);

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" >
                    <img src={Salary} />
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="Dashboard" icon={<PieChartOutlined />}>
                        Dashboard
                        <Link to="/dashboard" />
                    </Menu.Item>
                    <Menu.Item key="Logout" icon={<LogoutOutlined />}>
                        <a onClick={onPressLogout}>Logout</a>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinishForm}
                        // onFinishFailed={onFinishFailed}
                        // className="box"
                        >
                            <h1>Upload</h1>
                            <p className="text-muted">Create your account here!</p>
                            <Form.Item
                                name="name"
                                rules={[{
                                    required: true,
                                    message: 'Please input your file name!',
                                    whitespace: true
                                }, {
                                    pattern: new RegExp(/^[a-zA-Z\s]+$/i),
                                    message: "Please enter a valid name"
                                }, {
                                    min: 6,
                                    message: "Name is too short"
                                }, {
                                    max: 100,
                                    message: "Name is too long"
                                }]}
                            >
                                <Input placeholder="Enter your full name" />
                            </Form.Item>
                            <Form.Item
                                name="upload"
                            >
                                <Dragger
                                    onChange={onUploadDoc}
                                    multiple={false}
                                    maxCount={1}
                                    accept={'.zip'}
                                    action={'../../'}
                                    customRequest={dummyRequest}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <Spin tip="Loading..." spinning={loading}>
                                            <InboxOutlined />
                                        </Spin>
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                        band files
                                    </p>
                                </Dragger>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Developed by Asiri Liyange
                </Footer>
            </Layout>
        </Layout>
    )
}

export default Dashboard;