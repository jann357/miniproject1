import {Button, Form , Input} from 'antd';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register(){
    const navigate = useNavigate();
   const onFinish = async (values)=>{
    try{
        
        const response = await axios.post('/api/user/register',values);
        if(response.data.success){
         toast.success(response.data.message);
         toast.success("redirecting to login page..");
         navigate('/login');
        }
        else{
            toast.error(response.data.message);
        }
    }
    catch(error){
        toast.error('something went wrong');
    }

   };

    return(
    //  <div className="authentication">
    //     <div className="authentication-form card p-3">
    //         <h1 className="card-title">REGISTER</h1>
    //         <Form layout = "vertical" onFinish={onFinish}>
    //             <Form.Item label='name' name='name'>
    //                 <Input placeholder='Username'  />
    //             </Form.Item>
    //             <Form.Item label='email' name='email'>
    //                 <Input placeholder='email'  />
    //             </Form.Item>

    //             <Form.Item label='password' name='password'>
    //                 <Input placeholder='Password' type='password' />
    //             </Form.Item>
    //             <Button className='primary-button my-2' htmlType='submit'>Register</Button>
    //         </Form>
    //         <Link to='/login'>click here to login</Link>
    //     </div>
    //  </div>
    <div className="authentication">
            <div className="authentication-form card p-3">
                <h1 className="card-title">REGISTER</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please enter your name' }]}>
                        <Input placeholder='Enter your name' />
                    </Form.Item>

                    <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please enter your email' }]}>
                        <Input placeholder='Enter your email' />
                    </Form.Item>

                    <Form.Item label='Phone Number' name='phoneNumber' rules={[{ required: true, message: 'Please enter your phone number' }]}>
                        <Input placeholder='Enter your phone number' />
                    </Form.Item>

                    <Form.Item label='Website' name='website' rules={[{ required: true, message: 'Please enter your website' }]}>
                        <Input placeholder='Enter your website URL' />
                    </Form.Item>

                    <Form.Item label='Address' name='address' rules={[{ required: true, message: 'Please enter your address' }]}>
                        <Input placeholder='Enter your address' />
                    </Form.Item>

                    <Form.Item label='Specialization' name='specialization' rules={[{ required: true, message: 'Please enter your specialization' }]}>
                        <Input placeholder='Enter your specialization' />
                    </Form.Item>
                    <Form.Item label='hospital' name='hospital' rules={[{ required: true, message: 'Please enter your hospital' }]}>
                        <Input placeholder='Enter your hospital' />
                    </Form.Item>

                    <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
                        <Input.Password placeholder='Enter your password' />
                    </Form.Item>

                    <Button className='primary-button my-2' htmlType='submit'>
                        Register
                    </Button>
                </Form>
                <Link to='/login'>Click here to login</Link>
            </div>
        </div>

    );
};

export default Register