package com.phoenixcoder.SMS.model;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name" , nullable = false , length = 100)
    private String name;

    @Column(name = "age" , nullable = false)
    private int age;

    @Column(name ="phoneNo", nullable = false, length = 15)
    private String phoneNo;

    public Student(){

    }

    public Student(String name, int age, String phoneNo) {
        this.name = name;
        this.age = age;
        this.phoneNo = phoneNo;
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
