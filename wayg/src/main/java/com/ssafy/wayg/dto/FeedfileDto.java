package com.ssafy.wayg.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.Feedfile} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "", description = "")
public class FeedfileDto implements Serializable {
    private Integer feedfileNo;
    private String feedfileSavefolder;
    private String feedfileOriginfile;
    private String feedfileSavefile;
    private Integer feedNo;
}