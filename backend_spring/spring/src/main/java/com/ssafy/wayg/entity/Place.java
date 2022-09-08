package com.ssafy.wayg.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "place")
public class Place {
    @Id
    @Column(name = "place_no", nullable = false)
    private Integer placeNo;

    @Column(name = "place_name", nullable = false, length = 45)
    private String placeName;

    @Column(name = "place_address", length = 45)
    private String placeAddress;

    @Column(name = "place_info", length = 1000)
    private String placeInfo;

    @Column(name = "place_phone", length = 15)
    private String placePhone;

    @Column(name = "place_holiday", length = 45)
    private String placeHoliday;

    @Column(name = "place_experience", length = 100)
    private String placeExperience;

    @Column(name = "place_time", length = 200)
    private String placeTime;

    @Column(name = "place_park", length = 45)
    private String placePark;

    @Column(name = "place_animal", length = 2)
    private String placeAnimal;

    @Column(name = "place_more", length = 1000)
    private String placeMore;

    @Column(name = "place_scrap", nullable = false)
    private Integer placeScrap;

}