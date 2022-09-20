package com.ssafy.wayg.mapper;

import com.ssafy.wayg.entity.Place;
import com.ssafy.wayg.entity.Placescrap;

import java.sql.SQLException;
import java.util.List;

public interface PlaceMapper {
	public List<Place> retrievePlace() throws SQLException;

	public Place detailPlace(int boardNo) throws SQLException;
	
	public int insertScrap(Placescrap scrap) throws SQLException;
	
	public int deleteScrap(int scrapNo) throws SQLException;
}