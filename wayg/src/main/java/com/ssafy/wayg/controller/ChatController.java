package com.ssafy.wayg.controller;

import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.entity.Placeword;
import com.ssafy.wayg.repository.PlacewordRepository;
import com.ssafy.wayg.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
public class ChatController {
    private static final String SUCCESS = "succeess";
    private static final String FAIL = "fail";
    private ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService){this.chatService = chatService;}

    @PostMapping
    public ResponseEntity<Map<String,Object>> calcurate(@RequestBody List<String> s){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        Map<String, Integer> split = new HashMap<>(); // 형태소 분리한 결과 넣은 map
        List<String> send = new ArrayList<>();
        for(Map.Entry<String, Integer> entry : split.entrySet())
            send.add(entry.getKey());

        try {
            Map<String, Double> place = new HashMap<>();
            long total = chatService.totalSize(send); //전체 문서 수

            for(int i=0;i<send.size();i++){
                //각 단어의 idf 구하기 * 관광지 tf
                
                //place.put(placeDto.getPlaceAddress(), chatService.placeword(send.get(i), total) * (double)placeDto.getPlaceScrap());
            }


            resultMap.put("message",SUCCESS);
            httpStatus = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message",FAIL);
        }
        return new ResponseEntity<>(resultMap, httpStatus);
    }
}
