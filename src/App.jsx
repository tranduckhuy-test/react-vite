import { Outlet } from 'react-router-dom';

import Footer from './components/layouts/footer';
import Header from './components/layouts/header';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
