


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { message } from 'antd';
// import { Layout, Form, Input, Select, Button, Row, Col } from 'antd';
// import './PrescriptionForm.css';  // Custom styles

// const { Content } = Layout;

// const Prescription = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [dosage, setDosage] = useState('');
//   const [quantity, setQuantity] = useState(1);  // Quantity of medication
//   const [price, setPrice] = useState(0);  // Total price calculation
//   const [patientDetails, setPatientDetails] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     contact: '',
//     patientID: '',
//     allergies: '',
//   });
//   const [doctorDetails, setDoctorDetails] = useState({
//     name: '',
//     specialization: '',
//     contact: '',
//   });
//   const [diagnosis, setDiagnosis] = useState('');
//   const [qrCodeUrl, setQrCodeUrl] = useState('');

//   // Fetch Doctor Information
//   const fetchDoctorInfo = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id', {}, {
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem('token'),
//         },
//       });

//       if (response.data.success) {
//         setDoctorDetails({
//           name: response.data.data.name,
//           specialization: response.data.data.specialization,
//           contact: response.data.data.PhoneNumber,
//         });
//       } else {
//         message.error('Failed to fetch doctor information');
//       }
//     } catch (error) {
//       console.error(error);
//       message.error('Error fetching doctor info');
//     }
//   };

//   useEffect(() => {
//     fetchDoctorInfo();

//     // Fetch suggested medicines from the backend based on the diagnosis
//     if (diagnosis) {
//       axios.get(`/api/medicines?diagnosis=${diagnosis}`).then((response) => {
//         setMedicines(response.data);
//       });
//     }
//   }, [diagnosis]);

//   // Handle Quantity Change and Price Calculation
//   const handleQuantityChange = (value) => {
//     setQuantity(value);
//     if (selectedMedicine) {
//       const medicinePrice = medicines.find(med => med._id === selectedMedicine).price;
//       setPrice(medicinePrice * value);  // Calculate total price
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     // Send the prescription data to the backend
//     axios
//       .post('/api/prescription', {
//         patientDetails,
//         selectedMedicine,
//         dosage,
//         quantity,
//         price,
//         doctorDetails,
//         diagnosis,
//       })
//       .then((response) => {
//         setQrCodeUrl(response.data.qrCodeUrl); // Get the QR code URL
//         message.success('Prescription submitted successfully');
//       })
//       .catch((err) => message.error('Error submitting the prescription'));
//   };

//   return (
//     <Layout className="layout">
//       <Content className="container">
//         <div className="prescription-form">
//           <div className="prescription-header">
//             {/* Hospital Logo and Name */}
//             <div className="hospital-info">
//               <img src="/path/to/hospital-logo.png" alt="Hospital Logo" className="hospital-logo" />
//               <h2 className="hospital-name">XYZ Hospital</h2>
//             </div>
//             <h1 className="text-center">Prescription</h1>
//             <div className="doctor-info">
//               <p><strong>Doctor: </strong>{doctorDetails.name}</p>
//               <p><strong>Specialization: </strong>{doctorDetails.specialization}</p>
//               <p><strong>Contact: </strong>{doctorDetails.contact}</p>
//             </div>
//           </div>

//           {/* Patient Information */}
//           <div className="patient-info">
//             <h2 className="section-title">Patient Information</h2>
//             <Form layout="vertical" onSubmit={handleSubmit}>
//               <Row gutter={16}>
//                 <Col span={8}>
//                   <Form.Item label="Patient Name">
//                     <Input
//                       value={patientDetails.name}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
//                       placeholder="Enter Patient's Name"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item label="Age">
//                     <Input
//                       value={patientDetails.age}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
//                       placeholder="Enter Age"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item label="Gender">
//                     <Input
//                       value={patientDetails.gender}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })}
//                       placeholder="Enter Gender"
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Row gutter={16}>
//                 <Col span={8}>
//                   <Form.Item label="Patient ID">
//                     <Input
//                       value={patientDetails.patientID}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, patientID: e.target.value })}
//                       placeholder="Enter Patient ID"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item label="Contact">
//                     <Input
//                       value={patientDetails.contact}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, contact: e.target.value })}
//                       placeholder="Enter Contact"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item label="Allergies" Option>
//                     <Input
//                       value={patientDetails.allergies}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, allergies: e.target.value })}
//                       placeholder="Enter Allergies"
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Form>
//           </div>

