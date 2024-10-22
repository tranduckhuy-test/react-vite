import { updateUserAPI } from '../../services/api.service';
import { Input, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';

const UpdateUserModal = ({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  dataUpdate,
  onUserUpdated,
}) => {
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setEmail(dataUpdate.email);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleSaveBtn = async () => {
    try {
      await updateUserAPI(id, fullName, phone, dataUpdate.avatar);
      notification.success({
        message: 'User updated successfully',
        description: `User has been updated successfully`,
      });
      setIsUpdateModalOpen(false);
      onUserUpdated();
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'User update failed',
        description: JSON.stringify(errorMessage),
      });
    }
  };

  return (
    <Modal
      title="Update User"
      open={isUpdateModalOpen}
      width={600}
      okText="Save"
      onOk={handleSaveBtn}
      onCancel={() => setIsUpdateModalOpen(false)}
      maskClosable={false}
    >
      <div>
        <div>
          <span>Id</span>
          <Input value={id} disabled />
        </div>
        <span>Full Name</span>
        <Input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
      </div>
      <div>
        <span>Email</span>
        <Input value={email} disabled />
      </div>
      <div>
        <span>Phone</span>
        <Input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
