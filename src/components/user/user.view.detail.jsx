import { Drawer } from 'antd';

const ViewUserDetail = ({ isDetailOpen, setIsDetailOpen, dataDetail }) => {
  return (
    <>
      <Drawer
        title="User Detail"
        onClose={() => setIsDetailOpen(false)}
        open={isDetailOpen}
      >
        {dataDetail ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              fontSize: '16px',
            }}
          >
            <div>
              <strong>Id: </strong>
              <span>{dataDetail._id}</span>
            </div>
            <div>
              <strong>Full Name: </strong>
              <span>{dataDetail.fullName}</span>
            </div>
            <div>
              <strong>Email: </strong>
              <span>{dataDetail.email}</span>
            </div>
            <div>
              <strong>Phone: </strong>
              <span>{dataDetail.phone}</span>
            </div>
            <div>
              <strong>Role: </strong>
              <span>{dataDetail.role}</span>
            </div>
          </div>
        ) : (
          <div>No data</div>
        )}
      </Drawer>
    </>
  );
};

export default ViewUserDetail;
