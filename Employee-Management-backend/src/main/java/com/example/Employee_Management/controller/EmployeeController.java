package com.example.Employee_Management.controller;

import com.example.Employee_Management.dto.EmployeeDto;
import com.example.Employee_Management.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
@CrossOrigin("*")
public class EmployeeController {
    private EmployeeService employeeService;
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee = employeeService.createEmployeeDto(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id){
        EmployeeDto employeeDto = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employeeDto);
    }
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> result = employeeService.getAllEmployees();
        return ResponseEntity.ok(result);
    }
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Long id,@RequestBody EmployeeDto employeeDto){
        EmployeeDto updatedEmployee = employeeService.updateEmployee(id,employeeDto);
        return ResponseEntity.ok(updatedEmployee);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployeeById(id);
        return ResponseEntity.ok("Employee with id : " + id + " deleted successfully");
    }
}
