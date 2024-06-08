package com.example.Employee_Management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "department")
public class Department {
    @Id
    private Long id;
    @Column(name = "departmentName")
    private String departmentName;
    @Column(name = "departmentDescription")
    private String departmentDescription;
}
