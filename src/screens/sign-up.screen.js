import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { postSignUp } from '../services';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const history = useHistory();

 
    const onFinish = (values) => {
        let req = {
            "name": values.name,
            "email": values.email,
            "password": values.password
        }
        if (emailError === "") {
            postSignUp(req).then((response) => {
                if (response.status === 200) {
                    message.success('You have successfully signed up.');
                    history.push('/');
                }
            }).catch((error) => {
                console.log('error:', error);
                message.error('Oops, error occured while loggin in. Please try again');
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // message.error('Oops, error occured while loggin in. Please try again');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className="box"
                        >
                            <h1>Sign up</h1>
                            <p className="text-muted">Create your account here!</p>
                            <Form.Item
                                name="name"
                                rules={[{
                                    required: true,
                                    message: 'Please input your full name!',
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
                                <Input placeholder="Enter your full name" className="login__input" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{
                                    required: true,
                                    message: 'Please input your email!'
                                }, {
                                    type: "email",
                                    message: 'Please input a valid email!'
                                }, {
                                    max: 100,
                                    message: "Email is too long"
                                }]}
                            >
                                <Input
                                    placeholder="Enter your email"
                                    className="login__input"
                                    onChange={(e) => setEmail(e.target.value)}
             
                                />
                            </Form.Item>
                            <small className="error__text">{emailError}</small>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }, {
                                        min: 6,
                                        message: "Password is too short"
                                    }, {
                                        max: 100,
                                        message: "Password is too long"
                                    }
                                ]}
                            >
                                <Input.Password placeholder="Enter your password" className="login__input" />
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Re-enter your password" className="login__input" />
                            </Form.Item>
                            <div className="line__container">
                                Already have an account? &nbsp;<Link to={'/signin'}>Sign in</Link>
                            </div>
                            <Form.Item>
                                <Button className="login__btn" type="primary" htmlType="submit">
                                    Sign up
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;