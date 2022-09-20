package com.ssafy.wayg.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "`like`")
public class Like {
    @Id
    @Column(name = "like_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer likeNo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_no", nullable = false)
    private User userNo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "feed_no", nullable = false)
    private Feed feedNo;

}