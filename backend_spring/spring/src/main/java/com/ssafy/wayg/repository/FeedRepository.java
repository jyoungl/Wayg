package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Feed;
import com.ssafy.wayg.entity.Like;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer> {

	Page<Feed> findAllByOrderByFeedLike(Pageable pageable);

	Page<Feed> findAllByUserUserNo(int userNo, Pageable pageable);
	
//	Page<Like> findAllByUserUserNo(int userNo, Pageable pagealbe);
	
	
}