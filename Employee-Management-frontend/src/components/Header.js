import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from './StateContext';

export function Header() {
  const navigator = useNavigate();
  const {state,setState} = useStateContext();
  function handleClick1(){
    navigator("/employees")
  }
  function handleClick2(){
    navigator("/departments")
  }
  return (
    <Box>
      <AppBar position="static" sx={{backgroundColor : "rgba(0,0,0,0.8)"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h4" component="div">
            Employee Management System
          </Typography>
          <Button color="inherit" onClick = {handleClick1} sx={{marginLeft : "18px",fontSize : '20px',borderBottom : state ? "solid white 2px" : "none"}}>Employees</Button>
          <Button color="inherit" onClick = {handleClick2} sx={{marginLeft : "10px",fontSize : '20px',borderBottom : !state ? "solid white 2px" : "none"}}>Departments</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