//           {/* Diagnosis and Medication */}
//           <div className="medication-info">
//             <h2 className="section-title">Medication Details</h2>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Enter Diagnosis">
//                   <Input
//                     value={diagnosis}
//                     onChange={(e) => setDiagnosis(e.target.value)}
//                     placeholder="Enter Diagnosis"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="Select Medicine">
//                   <Select
//                     value={selectedMedicine}
//                     onChange={(value) => {
//                       setSelectedMedicine(value);
//                       const medicinePrice = medicines.find(med => med._id === value).price;
//                       setPrice(medicinePrice * quantity);  // Update price based on selected medicine and quantity
//                     }}
//                     placeholder="Select Medicine"
//                   >
//                     {medicines.map((medicine) => (
//                       <Select.Option key={medicine._id} value={medicine._id}>
//                         {medicine.name} (Rs. {medicine.price} per strip)
//                       </Select.Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Dosage">
//                   <Input
//                     value={dosage}
//                     onChange={(e) => setDosage(e.target.value)}
//                     placeholder="Enter Dosage"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="Quantity">
//                   <Input
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => handleQuantityChange(e.target.value)}
//                     min={1}
//                     placeholder="Enter Quantity"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Total Price (₹)">
//                   <Input value={price} disabled />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Button type="primary" htmlType="submit" block onClick={handleSubmit}>
//               Submit Prescription
//             </Button>
//           </div>

//           {/* QR Code */}
//           {qrCodeUrl && (
//             <div className="mt-4 text-center">
//               <h3>Your Prescription QR Code</h3>
//               <img src={qrCodeUrl} alt="QR Code" className="img-fluid" />
//             </div>
//           )}
//         </div>
//       </Content>
//     </Layout>
//   );
// };

// export default Prescription;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { message } from 'antd';
// import { Layout, Form, Input, Select, Button, Row, Col } from 'antd';
// import './PrescriptionForm.css';  // Custom styles

// const { Content } = Layout;

// const Prescription = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [dosage, setDosage] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [price, setPrice] = useState(0);
//   const [patientDetails, setPatientDetails] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     contact: '',
//     patientID: '',
//     allergies: '',
//   });
//   const [doctorDetails, setDoctorDetails] = useState({
//     name: '',
//     specialization: '',
//     contact: '',
//   });
//   const [diagnosis, setDiagnosis] = useState('');
//   const [qrCodeUrl, setQrCodeUrl] = useState('');

//   // Fetch Doctor Information
//   const fetchDoctorInfo = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id', {}, {
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem('token'),
//         },
//       });

//       if (response.data.success) {
//         setDoctorDetails({
//           name: response.data.data.name,
//           specialization: response.data.data.specialization,
//           contact: response.data.data.PhoneNumber,
//         });
//       } else {
//         message.error('Failed to fetch doctor information');
//       }
//     } catch (error) {
//       console.error(error);
//       message.error('Error fetching doctor info');
//     }
//   };

//   useEffect(() => {
//     fetchDoctorInfo();
//   }, []);

//   // Fetch suggested medicines based on diagnosis
//   useEffect(() => {
//     if (diagnosis) {
//       axios.get(`/api/medicines?diagnosis=${diagnosis}`).then((response) => {
//         setMedicines(response.data);
//       });
//     }
//   }, [diagnosis]);

//   // Handle Quantity Change and Price Calculation
//   const handleQuantityChange = (value) => {
//     setQuantity(value);
//     if (selectedMedicine) {
//       const medicinePrice = medicines.find(med => med._id === selectedMedicine).price;
//       setPrice(medicinePrice * value);
//     }
//   };

//   const handleSubmit = (values) => {
//     // Send the prescription data to the backend
//     axios
//       .post('/api/prescription', {
//         patientDetails,
//         selectedMedicine,
//         dosage,
//         quantity,
//         price,
//         doctorDetails,
//         diagnosis,
//       })
//       .then((response) => {
//         setQrCodeUrl(response.data.qrCodeUrl);
//         message.success('Prescription submitted successfully');
//       })
//       .catch((err) => message.error('Error submitting the prescription'));
//   };

