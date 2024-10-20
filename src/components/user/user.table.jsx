import { deleteUserAPI, getAllUsersAPI } from '../../services/api.service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Space, Table, Tag, notification } from 'antd';
import React, { useEffect, useState } from 'react';

import UpdateUserModal from './user.form.update';
import ViewUserDetail from './user.view.detail';

const UserTable = ({ refresh, handleRefresh }) => {
  const [dataUsers, setDataUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => (
        <a
          href="#!"
          onClick={() => {
            setIsDetailOpen(true);
            setDataUpdate(record);
          }}
        >
          {record.fullName}
        </a>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text) => {
        let color = text === 'ADMIN' ? 'geekblue' : 'green';
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setIsUpdateModalOpen(true);
              setDataUpdate(record);
            }}
            style={{ color: 'orange', cursor: 'pointer', fontSize: '16px' }}
          />
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUserAPI(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: 'red', cursor: 'pointer', fontSize: '16px' }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    loadUsers();
  }, [refresh]);

  const handleDeleteUserAPI = async (id) => {
    try {
      await deleteUserAPI(id);
      notification.success({
        message: 'User deleted successfully',
        description: `User has been deleted successfully`,
      });
      handleRefresh();
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'User deletion failed',
        description: errorMessage,
      });
    }
  };

  const loadUsers = async () => {
    try {
      const response = await getAllUsersAPI();
      setDataUsers(response.data);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'Failed to load users',
        description: errorMessage,
      });
    }
  };

  return (
    <>
      <Table columns={columns} dataSource={dataUsers} rowKey={'_id'} />
      <UpdateUserModal
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        onUserUpdated={handleRefresh}
      />

      <ViewUserDetail
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        dataDetail={dataUpdate}
      />
    </>
  );
};

export default UserTable;
