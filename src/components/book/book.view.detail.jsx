import { Drawer, Tag } from 'antd';

const ViewBookDetail = ({
  isDetailOpen,
  setIsDetailOpen,
  dataDetail,
  formattedNumber,
}) => {
  return (
    <>
      <Drawer
        title="Book Detail"
        width={'30vw'}
        onClose={() => setIsDetailOpen(false)}
        open={isDetailOpen}
      >
        {dataDetail ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              fontSize: '16px',
            }}
          >
            <div>
              <strong>Id: </strong>
              <span>{dataDetail._id}</span>
            </div>
            <div>
              <strong>Title: </strong>
              <Tag
                style={{ fontSize: '15px', textWrap: 'wrap' }}
                color="green"
                key={dataDetail.mainText}
              >
                {dataDetail.mainText}
              </Tag>
            </div>
            <div>
              <strong>Author: </strong>
              <Tag color="geekblue" key={dataDetail.author}>
                {dataDetail.author.toUpperCase()}
              </Tag>
            </div>
            <div>
              <strong>Price: </strong>
              <span>{formattedNumber(dataDetail.price)}</span>
              <span>₫</span>
            </div>
            <div>
              <strong>Quantity: </strong>
              <span>{formattedNumber(dataDetail.quantity)}</span>
            </div>
            <div>
              <strong>Sold: </strong>
              <span>{formattedNumber(dataDetail.sold)}</span>
            </div>
            <div>
              <strong>Thumbnail: </strong>
              <div
                style={{
                  marginTop: '10px',
                  height: '358px',
                  width: '350px',
                  border: '1px solid rgb(125, 188, 239)',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <img
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  src={`${import.meta.env.VITE_API_IMAGE_URL}/images/book/${dataDetail && dataDetail.thumbnail ? dataDetail.thumbnail : ''}`}
                  alt="Thummbnail"
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>No data</div>
        )}
      </Drawer>
    </>
  );
};

export default ViewBookDetail;
