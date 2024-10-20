import UseForm from '../components/user/user.form';
import UserTable from '../components/user/user.table';
import { useState } from 'react';

const UserPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div style={{ padding: '20px', marginBottom: '50px' }}>
      <div style={{ padding: '0px' }}>
        <UseForm onUserCreated={handleRefresh} />
        <UserTable refresh={refresh} handleRefresh={handleRefresh} />
      </div>
    </div>
  );
};

export default UserPage;
