package com.ssafy.wayg.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "placefile")
public class Placefile {
    @Id
    @Column(name = "placefile_no", nullable = false)
    private Integer placefileNo;

    @Column(name = "placefile_savefolder", length = 100)
    private String placefileSavefolder;

    @Column(name = "placefile_originfile", length = 100)
    private String placefileOriginfile;

    @Column(name = "placefile_savefile", length = 100)
    private String placefileSavefile;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "place_no", nullable = false)
    private Place placeNo;

}