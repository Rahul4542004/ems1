package com.example.Employee_Management.service;

import com.example.Employee_Management.dto.DepartmentDto;
import java.util.*;
public interface DepartmentService {
    DepartmentDto createDepartment(DepartmentDto departmentDto);
    List<DepartmentDto> getAllDepartments();
    DepartmentDto getDepartmentById(Long id);
    DepartmentDto updateDepartment(DepartmentDto departmentDto,Long id);
    void deleteDepartment(Long id);
}
