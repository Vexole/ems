import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmployeeCreate from './EmployeeComponents/EmployeeCreate.jsx';
import NotFound from './NotFound.jsx';
import EmployeeDetails from './EmployeeComponents/EmployeeDetails.jsx';
import EmployeeDirectory from './EmployeeComponents/EmployeeDirectory.jsx';
import EmployeeEdit from './EmployeeComponents/EmployeeEdit.jsx';
import EmployeeDelete from './EmployeeComponents/EmployeeDelete.jsx';

export default class PageRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={EmployeeDirectory} />
        <Route path="/employees" component={EmployeeDirectory} />
        <Route path="/detail/:id" component={EmployeeDetails} />
        <Route path="/create" component={EmployeeCreate} />
        <Route path="/edit/:id" component={EmployeeEdit} />
        <Route path="/delete/:id" component={EmployeeDelete} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}
