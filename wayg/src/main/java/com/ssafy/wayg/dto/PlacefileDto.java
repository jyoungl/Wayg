package com.ssafy.wayg.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.Placefile} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "", description = "")
public class PlacefileDto implements Serializable {
    private Integer placefileNo;
    private String placefileSavefolder;
    private String placefileOriginfile;
    private String placefileSavefile;
    private Integer placeNo;
}