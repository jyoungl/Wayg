package com.ssafy.wayg.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Random;

import com.ssafy.wayg.entity.Feed;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.wayg.dto.FeedfileDto;

@RestController
@CrossOrigin("*") // 모든 출처에 대해 오픈 (CORS)
public class FileController {

    @PostMapping("/uploadFiles")
    public ResponseEntity<Object> uploadFiles(MultipartFile[] multipartFiles, String stringFeed) {
        String UPLOAD_PATH = "F:\\myUpload"; // 업로드 할 위치

        try {
            // JSON데이터는 파일 데이터와 같이 못 보내기 때문에 문자열로 받아와서 JSON으로 변환
            // JSON데이터로 같이 보내는 방법을 아시는 분은 댓글로 알려주시면 감사드립니다.
//            Food food = new ObjectMapper().readValue(stringFood, Food.class); // String to JSON
            Feed feed = new ObjectMapper().readValue(stringFeed, Feed.class); // String to JSON

            for(int i=0; i<multipartFiles.length; i++) {
                MultipartFile file = multipartFiles[i];

                String fileId = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt()); // 현재 날짜와 랜덤 정수값으로 새로운 파일명 만들기
                String originName = file.getOriginalFilename(); // ex) 파일.jpg
                String fileExtension = originName.substring(originName.lastIndexOf(".") + 1); // ex) jpg
                originName = originName.substring(0, originName.lastIndexOf(".")); // ex) 파일
                long fileSize = file.getSize(); // 파일 사이즈

                File fileSave = new File(UPLOAD_PATH, fileId + "." + fileExtension); // ex) fileId.jpg
                if(!fileSave.exists()) { // 폴더가 없을 경우 폴더 만들기
                    fileSave.mkdirs();
                }

                file.transferTo(fileSave); // fileSave의 형태로 파일 저장

                System.out.println("fileId= " + fileId);
                System.out.println("originName= " + originName);
                System.out.println("fileExtension= " + fileExtension);
                System.out.println("fileSize= " + fileSize);
            }

            System.out.println("feed= " + feed);
        } catch(IOException e) {
            return new ResponseEntity<Object>(null, HttpStatus.CONFLICT);
        }

        return new ResponseEntity<Object>("Success", HttpStatus.OK);
    }
}