import { AuthContext } from '../components/context/auth.context';
import { loginAPI } from '../services/api.service';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Row, notification } from 'antd';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await loginAPI(values.email, values.password);
      if (response.data) {
        localStorage.setItem('access_token', response.data.access_token);
        setUser(response.data.user);
        notification.success({
          message: 'Success',
          description: 'Login successfully',
        });
        navigate('/users');
      } else {
        notification.error({
          message: 'Failed',
          description: 'Login failed',
        });
      }
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'Login failed',
        description: JSON.stringify(errorMessage),
      });
      setLoading(false);
    }
  };

  const handleLoginEnter = (e) => {
    if (e.key === 'Enter') {
      form.submit();
    }
  };

  return (
    <Row
      justify="center"
      style={{ minHeight: '100vh', marginTop: '100px', padding: '10px' }}
    >
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: '30px',
            margin: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <legend style={{ fontSize: '24px', padding: '0 5px' }}>Login</legend>

          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
                {
                  type: 'email',
                  message: 'Please input a valid email!',
                },
              ]}
              style={{ marginBottom: '28px' }}
            >
              <Input autoComplete="email" />
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
              <Input.Password
                autoComplete="current-password"
                onKeyDown={handleLoginEnter}
              />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                onClick={() => form.submit()}
                block
              >
                Login
              </Button>
              <Row justify="end" style={{ marginTop: '10px' }}>
                <Link to="/">
                  Go to homepage <ArrowRightOutlined />
                </Link>
              </Row>
            </Form.Item>
          </Form>
          <Divider />
          <div>
            Not registered yet? <Link to="/register">Register now!</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
