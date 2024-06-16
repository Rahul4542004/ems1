import React from 'react'
import { useState,useEffect } from 'react';
import { Typography,Button,TextField, TextareaAutosize } from '@mui/material';
import { addDepartment, updateDepartment,getDepartment } from '../services/DepartmentService';
import { useStateContext } from './StateContext';
import { useNavigate, useParams } from 'react-router-dom';
export const Department = () => {
    const namePattern = /^[A-Za-z ]{1,30}$/;
    const [dName,setDName] = useState('');
    const [description,setDescription] = useState('');
    const [did,setDId] = useState('');
    const [errors,setErrors] = useState({});
    const navigator = useNavigate();
    const {id} = useParams('id');
    const {state,setState} = useStateContext();
    setState(false);
    useEffect(() => {
        if(id){
            getDepartment(id).then((response) => {
                setDName(response.data.departmentName)
                setDId(response.data.id)
                setDescription(response.data.departmentDescription)
            }).catch(err => console.error(err))
        }
    },[id])
    function isBlank(str) {
        return str.trim().length === 0;
      }
    function handleClick(e){
        e.preventDefault();
        const tempErrors = {};
        tempErrors.departmentName = namePattern.test(dName) ? "" : "Department name should contain only alphabets and shouldn't exceed length 30"
        tempErrors.id = parseInt(did)>0 && parseInt(did)<10000 ? "" : "Id should be greater than 0 and less than 5 digits";
        tempErrors.departmentDescription = isBlank(description) ? "It can't be empty!!!" : "";
        setErrors(tempErrors);
        if(namePattern.test(dName) && parseInt(did)>0 && parseInt(did)<10000 && !isBlank(description))
        {
            const department = {id : did,departmentName : dName,departmentDescription : description};
            if(!id){
                addDepartment(department).then(response => {
                    console.log(response.data);
                    navigator("/departments");
                });
            }
            else{
                updateDepartment(department,id).then(response => {
                    console.log(response.data)
                    navigator("/departments");
                });
            }
        }
    }
  return (
    <div style={{display : "flex",justifyContent : "center",marginTop : "100px"}}>
        <form style={{display : "flex", flexDirection : "column",border : "solid black 3px",width : "600px",alignItems : "center"}}>
        <Typography variant="h3" sx={{ marginTop: "20px" }}>
                    {id ? "Update Deparment" : "Add Department"}
                </Typography>
                {!id && (
                    <TextField
                        margin="normal"
                        required
                        id="id"
                        label="Department ID"
                        name="id"
                        placeholder="Enter department ID"
                        type="text"
                        autoFocus
                        fullWidth
                        value={did}
                        onChange={e => setDId(e.target.value)}
                        sx={{ marginTop: "30px", width: "300px" }}
                        error={!!errors.id}
                        helperText={errors.id}
                    />
                )}
            <TextField
                margin="normal"
                required
                id="departmentName"
                label="Depatment Name"
                name="departmentName"
                placeholder="Enter department name"
                type="text"
                autoFocus
                fullWidth
                value={dName}
                onChange = {e => setDName(e.target.value)}
                sx={{marginTop : "30px",width : "300px"}}
                error={!!errors.departmentName}
                helperText={errors.departmentName}
            />
            <TextareaAutosize
                margin="normal"
                value = {description}
                onChange = {e => setDescription(e.target.value)}
                required
                id="departmentDescription"
                label="Department Description"
                name="lastName"
                placeholder="Enter department description"
                autoFocus
                fullWidth
                style={{marginTop : "30px",width : "295px",height : "50px"}}
            />
            <Button onClick={handleClick} type="submit" variant='contained' sx={{borderRadius : "10px",marginTop : "30px",marginBottom : "20px"}}>Submit</Button>
        </form>
    </div>
  )
}
