// import React from 'react';
// import { Link } from 'react-router-dom';
// import './LandingPage.css'; 

// const LandingPage = () => {
//   return (
//     <div>
//       {/* Header */}
//       <header className="main" id="main">
       
//         <nav>
//           <ul>
//             <li><img 
//             src="/images/icon.png" 
//             alt="Logo" 
//             width="70" 
//             className="logo" 
//           /></li>
//             <li>
//               <Link to="/login" className="btn btn-one" aria-label="Login">
//                 LOG IN
//               </Link>
//             </li>
//             <li>
//               <Link to="/register" className="btn btn-two" aria-label="Register">
//                 REGISTER
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="main-body">
//         <section className="hero-section">
//           <img 
//             src="/images/doc.png" 
//             alt="Doctor" 
//             className="hero-image" 
//           />
//           <h1>
//             Transform your Prescription to <br />
//             <span className="highlighted-text">QR Code</span>
//           </h1>
//           <p className="intro-text">
//             Simplifying Your Healthcare Service with Secure QR Codes. Access healthcare like never before.
//           </p>
//           <Link className="btn btn-two" to="#home" aria-label="Learn More">
//             LEARN MORE
//           </Link>
//         </section>
//       </main>

//       {/* About Section */}
//       <section className="about" id="home">
//         <h2>Efficient and Secure Digital Prescriptions</h2>
//         <p>
//           Our hospital is proud to offer instantly accessible QR codes for all prescriptions.
//         </p>
//         <img 
//           src="/images/doc.png" 
//           alt="Doctor Icon" 
//           className="about-image" 
//         />
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <Link to="/register" className="btn btn-one" aria-label="Register to Get Started">
//           REGISTER TO GET STARTED!
//         </Link>
//         <ul className="social-links">
//           <li>
//             <a href="https://www.instagram.com/" aria-label="Instagram">
//               <img 
//                 src="/images/logo-instagram.svg" 
//                 alt="Instagram Logo" 
//                 width="20" 
//                 className="social-icon" 
//               />
//             </a>
//           </li>
//           <li>
//             <a href="https://www.facebook.com/" aria-label="Facebook">
//               Facebook
//             </a>
//           </li>
//         </ul>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
// import { Link } from 'react-router-dom';
import { Button, Row, Col, Typography, Image } from 'antd';
import { InstagramOutlined, FacebookOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <nav>
          <Row justify="space-between" align="middle">
            <Col>
              <Image
                src="/images/qr.svg"
                alt="Logo"
                width={70}
                preview={false}
                style={styles.logo}
              />
            </Col>
            <Col>
              <Row gutter={16}>
                <Col>
                  <Button
                    type="primary"
                    href="/login"
                    size="large"
                    style={{ ...styles.navButton, backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                  >
                    LOG IN
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    href="/register"
                    size="large"
                    style={{ ...styles.navButton, backgroundColor: 'light purple', borderColor: '#722ed1' }}
                  >
                    REGISTER
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </nav>
      </header>

      {/* Main Content - Hero Section */}
      <main style={styles.mainContent}>
        <section style={styles.heroSection}>
          <Row justify="space-between" align="middle">
            <Col span={12}>
              <Title level={1} style={styles.heroTitle}>
                Transform your Prescription to <br />
                <span style={styles.highlightedText}>QR Code</span>
              </Title>
              <Paragraph style={styles.heroText}>
                Simplifying Your Healthcare Service with Secure QR Codes.
                Access healthcare like never before.
              </Paragraph>
              <Button
                type="default"
                href="#home"
                size="large"
                style={styles.learnMoreButton}
              >
                LEARN MORE
              </Button>
            </Col>
            <Col span={12}>
              <Image
                src="/images/doc.png"
                alt="Doctor"
                className="hero-image"
                style={styles.heroImage}
                preview={false}
              />
            </Col>
          </Row>
        </section>
      </main>

      {/* About Section */}
      <section id="home" style={styles.aboutSection}>
        <Row justify="center">
          <Col span={20} md={12}>
            <Title level={2} style={styles.aboutTitle}>
              Efficient and Secure Digital Prescriptions
            </Title>
            <Paragraph style={styles.aboutText}>
              Our hospital is proud to offer instantly accessible QR codes for
              all prescriptions, simplifying your healthcare experience.
            </Paragraph>
            <Image
              src="/images/icon.png"
              alt="Doctor Icon"
            
              style={styles.aboutImage}
              preview={false}
            />
          </Col>
        </Row>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <Row justify="center">
          <Col>
            <Button
              type="primary"
              href="/register"
              size="large"
              style={styles.registerButton}
            >
              REGISTER TO GET STARTED!
            </Button>
          </Col>
        </Row>
        <Row justify="center" style={styles.socialLinks}>
          <Col>
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              style={styles.socialIcon}
            >
              <InstagramOutlined style={styles.socialIconStyle} />
            </a>
          </Col>
          <Col>
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              style={styles.socialIcon}
            >
              <FacebookOutlined style={styles.socialIconStyle} />
            </a>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: '#fff',
    padding: '10px 30px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  aboutImage: {
    maxWidth: '100%',
    height: 'auto',  // You can adjust this to a specific height if needed.
    width: '10px',  // Adjust the width to reduce the image size
    marginTop: '20px',
  },
  navButton: {
    borderRadius: '5px',
    textDecoration: 'none', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  mainContent: {
    backgroundColor: '#f4f6f9',
    padding: '40px 0', // Reduced padding to minimize height
  },
  heroSection: {
    textAlign: 'left',
    padding: '0 30px',
  },
  heroTitle: {
    fontWeight: 700,
    fontSize: '32px',
    color: '#333',
  },
  highlightedText: {
    color: '#1890ff',
  },
  heroText: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  learnMoreButton: {
    borderRadius: '5px',
    padding: '10px 20px',
    backgroundColor: '#1890ff',
    color: '#fff',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textDecoration: 'none', 
  },
  heroImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  aboutSection: {
    backgroundColor: '#fff',
    padding: '40px 0', // Reduced padding to minimize height
    textAlign: 'center',
  },
  aboutTitle: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '20px',
  },
  aboutText: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  aboutImage: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: '20px',
  },
  footer: {
    backgroundColor: '#f4f6f9',
    padding: '40px 0',
    textAlign: 'center',
  },
  registerButton: {
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textDecoration: 'none', 
  },
  socialLinks: {
    marginTop: '20px',
    textDecoration: 'none', 
  },
  socialIcon: {
    margin: '0 10px',
    textDecoration: 'none', // Remove underline from links
  },
  socialIconStyle: {
    fontSize: '24px',
    color: '#555',
  },
};

export default LandingPage;