//   const handleClear = () => {
//     setPatientDetails({
//       name: '',
//       age: '',
//       gender: '',
//       contact: '',
//       patientID: '',
//       allergies: '',
//     });
//     setSelectedMedicine(null);
//     setDosage('');
//     setQuantity(1);
//     setPrice(0);
//     setDiagnosis('');
//     setQrCodeUrl('');
//   };

//   return (
//     <Layout className="layout">
//       <Content className="container">
//         <div className="prescription-form">
//           <div className="prescription-header">
//             <div className="hospital-info">
//               <img src="/path/to/hospital-logo.png" alt="Hospital Logo" className="hospital-logo" />
//               <h2 className="hospital-name">XYZ Hospital</h2>
//             </div>
//             <h1 className="text-center">Prescription</h1>
//             <div className="doctor-info">
//               <p><strong>Doctor: </strong>{doctorDetails.name}</p>
//               <p><strong>Specialization: </strong>{doctorDetails.specialization}</p>
//               <p><strong>Contact: </strong>{doctorDetails.contact}</p>
//             </div>
//           </div>

//           {/* Patient Information */}
//           <div className="patient-info">
//             <h2 className="section-title">Patient Information</h2>
//             <Form layout="vertical" onFinish={handleSubmit}>
//               <Row gutter={16}>
//                 <Col span={8}>
//                   <Form.Item label="Patient Name" name="name" rules={[{ required: true, message: 'Please enter patient name' }]}>
//                   <Input
//                       value={patientDetails.name}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
//                       placeholder="Enter Patient's Name"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please enter age' }]}>
//                     <Input
//                       type="number"
//                       value={patientDetails.age}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
//                       placeholder="Enter Age"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender' }]}>
//                     <Select
//                       value={patientDetails.gender}
//                       onChange={(value) => setPatientDetails({ ...patientDetails, gender: value })}
//                       placeholder="Select Gender"
//                     >
//                       <Select.Option value="Male">Male</Select.Option>
//                       <Select.Option value="Female">Female</Select.Option>
//                       <Select.Option value="Other">Other</Select.Option>
//                     </Select>
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Row gutter={16}>
//                 <Col span={8}>
//                   <Form.Item label="Patient ID" name="patientID" rules={[{ required: true, message: 'Please enter patient ID' }]}>
//                     <Input
//                       value={patientDetails.patientID}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, patientID: e.target.value })}
//                       placeholder="Enter Patient ID"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item label="Contact" name="contact" rules={[{ required: true, message: 'Please enter contact number' }]}>
//                     <Input
//                       value={patientDetails.contact}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, contact: e.target.value })}
//                       placeholder="Enter Contact"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item label="Allergies">
//                     <Input
//                       value={patientDetails.allergies}
//                       onChange={(e) => setPatientDetails({ ...patientDetails, allergies: e.target.value })}
//                       placeholder="Enter Allergies"
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Form>
//           </div>

