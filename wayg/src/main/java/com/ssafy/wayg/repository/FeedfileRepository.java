package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Feedfile;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedfileRepository extends JpaRepository<Feedfile, Integer> {

	List<Feedfile> findByFeedNoFeedNo(int feedNo);
	
}