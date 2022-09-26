package com.ssafy.wayg.service;

import com.ssafy.wayg.entity.Placeword;
import com.ssafy.wayg.repository.PlaceRepository;
import com.ssafy.wayg.repository.PlacewordRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    private PlacewordRepository placewordRepository;
    private PlaceRepository placeRepository;

    public ChatServiceImpl(PlacewordRepository placewordRepository, PlaceRepository placeRepository){
        this.placewordRepository = placewordRepository;
        this.placeRepository = placeRepository;
    }

    @Override
    public double placeword(String word, long total) {
        Long size = placewordRepository.countByplacewordWord(word);
        List<String> words = new ArrayList<>();
        double idf = Math.log(((double)total / (double) size));
        //int idf = log ( total / size )

        return idf;
    }

    @Override
    public long totalSize(String[] str){
        long total = 0;
        for(int i=0;i<str.length;i++){
            total += placewordRepository.countByplacewordWord(str[i]);
        }

        return total;
    }
}
