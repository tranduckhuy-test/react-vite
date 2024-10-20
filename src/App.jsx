import { Outlet } from 'react-router-dom';

import Footer from './components/layouts/footer';
import Header from './components/layouts/header';

const App = () => {
  return (
    <div style={{ padding: '0 200px' }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
