


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Card, Button, message, Form, Input, Select, Modal, Table } from 'antd';
import { MedicineBoxOutlined } from '@ant-design/icons';
import { QRCodeCanvas } from 'qrcode.react'; 
const { Content } = Layout;
const { Option } = Select;

const PrescriptionForm = () => {
  const [form] = Form.useForm();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  const [isNewPatient, setIsNewPatient] = useState(false);

  const columns = [
    {
      title: 'Medicine Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Dosage',
      dataIndex: 'dosage',
      key: 'dosage',
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
    },
    {
      title: 'Cost',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  // Fetch Doctor Information
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id', {}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (response.data.success) {
          setDoctorInfo(response.data.data);
        } else {
          message.error('Failed to fetch doctor information');
        }
      } catch (error) {
        console.error(error);
        message.error('Error fetching doctor info');
      }
    };
    fetchDoctorInfo();
  }, []);

  // Fetch Medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/medicine/get-all-medicines');
        if (response.data.success) {
          setMedicines(response.data.data);
        }
      } catch (error) {
        console.error(error);
        message.error('Error fetching medicines');
      }
    };
    fetchMedicines();
  }, []);

  
  const searchPatient = async (values) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/patient/get-patient-info/${values.patientId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        if (response.data.success) {
          const patientData = { ...response.data.data }; // Copy the data
            delete patientData._id;  // Remove _id field

            setPatientInfo(patientData);
            
            setIsNewPatient(false);
        } else {
            message.error('Patient not found. Please add new patient.');
            setIsNewPatient(true);
        }
    } catch (error) {
        console.error(error);
        message.error('Error fetching patient info');
        setIsNewPatient(true);
    }
};


  // Add New Patient
  const addNewPatient = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/patient/add', values, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (response.data.success) {
        setPatientInfo(response.data.data);
        setIsNewPatient(false);
        message.success('Patient added successfully');
      } else {
        message.error('Failed to add patient');
      }
    } catch (error) {
      console.error(error);
      message.error('Error adding patient');
      
    }
  };

  // Add Medicine to Prescription
  const addMedicine = (values) => {
    const selectedMedicine = medicines.find(med => med._id === values.medicineId);
    const newMedicine = {
      ...selectedMedicine,
      dosage: values.dosage,
      shift: values.shift,
    };
    setSelectedMedicines([...selectedMedicines, newMedicine]);
    setTotalCost(totalCost + selectedMedicine.price);
    form.resetFields(['medicineId', 'dosage', 'shift']);
  };
  // Generate Prescription QR Code and Save Prescription to DB
  // const generateAndStorePrescription = async () => {
  //   const prescriptionData = {
  //     patientId,
  //     doctorId,
  //     medicines: selectedMedicines,
  //     totalCost,
  //     qrCodeData,
  //   };

  //   try {
  //     // Send data to backend to store prescription
  //     const response = await axios.post('http://localhost:5000/api/prescription/generate', prescriptionData, {
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('token'),
  //       },
  //     });

  //     if (response.data.success) {
  //       message.success('Prescription generated and stored successfully');
  //     } else {
  //       message.error('Failed to store prescription');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     message.error('Error generating prescription');
  //   }
  // };

