package com.ssafy.wayg.util;

import com.ssafy.wayg.dto.*;
import com.ssafy.wayg.entity.*;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
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
		this.modelMapper.getConfiguration().setAmbiguityIgnored(true);
    }

	private <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
		return source
				.stream()
				.map(element -> modelMapper.map(element, targetClass))
				.collect(Collectors.toList());
	}

	/* 피드 부분 변환 */
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

	/* 관광지 부분 변환 */
	public List<PlaceDto> toPlaceDtoList(List<Place> list) {
		return mapList(list, PlaceDto.class);
	}

	public Page<PlaceDto> toPlaceDtoList(Page<Place> placeList){
		return placeList.map(m->modelMapper.map(m,PlaceDto.class));
	}

	public PlaceDto toPlaceDto(Place place) {
		return modelMapper.map(place, PlaceDto.class);
	}

	public Place toPlaceEntity(PlaceDto placeDto) {
		return modelMapper.map(placeDto, Place.class);
	}

	/* 스크랩 부분 변환 */

	public List<PlacescrapDto> toScrapDtoList(List<Placescrap> list) {
		return mapList(list, PlacescrapDto.class);
	}

	public Page<PlacescrapDto> toScrapDtoList(Page<Placescrap> scrapList){
		return scrapList.map(m->modelMapper.map(m,PlacescrapDto.class));
	}

	public PlacescrapDto toScrapDto(Placescrap scrap) {
		return modelMapper.map(scrap, PlacescrapDto.class);
	}

	public Placescrap toScrapEntity(PlacescrapDto scrapDto) {
		return modelMapper.map(scrapDto, Placescrap.class);
	}

	/* 관광지 파일 부분 변환 */

	public List<PlacefileDto> toPlacefileDtoList(List<Placefile> list) {
		return mapList(list, PlacefileDto.class);
	}

	public PlacefileDto toPlacefileDto(Placefile placefile) {
		return modelMapper.map(placefile, PlacefileDto.class);
	}

	public Placefile toPlacefileEntity(PlacefileDto placefileDto) {
		return modelMapper.map(placefileDto, Placefile.class);
	}

	public UserDto toUserDto(User user) { return modelMapper.map(user, UserDto.class); }
	public User toUserEntity(UserDto userDto) { return modelMapper.map(userDto, User.class); }
}
