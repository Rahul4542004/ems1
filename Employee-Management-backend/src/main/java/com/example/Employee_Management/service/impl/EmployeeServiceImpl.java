package com.example.Employee_Management.service.impl;

import com.example.Employee_Management.dto.EmployeeDto;
import com.example.Employee_Management.entity.Employee;
import com.example.Employee_Management.exception.EmployeeNotFoundException;
import com.example.Employee_Management.mapper.EmployeeMapper;
import com.example.Employee_Management.repository.EmployeeRepository;
import com.example.Employee_Management.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDto createEmployeeDto(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }
    @Override
    public EmployeeDto getEmployeeById(Long empId){
        Employee employee = employeeRepository.findById(empId).orElseThrow(() -> new EmployeeNotFoundException("Employee with id : " + empId + " doesn't exist"));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employeeList = employeeRepository.findAll();
        List<EmployeeDto> result = new ArrayList<>();
        for(Employee employee : employeeList){
            result.add(EmployeeMapper.mapToEmployeeDto(employee));
        }
        return result;
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee with id : " + id + " doesn't exist"));
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        Employee updatedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee with id : " + id + " doesn't exist"));
        employeeRepository.deleteById(id);
    }
}
