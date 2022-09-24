package com.ssafy.wayg.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
@Table(name = "feedword")
public class Feedword {
    @Id
    @Column(name = "feedword_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer feedwordNo;

    @Column(name = "feedword_word", nullable = false, length = 45)
    private String feedwordWord;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "feed_no", nullable = false)
    private Feed feedNo;

}