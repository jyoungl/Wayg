package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Place;
import com.ssafy.wayg.entity.Placeword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacewordRepository extends JpaRepository<Placeword, Integer> {
    Long countByplacewordWord(String placewordWord);
    List<Placeword> findByplacewordWord(String placewordWord);
    @Query(nativeQuery = true, value = "SELECT * FROM Placeword as p WHERE p.placeword_word IN (:words) ORDER BY p.placeword_count DESC LIMIT 3")
    List<Placeword> findTop3ByplacewordWordInOrderByplacewordCountDesc(@Param("words") List<String> placewordWords);
}
