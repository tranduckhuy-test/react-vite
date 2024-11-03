import { Button, Result } from 'antd';
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

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
        status="500"
        title="500"
        subTitle={error.statusText || error.message}
        extra={
          <Button type="primary">
            <Link to="/">Go back to the home page</Link>
          </Button>
        }
      />
    </div>
  );
}
