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
	
	public List<FeedlikeDto> toLikeDtoList(List<Feedlike> list) {
		return mapList(list, FeedlikeDto.class);
	}

	public Page<FeedlikeDto> toLikeDtoList(Page<Feedlike> likeList){
		return likeList.map(m->modelMapper.map(m,FeedlikeDto.class));
	}

	public FeedlikeDto toLikeDto(Feedlike like) {
		return modelMapper.map(like, FeedlikeDto.class);
	}

	public Feedlike toLikeEntity(FeedlikeDto likeDto) {
		return modelMapper.map(likeDto, Feedlike.class);
	}
	
	/* 피드 파일 부분 변환 */

	public List<FeedfileDto> toFeedfileDtoList(List<Feedfile> list) {
		return mapList(list, FeedfileDto.class);
	}
	
	public FeedfileDto toFeedfileDto(Feedfile feedfile) {
		return modelMapper.map(feedfile, FeedfileDto.class);
	}

	public Feedfile toFeedfileEntity(FeedfileDto feedfileDto) {
		return modelMapper.map(feedfileDto, Feedfile.class);
	}
}
