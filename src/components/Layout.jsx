import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

const Layout = ({ links }) => (
  <>
    <NavBar links={links} />
    <div className="wrapper">
      <Outlet />
    </div>
  </>
);

Layout.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Layout;
