package com.example.Employee_Management.controller;

import com.example.Employee_Management.dto.DepartmentDto;
import com.example.Employee_Management.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController
@RequestMapping("/api/departments")
@CrossOrigin("*")
@AllArgsConstructor
public class DepartmentController {
    private DepartmentService departmentService;
    @PostMapping
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
        DepartmentDto createdDepartment = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(createdDepartment, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartments(){
        List<DepartmentDto> list = departmentService.getAllDepartments();
        return ResponseEntity.ok(list);
    }
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId){
        DepartmentDto department = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(department);
    }
    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@RequestBody DepartmentDto departmentDto,@PathVariable Long id){
        DepartmentDto department = departmentService.updateDepartment(departmentDto,id);
        return ResponseEntity.ok(department);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long id){
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Department with id : " + id + " successfully deleted!!");
    }
}
