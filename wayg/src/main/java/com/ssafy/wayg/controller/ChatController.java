package com.ssafy.wayg.controller;

import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.dto.PlacewordDto;
import com.ssafy.wayg.entity.Placeword;
import com.ssafy.wayg.repository.PlacewordRepository;
import com.ssafy.wayg.service.ChatService;
import com.ssafy.wayg.service.PlaceService;
import com.ssafy.wayg.util.MorphemeAnalyzer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/chat")
public class ChatController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private ChatService chatService;
    private MorphemeAnalyzer analyzer;
    @Autowired
    public ChatController(ChatService chatService, MorphemeAnalyzer analyzer){
        this.chatService = chatService;
        this.analyzer = analyzer;
    }

    @PostMapping
    public ResponseEntity<Map<String,Object>> calculate(@RequestBody String str){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        Map<String,Integer> split = analyzer.pickMorpheme(str); // 형태소 분리한 결과 넣은 map - noun, verb, adjective
        List<String> send = new ArrayList<>();

        //형태소 분리한 단어들을 list에 넣어줌
        for(Map.Entry<String, Integer> entry : split.entrySet())
            send.add(entry.getKey());

        Map<String, Double> place = new HashMap<>(); // 관광지와 tfidf 값 넣어줄 map
        try {
            long total = chatService.totalSize(); //전체 문서 수

            for(int i=0;i<send.size();i++){
                //각 단어의 idf 구하기 * 관광지 tf
                List<PlacewordDto> placewordDtos = chatService.oneSize(send.get(i));
                double idf = chatService.placeword(send.get(i), total);
                for(int j=0;j<placewordDtos.size();j++){
                    place.put(placewordDtos.get(j).getPlacewordName(), idf * placewordDtos.get(j).getPlacewordCount());
                }
                //place.put(placeDto.getPlaceAddress(), chatService.placeword(send.get(i), total) * (double)placeDto.getPlaceScrap());
            }
            
            resultMap.put("message",SUCCESS);
            resultMap.put("content",place);
            httpStatus = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message", FAIL);
            //resultMap.put("message",FAIL);
        }
        return new ResponseEntity<>(resultMap, httpStatus);
    }

    @PostMapping("/place")
    public ResponseEntity<Map<String,Object>> findPlaces(@RequestBody String str){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = HttpStatus.ACCEPTED;

        try {
            List<String> nouns = analyzer.pickNouns(str); // 형태소 분리한 결과 넣은 list - noun
            resultMap.put("placeList", chatService.findPlaces(nouns));
            resultMap.put("message",SUCCESS);
            httpStatus = HttpStatus.OK;
        } catch(Exception e){
            resultMap.put("message", FAIL);
        }

        return new ResponseEntity<>(resultMap, httpStatus);
    }
}
