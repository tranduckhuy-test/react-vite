import UseForm from '../components/user/user.form';
import UserTable from '../components/user/user.table';

const UserPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div>
        Users
        <UseForm />
        <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