//           {/* Diagnosis and Medication */}
//           <div className="medication-info">
//             <h2 className="section-title">Medication Details</h2>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Enter Diagnosis" name="diagnosis" rules={[{ required: true, message: 'Please enter diagnosis' }]}>
//                   <Input
//                     value={diagnosis}
//                     onChange={(e) => {
//                       setDiagnosis(e.target.value);
//                       // Fetch medicines based on diagnosis
//                       if (e.target.value) {
//                         axios.get(`/api/medicines?diagnosis=${e.target.value}`).then((response) => {
//                           setMedicines(response.data);
//                         });
//                       } else {
//                         setMedicines([]); // Clear medicines if diagnosis is empty
//                       }
//                     }}
//                     placeholder="Enter Diagnosis"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="Select Medicine" name="medicine" rules={[{ required: true, message: 'Please select a medicine' }]}>
//                   <Select
//                     value={selectedMedicine}
//                     onChange={(value) => {
//                       setSelectedMedicine(value);
//                       const medicinePrice = medicines.find(med => med._id === value).price;
//                       setPrice(medicinePrice * quantity);
//                     }}
//                     placeholder="Select Medicine"
//                   >
//                     {medicines.map((medicine) => (
//                       <Select.Option key={medicine._id} value={medicine._id}>
//                         {medicine.name} (Rs. {medicine.price} per strip)
//                       </Select.Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Dosage" name="dosage" rules={[{ required: true, message: 'Please enter dosage' }]}>
//                   <Input
//                     value={dosage}
//                     onChange={(e) => setDosage(e.target.value)}
//                     placeholder="Enter Dosage"
//                   />
//                 </Form.Item>
//               </Col>
//               <Col span={12}>
//                 <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
//                   <Input                     type="number"
//                     value={quantity}
//                     onChange={(e) => handleQuantityChange(e.target.value)}
//                     min={1}
//                     placeholder="Enter Quantity"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Total Price (₹)">
//                   <Input value={price} disabled />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Button type="primary" htmlType="submit" block>
//               Submit Prescription
//             </Button>
//             <Button type="default" block onClick={handleClear} style={{ marginTop: '10px' }}>
//               Clear Form
//             </Button>
//           </div>

//           {/* QR Code */}
//           {qrCodeUrl && (
//             <div className="mt-4 text-center">
//               <h3>Your Prescription QR Code</h3>
//               <img src={qrCodeUrl} alt="QR Code" className="img-fluid" />
//             </div>
//           )}
//         </div>
//       </Content>
//     </Layout>
//   );
// };

// export default Prescription;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { Layout, Form, Input, Select, Button, Row, Col } from 'antd';
import './PrescriptionForm.css';  // Custom styles

const { Content } = Layout;

