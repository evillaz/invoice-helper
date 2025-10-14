import { Outlet } from 'react-router-dom';
import NavBar from '../common/NavBar';

const SalesNavBar = () => {
  const links = {
    create: {
      path: '/ventas/registrar-venta',
      text: 'REGISTRAR VENTAS',
    },
    index: {
      path: '/ventas',
      text: 'LISTA VENTAS',
    },
  };

  return (
    <>
      <NavBar links={links} navBarType="salesNavBar" />
      <Outlet />
    </>
  );
};

export default SalesNavBar;
