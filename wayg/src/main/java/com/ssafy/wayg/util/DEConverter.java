package com.ssafy.wayg.util;

import com.ssafy.wayg.dto.*;
import com.ssafy.wayg.entity.*;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Dto <-> Entity Converter
 */
@Component
public class DEConverter {

	private ModelMapper modelMapper;

	@Autowired
	DEConverter(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
//        this.modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        this.modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
    }

	private <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
		return source
				.stream()
				.map(element -> modelMapper.map(element, targetClass))
				.collect(Collectors.toList());
	}

	/* 게시판 부분 변환 */
	public List<FeedDto> toFeedDtoList(List<Feed> list) {
		return mapList(list, FeedDto.class);
	}

	public Page<FeedDto> toFeedDtoList(Page<Feed> feedList){
		return feedList.map(m->modelMapper.map(m,FeedDto.class));
	}

	public FeedDto toFeedDto(Feed feed) {
		return modelMapper.map(feed, FeedDto.class);
	}

	public Feed toFeedEntity(FeedDto feedDto) {
		return modelMapper.map(feedDto, Feed.class);
	}
	
	/* 좋아요 부분 변환 */
	
	public List<LikeDto> toLikeDtoList(List<Like> list) {
		return mapList(list, LikeDto.class);
	}

	public Page<LikeDto> toLikeDtoList(Page<Like> likeList){
		return likeList.map(m->modelMapper.map(m,LikeDto.class));
	}

	public LikeDto toLikeDto(Like like) {
		return modelMapper.map(like, LikeDto.class);
	}

	public Like toLikeEntity(LikeDto likeDto) {
		return modelMapper.map(likeDto, Like.class);
	}

}
