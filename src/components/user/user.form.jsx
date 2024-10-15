import { createUserAPI } from '../../services/api.service';
import { Button, Input, notification } from 'antd';
import { useState } from 'react';

const UseForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleCreateBtn = async () => {
    try {
      const res = await createUserAPI(fullName, email, password, phone);
      notification.success({
        message: 'User created successfully',
        description: 'User has been created successfully',
      });

      setFullName('');
      setEmail('');
      setPassword('');
      setPhone('');
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'User creation failed',
        description: errorMessage,
      });
    }
  };

  return (
    <div
      className="user-form"
      style={{
        margin: '10px 0 50px 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexDirection: 'column',
          minWidth: '500px',
        }}
      >
        <div>
          <span>Full Name</span>
          <Input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>
        <div>
          <span>Email</span>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <span>Phone</span>
          <Input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <Button type="primary" onClick={handleCreateBtn}>
          Create User
        </Button>
      </div>
    </div>
  );
};

export default UseForm;
