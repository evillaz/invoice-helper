import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { path: '/', text: 'MOTOS' },
  { path: '/clientes', text: 'CLIENTES' },
];

const NavBar = () => (
  <nav className="navBar">
    <ul className="navBar-wrap">
      {links.map((link) => (
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

export default NavBar;
