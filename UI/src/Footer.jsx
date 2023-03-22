import React from 'react';

export default function Footer() {
  return (
    <footer>
      <section id="footer">
        <div className="company">
          <a href="/" target="_blank" id="store_logo">
            EMPLOYEE MANAGEMENT SYSTEM
          </a>
          <p>An easy solution to help you manage your employees!</p>
          <div className="social_media">
            <h1>SOCIAL MEDIA</h1>
            <div>
              <a href="https://www.facebook.com/">
                <img src="./images/facebook.png" alt="facebook" />
              </a>
              <a href="https://www.instagram.com/">
                <img src="./images/instagram.png" alt="instagram" />
              </a>
              <a href="https://twitter.com/home?lang=en">
                <img src="./images/twitter.png" alt="twitter" />
              </a>
              <a href="https://www.linkedin.com/in/bhupesh-shrestha-04/">
                <img src="./images/linkedin.png" alt="linkedin" />
              </a>
            </div>
          </div>
        </div>
        <hr />

        <div className="quick_links">
          <h1>Quick Links</h1>
          <ul>
            <li>
              <a href="/">Reports</a>
            </li>
            <li>
              <a href="/">Back Office</a>
            </li>
            <li>
              <a href="/">Website</a>
            </li>
          </ul>
        </div>
        <hr />

        <div className="stay_in_touch">
          <h1>Quick Codes</h1>
          <ul>
            <li>1001: Support Team</li>
            <li>1001: Need someone to cover</li>
            <li>1002: Open another register</li>
            <li>1003: Technical Difficulties</li>
          </ul>
        </div>
        <hr />

        <div className="recent_posts">
          <h1>Recent Announcements</h1>
          <article className="recent_post">
            <img src="./images/rules-changes.webp" alt="recent" />
            <h2 className="description">Changes in Rules</h2>
            <p className="date_author">Dec 25, 2022 By Jane Doe</p>
          </article>
          <article className="recent_post">
            <img
              src="./images/effective-employee-management.webp"
              alt="recent"
            />
            <h2 className="description">Effective Management</h2>
            <p className="date_author">Nov 22, 2022 By John Doe</p>
          </article>
        </div>
      </section>
      <p>Copyright &copy; 2023 | Employee Management System</p>
    </footer>
  );
}
