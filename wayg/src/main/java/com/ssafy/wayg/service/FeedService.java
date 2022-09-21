package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.FeedDto;
import com.ssafy.wayg.dto.FeedlikeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FeedService {

	Page<FeedDto> retrieveFeed(Pageable pageable) throws Exception;

	FeedDto detailFeed(int userNo, int feedNo) throws Exception;

	FeedDto insertFeed(FeedDto feedDto) throws Exception;

	void deleteFeed(int feedNo) throws Exception;

	Page<FeedDto> retrieveMyFeed(int userNo, Pageable pageable) throws Exception;

	FeedlikeDto insertLike(FeedlikeDto like) throws Exception;

	void deleteLike(int userNo, int feedNo) throws Exception;

	Page<FeedDto> retrieveLikeList(int userNo, Pageable pageable) throws Exception;

//	long getTotalCount() throws Exception;

}
