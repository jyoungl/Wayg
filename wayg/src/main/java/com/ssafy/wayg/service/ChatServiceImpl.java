package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.PlacewordDto;
import com.ssafy.wayg.entity.Placeword;
import com.ssafy.wayg.repository.PlaceRepository;
import com.ssafy.wayg.repository.PlacewordRepository;
import com.ssafy.wayg.util.DEConverter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChatServiceImpl implements ChatService {

    private PlacewordRepository placewordRepository;
    private PlaceRepository placeRepository;
    private DEConverter converter;

    public ChatServiceImpl(PlacewordRepository placewordRepository, PlaceRepository placeRepository, DEConverter deConverter){
        this.placewordRepository = placewordRepository;
        this.placeRepository = placeRepository;
        this.converter = deConverter;
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
    public long totalSize(){
        return placeRepository.count();
    }

    @Override
    public List<PlacewordDto> oneSize(String str){
        List<Placeword> placeword = placewordRepository.findByplacewordWord(str);
        //kakao chatbot api connection

        //int size = place.getPlaceScrap();
        return converter.toPlacewordDto(placeword);
    }

    @Override
    public List<String> findPlaces(List<String> nouns){
        Set<String> nounSet = new HashSet<>();
        for(String noun : nouns){
            nounSet.addAll(placeRepository.findByPlaceAddressContains(noun));
        }
        return new ArrayList<>(nounSet);
    }
}
