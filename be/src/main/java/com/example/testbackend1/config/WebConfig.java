
package com.example.testbackend1.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Frontend React URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")  // Cho phép tất cả các headers
                .exposedHeaders("Authorization")  // Nếu cần exposed header
                .allowCredentials(true);  // Nếu sử dụng cookie hoặc credentials
    }
}
