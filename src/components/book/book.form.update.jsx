import { updateBookAPI } from '../../services/api.book.service';
import { uploadImageAPI } from '../../services/api.service';
import {
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
  notification,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

const UpdateBookModal = ({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  dataUpdate,
  handleRefresh,
}) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setTitle(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(
        `${import.meta.env.VITE_API_IMAGE_URL}/images/book/${dataUpdate && dataUpdate.thumbnail ? dataUpdate.thumbnail : ''}`,
      );
    }
  }, [dataUpdate]);

  const handleSaveBtn = async () => {
    if (
      !title ||
      !author ||
      !price ||
      !quantity ||
      !category ||
      (!preview && !thumbnail)
    ) {
      message.error('Please fill all required fields');
      return;
    }

    try {
      let thumbnailPath = '';

      if (preview && thumbnail) {
        thumbnailPath = await uploadImageAPI(thumbnail, 'book');
      }

      await updateBookAPI(
        id,
        title,
        author,
        price,
        quantity,
        category,
        thumbnailPath ? thumbnailPath.data.fileUploaded : dataUpdate.thumbnail,
      );

      notification.success({
        message: 'Book updated successfully',
        description: `Book has been updated successfully`,
      });
      setIsUpdateModalOpen(false);
      handleRefresh();
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'Book update failed',
        description: JSON.stringify(errorMessage),
      });
    }
  };

  const onCategoryChange = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    if (!thumbnail) {
      return;
    }
    const objectUrl = URL.createObjectURL(thumbnail);
    if (!objectUrl) {
      return;
    }

    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnail]);

  const handleSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setThumbnail(null);
      setPreview(null);
      return;
    }
    setThumbnail(e.target.files[0]);
  };

  return (
    <div
      className="book-form"
      style={{
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <Button type="primary" onClick={() => setIsUpdateModalOpen(true)}>
            Create Book
          </Button>
        </div>
      </div>
      <Modal
        title="Update Book"
        open={isUpdateModalOpen}
        width={600}
        okText="Save"
        onOk={handleSaveBtn}
        onCancel={() => setIsUpdateModalOpen(false)}
        maskClosable={false}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span>Id</span>
            <Input value={id} disabled />
          </div>
          <div>
            <span>Title</span>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <span>Author</span>
            <Input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div>
            <span>Price</span>
            <br />
            <InputNumber
              style={{ width: '100%' }}
              value={price}
              onChange={(value) => setPrice(value)}
            />
          </div>
          <div>
            <span>Quantity</span>
            <br />
            <InputNumber
              style={{ width: '100%' }}
              value={quantity}
              addonAfter="₫"
              onChange={(value) => setQuantity(value)}
            />
          </div>
          <div>
            <span>Category</span>
            <br />
            <Select
              style={{ width: '100%' }}
              showSearch
              placeholder="Select a category"
              optionFilterProp="label"
              onChange={onCategoryChange}
              value={category}
              options={[
                {
                  value: 'Arts',
                  label: 'Arts',
                },
                {
                  value: 'Business',
                  label: 'Business',
                },
                {
                  value: 'Comics',
                  label: 'Comics',
                },
                {
                  value: 'Cooking',
                  label: 'Cooking',
                },
                {
                  value: 'Entertainment',
                  label: 'Entertainment',
                },
                {
                  value: 'History',
                  label: 'History',
                },
                {
                  value: 'Music',
                  label: 'Music',
                },
                {
                  value: 'Sports',
                  label: 'Sports',
                },
                {
                  value: 'Teens',
                  label: 'Teens',
                },
                {
                  value: 'Travel',
                  label: 'Travel',
                },
              ]}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span>Thumbnail:* </span>
            <div>
              <label
                htmlFor="inputThumbnail"
                style={{
                  display: 'block',
                  width: 'fit-content',
                  padding: '8px 10px',
                  background: 'rgb(125 188 239)',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}
              >
                Upload Thumbnail
              </label>
              <input
                type="file"
                id="inputThumbnail"
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
                    width: '250px',
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
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateBookModal;
