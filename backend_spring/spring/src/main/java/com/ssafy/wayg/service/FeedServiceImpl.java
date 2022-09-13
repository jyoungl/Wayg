package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.FeedDto;
import com.ssafy.wayg.dto.FeedwordDto;
import com.ssafy.wayg.dto.FeedfileDto;
import com.ssafy.wayg.dto.LikeDto;
import com.ssafy.wayg.entity.Feed;
import com.ssafy.wayg.repository.FeedRepository;
import com.ssafy.wayg.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class FeedServiceImpl implements FeedService {

	private FeedRepository feedRepository;
	private DEConverter converter;

	@Autowired
	public FeedServiceImpl(FeedRepository feedRepository, DEConverter converter) {
		this.feedRepository = feedRepository;
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
	public FeedDto detailFeed(int feedNo) throws Exception {
		FeedDto feedDto = converter.toFeedDto(feedRepository.getReferenceById(feedNo));
		return feedDto;
	}

	@Override
	@Transactional
	public void deleteFeed(int feedNo) throws Exception {
		feedRepository.delete(feedRepository.getReferenceById(feedNo));
	}

//	@Override
//	public long getTotalCount() throws Exception {
//		return feedRepository.count();
//	}
	
	@Override
	public Page<FeedDto> retrieveMyFeed(int userNo, Pageable pageable) throws Exception {
		Page<FeedDto> feedDtoPage = converter.toFeedDtoList(feedRepository.findAllByUserUserNo(userNo,pageable));
		return feedDtoPage;
	}

}