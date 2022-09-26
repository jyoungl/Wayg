package com.ssafy.wayg.controller;

import com.ssafy.wayg.entity.Placeword;
import com.ssafy.wayg.repository.PlacewordRepository;
import com.ssafy.wayg.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<Map<String,Object>> calcurate(@RequestParam(value="send") String[] send){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = HttpStatus.ACCEPTED;

        try {
            Map<String, Double> place = new HashMap<>();
            long total = chatService.totalSize(send); //전체 문서 수

            for(int i=0;i<send.length;i++){
                //각 단어의 idf 구하기
                place.put(send[i], chatService.placeword(send[i], total));
            }

            resultMap.put("feedList",chatService.);
            resultMap.put("message",SUCCESS);
            httpStatus = HttpStatus.OK;
        } catch (Exception e) {
            resultMap.put("message",FAIL);
        }
        return new ResponseEntity<>(resultMap, httpStatus);
    }
}
