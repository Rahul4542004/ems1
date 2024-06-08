import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { EmployeeList } from './components/EmployeeList';
import { DepartmentList} from './components/DepartmentList';
import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Employee } from './components/Employee';
import {Department} from './components/Department.js'
import { StateProvider } from './components/StateContext.js';
function App() {
  return (
    <StateProvider>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path = '/' element={<EmployeeList/>}></Route>
        <Route path = '/employees' element={<EmployeeList/>}></Route>
        <Route path = '/add-employee' element={<Employee/>}></Route>
        <Route path = '/departments' element = {<DepartmentList/>}></Route>
        <Route path = '/edit-employee/:eid' element = {<Employee/>}></Route>
        <Route path = '/add-department' element = {<Department/>}></Route>
        <Route path = '/edit-dept/:id' element = {<Department/>}></Route>
      </Routes>
    </BrowserRouter>
    </StateProvider>

  );
}

export default App;
