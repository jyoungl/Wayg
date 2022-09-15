package com.ssafy.wayg.mapper;

import com.ssafy.wayg.entity.Feed;
import com.ssafy.wayg.entity.Like;

import java.sql.SQLException;
import java.util.List;

public interface FeedMapper {
	public List<Feed> retrieveFeed() throws SQLException;

	public Feed detailFeed(int boardNo) throws SQLException;

	public int insertFeed(Feed board) throws SQLException;
	
	public int deleteFeed(int boardNo) throws SQLException;
	
	public List<Feed> retrieveMyFeed() throws SQLException;

//	public int getTotalCount() throws SQLException;
	
	public int insertLike(Like like) throws SQLException;
	
	public int deleteLike(int likeNo) throws SQLException;
}