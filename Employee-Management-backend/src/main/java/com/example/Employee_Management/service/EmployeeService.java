package com.example.Employee_Management.service;

import com.example.Employee_Management.dto.EmployeeDto;
import java.util.*;
public interface EmployeeService {
    EmployeeDto createEmployeeDto(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long empId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long id,EmployeeDto employeeDto);
    void deleteEmployeeById(Long id);
}
