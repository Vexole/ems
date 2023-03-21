import React from 'react';

export default function NavBar() {
  return (
    <section className="top-nav">
      <div>
        <a href="/">
          <p className="logo">Employee Management System</p>
        </a>
      </div>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu">
        <li>
          <a href="/#/employees">Employees</a>
        </li>
        <li>
          <a href="/#/employee/create">Create an Employee</a>
        </li>
      </ul>
    </section>
  );
}
