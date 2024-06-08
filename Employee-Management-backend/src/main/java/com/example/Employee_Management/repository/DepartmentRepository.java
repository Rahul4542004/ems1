package com.example.Employee_Management.repository;

import com.example.Employee_Management.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department,Long> {
}
