import React, { useContext, useEffect,useState } from 'react'
import { Button } from '@mui/material'
import { deleteDepartment, getDepartmentList } from '../services/DepartmentService'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from './StateContext'
export const DepartmentList = () => {
  const tableCell = {
    border : "solid black 2px",
    backgroundColor : 'darkgrey',
    width : "200px",
    textAlign : 'center'
  }
  const cell = {
    textAlign : "center",
    width : "200px",
    border : "solid black 2px"
  }
  const [list,setList] = useState([]);
  const {state,setState} = useStateContext();
  setState(false);
  useEffect(() => {
    getDepartmentList().then((response) => setList(response.data)).catch(err => console.error(err));
  },[])
  const navigator = useNavigate();
  function handleClick(){
    navigator('/add-department');
  }
  const deleteDept = (id) => {
    deleteDepartment(id)
      .then(() => {
        setList((prevList) => prevList.filter((department) => department.id !== id));
      })
      .catch((err) => console.error(err));
  };
  function updateDept(id){
    navigator(`/edit-dept/${id}`)
  }
  return (
    <div style={{display : 'flex',alignItems : 'center',flexDirection : "column"}}>
      <Button variant="contained" sx={{marginTop : '20px',transition: 'all',
    '&:hover': {
      backgroundColor: 'white',
      color : 'blue'
    }}} onClick={handleClick}>Add Department</Button>
      <table style = {{border : 'solid black 2px',marginTop : '20px',fontSize : '20px',borderCollapse : 'collapse'}}>
        <thead>
          <tr style = {tableCell}>
            <td style={tableCell}>Department Id</td>
            <td style={tableCell}>Department Name</td>
            <td style={tableCell}>Department Description</td>
            <td style={tableCell}>Actions</td>
          </tr>
        </thead>
        <tbody>
          {list.map(department => 
            <tr key={department.id}>
                <td style={cell}>{department.id}</td>
                <td style={cell}>{department.departmentName}</td>
                <td style={cell}>{department.departmentDescription}</td>
                <td style={cell}>
                  <Button onClick={() => updateDept(department.id)} variant="text" sx={{color : "orange"}}>Update</Button>
                  <Button onClick={() => deleteDept(department.id)}sx={{color : "red"}} variant="text">Delete</Button>
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
