
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Layout, Card, Row, Col, Button, message, Avatar, Badge } from 'antd';
// import { Link } from 'react-router-dom';
// import { UserOutlined, MedicineBoxOutlined, FileTextOutlined } from '@ant-design/icons';

// const { Content, Sider } = Layout;

// const Home = () => {
//     const [doctorInfo, setDoctorInfo] = useState(null);

//     // Fetch Doctor Information
//     const fetchDoctorInfo = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id', {}, {
//                 headers: {
//                     Authorization: 'Bearer ' + localStorage.getItem('token'),
//                 },
//             });

//             if (response.data.success) {
//                 setDoctorInfo(response.data.data);  // Update state with doctor info
//             } else {
//                 message.error('Failed to fetch doctor information');
//             }
//         } catch (error) {
//             console.error(error);
//             message.error('Error fetching doctor info');
//         }
//     };

//     useEffect(() => {
//         fetchDoctorInfo();
//     }, []);

//     return (
//         <Layout style={{ minHeight: '100vh' }}>
//                 {/* Sidebar with navigation */}
//                 {/* <Sider width={250} className="sidebar" style={{ background: '#1890ff' }}>
//         <div className="logo" style={{ color: 'white', fontSize: '20px', textAlign: 'center', margin: '20px 0' }}>
//             Doctor Dashboard
//         </div>
//         <div className="sidebar-menu">
//             <Link to="/home">
//                 <Button block icon={<UserOutlined />} style={{ margin: '10px 0' }}>
//                     Dashboard
//                 </Button>
//             </Link>
            
            
//             <Link to="/generate-prescription">
//                 <Button block icon={<MedicineBoxOutlined />} style={{ margin: '10px 0' }}>
//                     Generate Prescription
//                 </Button>
//             </Link>
//         </div>
//     </Sider> */}
//                 <Sider
//                     width={250}
//                     className="sidebar"
//                     style={{
//                         background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', // Gradient background
//                         padding: '20px 10px',
//                         height: '100vh', // Ensure it takes the full height
//                         boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)', // Adding subtle shadow
//                     }}
//                 >
//                     <div
//                         className="logo"
//                         style={{
//                             color: 'white',
//                             fontSize: '24px',
//                             textAlign: 'center',
//                             fontWeight: 'bold',
//                             marginBottom: '30px',
//                             letterSpacing: '2px',
//                         }}
//                     >
//                         Doctor Dashboard
//                     </div>
//                     <div className="sidebar-menu" style={{ textAlign: 'center' }}>
//                         {/* Dashboard Button */}
//                         <Link to="/home">
//                             <Button
//                                 block
//                                 icon={<UserOutlined />}
//                                 style={{
//                                     margin: '10px 0',
//                                     fontSize: '16px',
//                                     borderRadius: '30px', // Rounded buttons
//                                     padding: '15px',
//                                     background: '#fff',
//                                     color: '#1890ff',
//                                     fontWeight: 'bold',
//                                     transition: 'all 0.3s ease',
//                                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//                                 }}
//                                 className="sidebar-btn"
//                             >
//                                 Dashboard
//                             </Button>
//                         </Link>

//                         {/* Generate Prescription Button */}
//                         <Link to="/prescription">
//                             <Button
//                                 block
//                                 icon={<MedicineBoxOutlined />}
//                                 style={{
//                                     margin: '10px 0',
//                                     fontSize: '16px',
//                                     borderRadius: '30px',
//                                     padding: '15px',
//                                     background: '#fff',
//                                     color: '#1890ff',
//                                     fontWeight: 'bold',
//                                     transition: 'all 0.3s ease',
//                                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//                                 }
//                             }
//                                 className="sidebar-btn"
//                             >
//                                 Generate Prescription
//                             </Button>
//                         </Link>
//                     </div>
//                 </Sider>

//                 {/* Main Content Area */}
//                 <Layout style={{ padding: '0 24px 24px' }}>
//                     <Content style={{ padding: '24px', minHeight: 280 }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                             <h2>Welcome to Doctor's Dashboard</h2>
//                             <div className="doctor-profile">
//                                 <Avatar size={64} icon={<UserOutlined />} />
//                                 <div style={{ marginLeft: '10px' }}>
//                                     <strong>{doctorInfo ? doctorInfo.name : 'Loading...'}</strong>
//                                     <Badge status="success" text="Online" />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Doctor's Information Section */}
//                         <Card title="Doctor's Information" style={{ marginBottom: '30px' }}>
//                             <Row gutter={16}>
//                                 <Col span={12}>
//                                     <div>
//                                         <strong>Name:</strong> {doctorInfo ? doctorInfo.name : 'Loading...'}
//                                     </div>
//                                     <div>
//                                         <strong>Email:</strong> {doctorInfo ? doctorInfo.email : 'Loading...'}
//                                     </div>
//                                     <div>
//                                         <strong>Specialty:</strong> {doctorInfo ? doctorInfo.specialization : 'Not Provided'}
//                                     </div>
//                                 </Col>
//                                 <Col span={12}>
//                                     <div>
//                                         <strong>Phone:</strong> {doctorInfo ? doctorInfo.phoneNumber : 'Not Provided'}
//                                     </div>
//                                     <div>
//                                         <strong>Website:</strong> {doctorInfo ? doctorInfo.website : 'Not Provided'}
//                                     </div>
//                                     <div>
//                                         <strong>Address:</strong> {doctorInfo ? doctorInfo.address : 'Not Provided'}
//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Card>

