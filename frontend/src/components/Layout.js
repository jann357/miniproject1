// import React from 'react';
// function Layout({children}) {
//     return (
//         <div className='main'>
//             <div className='d-flex layout'>
//                 <div className='sidebar'>
//                      sidebar
//                 </div>
//                 <div className='content'>
//                     <div className='header'>
//                           header
//                     </div>
//                     <div className='body'>
//                         {children}
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// }
//  after

import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // For navigation

const { Sider, Content, Header } = AntLayout;

function Layout({ children }) {
    return (
        // <AntLayout className="main-layout">
        //     <Sider width={250} className="sidebar">
        //         <div className="logo">
        //             Doctor Dashboard
        //         </div>
        //         <Menu mode="inline" defaultSelectedKeys={['1']}>
        //             <Menu.Item key="1">
        //                 <Link to="/dashboard">Dashboard</Link>
        //             </Menu.Item>
        //             <Menu.Item key="2">
        //                 <Link to="/generate-prescription">Generate Prescription</Link>
        //             </Menu.Item>
        //             <Menu.Item key="3">
        //                 <Link to="/profile">Profile</Link>
        //             </Menu.Item>
        //         </Menu>
        //     </Sider>
        //     <AntLayout>
        //         <Header className="header">
        //             <div className="doctor-profile">
        //                 <span>Dr. John Doe</span>
        //                 {/* Add logout button or profile details here */}
        //             </div>
        //         </Header>
        //         <Content className="content">
        //             {children}
        //         </Content>
        //     </AntLayout>
        // </AntLayout>
        <Layout className="main-layout">
            <Sider width={250} className="sidebar">
                <div className="logo">
                    <h2>Doctor Dashboard</h2>
                </div>
                <Menu mode="inline" defaultSelectedKeys={['1']} className="menu">
                    <Menu.Item key="1">
                        <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/generate-prescription">Generate Prescription</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header className="header">
                    <div className="doctor-profile">
                        <span>Dr. John Doe</span>
                        {/* Add logout button or profile details here */}
                    </div>
                </Header>

                <Content className="content">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default Layout;


