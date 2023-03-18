import React from 'react';
import { createRoot } from 'react-dom/client';
import EmployeeDirectory from './EmployeeDirectory.jsx';

const element = <EmployeeDirectory />;
const root = createRoot(document.getElementById('root'));
root.render(element);
