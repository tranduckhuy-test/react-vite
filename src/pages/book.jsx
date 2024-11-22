import BookForm from '../components/book/book.form';
import BookTable from '../components/book/book.table';
import { useState } from 'react';

const BookPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div style={{ padding: '20px', marginBottom: '50px' }}>
      <div style={{ padding: '0px' }}>
        <BookForm onBookCreated={handleRefresh} />
        <BookTable refresh={refresh} handleRefresh={handleRefresh} />
      </div>
    </div>
  );
};

export default BookPage;
