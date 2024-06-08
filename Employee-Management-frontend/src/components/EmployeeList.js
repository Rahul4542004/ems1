import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { deleteEmployee } from '../services/EmployeeService'
import { useStateContext } from './StateContext'
export const EmployeeList = () => {
  const tableCell = {
    border : "solid black 2px",
    backgroundColor : 'darkgrey',
    width : '150px',
    textAlign : 'center'
  }
  const REST_API_BASE_URL = "http://localhost:8085/api/employees"
  const listEmployees = () => axios.get(REST_API_BASE_URL);
  const [list,setList] = useState([]);
  const {state,setState} = useStateContext();
  setState(true);
  useEffect(() => {
    listEmployees().then((response) => setList(response.data))
      .catch(err => console.log(err))
  },[])
  const cell = {
    textAlign : "center",
    width : '150px',
    border : "solid black 2px"
  }
  const navigator = useNavigate();
  function handleClick(){
    navigator("/add-employee");
  }
  function updateEmployee(eid){
      navigator(`/edit-employee/${eid}`);
  }
  function deleteEmp(eid){
      deleteEmployee(eid).then(res => listEmployees().then((response) => setList(response.data)));
  }
  return (
    <div style={{display : 'flex',alignItems : 'center',flexDirection : "column"}}>
      <Button variant="contained" sx={{marginTop : '20px',transition: 'all',
    '&:hover': {
      backgroundColor: 'white',
      color : 'blue'
    }}} onClick={handleClick}>Add Employee</Button>
      <table style = {{border : 'solid black 2px',marginTop : '20px',fontSize : '20px',borderCollapse : 'collapse'}}>
        <thead>
          <tr style = {tableCell}>
            <td style={tableCell}>Employee Id</td>
            <td style={tableCell}>First Name</td>
            <td style={tableCell}>Last Name</td>
            <td style={tableCell}>Email</td>
            <td style={tableCell}>Actions</td>
          </tr>
        </thead>
        <tbody>
          {list.map(employee => 
            <tr key={employee.id}>
                <td style={cell}>{employee.id}</td>
                <td style={cell}>{employee.firstName}</td>
                <td style={cell}>{employee.lastName}</td>
                <td style={cell}>{employee.email}</td>
                <td style={cell}>
                  <Button onClick={() => updateEmployee(employee.id)} variant="text" sx={{color : "orange"}}>Update</Button>
                  <Button onClick={() => deleteEmp(employee.id)}sx={{color : "red"}} variant="text">Delete</Button>
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
