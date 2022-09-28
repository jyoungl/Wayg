package com.ssafy.wayg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "feedword")
public class Feedword {
    @Id
    @Column(name = "feedword_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer feedwordNo;

    @Column(name = "feedword_word", nullable = false, length = 45)
    private String feedwordWord;

    @Column(name="feedword_count", nullable = false)
    @ColumnDefault("0")
    private Integer feedwordCount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "feed_no", nullable = false)
    private Feed feedNo;

    public Feedword(String word, Integer count, Feed feed){
        this.feedwordWord = word;
        this.feedwordCount = count;
        this.feedNo = feed;
    }

}