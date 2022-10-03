package com.ssafy.wayg.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.wayg.dto.PlacewordDto;
import com.ssafy.wayg.service.ChatService;
import com.ssafy.wayg.service.PlaceService;
import com.ssafy.wayg.util.MorphemeAnalyzer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private PlaceService placeService;
    private MorphemeAnalyzer analyzer;

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    public ChatController(ChatService chatService, PlaceService placeService, MorphemeAnalyzer analyzer){
        this.chatService = chatService;
        this.placeService = placeService;
        this.analyzer = analyzer;
    }

    @PostMapping
    public ResponseEntity<Map<String,Object>> calcurate(@RequestBody String str){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        Map<String,Integer> split = analyzer.pickMorpheme(str); // 형태소 분리한 결과 넣은 map
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

            Map<String,Integer> split = analyzer.pickMorpheme(utter); // 형태소 분리한 결과 넣은 map
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
                logger.debug("tfidf 계산쪽");
                logger.debug(e.getMessage());
            }

            //결과 형식맞추기
            HashMap<String, Object> template = new HashMap<>();
            List<HashMap<String, Object>> outputs = new ArrayList<>();
            HashMap<String, Object> carousel = new HashMap<>();
            List<HashMap<String, Object>> items = new ArrayList<>();
            carousel.put("type", "basicCard");

            //버튼
            List<HashMap<String, Object>> buttons = new ArrayList<>();
            HashMap<String,Object> button = new HashMap<>();
            button.put("action","webLink");
            button.put("label","구경하기");
            button.put("webLinkUrl","https://j7c202.p.ssafy.io");
            buttons.add(button);


            //place 맵 value값 따라 정렬
            List<Map.Entry<String,Double>> entries = new ArrayList<>(place.entrySet());
            entries.sort(Map.Entry.comparingByValue(Collections.reverseOrder()));
            Map<String, Double> res = new LinkedHashMap<>(); // 정렬된 map
            int i = 0;

            for(Map.Entry<String, Double> e : entries) {
                if(i++<3) {
                    res.put(e.getKey(), e.getValue());
                    //e.getKey() 가지고 title 넣고 url 만들어야함
                    HashMap<String, Object> item = new HashMap<>();
                    item.put("title",e.getKey());
                    item.put("description",placeService.searchName(e.getKey()).getPlaceInfo());
                    HashMap<String,String> thumbnail = new HashMap<>();
                    thumbnail.put("imageUrl",chatService.setUrl(e.getKey()));
                    item.put("thumbnail",thumbnail);
                    item.put("buttons",buttons);
                    items.add(item);
                }
            }

            carousel.put("items",items);

            //만약 답없으면(items길이찾기) simpleText
//            if(items.size() == 0) {
//                HashMap<String,Object> output = new HashMap<>();
//                HashMap<String, Object> simpleText = new HashMap<>();
//                switch((int)(Math.random()*100)%3){
//                    case 0:
//                        simpleText.put("text", "무슨 말인지 모르겠어!");
//                        break;
//                    case 1:
//                        simpleText.put("text", "우리는 5살이라 그런 거 몰라!");
//                        break;
//                    case 2:
//                        simpleText.put("text", "우리는 그런 거 못해( ˘︹˘ )");
//                        break;
//                }
//                output.put("simpleText",simpleText);
//                outputs.add(output);
//            }else {
                //답 있을때
                outputs.add(carousel);
//            }

            template.put("outputs", outputs);
            resultMap.put("version","2.0");
            resultMap.put("template", template);


        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return resultMap;
    }
}
