import React from 'react';
import Footer from './Footer.jsx';
import NavBar from './NavBar.jsx';
import PageRoutes from './PageRoutes.jsx';

export default function Page() {
  return (
    <>
      <NavBar />
      <PageRoutes />
      <Footer />
    </>
  );
}
