package com.ssafy.wayg.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "placeword")
public class Placeword {
    @Id
    @Column(name = "placeword_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer placewordNo;

    @Column(name = "placeword_word", nullable = false, length = 45)
    private String placewordWord;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "place_no", nullable = false)
    private Place placeNo;

}