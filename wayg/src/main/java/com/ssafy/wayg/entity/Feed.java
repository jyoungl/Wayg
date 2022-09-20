package com.ssafy.wayg.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "feed")
public class Feed {
    @Id
    @Column(name = "feed_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer feedNo;

    @Column(name = "feed_title", nullable = false, length = 45)
    private String feedTitle;

    @Column(name = "feed_content", nullable = false, length = 100)
    private String feedContent;
    
    @Column(name = "feed_nickname", nullable = false, length = 10)
    private String feedNickname;

    @Column(name = "feed_like", nullable = false)
    @ColumnDefault("0")
    private Integer feedLike;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_no", nullable = false)
    private User userNo;

}