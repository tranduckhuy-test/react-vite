import { createUserAPI } from '../../services/api.service';
import { Button, Input, Modal, notification } from 'antd';
import { useState } from 'react';

const UserForm = ({ onUserCreated }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetAndCloseModal = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setIsModalOpen(false);
  };

  // Handle create user button
  const handleCreateBtn = async () => {
    try {
      const res = await createUserAPI(fullName, email, password, phone);
      notification.success({
        message: 'User created successfully',
        description: `User '${res.data.fullName}' has been created successfully`,
      });

      onUserCreated();
      resetAndCloseModal();
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'User creation failed',
        description: JSON.stringify(errorMessage),
      });
    }
  };

  return (
    <div
      className="user-form"
      style={{
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Create User
          </Button>
        </div>
      </div>
      <Modal
        title="Create User"
        open={isModalOpen}
        width={600}
        okText="Create"
        onOk={handleCreateBtn}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
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
      </Modal>
    </div>
  );
};

export default UserForm;
