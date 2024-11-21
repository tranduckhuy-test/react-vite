import { Spin } from 'antd';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthContext } from './components/context/auth.context';
import Footer from './components/layouts/footer';
import Header from './components/layouts/header';
import { getAccountAPI } from './services/api.service';

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  const getUserInfo = async () => {
    if (localStorage && !localStorage.getItem('access_token')) {
      setIsAppLoading(false);
      return;
    }

    try {
      const response = await getAccountAPI();

      if (response && response.data) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAppLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isAppLoading ? (
        <div
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spin />
        </div>
      ) : (
        <div style={{ padding: '0 200px' }}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
