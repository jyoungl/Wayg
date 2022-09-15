package com.ssafy.wayg.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_no", nullable = false)
    private Integer userNo;

    @Column(name = "user_name", nullable = false, length = 10)
    private String userName;

    @Column(name = "user_email", nullable = false, length = 45)
    private String userEmail;

    @Column(name = "user_gender")
    private Integer userGender;

    @Column(name = "user_age")
    private Integer userAge;

}