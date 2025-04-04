import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => (
  <>
    <NavBar />
    <div className="wrapper">
      <Outlet />
    </div>
  </>
);

export default Layout;
