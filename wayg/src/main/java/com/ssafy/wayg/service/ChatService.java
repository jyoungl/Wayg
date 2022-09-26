package com.ssafy.wayg.service;

import com.ssafy.wayg.entity.Placeword;

import java.util.List;

public interface ChatService {
    public double placeword(String word, long total);
    public long totalSize(String[] str);
}
