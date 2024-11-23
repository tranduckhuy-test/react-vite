import { deleteBookAPI, getAllBooksAPI } from '../../services/api.book.service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Space, Table, Tag, notification } from 'antd';
import numeral from 'numeral';
import { useEffect, useState } from 'react';

import UpdateBookModal from './book.form.update';
import ViewBookDetail from './book.view.detail';

const BookTable = ({ refresh, handleRefresh }) => {
  const [dataBooks, setDataBooks] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const formattedNumber = (price) => numeral(price).format('0,0');

  const columns = [
    {
      title: 'No.',
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: 'Title',
      dataIndex: 'mainText',
      key: 'mainText',
      render: (_, record) => (
        <a
          href="#!"
          onClick={() => {
            setIsDetailOpen(true);
            setDataUpdate(record);
          }}
        >
          {record.mainText}
        </a>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <>{formattedNumber(price)} ₫</>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      key: 'sold',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (text) => {
        let color = 'geekblue';
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setIsUpdateModalOpen(true);
              setDataUpdate(record);
            }}
            style={{ color: 'orange', cursor: 'pointer', fontSize: '16px' }}
          />
          <Popconfirm
            title="Delete the book?"
            description="Are you sure to delete this book?"
            onConfirm={() => handleDeleteBookAPI(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: 'red', cursor: 'pointer', fontSize: '16px' }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoadingTable(true);
        const res = await getAllBooksAPI(current, pageSize);

        if (res.data) {
          const { result, meta } = res.data;

          setDataBooks(result);
          if (+meta.total !== total) {
            const maxPage = Math.ceil(+meta.total / pageSize);

            if (current > maxPage && current !== 1) {
              setCurrent(maxPage);
              return;
            }

            setTotal(+meta.total);
          }
        }
        setLoadingTable(false);
      } catch (error) {
        setLoadingTable(false);
        const errorMessage =
          error.response && error.response.data
            ? error.response.data.message
            : error.message;

        notification.error({
          message: 'Failed to load books',
          description: JSON.stringify(errorMessage),
        });
      }
    };

    loadBooks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, current, pageSize]);

  const handleDeleteBookAPI = async (id) => {
    try {
      await deleteBookAPI(id);
      notification.success({
        message: 'Book deleted successfully',
        description: `Book with id ${id} has been deleted successfully`,
      });
      handleRefresh();
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      notification.error({
        message: 'Failed to delete book',
        description: JSON.stringify(errorMessage),
      });
    }
  };

  const onChange = (pagination) => {
    if (+pagination.current !== +current) {
      setCurrent(+pagination.current);
    }
    if (+pagination.pageSize !== +pageSize) {
      setPageSize(+pagination.pageSize);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataBooks}
        rowKey={'_id'}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]} - {range[1]} of {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
        loading={loadingTable}
      />
      <UpdateBookModal
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        handleRefresh={handleRefresh}
      />

      <ViewBookDetail
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        dataDetail={dataUpdate}
        formattedNumber={formattedNumber}
      />
    </>
  );
};

export default BookTable;
