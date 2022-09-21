package com.ssafy.wayg.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "feed_no", nullable = false)
    private Feed feedNo;

}