//                         {/* Action Cards: Add New Patient, Generate Prescription */}
//                         <Row gutter={16}>


//                             {/* Prescription Generator */}
//                             <Col span={12}>
//                                 <Card
//                                     title="Generate Prescription"
//                                     extra={<Link to="/prescription"><Button type="primary">Create Prescription</Button></Link>}
//                                     style={{ backgroundColor: '#fafafa' }}
//                                 >
//                                     <p>Select medicines and dosages to generate a prescription.</p>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Content>
//                 </Layout>
//             </Layout>
//     );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Card, Row, Col, Button, message, Avatar, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, MedicineBoxOutlined, HomeOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Content, Sider } = Layout;

const Home = () => {
    const [doctorInfo, setDoctorInfo] = useState(null);

    // Fetch Doctor Information
    const fetchDoctorInfo = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });

            if (response.data.success) {
                setDoctorInfo(response.data.data);  // Update state with doctor info
            } else {
                message.error('Failed to fetch doctor information');
            }
        } catch (error) {
            console.error(error);
            message.error('Error fetching doctor info');
        }
    };

    useEffect(() => {
        fetchDoctorInfo();
    }, []);

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            {/* Sidebar with Navigation */}
            <Sider
                width={250}
                className="sidebar"
                style={{
                    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                    padding: '20px 10px',
                    height: '100vh',
                    boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div
                    className="logo"
                    style={{
                        color: 'white',
                        fontSize: '24px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginBottom: '30px',
                        letterSpacing: '2px',
                    }}
                >
                    Doctor Dashboard
                </div>
                <div className="sidebar-menu" style={{ textAlign: 'center' }}>
                    {/* Dashboard Button */}
                    <Link to="/home">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                block
                                icon={<HomeOutlined />}
                                style={{
                                    margin: '10px 0',
                                    fontSize: '16px',
                                    borderRadius: '30px',
                                    padding: '15px',
                                    background: '#fff',
                                    color: '#1890ff',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                }}
                                className="sidebar-btn"
                            >
                                Dashboard
                            </Button>
                        </motion.div>
                    </Link>

                    {/* Generate Prescription Button */}
                    <Link to="/prescription">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                block
                                icon={<MedicineBoxOutlined />}
                                style={{
                                    margin: '10px 0',
                                    fontSize: '16px',
                                    borderRadius: '30px',
                                    padding: '15px',
                                    background: '#fff',
                                    color: '#1890ff',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                }}
                                className="sidebar-btn"
                            >
                                Generate Prescription
                            </Button>
                        </motion.div>
                    </Link>
                </div>
            </Sider>

            {/* Main Content Area */}
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ padding: '24px', minHeight: 280 }}>
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}
                    >
                        <h2 style={{ color: '#1890ff', fontWeight: 'bold' }}>Welcome to Doctor's Dashboard</h2>
                        <div className="doctor-profile" style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                            <div style={{ marginLeft: '10px' }}>
                                <strong style={{ fontSize: '18px' }}>{doctorInfo ? doctorInfo.name : 'Loading...'}</strong>
                                <Badge status="success" text="Online" style={{ marginLeft: '10px' }} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Doctor's Information Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card
                            title="Doctor's Information"
                            style={{
                                marginBottom: '30px',
                                borderRadius: '10px',
                                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
                            }}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <div style={{ marginBottom: '10px' }}>
                                        <strong>Name:</strong> {doctorInfo ? doctorInfo.name : 'Loading...'}
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <strong>Email:</strong> {doctorInfo ? doctorInfo.email : 'Loading...'}
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <strong>Specialty:</strong> {doctorInfo ? doctorInfo.specialization : 'Not Provided'}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{ marginBottom: '10px' }}>
                                        <strong>Phone:</strong> {doctorInfo ? doctorInfo.phoneNumber : 'Not Provided'}
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <strong>Website:</strong> {doctorInfo ? doctorInfo.website : 'Not Provided'}
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <strong>Address:</strong> {doctorInfo ? doctorInfo.address : 'Not Provided'}
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </motion.div>

                    {/* Action Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Row gutter={16}>
                            {/* Prescription Generator */}
                            <Col span={12}>
                                <Card
                                    title="Generate Prescription"
                                    extra={
                                        <Link to="/prescription">
                                            <Button type="primary" style={{ borderRadius: '20px' }}>
                                                Create Prescription
                                            </Button>
                                        </Link>
                                    }
                                    style={{
                                        borderRadius: '10px',
                                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                                        background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
                                    }}
                                >
                                    <p>Select medicines and dosages to generate a prescription.</p>
                                </Card>
                            </Col>
                        </Row>
                    </motion.div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Home;
