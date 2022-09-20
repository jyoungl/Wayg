package com.ssafy.wayg.entity;

import com.ssafy.wayg.role.Role;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "`user`")
@NoArgsConstructor
@Getter
public class User {
    @Id
    @Column(name = "user_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer userNo;

    @Column(name = "user_name", nullable = false, length = 10)
    private String userName;

    @Column(name = "user_email", nullable = false, length = 45)
    private String userEmail;

    @Column(name = "user_gender")
    private Integer userGender;

    @Column(name = "user_age")
    private Integer userAge;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Builder
    public User(String userName, String userEmail, Integer userGender, Integer userAge, Role role){
        this.userName = userName;
        this.userEmail = userEmail;
        this.userGender = userGender;
        this.userAge = userAge;
        this.role = role;
    }

    public User update(String userName){
        this.userName = userName;
        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }
}