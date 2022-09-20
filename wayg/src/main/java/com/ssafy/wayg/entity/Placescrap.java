package com.ssafy.wayg.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "placescrap")
public class Placescrap {
    @Id
    @Column(name = "scrap_no", nullable = false)
    private Integer scrapNo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_no", nullable = false)
    private User userNo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "place_no", nullable = false)
    private Place placeNo;

}