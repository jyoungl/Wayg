package com.ssafy.wayg.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.Feed} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Feed (피드정보)", description = "글번호(아이디), 제목, 내용, 좋아요 개수, 작성자 번호를 가진 Domain Class")
public class FeedDto implements Serializable {
	@ApiModelProperty(value = "글번호")
    private Integer feedNo;
	@ApiModelProperty(value = "제목")
    private String feedTitle;
	@ApiModelProperty(value = "내용")
    private String feedContent;
	@ApiModelProperty(value = "닉네임")
    private String feedNickname;
	@ApiModelProperty(value = "작성자 번호")
    private UserDto userNo;
	@ApiModelProperty(value = "첨부 사진")
	private List<FeedfileDto> feedFiles;
	@ApiModelProperty(value = "좋아요 개수")
    private long feedLikeCnt;
	@ApiModelProperty(value = "좋아요 여부")
	private boolean feedLike;

}