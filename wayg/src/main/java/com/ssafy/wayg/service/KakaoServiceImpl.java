package com.ssafy.wayg.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.ssafy.wayg.dto.UserDto;
import com.ssafy.wayg.entity.User;
import com.ssafy.wayg.repository.UserRepository;
import com.ssafy.wayg.util.DEConverter;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Service;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Optional;

@Service
public class KakaoServiceImpl implements KakaoService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DEConverter deConverter;
    @Autowired
    private UserService userService;
    @Override
    public HashMap<String, Object> getUserInfo(String access_Token){
        HashMap<String, Object> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("charset", "utf-8");
            conn.setRequestProperty("Authorization", "Bearer " + access_Token);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode: " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while((line = br.readLine()) != null){
                result += line;
            }

            System.out.println("response body : "+ result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();
            String gender = "unknown";
            String age = "unknown";

            if(kakao_account.getAsJsonObject().get("has_age_range").getAsBoolean()){
                gender = kakao_account.getAsJsonObject().get("gender").getAsString();
            }

            if(kakao_account.getAsJsonObject().get("has_age_range").getAsBoolean()){
                age = kakao_account.getAsJsonObject().get("age_range").getAsString();
            }

            userInfo.put("nickname", nickname);
            userInfo.put("email", email);
            userInfo.put("gender", gender);
            userInfo.put("age", age);

        } catch (IOException e){
            e.printStackTrace();
        }

        //UserDto result = deConverter.toUserDto(userRepository.findByUserEmailAndUserName((String)userInfo.get("email"), (String)userInfo.get("nickname")));
        Optional<User> oUser = userRepository.findByUserEmail((String) userInfo.get("email"));
        if(!oUser.isPresent()){
            UserDto resUser = userService.register(userInfo);
            //DB에 데이터 저장
        }
        return userInfo;
    }

    @Override
    public void kakaoLogout(String access_token) {
        String reqURL = "https://kapi.kakao.com/v1/user/logout";

        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + access_token);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String result = "";
            String line = "";

            while((line = br.readLine()) != null){
                result += line;
            }
            System.out.println(result);

        } catch(IOException e){
            e.printStackTrace();
        }
    }

    @Override
    public String getAccessToken(String authorize_code){
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //    POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //    POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();

            sb.append("grant_type=authorization_code");
            sb.append("&client_id=bbe27fdfd6962e9fa7c41c8b3c99fb13");
            sb.append("&client_secret=GVivIOJu8TfT4wvHekhGorCmk8xfxqaf");
            sb.append("&redirect_uri=https://j7c202.p.ssafy.io/api/login");
            sb.append("&code=" + authorize_code);
            bw.write(sb.toString());
            bw.flush();

            //    결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //    요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //    Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return access_Token;
    }
}