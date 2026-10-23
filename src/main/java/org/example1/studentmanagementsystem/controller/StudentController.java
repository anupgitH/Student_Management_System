package org.example1.studentmanagementsystem.controller;

import jakarta.validation.Valid;
import org.example1.studentmanagementsystem.dto.StudentRequest;
import org.example1.studentmanagementsystem.entity.Student;
import org.example1.studentmanagementsystem.service.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // CREATE
    @PostMapping
    public Student addStudent(
            @Valid @RequestBody StudentRequest request) {

        return studentService.addStudent(request);
    }

    // GET ALL
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // SEARCH
    @GetMapping("/search")
    public List<Student> searchStudents(
            @RequestParam String keyword) {

        return studentService.searchStudents(keyword);
    }

    // PAGINATION + SORTING
    @GetMapping("/page")
    public Page<Student> getStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return studentService.getStudents(
                page,
                size,
                sortBy,
                direction
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequest request) {

        return studentService.updateStudent(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student deleted successfully";
    }
}