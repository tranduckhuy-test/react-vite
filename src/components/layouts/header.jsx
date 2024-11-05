import {
  BookOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
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
    },
    {
      label: 'Settings',
      key: 'settings',
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to="/login">Login</Link>,
          key: 'login',
          icon: <LoginOutlined />,
        },
        {
          label: <Link to="/logout">Logout</Link>,
          key: 'logout',
          icon: <LogoutOutlined />,
        },
      ],
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
