import { createBookAPI } from '../../services/api.book.service';
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

const BookForm = ({ onBookCreated }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetAndCloseModal = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }

    if (preview) {
      setThumbnail(null);
      setPreview(null);
      URL.revokeObjectURL(preview);
    }

    setTitle('');
    setAuthor('');
    setPrice(0);
    setQuantity(0);
    setCategory('');
    setIsModalOpen(false);
  };

  const handleCreateBtn = async () => {
    try {
      if (!thumbnail) {
        message.error('Please upload thumbnail');
        return;
      }

      const thumbnailPath = await uploadImageAPI(thumbnail, 'book');

      if (!thumbnailPath && !thumbnailPath.data) {
        message.error('Upload thumbnail failed');
        return;
      }

      await createBookAPI(
        thumbnailPath.data.fileUploaded,
        title,
        author,
        price,
        quantity,
        category,
      );

      notification.success({
        message: 'Book created successfully',
        description: `Book '${title}' has been created successfully`,
      });

      resetAndCloseModal();
      onBookCreated();
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'Book creation failed',
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

  const handleCancelButton = () => {
    let isConfirmed = confirm(
      'Are you sure to cancel, your input data will be lost?',
    );

    if (!isConfirmed) {
      return;
    }

    resetAndCloseModal();
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
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Create Book
          </Button>
        </div>
      </div>
      <Modal
        title="Create Book"
        open={isModalOpen}
        width={600}
        okText="Create"
        onOk={handleCreateBtn}
        onCancel={() => handleCancelButton()}
        maskClosable={false}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
              defaultValue={0}
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
              defaultValue={0}
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

export default BookForm;
