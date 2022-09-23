package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Placefile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacefileRepository extends JpaRepository<Placefile, Integer> {

	List<Placefile> findByPlaceNoPlaceNo(int placeNo);
	
}