package com.phoenixcoder.SMS.repo;


import com.phoenixcoder.SMS.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo  extends JpaRepository<User,Long> {
    User findByUsername(String username);
    Boolean existsByUsername(String username);

}
