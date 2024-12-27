package com.phoenixcoder.SMS.service;

import com.phoenixcoder.SMS.model.Student;
import com.phoenixcoder.SMS.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    StudentRepo studentRepo;
    public Student addStudent(Student student){
        studentRepo.save(student);
        return student;
    }

    public List<Student> getAllStudents(){
        return studentRepo.findAll();
    }

    public List<Student> getStudentByName(String name){
        return studentRepo.findByName(name);
    }

    public  Student updateStudent (Long id,Student student){
//        Optional<Student> existing = studentRepo.findById(id);
//        if(existing.isPresent()){
//            Student student1 = existing.get();
//            student1.setAge(student.getAge());
//            student1.setName(student.getName());
//            student1.setPhoneNo(student.getPhoneNo());
//            studentRepo.save(student1);
//        }
//        student.setId(id);
        student.setId(id);
        return studentRepo.save(student);
    }

    public void deleteStudent(Long id){
        studentRepo.deleteById(id);
//        return studentRepo.existsById(id);
    }

    public Optional<Student> getStudentById(Long id){
        return studentRepo.findById(id);
    }
}
