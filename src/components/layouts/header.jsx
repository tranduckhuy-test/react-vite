import {
  BookOutlined,
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [current, setCurrent] = useState('');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/users">User</Link>,
      key: 'users',
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/books">Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
      children: [
        {
          type: 'group',
          label: 'Reference Books',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Textbooks',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      label: <Link to="/login">Login</Link>,
      key: 'login',
      icon: <LoginOutlined />,
    },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
