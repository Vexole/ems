import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);
const root = createRoot(document.getElementById('root'));
root.render(element);
