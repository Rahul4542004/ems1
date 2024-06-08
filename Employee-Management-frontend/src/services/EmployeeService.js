// src/services/EmployeeService.js

import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8085/api/employees';

export const createEmployee = (employee) => {
  return axios.post(REST_API_BASE_URL, employee);
};

export const getEmployee = (eid) => axios.get(REST_API_BASE_URL + "/" + eid);
export const updateEmployee = (employee,eid) => axios.put(REST_API_BASE_URL + "/" + eid,employee)
export const deleteEmployee = (eid) => axios.delete(REST_API_BASE_URL + "/" + eid);