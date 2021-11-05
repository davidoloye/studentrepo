package com.example.employeemanager.controller;

import com.example.employeemanager.model.Employee;
import com.example.employeemanager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Transactional
@RestController
@RequestMapping(value="/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping(value="all")
    public ResponseEntity<List<Employee>> getAllEmployee() {
        List<Employee> employees = employeeService.findAllEmployee();
        return new ResponseEntity<List<Employee>>(employees,HttpStatus.OK);
    }

    @GetMapping(value="find/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable (value="id") Long id) {
        Employee employees = employeeService.findEmployeeById(id);
        return new ResponseEntity<Employee>(employees,HttpStatus.OK);
    }

    @PostMapping(value="add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.addEmployee(employee);
        return new ResponseEntity<Employee>(newEmployee,HttpStatus.CREATED);
    }

    @PutMapping(value="update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.updateEmployee(employee);
        return new ResponseEntity<Employee>(newEmployee,HttpStatus.OK);
    }

    @DeleteMapping(value="delete/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable (value="id") Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<Employee>(HttpStatus.OK);
    }
}
