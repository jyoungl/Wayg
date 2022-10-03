package com.ssafy.wayg.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.dto.PlacewordDto;
import com.ssafy.wayg.entity.Placeword;
import com.ssafy.wayg.repository.PlacewordRepository;
import com.ssafy.wayg.service.ChatService;
import com.ssafy.wayg.util.MorphemeAnalyzer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RequestMapping("/chat")
@RestController
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
    public ResponseEntity<Map<String,Object>> calcurate(@RequestBody String str){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        Map<String,Integer> split = analyzer.analyseText(str); // 형태소 분리한 결과 넣은 map
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

    //@RequestMapping(value = "/kchat/v1" , method= {RequestMethod.POST , RequestMethod.GET },headers = {"Accept=application/json"})
    @PostMapping("/kchat/v1")
    public HashMap<String, Object> callAPI(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response){
        HashMap<String, Object> resultMap = new HashMap<>();

        try{
            ObjectMapper mapper = new ObjectMapper();
            String jsonInString = mapper.writeValueAsString(params);
            System.out.println(jsonInString);

            HashMap<String, Object> userRequest = (HashMap<String, Object>)params.get("userRequest");
            String utter = userRequest.get("utterance").toString().replace("\n",    " ");

            Map<String,Integer> split = analyzer.analyseText(utter); // 형태소 분리한 결과 넣은 map
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

            } catch (Exception e) {
                System.out.println("오류남!");
            }

            //place 맵 value값 따라 정렬
            List<Map.Entry<String,Double>> entries = new ArrayList<>(place.entrySet());
            entries.sort(Map.Entry.comparingByValue());
            Map<String, Double> res = new LinkedHashMap<>(); // 정렬된 map
            int i = 0; //3개만 넣어볼게

            String rtnStr = ""; //대답 저장할 문자열
            for(Map.Entry<String, Double> e : entries) {
                if(i++<3) {
                    res.put(e.getKey(), e.getValue());
                    rtnStr += e.getKey();
                    rtnStr += "\n";
                }
            }

            if(rtnStr.equals(""))
                rtnStr = "무슨 말인지 몰루궸는데~";
//            switch (utter){
//                //발화 처리 로직
//                case "되나":
//                    rtnStr = "";
//                default:
//                    rtnStr = "머선 말인지 모르겠어요~";
//            }

            List<HashMap<String, Object>> output = new ArrayList<>();
            HashMap<String, Object> template = new HashMap<>();
            HashMap<String, Object> simpleText = new HashMap<>();
            HashMap<String, Object> text = new HashMap<>();

            text.put("text", rtnStr);
            simpleText.put("simpleText", text);
            output.add(simpleText);

            template.put("output", output);

            resultMap.put("version","2.0");
            resultMap.put("template", template);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return resultMap;
    }
}
