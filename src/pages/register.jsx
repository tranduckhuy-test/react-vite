import { registerUserAPI } from '../services/api.service';
import { Button, Col, Divider, Form, Input, Row, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await registerUserAPI(
        values.fullName,
        values.email,
        values.password,
        values.phone,
      );

      if (response.data) {
        notification.success({
          message: 'Success',
          description: 'Register successfully',
        });
        navigate('/login');
      } else {
        notification.error({
          message: 'Failed',
          description: 'Register failed',
        });
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'Register failed',
        description: JSON.stringify(errorMessage),
      });
    }
  };

  return (
    <Row
      justify="center"
      style={{ minHeight: '100vh', marginTop: '50px', padding: '10px' }}
    >
      <Col xs={24} md={16} lg={8}>
        <h1 style={{ textAlign: 'center' }}>Register</h1>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Please input your Full Name!',
              },
            ]}
            style={{ marginBottom: '28px' }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
            style={{ marginBottom: '28px' }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            style={{ marginBottom: '28px' }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your Phone!',
              },
              {
                pattern: new RegExp(/\d+/g),
                message: 'Phone number must be a number',
              },
            ]}
            style={{ marginBottom: '28px' }}
          >
            <Input />
          </Form.Item>

          <Button type="primary" onClick={() => form.submit()} block>
            Register
          </Button>
        </Form>
        <Divider />
        <div>
          Already have an account? <Link to={'/login'}>Login here</Link>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPage;
