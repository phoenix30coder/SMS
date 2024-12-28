package com.phoenixcoder.SMS.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name" , nullable = false , length = 100)
    private String name;

    @Column(name = "age" , nullable = false)
    private int age;
    @Column(name = "dob" , nullable = false)
    private LocalDate dob;
    @Column(name = "gender" , nullable = false)
    private String gender;



    @Column(name = "bloodtype" , nullable = false , length = 5)
    private String bloodtype;
    @Column(name = "guardian" , nullable = false)
    private String guardian;
    @Column(name ="phoneNo", nullable = false, length = 15)
    private String phoneNo;

    @Column(name = "email" , nullable = false)
    private String email;

    @Column(name = "address" , nullable = false,columnDefinition = "TEXT")
    private String address;

    @Column(name = "grade" ,nullable = false)
    private String grade;



    public Student(){

    }

//    public Student(String name, int age, String phoneNo) {
//        this.name = name;
//        this.age = age;
//        this.phoneNo = phoneNo;
//    }

    public Student(String name, int age, LocalDate dob, String gender, String bloodtype, String guardian, String phoneNo, String email, String address, String grade) {
        this.name = name;
        this.age = age;
        this.dob = dob;
        this.gender = gender;
        this.bloodtype = bloodtype;
        this.guardian = guardian;
        this.phoneNo = phoneNo;
        this.email = email;
        this.address = address;
        this.grade = grade;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBloodtype() {
        return bloodtype;
    }

    public void setBloodtype(String bloodtype) {
        this.bloodtype = bloodtype;
    }

    public String getGuardian() {
        return guardian;
    }

    public void setGuardian(String guardian) {
        this.guardian = guardian;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }
}
