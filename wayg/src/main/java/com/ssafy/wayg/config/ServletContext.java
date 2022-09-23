package com.ssafy.wayg.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.spring.multipartFile.controller"})
public class ServletContext implements WebMvcConfigurer {

    // 파일 업로드를 위한 multipartResolver 빈 등록
    @Bean
    public MultipartResolver multipartResolver() throws Exception {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(2000000000);
        multipartResolver.setDefaultEncoding("UTF-8");

        return multipartResolver;
    }
}