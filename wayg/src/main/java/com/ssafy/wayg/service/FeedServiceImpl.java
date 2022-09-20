package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.FeedDto;
import com.ssafy.wayg.dto.FeedlikeDto;
import com.ssafy.wayg.entity.Feed;
import com.ssafy.wayg.entity.Feedlike;
import com.ssafy.wayg.repository.FeedRepository;
import com.ssafy.wayg.repository.FeedfileRepository;
import com.ssafy.wayg.repository.FeedlikeRepository;
import com.ssafy.wayg.repository.UserRepository;
import com.ssafy.wayg.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class FeedServiceImpl implements FeedService {

	private FeedRepository feedRepository;
	private FeedlikeRepository likeRepository;
	private UserRepository userRepository;
	private FeedfileRepository fileRepository;
	private DEConverter converter;

	@Autowired
	public FeedServiceImpl(FeedRepository feedRepository, FeedlikeRepository likeRepository, UserRepository userRepository, FeedfileRepository fileRepository, DEConverter converter) {
		this.feedRepository = feedRepository;
		this.likeRepository = likeRepository;
		this.userRepository = userRepository;
		this.fileRepository = fileRepository;
		this.converter = converter;
	}

	@Override
	public Page<FeedDto> retrieveFeed(Pageable pageable) throws Exception {
		Page<FeedDto> feedDtoPage = converter.toFeedDtoList(feedRepository.findAllByOrderByFeedLike(pageable));
		return feedDtoPage;
	}

	@Override
	public FeedDto insertFeed(FeedDto feedDto) throws Exception {
		return converter.toFeedDto(feedRepository.save(converter.toFeedEntity(feedDto)));
	}

	@Override
	public FeedDto detailFeed(int userNo, int feedNo) throws Exception {
		FeedDto feedDto = converter.toFeedDto(feedRepository.getOne(feedNo));
		
		feedDto.setFeedLike(likeRepository.findByUserNoUserNoAndFeedNoFeedNo(userNo, feedNo) != null);
		feedDto.setFeedLikeCnt(likeRepository.countByFeedNoFeedNo(feedNo));
		
		feedDto.setFeedFiles(converter.toFeedfileDtoList(fileRepository.findByFeedNoFeedNo(feedNo)));
		
		return feedDto;
	}

	@Override
	@Transactional
	public void deleteFeed(int feedNo) throws Exception {
		feedRepository.delete(feedRepository.getOne(feedNo));
	}
	
	@Override
	public Page<FeedDto> retrieveMyFeed(int userNo, Pageable pageable) throws Exception {
		Page<FeedDto> feedDtoPage = converter.toFeedDtoList(feedRepository.findByUserNoUserNo(userNo,pageable));
		return feedDtoPage;
	}

	@Override
	public FeedlikeDto insertLike(FeedlikeDto likeDto) throws Exception {
		return converter.toLikeDto(likeRepository.save(converter.toLikeEntity(likeDto)));
	}
	
	@Override
	@Transactional
	public void deleteLike(int likeNo) throws Exception {
		likeRepository.delete(likeRepository.getOne(likeNo));
	}
	
	@Override
	public Page<FeedDto> retrieveLikeList(int userNo, Pageable pageable) throws Exception {
		
		List<Integer> likeList = likeRepository.findByUserNo(userNo);
		
		Page<FeedDto> feedDtoPage = converter.toFeedDtoList(feedRepository.findByFeedNo(likeList,pageable));
		return feedDtoPage;
	}

}