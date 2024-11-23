import { logoutAPI } from '../../services/api.service';
import { AuthContext } from '../context/auth.context';
import {
  BookOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [current, setCurrent] = useState('');
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location && location.pathname) {
      const allRoutes = ['users', 'books'];
      const currentRoute = allRoutes.find(
        (route) => `/${route}` === location.pathname,
      );

      if (currentRoute) {
        setCurrent(currentRoute);
      } else {
        setCurrent('home');
      }
    }
  }, [location]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const response = await logoutAPI();
    if (response.data) {
      localStorage.removeItem('access_token');
      setUser({
        email: '',
        phone: '',
        fullName: '',
        role: '',
        avatar: '',
        id: '',
      });
      message.success('Logout successfully');
      navigate('/');
    }
  };

  const leftItems = [
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
  ];

  const rightItems = [
    user.fullName
      ? {
          label: `Welcome ${user.fullName}`,
          key: 'settings',
          icon: <ProfileOutlined />,
          children: [
            {
              label: <span onClick={handleLogout}>Logout</span>,
              key: 'logout',
              icon: <LogoutOutlined />,
            },
          ],
        }
      : {
          label: <Link to="/login">Login</Link>,
          key: 'login',
          icon: <LoginOutlined />,
        },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={leftItems}
        style={{ flex: 1 }}
      />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={rightItems}
        style={{ marginLeft: 'auto', minWidth: '91px' }}
      />
    </div>
  );
};

export default Header;
