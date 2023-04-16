import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';
import ScrollToTop from './ScrollToTop.jsx';

const element = (
  <Router>
    <>
      <ScrollToTop />
      <Page />
    </>
  </Router>
);
const root = createRoot(document.getElementById('root'));
root.render(element);
