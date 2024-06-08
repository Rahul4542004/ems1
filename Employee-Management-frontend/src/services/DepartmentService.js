import axios from "axios";
const  REST_API_BASE_URL = "http://localhost:8085/api/departments"
export const getDepartmentList = () => axios.get(REST_API_BASE_URL);
export const addDepartment = (department) => axios.post(REST_API_BASE_URL,department)
export const updateDepartment = (department,id) => axios.put(REST_API_BASE_URL + "/" + id,department);
export const deleteDepartment = (id) => axios.delete(REST_API_BASE_URL + "/" + id);
export const getDepartment = (id) => axios.get(REST_API_BASE_URL + "/" + id);