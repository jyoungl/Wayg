package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Integer> {

	Page<Place> findAllByOrderByPlaceScrap(Pageable pageable);
	Page<Place> findByUserNoUserNo(int userNo, Pageable pageable);
	
	@Query("Select f FROM Place f WHERE f.id IN (?1)")
	Page<Place> findByPlaceNo(List<Integer> placeNoList, Pageable pageable);

}