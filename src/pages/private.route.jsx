import { AuthContext } from '../components/context/auth.context';
import { Button, Result } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user && user.id) {
    return children;
  }

  return (
    <div
      id="error-page"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Result
        status="403"
        title="403"
        subTitle="You are not authorized to access this page"
        extra={
          <Button type="primary">
            <Link to="/">Go back to the home page</Link>
          </Button>
        }
      />
    </div>
  );
};

export default PrivateRoute;
