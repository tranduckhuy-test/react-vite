import { updateUserAPI, uploadImageAPI } from '../../services/api.service';
import { Button, Drawer, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';

const ViewUserDetail = ({
  isDetailOpen,
  setIsDetailOpen,
  dataDetail,
  handleRefresh,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSelectedFile(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }, [isDetailOpen]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateUserAvatar = async () => {
    const resUpload = await uploadImageAPI(selectedFile, 'avatar');
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      const resUpdateUser = await updateUserAPI(
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone,
        newAvatar,
      );

      if (resUpdateUser.data) {
        notification.success({
          message: 'Success',
          description: 'Upload avatar successfully',
        });
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        handleRefresh();
      } else {
        notification.error({
          message: 'Error',
          description: `Update user failed! ${JSON.stringify(resUpdateUser.message)}`,
        });
      }
    } else {
      notification.error({
        message: 'Error',
        description: `Upload avatar failed! ${JSON.stringify(resUpload.message)}`,
      });
    }
  };

  return (
    <>
      <Drawer
        title="User Detail"
        width={'30vw'}
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
            <strong>Avatar: </strong>
            <div
              style={{
                height: '150px',
                width: '150px',
                border: '1px solid rgb(125, 188, 239)',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
              }}
            >
              <img
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                src={`${import.meta.env.VITE_API_IMAGE_URL}/images/avatar/${dataDetail.avatar}`}
                alt="Avatar"
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>

            <div>
              <label
                htmlFor="inputAvatar"
                style={{
                  display: 'block',
                  width: 'fit-content',
                  padding: '8px 10px',
                  background: 'rgb(125 188 239)',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Upload Avatar
              </label>
              <input
                type="file"
                id="inputAvatar"
                hidden
                ref={fileInputRef}
                accept="image/png, image/jpeg"
                onChange={(event) => handleSelectFile(event)}
              />
            </div>

            {preview && (
              <>
                <div
                  style={{
                    height: '150px',
                    width: '150px',
                    border: '1px solid rgb(125, 188, 239)',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    src={`${preview}`}
                    alt="Avatar"
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>

                <Button
                  type="primary"
                  style={{ width: '100px' }}
                  onClick={handleUpdateUserAvatar}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        ) : (
          <div>No data</div>
        )}
      </Drawer>
    </>
  );
};

export default ViewUserDetail;
