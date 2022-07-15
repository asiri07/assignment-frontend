import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { postSignIn } from '../services';

const SignIn = () => {

  const history = useHistory();

  const onFinish = (values) => {
    let req = {
      "email": values.email,
      "password": values.password
    }

    postSignIn(req).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('authenticated', true);
        history.push('/dashboard');
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        message.error('Username or password is incorrect.');
      } else {
        message.error('Oops, error occured while loggin in. Please try again');
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    // message.error('Oops, error occured while loggin in. Please try again');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="box"
            >
              <h1>Login</h1>
              <p className="text-muted"> Please enter your login and password!</p>
              <Form.Item
                name="email"
                rules={[{
                  required: true,
                  message: 'Please input your email!'
                }, {
                  type: "email",
                  message: 'Please input a valid email!'
                }]}
              >
                <Input
                  placeholder="Email"
                  className="login__input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  placeholder="Password"
                  className="login__input"
                />
              </Form.Item>
              <div className="line__container">
                Don't have an account? &nbsp;<Link to={'/signup'}>Create one</Link>
              </div>
              <Form.Item>
                <Button className="login__btn" type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;