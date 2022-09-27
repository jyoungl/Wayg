package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.dto.PlacescrapDto;
import com.ssafy.wayg.entity.Place;
import com.ssafy.wayg.repository.PlaceRepository;
import com.ssafy.wayg.repository.PlacescrapRepository;
import com.ssafy.wayg.repository.UserRepository;
import com.ssafy.wayg.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceService {

	private PlaceRepository placeRepository;
	private PlacescrapRepository scrapRepository;
	private UserRepository userRepository;
	private DEConverter converter;

	@Autowired
	public PlaceServiceImpl(PlaceRepository placeRepository, PlacescrapRepository scrapRepository, UserRepository userRepository, DEConverter converter) {
		this.placeRepository = placeRepository;
		this.scrapRepository = scrapRepository;
		this.userRepository = userRepository;
		this.converter = converter;
	}

	@Override
	public Page<PlaceDto> retrievePlace(int userNo, Pageable pageable) throws Exception {
		Page<PlaceDto> placeDtoPage = converter.toPlaceDtoList(placeRepository.findAllByOrderByPlaceScrapDesc(pageable));

		for (int i = 0; i < placeDtoPage.getContent().size(); i++) {
			PlaceDto placeDto = placeDtoPage.getContent().get(i);
			placeDto.setPlaceScrapYn(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeDto.getPlaceNo()) != null);
		}

		return placeDtoPage;
	}

	@Override
	public PlaceDto detailPlace(int userNo, int placeNo) throws Exception {
		PlaceDto placeDto = converter.toPlaceDto(placeRepository.getReferenceById(placeNo));

		placeDto.setPlaceScrapYn(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeNo) != null);
		
		return placeDto;
	}

	@Override
	@Transactional
	public PlacescrapDto insertScrap(PlacescrapDto scrapDto) throws Exception {

		if(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(scrapDto.getUserNo(), scrapDto.getPlaceNo()) == null) {
			Place place = placeRepository.getReferenceById(scrapDto.getPlaceNo());
			place.setPlaceScrap(place.getPlaceScrap()+1);
			return converter.toScrapDto(scrapRepository.save(converter.toScrapEntity(scrapDto)));
		}

		throw new Exception("fail");
	}
	
	@Override
	@Transactional
	public void deleteScrap(int userNo, int placeNo) throws Exception {

		if(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeNo) != null) {
			Place place = placeRepository.getReferenceById(placeNo);
			place.setPlaceScrap(place.getPlaceScrap()-1);
		}

		scrapRepository.delete(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeNo));
	}
	
	@Override
	public Page<PlaceDto> retrieveScrapList(int userNo, Pageable pageable) throws Exception {

		List<Integer> scrapList = scrapRepository.findByUserNo(userNo);

		if(scrapList.isEmpty()) {
			scrapList.add(0);
		}

		Page<PlaceDto> placeDtoPage = converter.toPlaceDtoList(placeRepository.findByPlaceNo(scrapList,pageable));
		for (int i = 0; i < placeDtoPage.getContent().size(); i++) {
			placeDtoPage.getContent().get(i).setPlaceScrapYn(true);
		}

		return placeDtoPage;
	}

}