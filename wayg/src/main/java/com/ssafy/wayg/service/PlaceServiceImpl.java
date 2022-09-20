package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.dto.PlacescrapDto;
import com.ssafy.wayg.repository.PlaceRepository;
import com.ssafy.wayg.repository.PlacefileRepository;
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
	private PlacefileRepository fileRepository;
	private DEConverter converter;

	@Autowired
	public PlaceServiceImpl(PlaceRepository placeRepository, PlacescrapRepository scrapRepository, UserRepository userRepository, PlacefileRepository fileRepository, DEConverter converter) {
		this.placeRepository = placeRepository;
		this.scrapRepository = scrapRepository;
		this.userRepository = userRepository;
		this.fileRepository = fileRepository;
		this.converter = converter;
	}

	@Override
	public Page<PlaceDto> retrievePlace(Pageable pageable) throws Exception {
		Page<PlaceDto> placeDtoPage = converter.toPlaceDtoList(placeRepository.findAllByOrderByPlaceScrap(pageable));
		return placeDtoPage;
	}

	@Override
	public PlaceDto detailPlace(int userNo, int placeNo) throws Exception {
		PlaceDto placeDto = converter.toPlaceDto(placeRepository.getOne(placeNo));
		
		placeDto.setPlaceScrap(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeNo) != null);
		placeDto.setPlaceScrapCnt(scrapRepository.countByPlaceNoPlaceNo(placeNo));
		
		placeDto.setPlaceFiles(converter.toPlacefileDtoList(fileRepository.findByPlaceNoPlaceNo(placeNo)));
		
		return placeDto;
	}

	@Override
	public PlacescrapDto insertScrap(PlacescrapDto scrapDto) throws Exception {
		return converter.toScrapDto(scrapRepository.save(converter.toScrapEntity(scrapDto)));
	}
	
	@Override
	@Transactional
	public void deleteScrap(int userNo, int placeNo) throws Exception {
		scrapRepository.delete(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeNo));
	}
	
	@Override
	public Page<PlaceDto> retrieveScrapList(int userNo, Pageable pageable) throws Exception {
		
		List<Integer> scrapList = scrapRepository.findByUserNo(userNo);
		
		Page<PlaceDto> placeDtoPage = converter.toPlaceDtoList(placeRepository.findByPlaceNo(scrapList,pageable));
		return placeDtoPage;
	}

}