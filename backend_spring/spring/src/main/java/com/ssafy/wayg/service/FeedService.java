package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.FeedDto;
import com.ssafy.wayg.dto.FeedwordDto;
import com.ssafy.wayg.dto.FeedfileDto;
import com.ssafy.wayg.dto.LikeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FeedService {

	Page<FeedDto> retrieveFeed(Pageable pageable) throws Exception;

	FeedDto detailFeed(int id) throws Exception;

	FeedDto insertFeed(FeedDto feedDto) throws Exception;

	void deleteFeed(int feedNo) throws Exception;

	Page<FeedDto> retrieveMyFeed(int userNo, Pageable pageable) throws Exception;

	LikeDto insertLike(LikeDto like) throws Exception;

	void deleteLike(int likeNo) throws Exception;

//	long getTotalCount() throws Exception;

}
