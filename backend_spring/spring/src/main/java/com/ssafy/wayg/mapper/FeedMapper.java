package com.ssafy.wayg.mapper;

import com.ssafy.wayg.entity.Feed;

import java.util.List;

public interface FeedMapper {
	public List<Feed> retrieveFeed();

	public Feed detailFeed(int boardNo);

	public int insertFeed(Feed board);
	
	public int deleteFeed(int boardNo);
	
	public List<Feed> retrieveMyFeed();

//	public int getTotalCount();
}