// Generate Prescription and Store it in DB
const generateAndStorePrescription = async () => {
  console.log('Patient Info:', patientInfo);
  console.log('Doctor Info:', doctorInfo);

  if (!patientInfo || !doctorInfo) {
    message.error('Patient or doctor information is missing');
    return;
  }


  const prescriptionData = {
    patientId: patientInfo.patientId,  // Add patientId from the patientInfo
    doctorId: doctorInfo.email,    // Add doctorId from the doctorInfo
    selectedMedicines: selectedMedicines,
    totalCost: totalCost,
    qrCodeData: qrCodeData || "", // The QR code data you want to generate and store
  };

  try {
    const response = await axios.post('http://localhost:5000/api/prescription/generate', prescriptionData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    if (response.data.success) {
      message.success('Prescription generated and stored successfully');
      setQrCodeData(response.data.qrCodeData);
      setIsModalVisible(true); // Show the QR code modal
    } else {
      message.error('Failed to generate prescription');
    }
  } catch (error) {
    console.error(error);
    message.error('Error generating prescription');
  }
};


  // Send Prescription via Twilio
  // const sendPrescription = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/prescription/send-prescription', {
  //       patientPhone: patientInfo.phoneNumber,
  //       prescriptionData: qrCodeData,
  //     }, {
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('token'),
  //       },
  //     });
  //     if (response.data.success) {
  //       message.success('Prescription sent successfully');
  //     } else {
  //       message.error('Failed to send prescription');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     message.error('Error sending prescription');
  //   }
  // };

  // Send Prescription via Twilio
// const sendPrescription = async () => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/prescription/send-prescription', {
//       patientPhone: patientInfo.phoneNumber,  // Ensure this is the correct phone number field
//       prescriptionData: qrCodeData,           // This is the QR code data
//     }, {
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//       },
//     });
//     console.log('API Response:', response.data);
//     if (response.data.success) {
//       message.success('Prescription sent successfully');
//     } else {
//       message.error('Failed to send prescription');
//     }
//   } catch (error) {
//     console.error(error);
//     message.error('Error sending prescription');
//   }
// };

// const sendPrescription = async () => {
//   try {
//     // Validate data before sending
//     if (!patientInfo?.phoneNumber || !qrCodeData) {
//       console.error('Missing data:', { patientPhone: patientInfo?.phoneNumber, qrCodeData });
//       message.error('Missing patient phone number or QR code data');
//       return;
//     }

//     // Log the payload
//     console.log('Payload:', {
//       patientPhone: patientInfo.phoneNumber,
//       qrCodeData: qrCodeData,
//     });

//     const response = await axios.post('http://localhost:5000/api/prescription/send-prescription', {
//       patientPhone: patientInfo.phoneNumber,
//       qrCodeData: qrCodeData,
//     }, {
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//       },
//     });

//     if (response.data.success) {
//       message.success('Prescription sent successfully');
//     } else {
//       message.error('Failed to send prescription');
//     }
//   } catch (error) {
//     console.error('API Error:', error.response?.data || error.message);
//     message.error('Error sending prescription');
//   }
// };
const sendPrescription = async () => {
  try {
    // Validate data before sending
    if (!patientInfo?.phoneNumber || !qrCodeData) {
      console.error('Missing data:', { patientPhone: patientInfo?.phoneNumber, qrCodeData });
      message.error('Missing patient phone number or QR code data');
      return;
    }

    // Log the payload for debugging
    console.log('Payload:', {
      patientPhone: patientInfo.phoneNumber,
      qrCodeData: qrCodeData,
    });

    // Send the prescription data to the backend
    const response = await axios.post(
      'http://localhost:5000/api/prescription/send-prescription',
      {
        patientPhone: patientInfo.phoneNumber,
        qrCodeData: qrCodeData,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );

    // Handle the response
    if (response.data.success) {
      message.success('Prescription sent successfully');
    } else {
      message.error('Failed to send prescription: ' + (response.data.error || 'Unknown error'));
    }
  } catch (error) {
    // Log the full error for debugging
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    // Display a user-friendly error message
    message.error('Error sending prescription: ' + (error.response?.data?.error || error.message));
  }
};

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '24px' }}>
        <Card
          title="Generate Prescription"
          style={{
            borderRadius: '10px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Doctor Information */}
          {doctorInfo && (
            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #e8e8e8', borderRadius: '10px' }}>
              <strong>Doctor Information:</strong>
              <div><strong>Name:</strong> {doctorInfo.name}</div>
              <div><strong>Email:</strong> {doctorInfo.email}</div>
              <div><strong>Specialty:</strong> {doctorInfo.specialization}</div>
              <div><strong>Phone:</strong> {doctorInfo.phoneNumber}</div>
              <div><strong>Address:</strong> {doctorInfo.address}</div>
            </div>
          )}

          {/* Patient Search Form */}
          <Form onFinish={searchPatient} layout="inline">
            <Form.Item
              name="patientId"
              label="Patient ID"
              rules={[{ required: true, message: 'Please enter patient ID' }]}
            >
              <Input placeholder="Enter Patient ID" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search Patient
              </Button>
            </Form.Item>
          </Form>

          {/* Add New Patient Form */}
          {isNewPatient && (
            <Card
              title="Add New Patient"
              style={{ marginTop: '20px' }}
            >
              <Form onFinish={addNewPatient} layout="vertical">
              <Form.Item
                  name="patientId"
                  label="PatientId"
                  rules={[{ required: true, message: 'Please enter patient id' }]}
                >
                  <Input placeholder="Enter Patientid" />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter patient name' }]}
                >
                  <Input placeholder="Enter Patient Name" />
                </Form.Item>
                <Form.Item
                  name="age"
                  label="Age"
                  rules={[{ required: true, message: 'Please enter patient age' }]}
                >
                  <Input placeholder="Enter Patient Age" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="phonenumber"
                  rules={[{ required: true, message: 'Please enter patient ph no' }]}
                >
                  <Input placeholder="Enter Patient ph no" />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: 'Please select gender' }]}
                >
                  <Select placeholder="Select Gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="allergies"
                  label="Allergies (Optional)"
                >
                  <Input placeholder="Enter Allergies" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please enter patient address' }]}
                >
                  <Input placeholder="Enter Patient address" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Patient
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          )}

          {/* Patient Information Section */}
          {patientInfo && (
            <Card
              title="Patient Information"
              style={{
                marginTop: '20px',
                borderRadius: '10px',
                border: '1px solid #e8e8e8',
                padding: '15px',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div><strong>ID:</strong> {patientInfo.patientId}</div>
              <div><strong>Name:</strong> {patientInfo.name}</div>
              <div><strong>Ph no:</strong> {patientInfo.phoneNumber}</div>
              <div><strong>Age:</strong> {patientInfo.age}</div>
              <div><strong>Gender:</strong> {patientInfo.gender}</div>
              <div><strong>Allergies:</strong> {patientInfo.allergies || 'None'}</div>
            </Card>
          )}

          {/* Medicine Selection Form */}
          <Form form={form} onFinish={addMedicine} layout="inline" style={{ marginTop: '20px' }}>
            <Form.Item
              name="medicineId"
              label="Medicine"
              rules={[{ required: true, message: 'Please select a medicine' }]}
            >
              <Select placeholder="Select Medicine" style={{ width: '200px' }}>
                {medicines.map(med => (
                  <Option key={med._id} value={med._id}>
                    {med.name} (${med.price})
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="dosage"
              label="Dosage"
              rules={[{ required: true, message: 'Please enter dosage' }]}
            >
              <Input placeholder="Enter Dosage" />
            </Form.Item>
            <Form.Item
              name="shift"
              label="Shift"
              rules={[{ required: true, message: 'Please select shift' }]}
            >
              <Select placeholder="Select Shift" style={{ width: '120px' }}>
                <Option value="morning">Morning</Option>
                <Option value="afternoon">Afternoon</Option>
                <Option value="evening">Evening</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Medicine
              </Button>
            </Form.Item>
          </Form>

          {/* Selected Medicines Table */}
          <Table
            columns={columns}
            dataSource={selectedMedicines}
            rowKey="_id"
            style={{ marginTop: '20px' }}
          />

          {/* Total Cost */}
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
          </div>

          {/* Generate QR Code and Send Prescription */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              type="primary"
              icon={<MedicineBoxOutlined />}
              onClick={generateAndStorePrescription} // Call the new function
              style={{ marginRight: '10px' }}
            >
              Generate Prescription
            </Button>

            <Button
              type="primary"
              onClick={sendPrescription}
              disabled={!qrCodeData}
            >
              Send Prescription
            </Button>
          </div>
        </Card>

        {/* QR Code Modal */}
        <Modal
  title="Prescription QR Code"
   visible={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  footer={null}
>
  <QRCodeCanvas value={qrCodeData} />
</Modal>

      
      </Content>
    </Layout>
  );
};

export default PrescriptionForm;




