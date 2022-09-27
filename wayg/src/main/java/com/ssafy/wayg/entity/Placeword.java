package com.ssafy.wayg.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
@Table(name = "placeword")
public class Placeword {
    @Id
    @Column(name = "placeword_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer placewordNo;

    @Column(name="placeword_name")
    private String placewordName;

    @Column(name = "placeword_word", nullable = false, length = 45)
    private String placewordWord;

    @Column(name="placeword_count")
    private Integer placewordCount;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JoinColumn(name = "place_no", nullable = false)
//    private Place placeNo;

}