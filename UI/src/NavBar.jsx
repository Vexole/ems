import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <section className="top-nav">
      <div>
        <Link to="/">
          <p className="logo">Employee Management System</p>
        </Link>
      </div>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu">
        <li>
          <Link to="/employees">Employees</Link>
        </li>
        <li>
          <Link to="/create">Create an Employee</Link>
        </li>
        <li>
          <Link to="/employeesNearingRetirement">Employees Nearing Retirement</Link>
        </li>
      </ul>
    </section>
  );
}
