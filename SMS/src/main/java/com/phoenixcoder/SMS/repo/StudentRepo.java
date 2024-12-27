package com.phoenixcoder.SMS.repo;

import com.phoenixcoder.SMS.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface StudentRepo extends JpaRepository<Student,Long> {
    List<Student> findByName(String name);
}