const Prescription = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [dosage, setDosage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    patientID: '',
    allergies: '',
  });
  const [doctorDetails, setDoctorDetails] = useState({
    name: '',
    specialization: '',
    contact: '',
  });
  const [diagnosis, setDiagnosis] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Fetch Doctor Information
  const fetchDoctorInfo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id', {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (response.data.success) {
        setDoctorDetails({
          name: response.data.data.name,
          specialization: response.data.data.specialization,
          contact: response.data.data.PhoneNumber,
        });
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

  // Fetch suggested medicines based on diagnosis
  useEffect(() => {
    if (diagnosis) {
      axios.get(`/api/medicines?diagnosis=${diagnosis}`).then((response) => {
        setMedicines(response.data);
      });
    }
  }, [diagnosis]);

  // Handle Quantity Change and Price Calculation
  const handleQuantityChange = (value) => {
    setQuantity(value);
    if (selectedMedicine) {
      const medicinePrice = medicines.find(med => med._id === selectedMedicine).price;
      setPrice(medicinePrice * value);
    }
  };

  // Fetch Patient Details if available
  const fetchPatientDetails = async (patientID) => {
    try {
      const response = await axios.get(`/api/patient/${patientID}`);
      if (response.data.success) {
        setPatientDetails(response.data.data);
      } else {
        message.error('Patient not found. Please enter new patient details.');
      }
    } catch (error) {
      console.error(error);
      message.error('Error fetching patient details');
    }
  };

  const handleSubmit = async (values) => {
    try {
      // Send the prescription data to the backend
      const response = await axios.post('/api/prescription', {
        patientDetails,
        selectedMedicine,
        dosage,
        quantity,
        price,
        doctorDetails,
        diagnosis,
      });

      if (response.data.success) {
        setQrCodeUrl(response.data.qrCodeUrl);
        message.success('Prescription submitted successfully');

        // Send QR Code via Twilio
        await axios.post('/api/send-qr-code', {
          to: patientDetails.contact,
          qrCodeUrl: response.data.qrCodeUrl,
        });

        message.success('QR Code sent to patient\'s mobile');
      } else {
        message.error('Error submitting the prescription');
      }
    } catch (err) {
      console.error(err);
      message.error('Error submitting the prescription');
    }
  };

  const handleClear = () => {
    setPatientDetails({
      name: '',
      age: '',
      gender: '',
      contact: '',
      patientID: '',
      allergies: '',
    });
    setSelectedMedicine(null);
    setDosage('');
    setQuantity(1);
    setPrice(0);
    setDiagnosis('');
    setQrCodeUrl('');
  };

  return (
    <Layout className="layout">
      <Content className="container">
        <div className="prescription-form">
          <div className="prescription-header">
            <div className="hospital-info">
              <img src="/path/to/hospital-logo.png" alt="Hospital Logo" className="hospital-logo" />
              <h2 className="hospital-name">XYZ Hospital</h2>
            </div>
            <h1 className="text-center">Prescription</h1>
            <div className="doctor-info">
              <p><strong>Doctor: </strong>{doctorDetails.name}</p>
              <p><strong>Specialization: </strong>{doctorDetails.specialization}</p>
              <p><strong>Contact: </strong>{doctorDetails.contact}</p>
            </div>
          </div>

          {/* Patient Information */}
          <div className="patient-info">
            <h2 className="section-title">Patient Information</h2>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Patient ID" name="patientID" rules={[{ required: true, message: 'Please enter patient ID' }]}>
                    <Input
                      value={patientDetails.patientID}
                      onChange={(e) => {
                        setPatientDetails({ ...patientDetails, patientID: e.target.value });
                        if (e.target.value) {
                          fetchPatientDetails(e.target.value);
                        }
                      }}
                      placeholder="Enter Patient ID"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Patient Name" name="name" rules={[{ required: true, message: 'Please enter patient name' }]}>
                    <Input
                      value={patientDetails.name}
                      onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                      placeholder="Enter Patient's Name"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please enter age' }]}>
                    <Input
                      type="number"
                      value={patientDetails.age}
                      onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                      placeholder="Enter Age"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender' }]}>
                    <Select
                      value={patientDetails.gender}
                      onChange={(value) => setPatientDetails({ ...patientDetails, gender: value })}
                      placeholder="Select Gender"
                    >
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Contact" name="contact" rules={[{ required: true, message: 'Please enter contact number' }]}>
                    <Input
                      value={patientDetails.contact}
                      onChange={(e) => setPatientDetails({ ...patientDetails, contact: e.target.value })}
                      placeholder="Enter Contact"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Allergies">
                    <Input
                      value={patientDetails.allergies}
                      onChange={(e) => setPatientDetails({ ...patientDetails, allergies: e.target.value })}
                      placeholder="Enter Allergies"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>

          {/* Diagnosis and Medication */}
          <div className="medication-info">
            <h2 className="section-title">Medication Details</h2>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Enter Diagnosis" name="diagnosis" rules={[{ required: true, message: 'Please enter diagnosis' }]}>
                  <Input
                    value={diagnosis}
                    onChange={(e) => {
                      setDiagnosis(e.target.value);
                      // Fetch medicines based on diagnosis
                      if (e.target.value) {
                        axios.get(`/api/medicines?diagnosis=${e.target.value}`).then((response) => {
                          setMedicines(response.data);
                        });
                      } else {
                        setMedicines([]); // Clear medicines if diagnosis is empty
                      }
                    }}
                    placeholder="Enter Diagnosis"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Select Medicine" name="medicine" rules={[{ required: true, message: 'Please select a medicine' }]}>
                  <Select
                    value={selectedMedicine}
                    onChange={(value) => {
                      setSelectedMedicine(value);
                      const medicinePrice = medicines.find(med => med._id === value).price;
                      setPrice(medicinePrice * quantity);
                    }}
                    placeholder="Select Medicine"
                  >
                    {medicines.map((medicine) => (
                      <Select.Option key={medicine._id} value={medicine._id}>
                        {medicine.name} (Rs. {medicine.price} per strip)
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Dosage" name="dosage" rules={[{ required: true, message: 'Please enter dosage' }]}>
                  <Input
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="Enter Dosage"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min={1}
                    placeholder="Enter Quantity"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Total Price (₹)">
                  <Input value={price} disabled />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit" block>
              Submit Prescription
            </Button>
            <Button type="default" block onClick={handleClear} style={{ marginTop: '10px' }}>
              Clear Form
            </Button>
          </div>

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="mt-4 text-center">
              <h3>Your Prescription QR Code</h3>
              <img src={qrCodeUrl} alt="QR Code" className="img-fluid" />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Prescription;