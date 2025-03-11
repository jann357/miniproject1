// import { Button, Form, Input } from 'antd';
// import React from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';


// function Login() {
//   const navigate = useNavigate();

//   const onFinish = async (values) => {
//     try {
//       const response = await axios.post('/api/user/login', values);
//       if (response.data.success) {
//         toast.success(response.data.message);
//         toast.success("Redirecting to the dashboard...");
//         localStorage.setItem('token', response.data.data);
//         navigate('/home');
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong');
//     }
//   };

//   return (
//     <div className="authentication">
//       <div className="authentication-form card p-3">
//         <h1 className="card-title">LOGIN</h1>
//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
//             <Input placeholder="Email" type="email" />
//           </Form.Item>
//           <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required' }]}>
//             <Input placeholder="Password" type="password" />
//           </Form.Item>

//           <Button className="primary-button my-2" htmlType="submit">
//             Login
//           </Button>
//           <Link to="/register">Click here to register</Link>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { Button, Form, Input, Space, Typography, Row, Col } from 'antd';
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/user/login', values);
      if (response.data.success) {
        toast.success(response.data.message);
        toast.success("Redirecting to the dashboard...");
        localStorage.setItem('token', response.data.data);
        navigate('/home');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="authentication">
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col span={8}>
          <div className="authentication-form card p-3" style={{ borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
              LOGIN
            </Typography.Title>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Email" type="email" size="large" style={{ borderRadius: 5, padding: 10 }} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input placeholder="Password" type="password" size="large" style={{ borderRadius: 5, padding: 10 }} />
              </Form.Item>
              <Form.Item>
                <Space direction="vertical" size="large">
                  <Button type="primary" htmlType="submit" size="large" style={{ borderRadius: 5, padding: 10 }}>
                    Login
                  </Button>
                  <Link to="/register" style={{ fontSize: 16, color: '#1890ff' }}>
                    Don't have an account? Register now!
                  </Link>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;



