package com.ssafy.wayg.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
@Table(name = "placefile")
public class Placefile {
    @Id
    @Column(name = "placefile_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer placefileNo;

    @Column(name = "placefile_savefolder", length = 100)
    private String placefileSavefolder;

    @Column(name = "placefile_originfile", length = 100)
    private String placefileOriginfile;

    @Column(name = "placefile_savefile", length = 100)
    private String placefileSavefile;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "place_no", nullable = false)
    private Place placeNo;

}