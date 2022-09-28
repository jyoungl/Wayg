package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.dto.PlacewordDto;
import com.ssafy.wayg.entity.Place;
import com.ssafy.wayg.entity.Placeword;

import java.util.List;

public interface ChatService {
    public double placeword(String word, long total);
    public long totalSize(List<String> str);
    public List<PlacewordDto> oneSize(String str);
}
