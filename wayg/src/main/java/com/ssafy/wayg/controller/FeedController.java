package com.ssafy.wayg.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.wayg.dto.FeedDto;
import com.ssafy.wayg.dto.LikeDto;
import com.ssafy.wayg.service.FeedService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/feed")
public class FeedController {
	
//	private static final Logger logger = LoggerFactory.getLogger(FeedController.class);
	private static final String SUCCESS = "succeess";
	private static final String FAIL = "fail";
	
	private FeedService feedService;
	
	@Autowired
	public FeedController(FeedService feedService) {
		this.feedService = feedService;
	}
	
	@ApiOperation(value = "피드 목록", notes = "성공여부와 해당 페이지의 피드 정보를 반환한다. ", response = Map.class)
	@GetMapping
	public ResponseEntity<Map<String,Object>> retrieveFeed(@ApiParam(value="현재 페이지", required=true) int page,
															@RequestParam(value="size", defaultValue = "3") @ApiParam(value="페이지 당 글 개수") int size,
															@RequestParam(value = "sort", defaultValue = "feedLike,desc") @ApiParam("정렬기준 컬럼명,정렬방식. 기본값은 feedLike,desc 다.") String sort,
															@ApiParam(value="Pageable 객체. 자동생성된다.") Pageable pageable) {
		Map<String,Object> resultMap = new HashMap();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		try {
			resultMap.put("feedList",feedService.retrieveFeed(pageable));
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}

	@ApiOperation(value = "피드 상세보기", notes = "성공여부와 피드 번호에 해당하는 피드의 정보를 반환한다.", response = Map.class)
	@GetMapping("/{feedNo}")
	public ResponseEntity<Map<String,Object>> detailFeed(@PathVariable int feedNo) {
		Map<String,Object> resultMap = new HashMap<>();
		try {
			FeedDto feedDto = feedService.detailFeed(feedNo);
			resultMap.put("feed",feedDto);
			resultMap.put("message",SUCCESS);
		}
		catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "피드 등록", notes = "새로운 피드 정보를 입력한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
	@PostMapping
	public ResponseEntity<Map<String,Object>> writeFeed(@RequestBody FeedDto feed) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			resultMap.put("feed",feedService.insertFeed(feed));
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",e.getMessage());
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "피드 삭제", notes = "피드 번호에 해당하는 피드의 정보를 삭제한다. 그리고 DB 삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/{feedNo}")
	public ResponseEntity<String> deleteFeed(@PathVariable int feedNo) {
		try {
			feedService.deleteFeed(feedNo);
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(FAIL, HttpStatus.ACCEPTED);
		}
	}
	
	@ApiOperation(value = "내 피드 목록", notes = "성공여부와 내 피드 정보를 반환한다. ", response = Map.class)
	@GetMapping("/myFeed")
	public ResponseEntity<Map<String,Object>> retrieveMyFeed(@ApiParam(value="현재 페이지", required=true) int page,
															@RequestParam(value="size", defaultValue = "3") @ApiParam(value="페이지 당 글 개수") int size,
															@RequestParam(value = "sort", defaultValue = "feedNo,desc") @ApiParam("정렬기준 컬럼명,정렬방식. 기본값은 feedNo,desc 다.") String sort,
															@ApiParam(value="Pageable 객체. 자동생성된다.") Pageable pageable,
															@ApiParam(value="회원 번호", required = true) int userNo) {
		Map<String,Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		try {
			resultMap.put("myFeedList",feedService.retrieveMyFeed(userNo, pageable));
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}
	
	@ApiOperation(value = "좋아요 추가", notes = "피드에 좋아요를 추가한다. 그리고 DB 입력 성공여부 메세지, 등록한 객체를 반환한다.", response = Map.class)
	@PostMapping("/like")
	public ResponseEntity<Map<String,Object>> plusLike(@RequestBody LikeDto like) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			resultMap.put("like",feedService.insertLike(like));
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",e.getMessage());
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "좋아요 삭제", notes = "피드 번호에 해당하는 피드의 정보를 삭제한다. 그리고 DB 삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/like/{likeNo}")
	public ResponseEntity<String> deleteLike(@PathVariable int likeNo) {
		try {
			feedService.deleteFeed(likeNo);
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(FAIL, HttpStatus.ACCEPTED);
		}
	}
}
