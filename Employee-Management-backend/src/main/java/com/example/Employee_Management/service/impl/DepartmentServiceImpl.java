package com.example.Employee_Management.service.impl;

import com.example.Employee_Management.dto.DepartmentDto;
import com.example.Employee_Management.entity.Department;
import com.example.Employee_Management.exception.EmployeeNotFoundException;
import com.example.Employee_Management.mapper.DepartmentMapper;
import com.example.Employee_Management.repository.DepartmentRepository;
import com.example.Employee_Management.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;
    public DepartmentServiceImpl(DepartmentRepository departmentRepository){
        this.departmentRepository = departmentRepository;
    }

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<DepartmentDto> list = new ArrayList<>();
        List<Department> departmentList = departmentRepository.findAll();
        for(Department department : departmentList){
            list.add(DepartmentMapper.mapToDepartmentDto(department));
        }
        return list;
    }

    @Override
    public DepartmentDto getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Department with id : " + id + " doesn't exist"));
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public DepartmentDto updateDepartment(DepartmentDto departmentDto, Long id) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Department with id : " + id + " doesn't exist"));
        department.setDepartmentDescription(departmentDto.getDepartmentDescription());
        department.setDepartmentName(departmentDto.getDepartmentName());
        Department updatedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(updatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Department with id : " + id + " doesn't exist"));
        departmentRepository.deleteById(id);
    }

}
