import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField, Typography, responsiveFontSizes } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import {createEmployee, getEmployee, updateEmployee} from "../services/EmployeeService";
import { useStateContext } from './StateContext';
export const Employee = () => {
    const namePattern = /^[A-Za-z]{1,10}$/;
    const namePattern1 = /^[A-Za-z]{1,15}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [fName,setFName] = useState('');
    const [lName,setLName] = useState('');
    const [email,setEmail] = useState('');
    const [id,setId] = useState('');
    const [errors,setErrors] = useState({});
    const navigator = useNavigate();
    const {eid} = useParams();
    const {state,setState} = useStateContext();
    setState(true);
    useEffect(() => {
        if(eid){
            getEmployee(eid).then((response) => {
                setFName(response.data.firstName)
                setLName(response.data.lastName)
                setEmail(response.data.email)
            }).catch(err => console.error(err))
        }
    },[eid])
    function handleClick(e){
        e.preventDefault();
        const tempErrors = {};
        tempErrors.fName = !namePattern.test(fName) ? "First name should contain only alphabets and shouldn't exceed length 10" : "";
        tempErrors.lName = !namePattern1.test(lName) ? "Last name should contain only alphabets and shouldn't exceed length 15" : "";
        tempErrors.email = !emailPattern.test(email) ? "Invalid email" : "";
        if(parseInt(id)>0 && parseInt(id)<10000){
            tempErrors.id = '';
        }
        else
            tempErrors.id = 'Id should be greater than 0 and less than 5 digits'
        setErrors(tempErrors);
        if(namePattern.test(fName) && namePattern1.test(lName) && emailPattern.test(email)){
            const employee = {id : id,firstName : fName, lastName : lName,email : email};
            if(eid){
                updateEmployee(employee,eid).then((response) => {
                    console.log(response.data);
                })
            }
            else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                })
            }
            navigator("/employees");
        }
    }
  return (
    <div style={{display : "flex",justifyContent : "center",marginTop : "100px"}}>
        <form style={{display : "flex", flexDirection : "column",border : "solid black 3px",width : "600px",alignItems : "center"}}>
        <Typography variant="h3" sx={{ marginTop: "20px" }}>
                    {eid ? "Update Employee" : "Add Employee"}
                </Typography>
                {!eid && (
                    <TextField
                        margin="normal"
                        required
                        id="id"
                        label="Employee ID"
                        name="id"
                        placeholder="Enter employee ID"
                        type="text"
                        autoFocus
                        fullWidth
                        value={id}
                        onChange={e => setId(e.target.value)}
                        sx={{ marginTop: "30px", width: "300px" }}
                        error={!!errors.id}
                        helperText={errors.id}
                    />
                )}
            <TextField
                margin="normal"
                required
                id="firstName"
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                type="text"
                autoFocus
                fullWidth
                value={fName}
                onChange = {e => setFName(e.target.value)}
                sx={{marginTop : "30px",width : "300px"}}
                error={!!errors.fName}
                helperText={errors.fName}
            />
            <TextField
                margin="normal"
                value = {lName}
                onChange = {e => setLName(e.target.value)}
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                autoFocus
                fullWidth
                sx={{marginTop : "30px",width : "300px"}}
                error={!!errors.lName}
                helperText={errors.lName}
            />
            <TextField
                margin="normal"
                value = {email}
                onChange={e => setEmail(e.target.value)}
                required
                type="email"
                id="email"
                label="Email"
                name="email"
                placeholder="Enter email"
                autoFocus
                fullWidth
                sx={{marginTop : "30px",width : "300px"}}
                error={!!errors.email}
                helperText={errors.email}
            />
            <Button onClick={handleClick} type="submit" variant='contained' sx={{borderRadius : "10px",marginTop : "30px",marginBottom : "20px"}}>Submit</Button>
        </form>
    </div>
  )
}
