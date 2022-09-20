package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Placescrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacescrapRepository extends JpaRepository<Placescrap, Integer> {

	Placescrap findByUserNoUserNoAndPlaceNoPlaceNo(int userNo, int placeNo);
	
	int countByPlaceNoPlaceNo(int placeNo);
	
	@Query("select placeNo from Placescrap where userNo IN (?1)")
	List<Integer> findByUserNo(int userNo);

}