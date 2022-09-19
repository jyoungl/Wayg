package com.ssafy.wayg.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "feedfile")
public class Feedfile {
    @Id
    @Column(name = "feedfile_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer feedfileNo;

    @Column(name = "feedfile_savefolder", length = 100)
    private String feedfileSavefolder;

    @Column(name = "feedfile_originfile", length = 100)
    private String feedfileOriginfile;

    @Column(name = "feedfile_savefile", length = 100)
    private String feedfileSavefile;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "feed_no", nullable = false)
    private Feed feedNo;

}