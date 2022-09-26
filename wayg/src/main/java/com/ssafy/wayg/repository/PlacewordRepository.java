package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Place;
import com.ssafy.wayg.entity.Placeword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacewordRepository extends JpaRepository<Placeword, Integer> {
    Long countByplacewordWord(String placewordWord);
}
