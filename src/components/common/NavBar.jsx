import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ links, navBarType }) => (
  <nav className="navBar">
    <ul className={`navBar-${navBarType}`}>
      {Object.values(links).map((link) => (
        <React.Fragment key={link.text}>
          <li
            className="navBar-item"
          >
            <NavLink to={link.path}>
              {link.text}
            </NavLink>
          </li>
        </React.Fragment>
      ))}
    </ul>
  </nav>
);

NavBar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  navBarType: PropTypes.string.isRequired,
};

export default NavBar;
